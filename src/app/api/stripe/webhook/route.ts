import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import type Stripe from 'stripe';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
}

function getTierFromPriceId(priceId: string): 'pro' | 'premium' | 'team' | 'free' {
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return 'pro';
  if (priceId === process.env.STRIPE_PREMIUM_PRICE_ID) return 'premium';
  if (priceId === process.env.STRIPE_TEAM_PRICE_ID) return 'team';
  return 'free';
}

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  const stripeClient = getStripe();
  const supabaseAdmin = getSupabaseAdmin();

  let event: Stripe.Event;
  try {
    event = stripeClient.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.supabase_user_id;
      const subscriptionId = session.subscription as string;

      if (userId && subscriptionId) {
        const subscription = await stripeClient.subscriptions.retrieve(subscriptionId);
        const priceId = subscription.items.data[0]?.price.id || '';
        const tier = getTierFromPriceId(priceId);

        await supabaseAdmin
          .from('profiles')
          .update({
            subscription_tier: tier,
            stripe_subscription_id: subscriptionId,
          })
          .eq('id', userId);
      }
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const priceId = subscription.items.data[0]?.price.id || '';
      const tier = getTierFromPriceId(priceId);
      const customerId = subscription.customer as string;

      const { data: profiles } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('stripe_customer_id', customerId);

      if (profiles?.[0]) {
        await supabaseAdmin
          .from('profiles')
          .update({ subscription_tier: tier })
          .eq('id', profiles[0].id);
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      const { data: profiles } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('stripe_customer_id', customerId);

      if (profiles?.[0]) {
        await supabaseAdmin
          .from('profiles')
          .update({
            subscription_tier: 'free',
            stripe_subscription_id: null,
          })
          .eq('id', profiles[0].id);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}

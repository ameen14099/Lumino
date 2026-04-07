'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Crown, Users, ArrowRight, Loader2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

const plans = [
  {
    key: 'free',
    name: 'Free',
    price: 0,
    period: '',
    description: 'Explore the platform',
    icon: Sparkles,
    color: '#6b7b8d',
    features: [
      '2 books per month',
      'Speed Mode & Visual Map',
      'Basic concept maps',
      'Community access',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    key: 'pro',
    name: 'Pro',
    price: 9.99,
    period: '/month',
    yearlyPrice: 79.99,
    description: 'For serious learners',
    icon: Zap,
    color: '#00BFA5',
    features: [
      'Unlimited books',
      'All 5 learning modes',
      'AI Mentor conversations (20/mo)',
      'Gamified challenges & XP',
      'Personalized action plans',
      'Streak tracking & analytics',
    ],
    cta: 'Start Pro',
    popular: true,
  },
  {
    key: 'premium',
    name: 'Premium',
    price: 19.99,
    period: '/month',
    yearlyPrice: 149.99,
    description: 'Maximum depth & insight',
    icon: Crown,
    color: '#7E57C2',
    features: [
      'Everything in Pro',
      'Unlimited AI conversations',
      'Cross-book intelligence',
      'Advanced learning analytics',
      'Priority AI processing',
      'Early access to new features',
    ],
    cta: 'Start Premium',
    popular: false,
  },
  {
    key: 'team',
    name: 'Team',
    price: 14.99,
    period: '/user/month',
    yearlyPrice: 119.99,
    description: 'For teams & organizations',
    icon: Users,
    color: '#FF7043',
    features: [
      'Everything in Premium',
      'Per-user pricing',
      'Shared team library',
      'Team challenges & leaderboard',
      'Admin dashboard',
      'Usage analytics & reporting',
    ],
    cta: 'Start Team',
    popular: false,
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  async function handleSubscribe(planKey: string) {
    if (planKey === 'free') {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/auth/signup');
      }
      return;
    }

    if (!user) {
      router.push(`/auth/signup?redirect=/pricing`);
      return;
    }

    setLoadingPlan(planKey);

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: `price_${planKey}_placeholder`, // Replace with real Stripe price IDs
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // Handle error silently
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <>
      <Header />
      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-14">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
            >
              Invest in your growth
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted max-w-xl mx-auto mb-8"
            >
              Less than the price of one book per month. Choose the plan that fits your learning style.
            </motion.p>

            {/* Annual toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-surface border border-border rounded-full p-1"
            >
              <button
                onClick={() => setAnnual(false)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  !annual ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-foreground'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  annual ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-foreground'
                }`}
              >
                Annual
                <span className="ml-1.5 text-xs font-bold text-accent">Save 33%</span>
              </button>
            </motion.div>
          </div>

          {/* Plans grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((plan, i) => {
              const Icon = plan.icon;
              const displayPrice = annual && plan.yearlyPrice
                ? (plan.yearlyPrice / 12).toFixed(2)
                : plan.price;

              return (
                <motion.div
                  key={plan.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className={`relative rounded-2xl border bg-surface p-6 flex flex-col ${
                    plan.popular
                      ? 'border-primary shadow-xl shadow-primary/10 ring-2 ring-primary/20'
                      : 'border-border'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: `${plan.color}15` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: plan.color }} />
                    </div>
                    <h3 className="text-lg font-extrabold">{plan.name}</h3>
                    <p className="text-sm text-muted">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold">
                        ${displayPrice === 0 ? '0' : displayPrice}
                      </span>
                      {plan.period && (
                        <span className="text-sm text-muted">{plan.period}</span>
                      )}
                    </div>
                    {annual && plan.yearlyPrice && (
                      <p className="text-xs text-primary font-semibold mt-1">
                        ${plan.yearlyPrice}/year billed annually
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                        <span className="text-sm text-muted">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSubscribe(plan.key)}
                    disabled={loadingPlan === plan.key}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                      plan.popular
                        ? 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20'
                        : 'bg-surface border-2 border-border text-foreground hover:border-primary hover:text-primary'
                    }`}
                  >
                    {loadingPlan === plan.key ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        {plan.cta}
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* FAQ / bottom note */}
          <div className="text-center mt-12">
            <p className="text-sm text-muted">
              All plans include a 14-day reverse trial. Start with full access, then choose your plan.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

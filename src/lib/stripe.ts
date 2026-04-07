import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    _stripe = new Stripe(key, { apiVersion: '2025-03-31.basil' });
  }
  return _stripe;
}


export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    priceId: null,
    features: [
      '2 books per month',
      'Speed Mode only',
      'Basic visual map',
      'Community access',
    ],
    limits: {
      booksPerMonth: 2,
      mentorChats: 0,
      challenges: 5,
      modes: ['speed', 'visual-map'],
    },
  },
  pro: {
    name: 'Pro',
    price: 9.99,
    priceId: process.env.STRIPE_PRO_PRICE_ID || '',
    features: [
      'Unlimited books',
      'All 5 learning modes',
      'AI Mentor conversations',
      'Gamified challenges & XP',
      'Personalized action plans',
      'Streak tracking',
    ],
    limits: {
      booksPerMonth: -1,
      mentorChats: 20,
      challenges: -1,
      modes: ['speed', 'visual-map', 'mentor', 'challenge', 'action'],
    },
  },
  premium: {
    name: 'Premium',
    price: 19.99,
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID || '',
    features: [
      'Everything in Pro',
      'Unlimited AI conversations',
      'Cross-book intelligence',
      'Advanced analytics',
      'Priority AI processing',
      'Early access to new features',
    ],
    limits: {
      booksPerMonth: -1,
      mentorChats: -1,
      challenges: -1,
      modes: ['speed', 'visual-map', 'mentor', 'challenge', 'action'],
    },
  },
  team: {
    name: 'Team',
    price: 14.99,
    priceId: process.env.STRIPE_TEAM_PRICE_ID || '',
    features: [
      'Everything in Premium',
      'Per-user pricing',
      'Shared team library',
      'Team challenges & leaderboard',
      'Admin dashboard',
      'Usage analytics',
    ],
    limits: {
      booksPerMonth: -1,
      mentorChats: -1,
      challenges: -1,
      modes: ['speed', 'visual-map', 'mentor', 'challenge', 'action'],
    },
  },
} as const;

export type PlanKey = keyof typeof PLANS;

export function canAccessMode(tier: PlanKey, mode: string): boolean {
  return (PLANS[tier].limits.modes as readonly string[]).includes(mode);
}

export function canAccessBook(tier: PlanKey, booksThisMonth: number): boolean {
  const limit = PLANS[tier].limits.booksPerMonth;
  return limit === -1 || booksThisMonth < limit;
}

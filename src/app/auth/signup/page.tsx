'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { BookOpen, Mail, Lock, User, ArrowRight, Loader2, Sparkles } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Sign up — no email confirmation
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Auto-create profile
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email,
        name,
        goals: [],
        current_streak: 0,
        longest_streak: 0,
        total_xp: 0,
        level: 1,
        books_completed: 0,
        concepts_mastered: 0,
        challenges_completed: 0,
        last_activity_date: null,
        subscription_tier: 'free',
        stripe_customer_id: null,
        stripe_subscription_id: null,
      });
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <div className="min-h-screen flex">
      {/* Left: Branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary-dark to-[#004D40] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="relative flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <BookOpen className="h-6 w-6" />
            </div>
            <span className="text-2xl font-extrabold">Lumino</span>
          </div>
          <h1 className="text-4xl font-extrabold leading-tight mb-4">
            Transform books into personalized experiences
          </h1>
          <p className="text-lg text-white/70 leading-relaxed mb-10">
            Interactive concept maps, AI mentors, gamified challenges, and action plans — all tailored to your goals.
          </p>
          <div className="space-y-4">
            {['Visual concept maps for every book', 'Chat with AI author mentors', 'Earn XP and maintain streaks', 'Personalized 7-day action plans'].map(f => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm font-medium text-white/90">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Signup form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-extrabold">Lumino</span>
          </div>

          <h2 className="text-2xl font-extrabold mb-1">Create your account</h2>
          <p className="text-muted mb-8">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-energy-light text-energy text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-surface text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-surface text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-surface text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <p className="text-xs text-muted text-center">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

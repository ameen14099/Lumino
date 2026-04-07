'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Flame, Zap, BookOpen, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const streak = profile?.current_streak ?? 0;
  const xp = profile?.total_xp ?? 0;

  return (
    <header className="sticky top-0 z-50 glass border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-foreground">
              Lumino
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/library"
              className="px-4 py-2 text-sm font-semibold text-muted hover:text-foreground rounded-lg hover:bg-primary-light transition-colors"
            >
              Library
            </Link>
            <Link
              href="/pricing"
              className="px-4 py-2 text-sm font-semibold text-muted hover:text-foreground rounded-lg hover:bg-primary-light transition-colors"
            >
              Pricing
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-semibold text-muted hover:text-foreground rounded-lg hover:bg-primary-light transition-colors"
              >
                Dashboard
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user && (
              <>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-energy-light">
                  <Flame className="h-4 w-4 text-energy" />
                  <span className="text-sm font-bold text-energy">{streak}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-light">
                  <Zap className="h-4 w-4 text-accent" />
                  <span className="text-sm font-bold text-amber-700">{xp} XP</span>
                </div>
                <div className="relative group">
                  <button className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                    <User className="h-4 w-4" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-surface rounded-xl border border-border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="p-3 border-b border-border">
                      <p className="text-sm font-bold truncate">{profile?.name || 'User'}</p>
                      <p className="text-xs text-muted truncate">{user.email}</p>
                    </div>
                    <div className="p-1.5">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-primary-light transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <button
                        onClick={signOut}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-energy rounded-lg hover:bg-energy-light transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {!user && (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-semibold text-muted hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-5 py-2 text-sm font-bold text-primary-foreground bg-primary rounded-full hover:bg-primary-hover transition-colors shadow-sm"
                >
                  Sign Up Free
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary-light"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border-subtle bg-surface px-4 py-4">
          <div className="flex flex-col gap-2">
            <Link href="/library" className="px-4 py-2.5 text-sm font-semibold rounded-lg hover:bg-primary-light" onClick={() => setMobileOpen(false)}>
              Library
            </Link>
            <Link href="/pricing" className="px-4 py-2.5 text-sm font-semibold rounded-lg hover:bg-primary-light" onClick={() => setMobileOpen(false)}>
              Pricing
            </Link>
            {user && (
              <>
                <Link href="/dashboard" className="px-4 py-2.5 text-sm font-semibold rounded-lg hover:bg-primary-light" onClick={() => setMobileOpen(false)}>
                  Dashboard
                </Link>
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-energy-light">
                    <Flame className="h-4 w-4 text-energy" />
                    <span className="text-sm font-bold text-energy">{streak}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-light">
                    <Zap className="h-4 w-4 text-accent" />
                    <span className="text-sm font-bold text-amber-700">{xp} XP</span>
                  </div>
                </div>
                <button onClick={() => { signOut(); setMobileOpen(false); }} className="px-4 py-2.5 text-sm font-semibold text-energy rounded-lg hover:bg-energy-light text-left">
                  Sign Out
                </button>
              </>
            )}
            {!user && (
              <>
                <Link href="/auth/login" className="px-4 py-2.5 text-sm font-semibold rounded-lg hover:bg-primary-light" onClick={() => setMobileOpen(false)}>
                  Sign In
                </Link>
                <Link href="/auth/signup" className="mt-2 px-5 py-2.5 text-sm font-bold text-primary-foreground bg-primary rounded-full hover:bg-primary-hover transition-colors text-center" onClick={() => setMobileOpen(false)}>
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

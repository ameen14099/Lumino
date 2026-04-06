'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Flame, Zap, BookOpen, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
              href="/"
              className="px-4 py-2 text-sm font-semibold text-muted hover:text-foreground rounded-lg hover:bg-primary-light transition-colors"
            >
              Explore
            </Link>
            <Link
              href="/"
              className="px-4 py-2 text-sm font-semibold text-muted hover:text-foreground rounded-lg hover:bg-primary-light transition-colors"
            >
              Library
            </Link>
            <Link
              href="/"
              className="px-4 py-2 text-sm font-semibold text-muted hover:text-foreground rounded-lg hover:bg-primary-light transition-colors"
            >
              Leaderboard
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-energy-light">
              <Flame className="h-4 w-4 text-energy" />
              <span className="text-sm font-bold text-energy">3</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-light">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-sm font-bold text-amber-700">250 XP</span>
            </div>
            <button className="ml-2 px-5 py-2 text-sm font-bold text-primary-foreground bg-primary rounded-full hover:bg-primary-hover transition-colors shadow-sm">
              Sign Up Free
            </button>
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
            <Link href="/" className="px-4 py-2.5 text-sm font-semibold rounded-lg hover:bg-primary-light">
              Explore
            </Link>
            <Link href="/" className="px-4 py-2.5 text-sm font-semibold rounded-lg hover:bg-primary-light">
              Library
            </Link>
            <Link href="/" className="px-4 py-2.5 text-sm font-semibold rounded-lg hover:bg-primary-light">
              Leaderboard
            </Link>
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-energy-light">
                <Flame className="h-4 w-4 text-energy" />
                <span className="text-sm font-bold text-energy">3</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-light">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-sm font-bold text-amber-700">250 XP</span>
              </div>
            </div>
            <button className="mt-2 px-5 py-2.5 text-sm font-bold text-primary-foreground bg-primary rounded-full hover:bg-primary-hover transition-colors">
              Sign Up Free
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

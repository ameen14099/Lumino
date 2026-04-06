'use client';

import { motion } from 'framer-motion';
import { Flame, Zap, Trophy, BookOpen, Brain, TrendingUp } from 'lucide-react';
import type { UserStats } from '@/types';

const mockStats: UserStats = {
  currentStreak: 3,
  longestStreak: 12,
  totalXp: 250,
  level: 1,
  booksCompleted: 0,
  conceptsMastered: 4,
  challengesCompleted: 2,
  lastActivityDate: new Date().toISOString(),
};

export default function StatsPanel() {
  const stats = mockStats;
  const xpInLevel = stats.totalXp % 500;
  const xpForNext = 500;

  return (
    <div className="space-y-4">
      {/* Streak card */}
      <div className="rounded-xl border border-border bg-surface p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm">Daily Streak</h3>
          <Flame className="h-5 w-5 text-energy" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-4xl font-extrabold text-energy">{stats.currentStreak}</span>
          <span className="text-sm text-muted">days</span>
        </div>
        <div className="flex gap-1.5 mt-4">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full ${
                i < stats.currentStreak ? 'bg-energy' : 'bg-border-subtle'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-muted">Mon</span>
          <span className="text-[10px] text-muted">Sun</span>
        </div>
      </div>

      {/* XP / Level card */}
      <div className="rounded-xl border border-border bg-surface p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm">Level {stats.level}</h3>
          <Zap className="h-5 w-5 text-accent" />
        </div>
        <div className="flex items-baseline gap-1.5 mb-3">
          <span className="text-3xl font-extrabold text-gradient-accent">{stats.totalXp}</span>
          <span className="text-sm text-muted">total XP</span>
        </div>
        <div className="h-2.5 bg-border-subtle rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent to-amber-500"
            initial={{ width: 0 }}
            animate={{ width: `${(xpInLevel / xpForNext) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted mt-1.5">
          {xpForNext - xpInLevel} XP to Level {stats.level + 1}
        </p>
      </div>

      {/* Quick stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-surface p-4 text-center">
          <BookOpen className="h-5 w-5 text-primary mx-auto mb-2" />
          <div className="text-xl font-extrabold">{stats.booksCompleted}</div>
          <p className="text-[11px] text-muted">Books Done</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4 text-center">
          <Brain className="h-5 w-5 text-wisdom mx-auto mb-2" />
          <div className="text-xl font-extrabold">{stats.conceptsMastered}</div>
          <p className="text-[11px] text-muted">Concepts</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4 text-center">
          <Trophy className="h-5 w-5 text-accent mx-auto mb-2" />
          <div className="text-xl font-extrabold">{stats.challengesCompleted}</div>
          <p className="text-[11px] text-muted">Challenges</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4 text-center">
          <TrendingUp className="h-5 w-5 text-success mx-auto mb-2" />
          <div className="text-xl font-extrabold">{stats.longestStreak}</div>
          <p className="text-[11px] text-muted">Best Streak</p>
        </div>
      </div>

      {/* Sign up CTA */}
      <div className="rounded-xl bg-gradient-to-br from-primary to-primary-dark p-5 text-white">
        <h3 className="font-bold text-sm mb-1">Save your progress</h3>
        <p className="text-xs text-white/70 mb-4">
          Sign up to keep your streak, XP, and personalized plans.
        </p>
        <button className="w-full py-2.5 bg-white text-primary rounded-lg text-sm font-bold hover:bg-white/90 transition-colors">
          Sign Up Free
        </button>
      </div>
    </div>
  );
}

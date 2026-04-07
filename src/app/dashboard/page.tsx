'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Flame, Zap, BookOpen, Trophy, Brain, TrendingUp, Target, Star,
  ChevronRight, Calendar, Award, ArrowRight, LogOut
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { useAuth } from '@/lib/auth-context';
import { books } from '@/data/books';
import { formatNumber } from '@/lib/utils';

// Generate streak calendar data (GitHub-style)
function generateActivityData(): { date: string; count: number }[] {
  const data: { date: string; count: number }[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    // Simulated activity data — random for demo
    const rand = Math.random();
    let count = 0;
    if (i < 7) count = Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0; // recent = more active
    else if (rand > 0.6) count = Math.floor(Math.random() * 4) + 1;
    data.push({ date: dateStr, count });
  }
  return data;
}

const ACHIEVEMENTS = [
  { id: 'first-book', name: 'First Steps', description: 'Start your first book experience', icon: BookOpen, color: '#00BFA5', unlocked: true },
  { id: 'streak-3', name: 'On Fire', description: 'Maintain a 3-day streak', icon: Flame, color: '#FF5252', unlocked: true },
  { id: 'xp-100', name: 'Century Club', description: 'Earn 100 XP', icon: Zap, color: '#FFB300', unlocked: true },
  { id: 'challenge-5', name: 'Quiz Master', description: 'Complete 5 challenges', icon: Trophy, color: '#AB47BC', unlocked: false },
  { id: 'streak-7', name: 'Week Warrior', description: '7-day streak', icon: Flame, color: '#FF5252', unlocked: false },
  { id: 'books-3', name: 'Bookworm', description: 'Complete 3 books', icon: BookOpen, color: '#5C6BC0', unlocked: false },
  { id: 'streak-30', name: 'Unstoppable', description: '30-day streak', icon: Star, color: '#FFB300', unlocked: false },
  { id: 'xp-1000', name: 'Knowledge Seeker', description: 'Earn 1,000 XP', icon: Brain, color: '#00BFA5', unlocked: false },
];

function StreakCalendar({ data }: { data: { date: string; count: number }[] }) {
  const weeks: { date: string; count: number }[][] = [];
  let currentWeek: { date: string; count: number }[] = [];

  // Pad start to align to Sunday
  const firstDay = new Date(data[0].date).getDay();
  for (let i = 0; i < firstDay; i++) {
    currentWeek.push({ date: '', count: -1 });
  }

  data.forEach(d => {
    currentWeek.push(d);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) weeks.push(currentWeek);

  function getColor(count: number): string {
    if (count < 0) return 'transparent';
    if (count === 0) return '#f0f3f6';
    if (count === 1) return '#b2dfdb';
    if (count === 2) return '#4db6ac';
    if (count === 3) return '#00897b';
    return '#004d40';
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[720px]">
        {/* Month labels */}
        <div className="flex mb-1 ml-8">
          {weeks.map((week, wi) => {
            if (wi === 0) return <div key={wi} className="w-[13px] mx-[1px]" />;
            const firstValidDay = week.find(d => d.count >= 0);
            if (!firstValidDay) return <div key={wi} className="w-[13px] mx-[1px]" />;
            const date = new Date(firstValidDay.date);
            const showMonth = date.getDate() <= 7;
            return (
              <div key={wi} className="w-[13px] mx-[1px] text-[9px] text-muted">
                {showMonth ? months[date.getMonth()] : ''}
              </div>
            );
          })}
        </div>
        {/* Grid */}
        <div className="flex gap-0">
          <div className="flex flex-col justify-between mr-1 py-[2px]">
            {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
              <div key={i} className="text-[9px] text-muted h-[13px] leading-[13px]">{d}</div>
            ))}
          </div>
          <div className="flex gap-[2px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[2px]">
                {week.map((day, di) => (
                  <div
                    key={di}
                    className="w-[11px] h-[11px] rounded-sm"
                    style={{ background: getColor(day.count) }}
                    title={day.date ? `${day.date}: ${day.count} activities` : ''}
                  />
                ))}
                {/* Pad if week is short */}
                {Array.from({ length: 7 - week.length }).map((_, i) => (
                  <div key={`pad-${i}`} className="w-[11px] h-[11px]" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, profile, loading, signOut } = useAuth();
  const [activityData] = useState(generateActivityData);

  // Demo stats (uses profile if available, falls back to demo data)
  const stats = {
    currentStreak: profile?.current_streak ?? 3,
    longestStreak: profile?.longest_streak ?? 12,
    totalXp: profile?.total_xp ?? 250,
    level: profile?.level ?? 1,
    booksCompleted: profile?.books_completed ?? 0,
    conceptsMastered: profile?.concepts_mastered ?? 4,
    challengesCompleted: profile?.challenges_completed ?? 2,
  };

  const xpInLevel = stats.totalXp % 500;
  const xpForNext = 500;
  const displayName = profile?.name || user?.email?.split('@')[0] || 'Learner';

  // Books "in progress" — demo data
  const inProgressBooks = books.slice(0, 3).map((b, i) => ({
    ...b,
    progress: [35, 60, 15][i],
  }));

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, {displayName}
              </h1>
              <p className="text-muted">Keep your streak alive — you&apos;re doing great.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/library"
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-hover transition-colors"
              >
                Explore Books
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={signOut}
                className="p-2.5 rounded-xl border border-border text-muted hover:text-foreground hover:border-primary transition-colors"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Current Streak', value: stats.currentStreak, suffix: 'days', icon: Flame, color: '#FF5252', bg: 'bg-energy-light' },
              { label: 'Total XP', value: stats.totalXp, suffix: 'XP', icon: Zap, color: '#FFB300', bg: 'bg-accent-light' },
              { label: 'Level', value: stats.level, suffix: '', icon: TrendingUp, color: '#00BFA5', bg: 'bg-primary-light' },
              { label: 'Concepts', value: stats.conceptsMastered, suffix: 'mastered', icon: Brain, color: '#7E57C2', bg: 'bg-wisdom-light' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-muted">{stat.label}</span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.bg}`}>
                      <Icon className="h-4 w-4" style={{ color: stat.color }} />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-extrabold">{stat.value}</span>
                    {stat.suffix && <span className="text-xs text-muted">{stat.suffix}</span>}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left column: Calendar + Books */}
            <div className="lg:col-span-2 space-y-6">
              {/* Streak Calendar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h2 className="font-bold">Learning Activity</h2>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted">
                    <span>Less</span>
                    {[0, 1, 2, 3, 4].map(level => (
                      <div
                        key={level}
                        className="w-[10px] h-[10px] rounded-sm"
                        style={{
                          background: ['#f0f3f6', '#b2dfdb', '#4db6ac', '#00897b', '#004d40'][level],
                        }}
                      />
                    ))}
                    <span>More</span>
                  </div>
                </div>
                <StreakCalendar data={activityData} />
              </motion.div>

              {/* XP Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-bold">Level {stats.level} Progress</h2>
                    <p className="text-sm text-muted">{xpForNext - xpInLevel} XP to Level {stats.level + 1}</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-light">
                    <Zap className="h-4 w-4 text-accent" />
                    <span className="text-sm font-bold text-amber-700">{stats.totalXp} XP</span>
                  </div>
                </div>
                <div className="h-4 bg-border-subtle rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-amber-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(xpInLevel / xpForNext) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                </div>
              </motion.div>

              {/* Books in progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold">Books in Progress</h2>
                  <Link href="/library" className="text-sm text-primary font-semibold hover:underline">
                    View all
                  </Link>
                </div>
                <div className="space-y-3">
                  {inProgressBooks.map(book => (
                    <Link
                      key={book.id}
                      href={`/book/${book.slug}`}
                      className="group flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary-light/30 transition-all"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${book.coverGradient[0]}, ${book.coverGradient[1]})` }}
                      >
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{book.title}</h3>
                        <p className="text-xs text-muted">{book.author}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1 h-1.5 bg-border-subtle rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${book.progress}%`,
                                background: `linear-gradient(90deg, ${book.coverGradient[0]}, ${book.coverGradient[1]})`,
                              }}
                            />
                          </div>
                          <span className="text-[10px] font-bold text-muted">{book.progress}%</span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted group-hover:text-primary transition-colors flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right column: Achievements */}
            <div className="space-y-6">
              {/* Streak */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Flame className="h-5 w-5 text-energy" />
                  <h2 className="font-bold">Streak</h2>
                </div>
                <div className="text-center mb-4">
                  <div className="text-5xl font-extrabold text-energy">{stats.currentStreak}</div>
                  <p className="text-sm text-muted">day streak</p>
                </div>
                <div className="flex gap-1.5">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <div key={i} className="flex-1 text-center">
                      <div
                        className={`w-full aspect-square rounded-lg flex items-center justify-center mb-1 ${
                          i < stats.currentStreak ? 'bg-energy' : 'bg-border-subtle'
                        }`}
                      >
                        {i < stats.currentStreak && <Flame className="h-3.5 w-3.5 text-white" />}
                      </div>
                      <span className="text-[10px] text-muted">{d}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted text-center mt-3">
                  Best: {stats.longestStreak} days
                </p>
              </motion.div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Award className="h-5 w-5 text-accent" />
                  <h2 className="font-bold">Achievements</h2>
                  <span className="ml-auto text-xs text-muted">
                    {ACHIEVEMENTS.filter(a => a.unlocked).length}/{ACHIEVEMENTS.length}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {ACHIEVEMENTS.map(achievement => {
                    const Icon = achievement.icon;
                    return (
                      <div
                        key={achievement.id}
                        className="text-center group relative"
                        title={`${achievement.name}: ${achievement.description}`}
                      >
                        <div
                          className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-1 ${
                            achievement.unlocked ? '' : 'opacity-25 grayscale'
                          }`}
                          style={achievement.unlocked ? { background: `${achievement.color}20` } : { background: '#f0f3f6' }}
                        >
                          <Icon
                            className="h-5 w-5"
                            style={{ color: achievement.unlocked ? achievement.color : '#9e9e9e' }}
                          />
                        </div>
                        <p className={`text-[9px] font-semibold leading-tight ${achievement.unlocked ? '' : 'text-muted'}`}>
                          {achievement.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <h2 className="font-bold mb-4">Quick Stats</h2>
                <div className="space-y-3">
                  {[
                    { label: 'Books Completed', value: stats.booksCompleted, icon: BookOpen, color: '#5C6BC0' },
                    { label: 'Challenges Won', value: stats.challengesCompleted, icon: Trophy, color: '#FFB300' },
                    { label: 'Concepts Mastered', value: stats.conceptsMastered, icon: Brain, color: '#00BFA5' },
                    { label: 'Longest Streak', value: `${stats.longestStreak} days`, icon: Target, color: '#FF5252' },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Icon className="h-4 w-4" style={{ color: item.color }} />
                          <span className="text-sm text-muted">{item.label}</span>
                        </div>
                        <span className="text-sm font-bold">{item.value}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

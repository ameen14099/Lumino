'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, MessageCircle, Trophy, Target, Zap, BookOpen, ArrowLeft, Clock, Users, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import type { Book, BookMode } from '@/types';
import { formatNumber } from '@/lib/utils';
import VisualMap from '@/components/modes/VisualMap';
import MentorMode from '@/components/modes/MentorMode';
import ChallengeMode from '@/components/modes/ChallengeMode';
import ActionMode from '@/components/modes/ActionMode';
import SpeedMode from '@/components/modes/SpeedMode';
import StatsPanel from '@/components/gamification/StatsPanel';

interface BookExperienceProps {
  book: Book;
}

const modes: { id: BookMode; label: string; icon: typeof Map; color: string }[] = [
  { id: 'visual-map', label: 'Visual Map', icon: Map, color: '#00BFA5' },
  { id: 'mentor', label: 'Mentor', icon: MessageCircle, color: '#5C6BC0' },
  { id: 'challenge', label: 'Challenge', icon: Trophy, color: '#FFB300' },
  { id: 'action', label: 'Action', icon: Target, color: '#FF7043' },
  { id: 'speed', label: 'Speed', icon: Zap, color: '#AB47BC' },
];

export default function BookExperience({ book }: BookExperienceProps) {
  const [activeMode, setActiveMode] = useState<BookMode>('visual-map');

  return (
    <div className="min-h-screen bg-background">
      {/* Book header */}
      <div
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${book.coverGradient[0]}15, ${book.coverGradient[1]}08)` }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Library
          </Link>

          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${book.coverGradient[0]}, ${book.coverGradient[1]})` }}
            >
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{book.title}</h1>
              <p className="text-muted font-medium mt-1">by {book.author}</p>
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <span className="flex items-center gap-1.5 text-sm text-muted">
                  <Clock className="h-4 w-4" />
                  {book.estimatedMinutes} min
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted">
                  <Users className="h-4 w-4" />
                  {formatNumber(book.userCount)} learners
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted">
                  <BarChart3 className="h-4 w-4" />
                  {book.conceptCount} concepts
                </span>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-white"
                  style={{ background: book.coverGradient[0] }}
                >
                  {book.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mode tabs */}
      <div className="sticky top-16 z-30 bg-surface border-b border-border shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2 overflow-x-auto no-scrollbar">
            {modes.map(mode => {
              const Icon = mode.icon;
              const isActive = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'text-white shadow-lg'
                      : 'text-muted hover:text-foreground hover:bg-primary-light'
                  }`}
                  style={isActive ? {
                    background: mode.color,
                    boxShadow: `0 4px 14px ${mode.color}40`,
                  } : undefined}
                >
                  <Icon className="h-4 w-4" />
                  {mode.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeMode === 'visual-map' && <VisualMap book={book} />}
              {activeMode === 'mentor' && <MentorMode book={book} />}
              {activeMode === 'challenge' && <ChallengeMode book={book} />}
              {activeMode === 'action' && <ActionMode book={book} />}
              {activeMode === 'speed' && <SpeedMode book={book} />}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="sticky top-36">
              <StatsPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

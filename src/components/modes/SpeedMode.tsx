'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, Clock, BarChart3 } from 'lucide-react';
import type { Book } from '@/types';

interface SpeedModeProps {
  book: Book;
}

export default function SpeedMode({ book }: SpeedModeProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const concepts = book.concepts;
  const concept = concepts[current];

  function goNext() {
    if (current < concepts.length - 1) {
      setDirection(1);
      setCurrent(prev => prev + 1);
    }
  }

  function goPrev() {
    if (current > 0) {
      setDirection(-1);
      setCurrent(prev => prev - 1);
    }
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="space-y-6">
      {/* Header stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-muted">
            <Clock className="h-4 w-4" />
            <span>~{Math.ceil((concepts.length - current) * 0.5)} min left</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted">
            <BarChart3 className="h-4 w-4" />
            <span>{current + 1} of {concepts.length}</span>
          </div>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5">
        {concepts.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={`h-1.5 rounded-full transition-all ${
              i === current
                ? 'w-8 bg-primary'
                : i < current
                  ? 'w-4 bg-primary/40'
                  : 'w-4 bg-border'
            }`}
          />
        ))}
      </div>

      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface min-h-[400px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="p-8 sm:p-12"
          >
            {/* Top gradient */}
            <div
              className="absolute top-0 left-0 right-0 h-1.5"
              style={{ background: `linear-gradient(90deg, ${book.coverGradient[0]}, ${book.coverGradient[1]})` }}
            />

            {/* Concept number */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-lg"
                style={{ background: `linear-gradient(135deg, ${book.coverGradient[0]}, ${book.coverGradient[1]})` }}
              >
                {concept.order}
              </div>
              <div>
                <p className="text-xs font-semibold text-muted uppercase tracking-wider">
                  Concept {concept.order} of {concepts.length}
                </p>
                <h3 className="text-2xl font-extrabold">{concept.name}</h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-muted leading-relaxed mb-8">
              {concept.description}
            </p>

            {/* Key takeaway box */}
            <div className="rounded-xl bg-primary-light p-5">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold text-primary">Key Takeaway</span>
              </div>
              <p className="text-sm text-primary-dark leading-relaxed">
                {concept.description.split('.')[0]}.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <div className="absolute bottom-6 right-6 flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="p-3 rounded-xl border border-border bg-surface hover:bg-primary-light disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goNext}
            disabled={current === concepts.length - 1}
            className="p-3 rounded-xl bg-primary text-white hover:bg-primary-hover disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Swipe hint on mobile */}
      <p className="text-center text-xs text-muted sm:hidden">
        Swipe or tap arrows to navigate
      </p>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, Users, BarChart3, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { getFeaturedBook } from '@/data/books';
import { formatNumber } from '@/lib/utils';

export default function FeaturedBook() {
  const book = getFeaturedBook();

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-light text-amber-700 text-sm font-semibold mb-4"
          >
            <Sparkles className="h-4 w-4" />
            <span>Featured Experience</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          >
            Experience it now — no signup needed
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-3xl border border-border bg-surface overflow-hidden shadow-xl">
            {/* Top gradient bar */}
            <div
              className="h-2"
              style={{ background: `linear-gradient(90deg, ${book.coverGradient[0]}, ${book.coverGradient[1]})` }}
            />

            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left: Book info */}
              <div className="p-8 sm:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${book.coverGradient[0]}, ${book.coverGradient[1]})` }}
                  >
                    <BookOpen className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold">{book.title}</h3>
                    <p className="text-muted font-medium">by {book.author}</p>
                  </div>
                </div>

                <p className="text-muted leading-relaxed mb-8 text-lg">
                  {book.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <Clock className="h-4 w-4" />
                    <span>{book.estimatedMinutes} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <Users className="h-4 w-4" />
                    <span>{formatNumber(book.userCount)} learners</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <BarChart3 className="h-4 w-4" />
                    <span>{book.conceptCount} concepts</span>
                  </div>
                </div>

                <Link
                  href={`/book/${book.slug}`}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-xl text-base font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 w-fit"
                >
                  Start Experience
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              {/* Right: Visual preview */}
              <div className="relative p-8 sm:p-12 bg-gradient-to-br from-primary/5 to-wisdom/5">
                <div className="grid grid-cols-2 gap-3">
                  {book.concepts.slice(0, 8).map((concept, i) => (
                    <motion.div
                      key={concept.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i, type: 'spring', stiffness: 200 }}
                      className="concept-node bg-surface rounded-xl p-3 border border-border shadow-sm hover:shadow-md cursor-pointer"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 text-white text-xs font-bold"
                        style={{ background: `linear-gradient(135deg, ${book.coverGradient[0]}, ${book.coverGradient[1]})` }}
                      >
                        {concept.order}
                      </div>
                      <h4 className="text-xs font-bold leading-tight line-clamp-2">{concept.name}</h4>
                    </motion.div>
                  ))}
                </div>

                {/* Overlay prompt */}
                <div className="absolute inset-0 flex items-end justify-center pb-8">
                  <div className="glass rounded-xl px-5 py-3 shadow-lg">
                    <p className="text-sm font-semibold text-center">
                      Click to explore the full interactive concept map →
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

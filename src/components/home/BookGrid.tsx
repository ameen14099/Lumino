'use client';

import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { books } from '@/data/books';
import { formatNumber, getDifficultyLabel } from '@/lib/utils';

export default function BookGrid() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2"
            >
              Explore the library
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted text-lg"
            >
              Start with any book — no signup required
            </motion.p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {books.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                href={`/book/${book.slug}`}
                className="group block rounded-2xl border border-border bg-surface overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Gradient bar */}
                <div
                  className="h-1.5 group-hover:h-2 transition-all"
                  style={{ background: `linear-gradient(90deg, ${book.coverGradient[0]}, ${book.coverGradient[1]})` }}
                />

                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                      style={{ background: `linear-gradient(135deg, ${book.coverGradient[0]}, ${book.coverGradient[1]})` }}
                    >
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-extrabold text-base leading-tight group-hover:text-primary transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm text-muted mt-0.5">{book.author}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted leading-relaxed mb-5 line-clamp-2">
                    {book.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {book.estimatedMinutes}m
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {formatNumber(book.userCount)}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-primary-light text-primary text-[11px] font-semibold">
                        {getDifficultyLabel(book.difficulty)}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

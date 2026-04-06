'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, ArrowRight, BookOpen, Users, Zap } from 'lucide-react';
import { books } from '@/data/books';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const filteredBooks = query.length > 0
    ? books.filter(b =>
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  function handleSelect(slug: string) {
    setQuery('');
    setFocused(false);
    router.push(`/book/${slug}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (filteredBooks.length > 0) {
      handleSelect(filteredBooks[0].slug);
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-wisdom/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light text-primary text-sm font-semibold mb-8"
          >
            <Sparkles className="h-4 w-4" />
            <span>AI-powered book experiences</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6"
          >
            Every book becomes a{' '}
            <span className="text-gradient">personalized</span>
            {' '}learning experience
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Interactive visual maps, AI mentors, gamified challenges, and personalized action plans.
            Not another book summary — a complete learning experience tailored to you.
          </motion.p>

          {/* Search Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative max-w-xl mx-auto"
          >
            <form onSubmit={handleSubmit}>
              <div className={`relative flex items-center rounded-2xl border-2 transition-all duration-300 bg-surface shadow-lg ${
                focused ? 'border-primary shadow-primary/10 shadow-xl' : 'border-border'
              }`}>
                <Search className="absolute left-4 h-5 w-5 text-muted" />
                <input
                  type="text"
                  placeholder="What book do you want to experience?"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setTimeout(() => setFocused(false), 200)}
                  className="w-full py-4 pl-12 pr-4 bg-transparent text-foreground text-lg placeholder:text-muted-foreground outline-none rounded-2xl"
                />
                <button
                  type="submit"
                  className="absolute right-3 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-primary-hover transition-colors"
                >
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* Dropdown suggestions */}
            <AnimatePresence>
              {focused && filteredBooks.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-surface rounded-xl border border-border shadow-xl overflow-hidden z-50"
                >
                  {filteredBooks.map(book => (
                    <button
                      key={book.id}
                      onMouseDown={() => handleSelect(book.slug)}
                      className="w-full flex items-center gap-4 px-4 py-3 hover:bg-primary-light transition-colors text-left"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${book.coverGradient[0]}, ${book.coverGradient[1]})` }}
                      >
                        <BookOpen className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-sm">{book.title}</div>
                        <div className="text-xs text-muted">{book.author} · {book.category}</div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick suggestions */}
            {!focused && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                <span className="text-xs text-muted">Try:</span>
                {['Atomic Habits', 'Deep Work', "Can't Hurt Me"].map(title => (
                  <button
                    key={title}
                    onClick={() => {
                      const book = books.find(b => b.title === title);
                      if (book) handleSelect(book.slug);
                    }}
                    className="px-3 py-1 text-xs font-semibold text-primary bg-primary-light rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    {title}
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-12"
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-muted">12,847 learners</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-wisdom" />
              <span className="text-sm font-semibold text-muted">6 books</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-muted">5 learning modes</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

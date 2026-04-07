'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Clock, Users, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { books, getAllCategories } from '@/data/books';
import { formatNumber, getDifficultyLabel } from '@/lib/utils';

type SortOption = 'popular' | 'title' | 'shortest' | 'newest';

export default function LibraryPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>('popular');
  const [showFilters, setShowFilters] = useState(false);

  const categories = getAllCategories();

  const filtered = useMemo(() => {
    let result = [...books];

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter(b => b.category === selectedCategory);
    }

    if (selectedDifficulty) {
      result = result.filter(b => b.difficulty === selectedDifficulty);
    }

    switch (sort) {
      case 'popular': result.sort((a, b) => b.userCount - a.userCount); break;
      case 'title': result.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'shortest': result.sort((a, b) => a.estimatedMinutes - b.estimatedMinutes); break;
      case 'newest': result.sort((a, b) => b.conceptCount - a.conceptCount); break;
    }

    return result;
  }, [query, selectedCategory, selectedDifficulty, sort]);

  const activeFilters = [selectedCategory, selectedDifficulty].filter(Boolean).length;

  return (
    <>
      <Header />
      <main className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">Library</h1>
            <p className="text-muted text-lg">{books.length} books ready to experience</p>
          </div>

          {/* Search + filter bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search books, authors, or categories..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-surface text-sm outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-colors ${
                  showFilters || activeFilters > 0
                    ? 'border-primary bg-primary-light text-primary'
                    : 'border-border text-muted hover:border-primary'
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilters > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                    {activeFilters}
                  </span>
                )}
              </button>
              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortOption)}
                className="px-4 py-3 rounded-xl border border-border bg-surface text-sm font-semibold outline-none focus:border-primary"
              >
                <option value="popular">Most Popular</option>
                <option value="title">A-Z</option>
                <option value="shortest">Shortest First</option>
                <option value="newest">Most Concepts</option>
              </select>
            </div>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 rounded-xl border border-border bg-surface p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm">Filters</h3>
                {activeFilters > 0 && (
                  <button
                    onClick={() => { setSelectedCategory(null); setSelectedDifficulty(null); }}
                    className="text-xs text-primary font-semibold hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-muted mb-2 uppercase tracking-wider">Category</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          selectedCategory === cat
                            ? 'bg-primary text-white'
                            : 'bg-primary-light text-primary hover:bg-primary hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted mb-2 uppercase tracking-wider">Difficulty</p>
                  <div className="flex gap-2">
                    {['beginner', 'intermediate', 'advanced'].map(diff => (
                      <button
                        key={diff}
                        onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? null : diff)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                          selectedDifficulty === diff
                            ? 'bg-primary text-white'
                            : 'bg-primary-light text-primary hover:bg-primary hover:text-white'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Active filter chips */}
          {activeFilters > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategory && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory(null)}><X className="h-3 w-3" /></button>
                </span>
              )}
              {selectedDifficulty && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold capitalize">
                  {selectedDifficulty}
                  <button onClick={() => setSelectedDifficulty(null)}><X className="h-3 w-3" /></button>
                </span>
              )}
            </div>
          )}

          {/* Results count */}
          <p className="text-sm text-muted mb-4">
            {filtered.length} book{filtered.length !== 1 ? 's' : ''} found
          </p>

          {/* Book grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((book, i) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  href={`/book/${book.slug}`}
                  className="group block rounded-2xl border border-border bg-surface overflow-hidden hover:shadow-lg transition-all"
                >
                  <div
                    className="h-1.5 group-hover:h-2 transition-all"
                    style={{ background: `linear-gradient(90deg, ${book.coverGradient[0]}, ${book.coverGradient[1]})` }}
                  />
                  <div className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${book.coverGradient[0]}, ${book.coverGradient[1]})` }}
                      >
                        <BookOpen className="h-5 w-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-extrabold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="text-xs text-muted mt-0.5">{book.author}</p>
                      </div>
                    </div>

                    <p className="text-xs text-muted leading-relaxed mb-4 line-clamp-2">{book.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 text-[11px] text-muted">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {book.estimatedMinutes}m
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" /> {formatNumber(book.userCount)}
                        </span>
                        <span className="px-1.5 py-0.5 rounded-full bg-primary-light text-primary text-[10px] font-semibold">
                          {getDifficultyLabel(book.difficulty)}
                        </span>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-muted group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="h-12 w-12 text-muted mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-1">No books found</h3>
              <p className="text-sm text-muted">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

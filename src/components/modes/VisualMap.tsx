'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Lightbulb } from 'lucide-react';
import type { Book, Concept, ConceptConnection } from '@/types';
import { bookConnections } from '@/data/books';

interface VisualMapProps {
  book: Book;
}

function getNodePositions(concepts: Concept[]): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>();
  const cols = 3;
  const cellW = 300;
  const cellH = 180;
  const offsetX = 60;
  const offsetY = 40;

  concepts.forEach((c, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    // Stagger odd rows
    const stagger = row % 2 === 1 ? cellW / 2 : 0;
    positions.set(c.id, {
      x: offsetX + col * cellW + stagger,
      y: offsetY + row * cellH,
    });
  });
  return positions;
}

export default function VisualMap({ book }: VisualMapProps) {
  const [selected, setSelected] = useState<Concept | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const positions = useMemo(() => getNodePositions(book.concepts), [book.concepts]);
  const connections = bookConnections[book.id] || [];

  const svgWidth = 1020;
  const svgHeight = Math.ceil(book.concepts.length / 3) * 180 + 80;

  return (
    <div className="relative">
      {/* Interactive map */}
      <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
        <svg
          width={svgWidth}
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="min-w-[800px]"
        >
          {/* Connection lines */}
          {connections.map((conn, i) => {
            const from = positions.get(conn.from);
            const to = positions.get(conn.to);
            if (!from || !to) return null;

            const isHighlighted =
              hoveredId === conn.from || hoveredId === conn.to;

            return (
              <g key={i}>
                <line
                  x1={from.x + 120}
                  y1={from.y + 55}
                  x2={to.x + 120}
                  y2={to.y + 55}
                  stroke={isHighlighted ? book.coverGradient[0] : '#e0e0e0'}
                  strokeWidth={isHighlighted ? 2.5 : 1.5}
                  strokeDasharray={isHighlighted ? 'none' : '6 4'}
                  opacity={isHighlighted ? 1 : 0.5}
                />
                {conn.label && isHighlighted && (
                  <text
                    x={(from.x + to.x) / 2 + 120}
                    y={(from.y + to.y) / 2 + 50}
                    textAnchor="middle"
                    className="text-[10px] fill-muted font-medium"
                  >
                    {conn.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Concept nodes */}
          {book.concepts.map((concept) => {
            const pos = positions.get(concept.id);
            if (!pos) return null;
            const isHovered = hoveredId === concept.id;
            const isSelected = selected?.id === concept.id;

            return (
              <g
                key={concept.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onClick={() => setSelected(concept)}
                onMouseEnter={() => setHoveredId(concept.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="cursor-pointer"
              >
                <rect
                  width={240}
                  height={110}
                  rx={16}
                  fill="white"
                  stroke={isSelected ? book.coverGradient[0] : isHovered ? book.coverGradient[0] : '#e8ecf0'}
                  strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1}
                  className="transition-all duration-200"
                  filter={isHovered ? 'url(#shadow)' : undefined}
                />

                {/* Order badge */}
                <rect
                  x={12}
                  y={12}
                  width={32}
                  height={32}
                  rx={10}
                  fill={book.coverGradient[0]}
                />
                <text
                  x={28}
                  y={33}
                  textAnchor="middle"
                  className="text-xs fill-white font-bold"
                >
                  {concept.order}
                </text>

                {/* Title */}
                <text
                  x={54}
                  y={33}
                  className="text-[13px] fill-foreground font-bold"
                >
                  {concept.name.length > 22
                    ? concept.name.substring(0, 22) + '...'
                    : concept.name}
                </text>

                {/* Preview text */}
                <foreignObject x={12} y={52} width={216} height={46}>
                  <p className="text-[11px] text-muted leading-snug line-clamp-3" style={{ fontFamily: 'system-ui' }}>
                    {concept.description.substring(0, 90)}...
                  </p>
                </foreignObject>
              </g>
            );
          })}

          {/* Shadow filter */}
          <defs>
            <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.1" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-surface border-l border-border shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                  style={{ background: `linear-gradient(135deg, ${book.coverGradient[0]}, ${book.coverGradient[1]})` }}
                >
                  {selected.order}
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 rounded-lg hover:bg-primary-light transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <h3 className="text-2xl font-extrabold mb-4">{selected.name}</h3>
              <p className="text-muted leading-relaxed mb-8">{selected.description}</p>

              <div className="rounded-xl bg-primary-light p-5 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold text-primary">Personalize This</span>
                </div>
                <p className="text-sm text-primary-dark">
                  Tell us about your situation and we&apos;ll explain this concept specifically for you.
                </p>
                <input
                  type="text"
                  placeholder="e.g., I'm trying to build a morning workout habit..."
                  className="mt-3 w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-white text-sm placeholder:text-muted-foreground outline-none focus:border-primary"
                />
              </div>

              {selected.dependencies.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold mb-3">Connected Concepts</h4>
                  <div className="space-y-2">
                    {selected.dependencies.map(depId => {
                      const dep = book.concepts.find(c => c.id === depId);
                      if (!dep) return null;
                      return (
                        <button
                          key={depId}
                          onClick={() => setSelected(dep)}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border hover:border-primary hover:bg-primary-light transition-colors text-left"
                        >
                          <ChevronRight className="h-4 w-4 text-muted" />
                          <span className="text-sm font-semibold">{dep.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay backdrop */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 bg-black/20 z-40"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

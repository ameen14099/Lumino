'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, Circle, Calendar, Clock, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import type { Book, ActionItem } from '@/types';

interface ActionModeProps {
  book: Book;
}

function generateActionPlan(book: Book): ActionItem[] {
  const plans: Record<string, ActionItem[]> = {
    'atomic-habits': [
      { id: 'a1', week: 1, day: 1, title: 'Identity Declaration', description: 'Write down the identity you want to build (e.g., "I am a person who exercises daily"). Put it where you\'ll see it every morning.', duration: '5 min', completed: false },
      { id: 'a2', week: 1, day: 2, title: 'Habit Audit', description: 'List every habit you do from morning to night. Mark each as positive (+), negative (-), or neutral (=). No judgment — just awareness.', duration: '10 min', completed: false },
      { id: 'a3', week: 1, day: 3, title: 'Two-Minute Starter', description: 'Pick one habit you want to build. Scale it down to 2 minutes or less. Write down: "After [current habit], I will [2-min version of new habit]."', duration: '5 min', completed: false },
      { id: 'a4', week: 1, day: 4, title: 'Environment Reset', description: 'Redesign one space to support your new habit. Make the cue visible. Remove friction. Example: put running shoes by the door.', duration: '10 min', completed: false },
      { id: 'a5', week: 1, day: 5, title: 'Temptation Bundle', description: 'Pair something you NEED to do with something you WANT to do. Example: "I will listen to my favorite podcast only while walking."', duration: '5 min', completed: false },
      { id: 'a6', week: 1, day: 6, title: 'Habit Tracking Setup', description: 'Create a simple habit tracker (paper or app). Track your one key habit. Don\'t break the chain.', duration: '5 min', completed: false },
      { id: 'a7', week: 1, day: 7, title: 'Week 1 Review', description: 'Review your week. Did you do the 2-minute habit every day? What was easy? What was hard? Adjust your system for next week.', duration: '10 min', completed: false },
    ],
    'default': [
      { id: 'a1', week: 1, day: 1, title: 'Core Concept Review', description: `Read through the key concepts from ${book.title}. Write down the three that resonate most with your current situation.`, duration: '10 min', completed: false },
      { id: 'a2', week: 1, day: 2, title: 'Personal Application Map', description: 'For each of your top 3 concepts, write one specific way you could apply it this week.', duration: '10 min', completed: false },
      { id: 'a3', week: 1, day: 3, title: 'First Action Step', description: 'Implement the easiest application from yesterday. Make it so small you can\'t say no.', duration: '5 min', completed: false },
      { id: 'a4', week: 1, day: 4, title: 'Environment Audit', description: 'Look at your daily environment. What one change would make following through easier?', duration: '5 min', completed: false },
      { id: 'a5', week: 1, day: 5, title: 'Reflection Journal', description: 'Write about what you noticed this week. What surprised you? What insight feels most actionable?', duration: '10 min', completed: false },
      { id: 'a6', week: 1, day: 6, title: 'Share & Teach', description: 'Explain one concept to someone else. Teaching deepens understanding more than any other activity.', duration: '10 min', completed: false },
      { id: 'a7', week: 1, day: 7, title: 'Weekly Synthesis', description: 'Review your week. What worked? What didn\'t? What will you carry into next week?', duration: '10 min', completed: false },
    ],
  };

  return plans[book.id] || plans['default'];
}

export default function ActionMode({ book }: ActionModeProps) {
  const [actions, setActions] = useState<ActionItem[]>(generateActionPlan(book));
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [context, setContext] = useState('');
  const [personalized, setPersonalized] = useState(false);

  const completedCount = actions.filter(a => a.completed).length;
  const progress = (completedCount / actions.length) * 100;

  function toggleAction(id: string) {
    setActions(prev =>
      prev.map(a => a.id === id ? { ...a, completed: !a.completed } : a)
    );
  }

  return (
    <div className="space-y-6">
      {/* Personalization prompt */}
      {!personalized && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-primary/20 bg-primary-light p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-primary">Personalize Your Action Plan</h3>
          </div>
          <p className="text-sm text-primary-dark mb-4">
            Tell us what you&apos;re working on, and we&apos;ll tailor the 7-day plan to your specific situation.
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              value={context}
              onChange={e => setContext(e.target.value)}
              placeholder="e.g., I want to build a consistent exercise routine..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-primary/20 bg-white text-sm outline-none focus:border-primary"
            />
            <button
              onClick={() => setPersonalized(true)}
              className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-hover transition-colors"
            >
              Personalize
            </button>
          </div>
        </motion.div>
      )}

      {/* Progress overview */}
      <div className="rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-extrabold text-lg">7-Day Action Plan</h3>
            <p className="text-sm text-muted">Based on concepts from {book.title}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-extrabold text-primary">{completedCount}/{actions.length}</div>
            <p className="text-xs text-muted">actions completed</p>
          </div>
        </div>

        <div className="h-3 bg-border-subtle rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary-dark"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Daily actions */}
      <div className="space-y-3">
        {actions.map((action) => {
          const isExpanded = expandedDay === action.day;

          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: action.day * 0.05 }}
              className={`rounded-xl border bg-surface overflow-hidden transition-all ${
                action.completed ? 'border-success/30 bg-success-light/30' : 'border-border'
              }`}
            >
              <button
                onClick={() => setExpandedDay(isExpanded ? null : action.day)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left"
              >
                <button
                  onClick={(e) => { e.stopPropagation(); toggleAction(action.id); }}
                  className="flex-shrink-0"
                >
                  {action.completed
                    ? <CheckCircle2 className="h-6 w-6 text-success" />
                    : <Circle className="h-6 w-6 text-border" />
                  }
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary bg-primary-light px-2 py-0.5 rounded-full">
                      Day {action.day}
                    </span>
                    <h4 className={`font-bold text-sm ${action.completed ? 'line-through text-muted' : ''}`}>
                      {action.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="flex items-center gap-1 text-xs text-muted">
                    <Clock className="h-3.5 w-3.5" />
                    {action.duration}
                  </span>
                  {isExpanded ? <ChevronUp className="h-4 w-4 text-muted" /> : <ChevronDown className="h-4 w-4 text-muted" />}
                </div>
              </button>

              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="px-5 pb-5 pl-[52px]"
                >
                  <p className="text-sm text-muted leading-relaxed">{action.description}</p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Calendar hint */}
      <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-accent-light">
        <Calendar className="h-5 w-5 text-amber-700 flex-shrink-0" />
        <p className="text-sm text-amber-800">
          <span className="font-bold">Sign up</span> to get daily reminders and track your progress across weeks.
        </p>
      </div>
    </div>
  );
}

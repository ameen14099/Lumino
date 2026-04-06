'use client';

import { motion } from 'framer-motion';
import { Map, MessageCircle, Trophy, Target, Zap } from 'lucide-react';

const modes = [
  {
    icon: Map,
    name: 'Visual Map',
    description: 'Navigate book concepts as an interactive graph. Click any node for a personalized explanation tailored to your goals.',
    color: '#00BFA5',
    bg: 'bg-primary-light',
  },
  {
    icon: MessageCircle,
    name: 'Mentor Mode',
    description: 'Talk to the author. Ask James Clear about your specific habits. Even bring in other authors for a debate.',
    color: '#5C6BC0',
    bg: 'bg-[#E8EAF6]',
  },
  {
    icon: Trophy,
    name: 'Challenge Mode',
    description: 'Test your understanding with AI-generated quizzes. Earn XP, maintain streaks, and climb the leaderboard.',
    color: '#FFB300',
    bg: 'bg-accent-light',
  },
  {
    icon: Target,
    name: 'Action Mode',
    description: 'Turn concepts into a personalized 7-day plan. Daily micro-actions, check-ins, and progress tracking.',
    color: '#FF7043',
    bg: 'bg-[#FBE9E7]',
  },
  {
    icon: Zap,
    name: 'Speed Mode',
    description: '5-minute visual walkthrough. One concept per card, swipe through — like Instagram Stories for knowledge.',
    color: '#AB47BC',
    bg: 'bg-wisdom-light',
  },
];

export default function ModesShowcase() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-background to-primary/[0.02]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          >
            Five ways to experience every book
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted max-w-2xl mx-auto"
          >
            Not a summary. Not a chatbot. A complete, multi-modal learning experience
            powered by AI and designed for retention.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modes.map((mode, i) => {
            const Icon = mode.icon;
            return (
              <motion.div
                key={mode.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`group relative rounded-2xl border border-border bg-surface p-7 hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${mode.bg} group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-6 w-6" style={{ color: mode.color }} />
                </div>
                <h3 className="text-lg font-extrabold mb-2">{mode.name}</h3>
                <p className="text-sm text-muted leading-relaxed">{mode.description}</p>

                <div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: mode.color }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

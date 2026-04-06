'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Flame, Trophy, Brain } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-[#004D40]" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-56 h-56 bg-accent rounded-full blur-3xl" />
          </div>

          <div className="relative px-8 sm:px-16 py-16 sm:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 max-w-2xl mx-auto leading-tight">
              Start your learning streak today
            </h2>
            <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-xl mx-auto">
              Join thousands of learners transforming books into personalized growth experiences.
              Free to start, no credit card required.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 mb-10">
              <div className="flex items-center gap-2 text-white/90">
                <Flame className="h-5 w-5 text-accent" />
                <span className="text-sm font-semibold">Daily streaks</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Trophy className="h-5 w-5 text-accent" />
                <span className="text-sm font-semibold">XP & leaderboards</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Brain className="h-5 w-5 text-accent" />
                <span className="text-sm font-semibold">AI personalization</span>
              </div>
            </div>

            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl text-lg font-extrabold hover:bg-white/90 transition-colors shadow-xl">
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

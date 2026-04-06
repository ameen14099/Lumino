'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Zap, CheckCircle2, XCircle, ArrowRight, RotateCcw, Flame } from 'lucide-react';
import type { Book, Challenge } from '@/types';

interface ChallengeModeProps {
  book: Book;
}

function generateChallenges(book: Book): Challenge[] {
  const challenges: Challenge[] = [];
  const concepts = book.concepts;

  if (concepts.length >= 1) {
    challenges.push({
      id: 'q1',
      type: 'multiple_choice',
      question: `According to the concepts in ${book.title}, what is the most effective starting point for lasting behavior change?`,
      options: [
        'Setting ambitious goals',
        'Focusing on identity and who you want to become',
        'Using willpower and motivation',
        'Finding an accountability partner',
      ],
      correctAnswer: 1,
      explanation: `The book emphasizes that identity-based change is the most effective. Rather than focusing on outcomes ("I want to lose weight"), focus on identity ("I am a healthy person"). Every action becomes a vote for the person you want to be.`,
      xpReward: 15,
      difficulty: 1,
    });
  }

  if (concepts.length >= 3) {
    challenges.push({
      id: 'q2',
      type: 'multiple_choice',
      question: `Which framework from ${book.title} provides a systematic approach to building any new habit?`,
      options: [
        concepts[2]?.name || 'The Core Framework',
        'The 5-Step Method',
        'The Motivation Matrix',
        'The Discipline Ladder',
      ],
      correctAnswer: 0,
      explanation: `"${concepts[2]?.name}" is the central framework. It provides a clear, systematic approach that you can apply to any habit you want to build or break.`,
      xpReward: 15,
      difficulty: 1,
    });
  }

  if (concepts.length >= 6) {
    challenges.push({
      id: 'q3',
      type: 'scenario',
      question: `Scenario: You want to start reading before bed, but you always end up scrolling your phone instead. Using the concepts from ${book.title}, which approach would be most effective?`,
      options: [
        'Try harder and use more willpower',
        'Put your phone in another room and place a book on your pillow',
        'Set a strict rule: no phone after 9pm',
        'Download a reading app on your phone',
      ],
      correctAnswer: 1,
      explanation: `This applies environment design — making the good habit obvious and easy while making the bad habit invisible and hard. By changing your physical environment, you don't need willpower.`,
      xpReward: 20,
      difficulty: 2,
    });
  }

  challenges.push({
    id: 'q4',
    type: 'multiple_choice',
    question: `What common misconception about progress does ${book.title} address?`,
    options: [
      'Progress is always linear and visible',
      'Small changes don\'t matter',
      'Breakthroughs come after periods of apparent stagnation',
      'You need dramatic changes to see results',
    ],
    correctAnswer: 2,
    explanation: `The book introduces the concept of the "Plateau of Latent Potential" — results are delayed, and breakthroughs come after long periods of seemingly no progress. The key is to trust the system and keep going.`,
    xpReward: 15,
    difficulty: 2,
  });

  challenges.push({
    id: 'q5',
    type: 'scenario',
    question: `You've been going to the gym for 3 weeks straight, but you miss a day due to illness. According to ${book.title}, what's the best mindset to adopt?`,
    options: [
      '"I\'ll start fresh next Monday"',
      '"I need to do a double workout tomorrow to make up for it"',
      '"Never miss twice — get back on track immediately"',
      '"Maybe this habit isn\'t for me"',
    ],
    correctAnswer: 2,
    explanation: `"Never Miss Twice" is a key principle. Missing once is an accident; missing twice is the start of a new habit. The all-or-nothing mindset is the enemy of sustainable habits. Recovery speed matters more than perfection.`,
    xpReward: 20,
    difficulty: 2,
  });

  return challenges;
}

export default function ChallengeMode({ book }: ChallengeModeProps) {
  const challenges = generateChallenges(book);
  const [current, setCurrent] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [totalXP, setTotalXP] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const challenge = challenges[current];
  const isCorrect = selectedAnswer === challenge?.correctAnswer;

  function handleAnswer(idx: number) {
    if (answered) return;
    setSelectedAnswer(idx);
    setAnswered(true);
    if (idx === challenge.correctAnswer) {
      setTotalXP(prev => prev + challenge.xpReward);
      setCorrectCount(prev => prev + 1);
    }
  }

  function handleNext() {
    if (current + 1 >= challenges.length) {
      setFinished(true);
    } else {
      setCurrent(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  }

  function handleReset() {
    setCurrent(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setTotalXP(0);
    setCorrectCount(0);
    setFinished(false);
  }

  if (finished) {
    const percentage = Math.round((correctCount / challenges.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-border bg-surface p-8 sm:p-12 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-accent-light flex items-center justify-center mx-auto mb-6">
          <Trophy className="h-10 w-10 text-accent" />
        </div>
        <h3 className="text-2xl font-extrabold mb-2">Challenge Complete!</h3>
        <p className="text-muted mb-6">
          You scored {correctCount}/{challenges.length} ({percentage}%)
        </p>

        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="text-center">
            <div className="flex items-center gap-1.5 text-accent text-2xl font-extrabold">
              <Zap className="h-6 w-6" />
              {totalXP}
            </div>
            <p className="text-xs text-muted mt-1">XP Earned</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <div className="flex items-center gap-1.5 text-energy text-2xl font-extrabold">
              <Flame className="h-6 w-6" />
              +1
            </div>
            <p className="text-xs text-muted mt-1">Streak Day</p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden">
      {/* Progress bar */}
      <div className="px-6 pt-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-muted">
            Question {current + 1} of {challenges.length}
          </span>
          <div className="flex items-center gap-1.5 text-accent">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-bold">{totalXP} XP</span>
          </div>
        </div>
        <div className="h-2 bg-border-subtle rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((current + (answered ? 1 : 0)) / challenges.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="p-6 sm:p-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold mb-4">
          {challenge.type === 'scenario' ? 'Scenario' : 'Knowledge Check'}
        </div>

        <h3 className="text-lg font-bold leading-relaxed mb-6">
          {challenge.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {challenge.options?.map((option, idx) => {
            let style = 'border-border hover:border-primary hover:bg-primary-light';
            if (answered) {
              if (idx === challenge.correctAnswer) {
                style = 'border-success bg-success-light';
              } else if (idx === selectedAnswer && !isCorrect) {
                style = 'border-energy bg-energy-light';
              } else {
                style = 'border-border opacity-50';
              }
            }

            return (
              <motion.button
                key={idx}
                whileTap={!answered ? { scale: 0.98 } : undefined}
                onClick={() => handleAnswer(idx)}
                disabled={answered}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border-2 text-left transition-all ${style}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                  answered && idx === challenge.correctAnswer
                    ? 'bg-success text-white'
                    : answered && idx === selectedAnswer && !isCorrect
                      ? 'bg-energy text-white'
                      : 'bg-primary-light text-primary'
                }`}>
                  {answered && idx === challenge.correctAnswer
                    ? <CheckCircle2 className="h-4 w-4" />
                    : answered && idx === selectedAnswer && !isCorrect
                      ? <XCircle className="h-4 w-4" />
                      : String.fromCharCode(65 + idx)
                  }
                </div>
                <span className="text-sm font-medium">{option}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {answered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6"
            >
              <div className={`rounded-xl p-5 ${isCorrect ? 'bg-success-light' : 'bg-accent-light'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect
                    ? <CheckCircle2 className="h-4 w-4 text-success" />
                    : <XCircle className="h-4 w-4 text-energy" />
                  }
                  <span className={`text-sm font-bold ${isCorrect ? 'text-success' : 'text-energy'}`}>
                    {isCorrect ? `Correct! +${challenge.xpReward} XP` : 'Not quite!'}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{challenge.explanation}</p>
              </div>

              <button
                onClick={handleNext}
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-colors"
              >
                {current + 1 >= challenges.length ? 'See Results' : 'Next Question'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

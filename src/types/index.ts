export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  category: string;
  description: string;
  coverGradient: [string, string];
  conceptCount: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  userCount: number;
  concepts: Concept[];
}

export interface Concept {
  id: string;
  name: string;
  description: string;
  order: number;
  dependencies: string[];
  x?: number;
  y?: number;
}

export interface ConceptConnection {
  from: string;
  to: string;
  label?: string;
}

export interface UserProgress {
  bookId: string;
  conceptId: string;
  masteryLevel: number;
  lastReviewed: string;
  nextReview: string;
  attempts: number;
  correct: number;
}

export interface Challenge {
  id: string;
  type: 'multiple_choice' | 'scenario' | 'open_ended';
  question: string;
  options?: string[];
  correctAnswer?: number;
  explanation: string;
  xpReward: number;
  difficulty: number;
}

export interface UserStats {
  currentStreak: number;
  longestStreak: number;
  totalXp: number;
  level: number;
  booksCompleted: number;
  conceptsMastered: number;
  challengesCompleted: number;
  lastActivityDate: string;
}

export interface ActionItem {
  id: string;
  week: number;
  day: number;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
}

export interface MentorMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export type BookMode = 'visual-map' | 'mentor' | 'challenge' | 'action' | 'speed';

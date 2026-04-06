import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types for when Supabase is connected
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          goals: string[];
          current_streak: number;
          total_xp: number;
          level: number;
          created_at: string;
        };
      };
      books: {
        Row: {
          id: string;
          title: string;
          author: string;
          category: string;
          description: string;
          concept_count: number;
          difficulty: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          book_concept_id: string;
          mastery_level: number;
          last_reviewed: string;
          next_review: string;
          attempts: number;
          correct: number;
        };
      };
      user_streaks: {
        Row: {
          id: string;
          user_id: string;
          current_streak: number;
          longest_streak: number;
          last_activity_date: string;
        };
      };
    };
  };
}

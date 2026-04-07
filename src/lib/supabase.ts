import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          goals: string[];
          current_streak: number;
          longest_streak: number;
          total_xp: number;
          level: number;
          books_completed: number;
          concepts_mastered: number;
          challenges_completed: number;
          last_activity_date: string | null;
          subscription_tier: 'free' | 'pro' | 'premium' | 'team';
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Row']>;
      };
      user_book_progress: {
        Row: {
          id: string;
          user_id: string;
          book_id: string;
          status: 'not_started' | 'in_progress' | 'completed';
          current_mode: string;
          concepts_completed: number;
          total_concepts: number;
          xp_earned: number;
          started_at: string | null;
          completed_at: string | null;
        };
      };
      user_concept_progress: {
        Row: {
          id: string;
          user_id: string;
          book_id: string;
          concept_id: string;
          mastery_level: number;
          last_reviewed: string;
          next_review: string;
          attempts: number;
          correct: number;
        };
      };
      user_achievements: {
        Row: {
          id: string;
          user_id: string;
          achievement_id: string;
          unlocked_at: string;
        };
      };
      user_activity: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          xp_earned: number;
          activities_count: number;
        };
      };
    };
  };
}

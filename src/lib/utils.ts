import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function getLevelFromXP(xp: number): number {
  return Math.floor(xp / 500) + 1;
}

export function getXPForLevel(level: number): number {
  return (level - 1) * 500;
}

export function getXPProgressInLevel(xp: number): number {
  return xp % 500;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Habits': '#00BFA5',
    'Productivity': '#5C6BC0',
    'Effectiveness': '#FF7043',
    'Psychology': '#AB47BC',
    'Finance': '#FFB300',
    'Mental Toughness': '#E53935',
  };
  return colors[category] || '#00BFA5';
}

export function getDifficultyLabel(difficulty: string): string {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

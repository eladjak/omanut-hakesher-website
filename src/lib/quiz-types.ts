export type QuestionType = "scale" | "multiple-choice" | "yes-no";

export interface QuizQuestion {
  id: string;
  text: string;
  type: QuestionType;
  scaleMin?: number;
  scaleMax?: number;
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
  options?: { value: string; label: string }[];
  axis?: string;
  reversed?: boolean;
}

export interface QuizAxis {
  id: string;
  label: string;
  description: string;
  color: string;
  maxScore: number;
}

export interface QuizResultRange {
  min: number;
  max: number;
  title: string;
  description: string;
  emoji: string;
  recommendation: string;
}

export interface QuizConfig {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  questions: QuizQuestion[];
  axes: QuizAxis[];
  resultRanges: QuizResultRange[];
  computeScores: (answers: Record<string, number | string>) => Record<string, number>;
  interpretResult: (scores: Record<string, number>) => QuizResultRange;
}

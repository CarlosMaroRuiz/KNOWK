import { Level } from '@common/models';

export type ExamState = 'setup' | 'running' | 'completed';

export interface MockExamOption {
  label: string;
  text: string;
}

export interface MockExamQuestion {
  id: number;
  type: 'structure' | 'error-spotting';
  category: string;
  prompt?: string;
  fullSentence?: string;
  options: MockExamOption[];
  correctLabel: string;
  correction?: string;
  explanation: string;
}

export interface UserAnswer {
  questionId: number;
  selectedLabel: string;
}

export interface CategoryResult {
  category: string;
  total: number;
  correct: number;
  percentage: number;
}

export interface MockExamResult {
  totalQuestions: number;
  correctAnswersCount: number;
  toeflScore: number; // Scale 31 - 68
  percentage: number;
  timeSpentSeconds: number;
  categoryBreakdown: CategoryResult[];
  userAnswers: UserAnswer[];
  questions: MockExamQuestion[];
}

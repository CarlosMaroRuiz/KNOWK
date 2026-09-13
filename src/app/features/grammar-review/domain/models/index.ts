import { Level } from '@common/models';

export interface ExerciseOption {
  label: string;
  text: string;
}

export interface ExerciseQuestion {
  id: number;
  prompt: string;
  options: ExerciseOption[];
  correctLabel: string;
  explanation: string;
}

export interface GrammarRuleExample {
  correct: string;
  incorrect?: string;
  note: string;
}

export interface GrammarTopic {
  id: string;
  title: string;
  category: string;
  level: Level;
  summary: string;
  ruleFormula: string;
  keyPoints: string[];
  examples: GrammarRuleExample[];
  exercises: ExerciseQuestion[];
}

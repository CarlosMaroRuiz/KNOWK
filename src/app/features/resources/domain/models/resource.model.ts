import { Level } from '@common/models/level.model';

export type ResourceCategory = 'grammar' | 'vocabulary' | 'strategies';
export type TOEFLSection = 'listening' | 'structure' | 'reading';

export interface ExamplePair {
  correct: string;
  incorrect: string;
  explanation: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: ResourceCategory;
  level: Level;
  summary: string;
  formula?: string;
  toeflTip?: string;
  keyRules: string[];
  examples: ExamplePair[];
  toeflSection?: TOEFLSection;
  practiceRoute?: string;
  tags: string[];
}

import { Level } from '@common/models';

export type ContentModuleType =
  | 'vocabulary'
  | 'sentence-structure'
  | 'error-spotting'
  | 'grammar-review'
  | 'reading-comprehension';

export interface ManagedItem {
  id: string | number;
  level: Level;
  titleOrPrompt: string;
  categoryOrDefinition: string;
  rawPayload: Record<string, unknown>;
  createdAt: string;
}

export interface ContentModuleOption {
  id: ContentModuleType;
  title: string;
  description: string;
  iconName: string;
}

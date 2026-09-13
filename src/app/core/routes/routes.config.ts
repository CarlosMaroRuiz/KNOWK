export interface RouteConfig {
  path: string;
  title: string;
}

export const APP_ROUTES = {
  INDEX: {
    path: '',
    title: 'englishLearning',
  },
  ERROR_SPOTTING: {
    path: 'error-spotting',
    title: 'Error Spotting',
  },
  READING_COMPREHENSION: {
    path: 'reading-comprehension',
    title: 'Reading Comprehension',
  },
  SENTENCE_STRUCTURE: {
    path: 'sentence-structure',
    title: 'Sentence Structure',
  },
  VOCABULARY: {
    path: 'vocabulary',
    title: 'Vocabulary Builder',
  },
  GRAMMAR_REVIEW: {
    path: 'grammar-review',
    title: 'Grammar Review',
  },
  MOCK_EXAM: {
    path: 'mock-exam',
    title: 'Mock Exam Simulator',
  },
} as const satisfies Record<string, RouteConfig>;
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
    path: 'error-spoting',
    title: 'Error Spotting',
  },
  READING_COMPREHENSION: {
    path: 'reading-comprehension',
    title: 'Reading Comprehension',
  },
} as const satisfies Record<string, RouteConfig>;
export interface RouteConfig {
  path: string;
  title: string;
}

export const APP_ROUTES = {
  INDEX: {
    path: '',
    title: 'Inicio — Panel de Práctica',
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
  RESOURCES: {
    path: 'resources',
    title: 'Centro de Recursos y Guías',
  },
  GAMES: {
    path: 'game-arena',
    title: 'Game Arena',
  },
  CONTENT_MANAGER: {
    path: 'content-manager',
    title: 'Content Manager',
  },
  ADMIN: {
    path: 'admin',
    title: 'Panel Administrativo',
  },
  ADMIN_LOGIN: {
    path: 'login',
    title: 'Admin Login',
  },
  ADMIN_INDEX: {
    path: '',
    title: 'Panel Administrativo',
  },
  ADMIN_CONTENT_MANAGER: {
    path: 'content-manager',
    title: 'Gestión de Contenido',
  },
} as const satisfies Record<string, RouteConfig>;
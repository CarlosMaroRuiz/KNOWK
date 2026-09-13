import {
  BookA,
  BookOpen,
  Headphones,
  PenTool,
  Puzzle,
  SpellCheck,
  Timer,
} from 'lucide-angular';
import { CatalogItem } from '../domain/models';

export const CATALOG_ITEMS: CatalogItem[] = [
    {
      id: 'error-spotting',
      title: 'Error Spotting',
      description: 'Identifica la palabra o frase con el error gramatical.',
      icon: SpellCheck,
      route: '/error-spotting',
      available: true,
    },
    {
      id: 'reading',
      title: 'Reading Comprehension',
      description: 'Lee un pasaje académico y responde preguntas.',
      icon: BookOpen,
      route: '/reading-comprehension',
      available: true,
    },
    {
      id: 'listening',
      title: 'Listening Practice',
      description: 'Escucha conversaciones y responde sobre el audio.',
      icon: Headphones,
      available: false,
    },
    {
      id: 'vocabulary',
      title: 'Vocabulary Builder',
      description: 'Amplía tu vocabulario académico en contexto.',
      icon: BookA,
      route: '/vocabulary',
      available: true,
    },
    {
      id: 'sentence-structure',
      title: 'Sentence Structure',
      description: 'Completa oraciones con la estructura correcta.',
      icon: Puzzle,
      route: '/sentence-structure',
      available: true,
    },
    {
      id: 'grammar-review',
      title: 'Grammar Review',
      description: 'Repasa reglas gramaticales clave para el examen.',
      icon: PenTool,
      route: '/grammar-review',
      available: true,
    },
    {
      id: 'mock-exam',
      title: 'Mock Exam Simulator',
      description: 'Simula un examen TOEFL ITP completo (Structure & Written Expression) con tiempo real.',
      icon: Timer,
      route: '/mock-exam',
      available: true,
    },
  ];
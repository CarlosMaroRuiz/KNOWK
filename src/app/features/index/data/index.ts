import { Level, LEVELS } from '@common/models';
import {
    BookA,
    BookOpen,
    BookOpenText,
    Gamepad2,
    Headphones,
    PenLine,
    PenTool,
    Puzzle,
    SpellCheck,
    Timer,
} from 'lucide-angular';
import { CatalogArea } from '../domain/models';

/**
 * Niveles con contenido real disponible hoy.
 * A1 se habilitara cuando existan los JSON `a1.json` (ticket US-008).
 */
const AVAILABLE_LEVELS: readonly Level[] = LEVELS.filter((level) => level !== 'A1');

export const CATALOG_AREAS: CatalogArea[] = [
  {
    id: 'study',
    name: 'Study',
    description: 'Aprende la teoría: gramática, vocabulario y guías de estudio.',
    icon: BookOpenText,
    order: 1,
    items: [
      {
        id: 'grammar-review',
        title: 'Grammar Hub',
        description: 'Repasa reglas gramaticales clave por tema y nivel.',
        icon: PenTool,
        route: '/grammar-review',
        available: true,
        levels: AVAILABLE_LEVELS,
      },
      {
        id: 'vocabulary',
        title: 'Vocabulary Builder',
        description: 'Amplía tu vocabulario académico con fonética y sinónimos.',
        icon: BookA,
        route: '/vocabulary',
        available: true,
        levels: AVAILABLE_LEVELS,
      },
      {
        id: 'resources',
        title: 'Resources',
        description: 'Guías teóricas, tiempos verbales y estrategias de estudio.',
        icon: BookOpen,
        route: '/resources',
        available: true,
      },
    ],
  },
  {
    id: 'practice',
    name: 'Practice',
    description: 'Pon a prueba lo aprendido con ejercicios y feedback inmediato.',
    icon: Puzzle,
    order: 2,
    items: [
      {
        id: 'sentence-structure',
        title: 'Sentence Structure',
        description: 'Completa oraciones con la estructura correcta.',
        icon: Puzzle,
        route: '/sentence-structure',
        available: true,
        levels: AVAILABLE_LEVELS,
      },
      {
        id: 'error-spotting',
        title: 'Error Spotting',
        description: 'Identifica la palabra o frase con el error gramatical.',
        icon: SpellCheck,
        route: '/error-spotting',
        available: true,
        levels: AVAILABLE_LEVELS,
      },
      {
        id: 'writing',
        title: 'Writing',
        description: 'Practica la redacción y la expresión escrita.',
        icon: PenLine,
        available: false,
        levels: AVAILABLE_LEVELS,
      },
    ],
  },
  {
    id: 'games',
    name: 'Games',
    description: 'Juegos dinámicos para practicar vocabulario y gramática.',
    icon: Gamepad2,
    order: 3,
    items: [
      {
        id: 'game-arena',
        title: 'Game Arena',
        description: 'Encuentra el Impostor: cuatro palabras, una no pertenece.',
        icon: Gamepad2,
        route: '/game-arena',
        available: true,
      },
    ],
  },
  {
    id: 'toefl',
    name: 'TOEFL ITP',
    description: 'Preparación del examen: simulador y prácticas por sección.',
    icon: Timer,
    order: 4,
    items: [
      {
        id: 'mock-exam',
        title: 'Mock Exam Simulator',
        description: 'Simula el examen completo con tiempo real y puntaje 31–68.',
        icon: Timer,
        route: '/mock-exam',
        available: true,
        levels: AVAILABLE_LEVELS,
      },
      {
        id: 'reading',
        title: 'Reading Comprehension',
        description: 'Lee pasajes académicos y responde preguntas.',
        icon: BookOpen,
        route: '/reading-comprehension',
        available: true,
        levels: AVAILABLE_LEVELS,
      },
      {
        id: 'listening',
        title: 'Listening Practice',
        description: 'Escucha conversaciones y responde sobre el audio.',
        icon: Headphones,
        available: false,
        levels: AVAILABLE_LEVELS,
      },
    ],
  },
];
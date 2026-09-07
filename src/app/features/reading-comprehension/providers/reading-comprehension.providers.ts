import { Provider } from '@angular/core';
import { ReadingComprehensionMockRepository } from '../data/repositories/reading-comprehension-mock.repository';
import { ReadingComprehensionRepository } from '../domain/repository/reading-comprehension.repository';
import { ReadingComprehensionUseCase } from '../domain/usecases/reading-comprehension.use-case';

export const provideReadingComprehension = (): Provider[] => [
  ReadingComprehensionUseCase,
  ReadingComprehensionMockRepository,
  {
    provide: ReadingComprehensionRepository,
    useExisting: ReadingComprehensionMockRepository,
  },
];

import { Provider } from '@angular/core';
import { VocabularyMockRepository } from '../data/repositories/vocabulary-mock.repository';
import { VocabularyRepository } from '../domain/repository/vocabulary.repository';
import { VocabularyUseCase } from '../domain/usecases/vocabulary.use-case';

export const provideVocabulary = (): Provider[] => [
  VocabularyUseCase,
  VocabularyMockRepository,
  {
    provide: VocabularyRepository,
    useExisting: VocabularyMockRepository,
  },
];

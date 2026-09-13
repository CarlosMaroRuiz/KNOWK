import { Provider } from '@angular/core';
import { SentenceStructureMockRepository } from '../data/repositories/sentence-structure-mock.repository';
import { SentenceStructureRepository } from '../domain/repository/sentence-structure.repository';
import { SentenceStructureUseCase } from '../domain/usecases/sentence-structure.use-case';

export const provideSentenceStructure = (): Provider[] => [
  SentenceStructureUseCase,
  SentenceStructureMockRepository,
  {
    provide: SentenceStructureRepository,
    useExisting: SentenceStructureMockRepository,
  },
];

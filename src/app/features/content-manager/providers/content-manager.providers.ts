import { Provider } from '@angular/core';
import { ContentManagerLocalRepository } from '../data/repositories/content-manager-local.repository';
import { ContentManagerRepository } from '../domain/repository/content-manager.repository';
import { ContentManagerUseCase } from '../domain/usecases/content-manager.use-case';

export const provideContentManager = (): Provider[] => [
  ContentManagerUseCase,
  ContentManagerLocalRepository,
  {
    provide: ContentManagerRepository,
    useExisting: ContentManagerLocalRepository,
  },
];

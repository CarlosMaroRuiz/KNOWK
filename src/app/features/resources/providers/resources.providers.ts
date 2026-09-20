import { Provider } from '@angular/core';
import { ResourcesHttpRepository } from '../data/repositories/resources-http.repository';
import { RESOURCES_REPOSITORY_TOKEN } from '../domain/repository/resources.repository';
import { GetResourcesUseCase } from '../domain/usecases/resources.use-case';

export function provideResources(): Provider[] {
  return [
    ResourcesHttpRepository,
    GetResourcesUseCase,
    {
      provide: RESOURCES_REPOSITORY_TOKEN,
      useExisting: ResourcesHttpRepository,
    },
  ];
}

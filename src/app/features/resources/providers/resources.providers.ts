import { Provider } from '@angular/core';
import { RESOURCES_REPOSITORY_TOKEN } from '../domain/repository/resources.repository';
import { ResourcesHttpRepository } from '../data/repositories/resources-http.repository';
import { GetResourcesUseCase } from '../domain/usecases/get-resources.usecase';

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

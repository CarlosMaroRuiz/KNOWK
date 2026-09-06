import { Provider, inject } from '@angular/core';

import { ErrorSpottingUseCase } from '../domain/usecases/error-spotting.use-case';
import { ErrorSpottingRepository } from '../domain/repository/error-spotting.repository';
import { ErrorSpottingMockRepository } from '../data/repositories/error-spotting-mock.repository';


export const provideErrorSpotting = (): Provider[] => [

  ErrorSpottingUseCase,
  ErrorSpottingMockRepository,

  {
    provide: ErrorSpottingRepository,
    useFactory: () => {
      return inject(ErrorSpottingMockRepository)
    }
  }
];
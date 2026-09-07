import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Question } from '../../domain/models/';
import { ErrorSpottingRepository } from '../../domain/repository/error-spotting.repository';
import { ERROR_SPOTTING_MOCK_DATA_A2 } from '../mocks/error-spotting-a2.mock';
import { ERROR_SPOTTING_MOCK_DATA_B1 } from '../mocks/error-spotting-b1.mock';
import { ERROR_SPOTTING_MOCK_DATA_B2 } from '../mocks/error-spotting-b2.mock';

@Injectable()
export class ErrorSpottingMockRepository implements ErrorSpottingRepository {
  fetchQuestions(level: string): Observable<Question[]> {
    const mappedData: { [key: string]: Question[] } = {
      'B1': ERROR_SPOTTING_MOCK_DATA_B1,
      "A2": ERROR_SPOTTING_MOCK_DATA_A2,
      "B2":ERROR_SPOTTING_MOCK_DATA_B2,
    };

    return of(mappedData[level] || []).pipe(delay(500));
  }
}
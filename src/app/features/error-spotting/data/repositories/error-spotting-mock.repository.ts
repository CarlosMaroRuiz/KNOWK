import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ErrorSpottingRepository } from '../../domain/repository/error-spotting.repository';
import { Question } from '../../domain/models/';
import {  ERROR_SPOTTING_MOCK_DATA } from '../../mocks/error-spotting.mock';

@Injectable()
export class ErrorSpottingMockRepository implements ErrorSpottingRepository {
  fetchQuestions(): Observable<Question[]> {
    return of(ERROR_SPOTTING_MOCK_DATA).pipe(delay(500));
  }
}
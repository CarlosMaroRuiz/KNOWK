import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../../domain/models';
import { ErrorSpottingRepository } from '../../domain/repository/error-spotting.repository';

@Injectable()
export class ErrorSpottingMockRepository implements ErrorSpottingRepository {
  private readonly http = inject(HttpClient);

  fetchQuestions(level: string): Observable<Question[]> {
    return this.http.get<Question[]>(`/api/error-spotting/${level.toLowerCase()}.json`);
  }
}
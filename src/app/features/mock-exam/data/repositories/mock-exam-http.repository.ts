import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Level } from '@common/models';
import { MockExamQuestion } from '../../domain/models';
import { MockExamRepository } from '../../domain/repository/mock-exam.repository';

@Injectable()
export class MockExamHttpRepository implements MockExamRepository {
  private readonly http = inject(HttpClient);

  fetchExamQuestions(level: Level): Observable<MockExamQuestion[]> {
    return this.http.get<MockExamQuestion[]>(`/api/mock-exam/${level.toLowerCase()}.json`);
  }
}

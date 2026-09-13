import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SentenceStructureQuestion } from '../../domain/models';
import { SentenceStructureRepository } from '../../domain/repository/sentence-structure.repository';

@Injectable()
export class SentenceStructureMockRepository implements SentenceStructureRepository {
  private readonly http = inject(HttpClient);

  fetchQuestions(level: string): Observable<SentenceStructureQuestion[]> {
    return this.http.get<SentenceStructureQuestion[]>(`/api/sentence-structure/${level.toLowerCase()}.json`);
  }
}

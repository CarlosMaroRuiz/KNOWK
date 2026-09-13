import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VocabularyWord } from '../../domain/models';
import { VocabularyRepository } from '../../domain/repository/vocabulary.repository';

@Injectable()
export class VocabularyMockRepository implements VocabularyRepository {
  private readonly http = inject(HttpClient);

  fetchWords(level: string): Observable<VocabularyWord[]> {
    return this.http.get<VocabularyWord[]>(`/api/vocabulary/${level.toLowerCase()}.json`);
  }
}

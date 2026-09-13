import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GrammarTopic } from '../../domain/models';
import { GrammarReviewRepository } from '../../domain/repository/grammar-review.repository';

@Injectable()
export class GrammarReviewMockRepository implements GrammarReviewRepository {
  private readonly http = inject(HttpClient);

  fetchTopics(level: string): Observable<GrammarTopic[]> {
    return this.http.get<GrammarTopic[]>(`/api/grammar-review/${level.toLowerCase()}.json`);
  }
}

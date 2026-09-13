import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GrammarTopic } from '../models';
import { GrammarReviewRepository } from '../repository/grammar-review.repository';

@Injectable()
export class GrammarReviewUseCase {
  private readonly repository = inject(GrammarReviewRepository);

  getTopics(level: string): Observable<GrammarTopic[]> {
    return this.repository.fetchTopics(level);
  }
}

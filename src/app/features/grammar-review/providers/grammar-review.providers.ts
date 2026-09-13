import { Provider } from '@angular/core';
import { GrammarReviewMockRepository } from '../data/repositories/grammar-review-mock.repository';
import { GrammarReviewRepository } from '../domain/repository/grammar-review.repository';
import { GrammarReviewUseCase } from '../domain/usecases/grammar-review.use-case';

export const provideGrammarReview = (): Provider[] => [
  GrammarReviewUseCase,
  GrammarReviewMockRepository,
  {
    provide: GrammarReviewRepository,
    useExisting: GrammarReviewMockRepository,
  },
];

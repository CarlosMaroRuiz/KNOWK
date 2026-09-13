import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SentenceStructureQuestion } from '../models';
import { SentenceStructureRepository } from '../repository/sentence-structure.repository';

@Injectable()
export class SentenceStructureUseCase {
  private readonly repository = inject(SentenceStructureRepository);

  getQuestions(level: string): Observable<SentenceStructureQuestion[]> {
    return this.repository.fetchQuestions(level);
  }
}

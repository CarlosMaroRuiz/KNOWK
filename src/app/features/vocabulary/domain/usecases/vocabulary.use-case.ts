import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { VocabularyWord } from '../models';
import { VocabularyRepository } from '../repository/vocabulary.repository';

@Injectable()
export class VocabularyUseCase {
  private readonly repository = inject(VocabularyRepository);

  getWords(level: string): Observable<VocabularyWord[]> {
    return this.repository.fetchWords(level);
  }
}

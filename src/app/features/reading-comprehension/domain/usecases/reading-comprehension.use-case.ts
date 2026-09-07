import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models';
import { ReadingComprehensionRepository } from '../repository/reading-comprehension.repository';

@Injectable()
export class ReadingComprehensionUseCase {
  private readonly repository = inject(ReadingComprehensionRepository);

  getBooks(level: string): Observable<Book[]> {
    return this.repository.fetchBooks(level);
  }
}

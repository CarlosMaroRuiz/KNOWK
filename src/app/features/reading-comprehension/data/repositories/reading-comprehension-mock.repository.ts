import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../domain/models';
import { ReadingComprehensionRepository } from '../../domain/repository/reading-comprehension.repository';

@Injectable()
export class ReadingComprehensionMockRepository implements ReadingComprehensionRepository {
  private readonly http = inject(HttpClient);

  fetchBooks(level: string): Observable<Book[]> {
    return this.http.get<Book[]>(`/api/reading-comprehension/${level.toLowerCase()}.json`);
  }
}

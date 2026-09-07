import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Book } from '../../domain/models';
import { ReadingComprehensionRepository } from '../../domain/repository/reading-comprehension.repository';
import { READING_COMPREHENSION_MOCK_DATA_A2 } from '../mocks/reading-comprehension-a2.mock';
import { READING_COMPREHENSION_MOCK_DATA_B1 } from '../mocks/reading-comprehension-b1.mock';
import { READING_COMPREHENSION_MOCK_DATA_B2 } from '../mocks/reading-comprehension-b2.mock';

@Injectable()
export class ReadingComprehensionMockRepository implements ReadingComprehensionRepository {
  fetchBooks(level: string): Observable<Book[]> {
    const mappedData: Record<string, Book[]> = {
      A2: READING_COMPREHENSION_MOCK_DATA_A2,
      B1: READING_COMPREHENSION_MOCK_DATA_B1,
      B2: READING_COMPREHENSION_MOCK_DATA_B2,
    };

    return of(mappedData[level] ?? []).pipe(delay(500));
  }
}

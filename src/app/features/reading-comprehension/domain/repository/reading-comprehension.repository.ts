import { Observable } from 'rxjs';
import { Book } from '../models';

export abstract class ReadingComprehensionRepository {
  abstract fetchBooks(level: string): Observable<Book[]>;
}

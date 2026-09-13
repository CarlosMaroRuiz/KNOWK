import { Observable } from 'rxjs';
import { VocabularyWord } from '../models';

export abstract class VocabularyRepository {
  abstract fetchWords(level: string): Observable<VocabularyWord[]>;
}

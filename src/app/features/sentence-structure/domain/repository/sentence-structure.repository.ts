import { Observable } from 'rxjs';
import { SentenceStructureQuestion } from '../models';

export abstract class SentenceStructureRepository {
  abstract fetchQuestions(level: string): Observable<SentenceStructureQuestion[]>;
}

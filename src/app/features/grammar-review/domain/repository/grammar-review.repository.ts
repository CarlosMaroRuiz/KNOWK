import { Observable } from 'rxjs';
import { GrammarTopic } from '../models';

export abstract class GrammarReviewRepository {
  abstract fetchTopics(level: string): Observable<GrammarTopic[]>;
}

import { Observable } from 'rxjs';
import { Level } from '@common/models';
import { MockExamQuestion } from '../models';

export abstract class MockExamRepository {
  abstract fetchExamQuestions(level: Level): Observable<MockExamQuestion[]>;
}

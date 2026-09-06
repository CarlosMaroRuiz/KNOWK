import { Observable } from 'rxjs';
import { Question } from '@features/error-spotting/domain/models';
export abstract class ErrorSpottingRepository{
  abstract fetchQuestions(): Observable<Question[]>;
}
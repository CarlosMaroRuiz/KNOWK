import { Provider } from '@angular/core';
import { MockExamHttpRepository } from '../data/repositories/mock-exam-http.repository';
import { MockExamRepository } from '../domain/repository/mock-exam.repository';
import { MockExamUseCase } from '../domain/usecases/mock-exam.use-case';

export const provideMockExam = (): Provider[] => [
  MockExamUseCase,
  MockExamHttpRepository,
  {
    provide: MockExamRepository,
    useExisting: MockExamHttpRepository,
  },
];

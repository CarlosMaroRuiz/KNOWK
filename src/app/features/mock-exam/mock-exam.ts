import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Level } from '@common/models';
import { SkeletonComponent } from '@common/components/skeleton/skeleton';
import { ErrorStateComponent } from '@common/components/error-state/error-state';
import { provideMockExam } from './providers/mock-exam.providers';
import { MockExamUseCase } from './domain/usecases/mock-exam.use-case';
import { ExamState, MockExamQuestion, MockExamResult } from './domain/models';
import { ExamSetupComponent } from './components/exam-setup/exam-setup';
import { ExamRunnerComponent } from './components/exam-runner/exam-runner';
import { ExamResultComponent } from './components/exam-result/exam-result';

@Component({
  selector: 'app-mock-exam',
  standalone: true,
  providers: [provideMockExam()],
  imports: [
    SkeletonComponent,
    ErrorStateComponent,
    ExamSetupComponent,
    ExamRunnerComponent,
    ExamResultComponent,
  ],
  templateUrl: './mock-exam.html',
  styleUrl: './mock-exam.css',
})
export class MockExam {
  private readonly useCase = inject(MockExamUseCase);

  readonly currentState = signal<ExamState>('setup');
  readonly selectedLevel = signal<Level>('B1');
  readonly examResult = signal<MockExamResult | null>(null);

  readonly questionsResource = rxResource<MockExamQuestion[], Level>({
    params: () => this.selectedLevel(),
    stream: ({ params }) => this.useCase.getExamQuestions(params),
  });

  handleStartExam(event: { level: Level }): void {
    this.selectedLevel.set(event.level);
    this.currentState.set('running');
  }

  handleFinishExam(event: {
    userAnswers: Map<number, string>;
    timeSpentSeconds: number;
  }): void {
    const questions = this.questionsResource.value() ?? [];
    const evaluated = this.useCase.evaluateExam(
      questions,
      event.userAnswers,
      event.timeSpentSeconds
    );
    this.examResult.set(evaluated);
    this.currentState.set('completed');
  }

  resetToSetup(): void {
    this.examResult.set(null);
    this.currentState.set('setup');
  }
}

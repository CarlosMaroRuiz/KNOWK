import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { ButtonDirective } from '@common/components/button';
import { Question } from '@features/error-spotting/domain/models';
import { ErrorSpottingUseCase } from '@features/error-spotting/domain/usecases/error-spotting.use-case';
import { provideErrorSpotting } from '@features/error-spotting/providers/error-spotting.providers';
import { ErrorSpottingCardComponent } from './components/error-spotting-card/error-spotting-card';

@Component({
  selector: 'app-error-spoting',
  standalone: true,
  imports: [ButtonDirective, ErrorSpottingCardComponent],
  templateUrl: './error-spotting.html',
  styleUrl: './error-spotting.css',
  providers: [provideErrorSpotting()]
})
export class ErrorSpotting {
  private readonly useCase = inject(ErrorSpottingUseCase);

  protected questionsResource = rxResource<Question[], unknown>({
    stream: () => this.useCase.getQuestions()
  });

  protected selectedAnswers = signal<Record<number, string>>({});
  protected currentQuestionIndex = signal(0);

  protected selectOption(questionId: number, label: string): void {
    this.selectedAnswers.update(prev => ({
      ...prev,
      [questionId]: label
    }));
  }

  protected previousQuestion(): void {
    this.currentQuestionIndex.update(index => Math.max(0, index - 1));
  }

  protected nextQuestion(): void {
    const questions = this.questionsResource.value() ?? [];

    this.currentQuestionIndex.update(index =>
      Math.min(questions.length - 1, index + 1)
    );
  }
}
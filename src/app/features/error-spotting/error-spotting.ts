import { Component, computed, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { ButtonDirective } from '@common/components/button';
import { ErrorStateComponent } from '@common/components/error-state';
import { SkeletonComponent } from '@common/components/skeleton';
import { Level } from '@common/models';
import { Question } from '@features/error-spotting/domain/models';
import { ErrorSpottingUseCase } from '@features/error-spotting/domain/usecases/error-spotting.use-case';
import { provideErrorSpotting } from '@features/error-spotting/providers/error-spotting.providers';
import { ErrorSpottingCardComponent } from './components/error-spotting-card/error-spotting-card';
import { SelectedLevel } from './components/selected-level/selected-level';

@Component({
  selector: 'app-error-spoting',
  standalone: true,
  imports: [
    ButtonDirective,
    ErrorSpottingCardComponent,
    SelectedLevel,
    SkeletonComponent,
    ErrorStateComponent,
  ],
  templateUrl: './error-spotting.html',
  styleUrl: './error-spotting.css',
  providers: [provideErrorSpotting()],
})
export class ErrorSpotting {
  private readonly useCase = inject(ErrorSpottingUseCase);
  selectLevel = signal<Level>('B1');

  protected questionsResource = rxResource<Question[], Level>({
    params: () => this.selectLevel(),
    stream: ({ params }) => this.useCase.getQuestions(params),
  });

  protected selectedAnswers = signal<Record<number, string>>({});
  protected currentQuestionIndex = signal(0);

  protected readonly questions = computed(() => this.questionsResource.value() ?? []);

  protected readonly progressPercent = computed(() => {
    const total = this.questions().length;
    if (total === 0) return 0;
    return Math.round(((this.currentQuestionIndex() + 1) / total) * 100);
  });

  constructor() {
    effect(() => {
      this.selectLevel();
      this.currentQuestionIndex.set(0);
      this.selectedAnswers.set({});
    });
  }

  protected selectOption(questionId: number, label: string): void {
    this.selectedAnswers.update((prev) => ({
      ...prev,
      [questionId]: label,
    }));
  }

  protected previousQuestion(): void {
    this.currentQuestionIndex.update((index) => Math.max(0, index - 1));
  }

  protected nextQuestion(): void {
    const qList = this.questions();

    this.currentQuestionIndex.update((index) =>
      Math.min(qList.length - 1, index + 1)
    );
  }

  protected retryFetch(): void {
    this.questionsResource.reload();
  }
}
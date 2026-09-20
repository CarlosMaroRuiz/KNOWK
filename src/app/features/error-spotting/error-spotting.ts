import { Component, computed, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { ButtonDirective } from '@common/components/button';
import { ErrorStateComponent } from '@common/components/error-state';
import { LevelSelectorComponent } from '@common/components/level-selector';
import { SkeletonComponent } from '@common/components/skeleton';
import { Level } from '@common/models';
import { nextIndex, prevIndex } from '@core/utils/pagination';
import { calcProgress } from '@core/utils/progress';
import { Question } from '@features/error-spotting/domain/models';
import { ErrorSpottingUseCase } from '@features/error-spotting/domain/usecases/error-spotting.use-case';
import { provideErrorSpotting } from '@features/error-spotting/providers/error-spotting.providers';
import { ErrorSpottingCardComponent } from './components/error-spotting-card/error-spotting-card';

@Component({
  selector: 'app-error-spoting',
  standalone: true,
  imports: [
    ButtonDirective,
    ErrorSpottingCardComponent,
    LevelSelectorComponent,
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

  protected readonly progressPercent = computed(() =>
    calcProgress(this.currentQuestionIndex(), this.questions().length),
  );

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
    this.currentQuestionIndex.update((index) => prevIndex(index));
  }

  protected nextQuestion(): void {
    const total = this.questions().length;
    this.currentQuestionIndex.update((index) => nextIndex(index, total));
  }

  protected retryFetch(): void {
    this.questionsResource.reload();
  }
}
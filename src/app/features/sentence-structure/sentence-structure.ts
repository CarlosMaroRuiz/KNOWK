import { Component, computed, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ButtonDirective } from '@common/components/button';
import { Level, LEVELS } from '@common/models';
import { nextIndex, prevIndex } from '@core/utils/pagination';
import { calcProgress } from '@core/utils/progress';
import { countCorrect } from '@core/utils/scoring';
import { SentenceStructureCardComponent } from './components/sentence-structure-card/sentence-structure-card';
import { SentenceStructureQuestion } from './domain/models';
import { SentenceStructureUseCase } from './domain/usecases/sentence-structure.use-case';
import { provideSentenceStructure } from './providers/sentence-structure.providers';

@Component({
  selector: 'app-sentence-structure',
  standalone: true,
  imports: [ButtonDirective, SentenceStructureCardComponent],
  templateUrl: './sentence-structure.html',
  styleUrl: './sentence-structure.css',
  providers: [provideSentenceStructure()],
})
export class SentenceStructure {
  private readonly useCase = inject(SentenceStructureUseCase);

  protected readonly levels: readonly Level[] = LEVELS;
  protected readonly selectLevel = signal<Level>('A2');
  protected readonly viewMode = signal<'practice' | 'results'>('practice');
  protected readonly currentQuestionIndex = signal(0);
  protected readonly selectedAnswers = signal<Record<number, string>>({});

  protected readonly questionsResource = rxResource<SentenceStructureQuestion[], Level>({
    params: () => this.selectLevel(),
    stream: ({ params }) => this.useCase.getQuestions(params),
  });

  protected readonly questions = computed(() => this.questionsResource.value() ?? []);

  protected readonly currentQuestion = computed(
    () => this.questions()[this.currentQuestionIndex()] ?? null,
  );

  protected readonly currentAnswer = computed(() => {
    const question = this.currentQuestion();
    return question ? this.selectedAnswers()[question.id] : undefined;
  });

  protected readonly correctCount = computed(() =>
    countCorrect(this.questions(), this.selectedAnswers()),
  );

  protected readonly progressPercent = computed(() =>
    calcProgress(this.currentQuestionIndex(), this.questions().length),
  );

  constructor() {
    effect(() => {
      this.selectLevel();
      this.currentQuestionIndex.set(0);
      this.selectedAnswers.set({});
      this.viewMode.set('practice');
    });
  }

  protected changeLevel(level: Level): void {
    this.selectLevel.set(level);
  }

  protected selectOption(questionId: number, label: string): void {
    this.selectedAnswers.update((prev) => ({
      ...prev,
      [questionId]: label,
    }));
  }

  protected previousQuestion(): void {
    this.currentQuestionIndex.update((idx) => prevIndex(idx));
  }

  protected nextQuestion(): void {
    const total = this.questions().length;
    if (this.currentQuestionIndex() === total - 1) {
      this.viewMode.set('results');
      return;
    }
    this.currentQuestionIndex.update((idx) => nextIndex(idx, total));
  }

  protected restart(): void {
    this.currentQuestionIndex.set(0);
    this.selectedAnswers.set({});
    this.viewMode.set('practice');
  }
}

import { Component, computed, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ButtonDirective } from '@common/components/button';
import { Level } from '@common/models';
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

  protected readonly levels: readonly Level[] = ['A2', 'B1', 'B2'];
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

  protected readonly correctCount = computed(() => {
    const qList = this.questions();
    const answers = this.selectedAnswers();
    return qList.filter((q) => answers[q.id] === q.correctLabel).length;
  });

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
    this.currentQuestionIndex.update((idx) => Math.max(0, idx - 1));
  }

  protected nextQuestion(): void {
    const total = this.questions().length;
    if (this.currentQuestionIndex() === total - 1) {
      this.viewMode.set('results');
      return;
    }
    this.currentQuestionIndex.update((idx) => Math.min(total - 1, idx + 1));
  }

  protected restart(): void {
    this.currentQuestionIndex.set(0);
    this.selectedAnswers.set({});
    this.viewMode.set('practice');
  }
}

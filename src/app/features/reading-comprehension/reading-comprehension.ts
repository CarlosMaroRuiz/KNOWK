import { Component, computed, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ButtonDirective } from '@common/components/button';
import { ErrorStateComponent } from '@common/components/error-state';
import { SkeletonComponent } from '@common/components/skeleton';
import { Level, LEVELS } from '@common/models';
import { nextIndex, prevIndex } from '@core/utils/pagination';
import { countCorrect } from '@core/utils/scoring';
import { BookCard } from './components/book-card/book-card';
import { PassageReader } from './components/passage-reader/passage-reader';
import { ReadingQuestionCard } from './components/reading-question-card/reading-question-card';
import { ReadingResult } from './components/reading-result/reading-result';
import { Book } from './domain/models';
import { ReadingComprehensionUseCase } from './domain/usecases/reading-comprehension.use-case';
import { provideReadingComprehension } from './providers/reading-comprehension.providers';

@Component({
  selector: 'app-reading-comprehension',
  standalone: true,
  imports: [
    ButtonDirective,
    BookCard,
    PassageReader,
    ReadingQuestionCard,
    ReadingResult,
    SkeletonComponent,
    ErrorStateComponent,
  ],
  templateUrl: './reading-comprehension.html',
  styleUrl: './reading-comprehension.css',
  providers: [provideReadingComprehension()],
})
export class ReadingComprehension {
  private readonly useCase = inject(ReadingComprehensionUseCase);

  protected readonly levels: readonly Level[] = LEVELS;
  protected readonly selectLevel = signal<Level>('A2');
  protected readonly viewMode = signal<'catalog' | 'reading' | 'questions' | 'results'>('catalog');
  protected readonly selectedBookId = signal<string | null>(null);
  protected readonly selectedAnswers = signal<Record<number, string>>({});
  protected readonly currentQuestionIndex = signal(0);

  protected readonly booksResource = rxResource<Book[], Level>({
    params: () => this.selectLevel(),
    stream: ({ params }) => this.useCase.getBooks(params),
  });

  protected readonly selectedBook = computed(
    () => this.booksResource.value()?.find((book) => book.id === this.selectedBookId()) ?? null,
  );

  protected readonly currentQuestion = computed(
    () => this.selectedBook()?.questions[this.currentQuestionIndex()] ?? null,
  );

  protected readonly correctAnswers = computed(() => {
    const questions = this.selectedBook()?.questions ?? [];
    return countCorrect(questions, this.selectedAnswers());
  });

  protected readonly currentAnswer = computed(() => {
    const question = this.currentQuestion();
    return question ? this.selectedAnswers()[question.id] : undefined;
  });

  protected readonly allQuestionsAnswered = computed(() => {
    const questions = this.selectedBook()?.questions ?? [];
    const answers = this.selectedAnswers();
    return questions.length > 0 && questions.every((question) => Boolean(answers[question.id]));
  });

  constructor() {
    effect(() => {
      this.selectLevel();
      this.viewMode.set('catalog');
      this.selectedBookId.set(null);
      this.currentQuestionIndex.set(0);
      this.selectedAnswers.set({});
    });
  }

  protected changeLevel(level: Level): void {
    this.selectLevel.set(level);
  }

  protected selectBook(id: string): void {
    this.selectedBookId.set(id);
    this.viewMode.set('reading');
    this.currentQuestionIndex.set(0);
    this.selectedAnswers.set({});
  }

  protected startQuestions(): void {
    this.viewMode.set('questions');
  }

  protected selectOption(questionId: number, label: string): void {
    this.selectedAnswers.update((answers) => ({ ...answers, [questionId]: label }));
  }

  protected previousQuestion(): void {
    this.currentQuestionIndex.update((index) => prevIndex(index));
  }

  protected nextQuestion(): void {
    const questionCount = this.selectedBook()?.questions.length ?? 0;
    if (this.currentQuestionIndex() === questionCount - 1) {
      this.viewMode.set('results');
      return;
    }
    this.currentQuestionIndex.update((index) => nextIndex(index, questionCount));
  }

  protected restartQuestions(): void {
    this.viewMode.set('questions');
    this.currentQuestionIndex.set(0);
    this.selectedAnswers.set({});
  }

  protected backToCatalog(): void {
    this.viewMode.set('catalog');
    this.selectedBookId.set(null);
    this.currentQuestionIndex.set(0);
    this.selectedAnswers.set({});
  }

  protected backToReading(): void {
    this.viewMode.set('reading');
    this.currentQuestionIndex.set(0);
    this.selectedAnswers.set({});
  }

  protected retryFetch(): void {
    this.booksResource.reload();
  }
}

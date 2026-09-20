import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { ButtonDirective } from '@common/components/button/button';
import { formatClock } from '@core/utils/time';
import { MockExamQuestion } from '../../domain/models';

@Component({
  selector: 'app-exam-runner',
  standalone: true,
  imports: [ButtonDirective],
  templateUrl: './exam-runner.html',
  styleUrl: './exam-runner.css',
})
export class ExamRunnerComponent implements OnInit {
  readonly questions = input.required<MockExamQuestion[]>();
  readonly level = input.required<string>();
  readonly initialSeconds = input(25 * 60);

  readonly finishExam = output<{
    userAnswers: Map<number, string>;
    timeSpentSeconds: number;
  }>();

  private readonly destroyRef = inject(DestroyRef);

  readonly currentIndex = signal(0);
  readonly remainingSeconds = signal(1500);
  readonly answersMap = signal<Map<number, string>>(new Map());

  private timerInterval: ReturnType<typeof setInterval> | undefined;

  readonly currentQuestion = computed(() => {
    const list = this.questions();
    const idx = this.currentIndex();
    return list[idx] ?? null;
  });

  readonly formattedTime = computed(() => formatClock(this.remainingSeconds()));

  readonly isTimerWarning = computed(() => this.remainingSeconds() <= 300); // 5 minutes or less

  ngOnInit(): void {
    this.remainingSeconds.set(this.initialSeconds());
    this.startTimer();

    this.destroyRef.onDestroy(() => {
      this.stopTimer();
    });
  }

  private startTimer(): void {
    this.timerInterval = setInterval(() => {
      this.remainingSeconds.update((s) => {
        if (s <= 1) {
          this.stopTimer();
          this.submitExam();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  hasAnswer(qId: number): boolean {
    return this.answersMap().has(qId);
  }

  getSelectedAnswer(qId: number): string | undefined {
    return this.answersMap().get(qId);
  }

  selectAnswer(qId: number, label: string): void {
    const current = new Map(this.answersMap());
    current.set(qId, label);
    this.answersMap.set(current);
  }

  goToQuestion(idx: number): void {
    if (idx >= 0 && idx < this.questions().length) {
      this.currentIndex.set(idx);
    }
  }

  prevQuestion(): void {
    this.goToQuestion(this.currentIndex() - 1);
  }

  nextQuestion(): void {
    this.goToQuestion(this.currentIndex() + 1);
  }

  confirmFinish(): void {
    const unanswered = this.questions().length - this.answersMap().size;
    if (unanswered > 0) {
      const confirmAction = confirm(
        `Tienes ${unanswered} pregunta(s) sin responder. ¿Estás seguro de que deseas finalizar el examen ahora?`
      );
      if (!confirmAction) return;
    }
    this.submitExam();
  }

  private submitExam(): void {
    this.stopTimer();
    const timeSpent = this.initialSeconds() - this.remainingSeconds();
    this.finishExam.emit({
      userAnswers: this.answersMap(),
      timeSpentSeconds: timeSpent,
    });
  }
}

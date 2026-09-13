import { Component, computed, input, output, signal } from '@angular/core';
import { ButtonDirective } from '@common/components/button/button';
import { MockExamResult } from '../../domain/models';

@Component({
  selector: 'app-exam-result',
  standalone: true,
  imports: [ButtonDirective],
  templateUrl: './exam-result.html',
  styleUrl: './exam-result.css',
})
export class ExamResultComponent {
  readonly result = input.required<MockExamResult>();
  readonly restart = output<void>();

  readonly filterMode = signal<'all' | 'incorrect'>('all');

  readonly formattedTimeSpent = computed(() => {
    const sec = this.result().timeSpentSeconds;
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}m ${secs}s`;
  });

  readonly userAnswersMap = computed(() => {
    const map = new Map<number, string>();
    for (const ans of this.result().userAnswers) {
      map.set(ans.questionId, ans.selectedLabel);
    }
    return map;
  });

  readonly incorrectCount = computed(() => {
    return this.result().totalQuestions - this.result().correctAnswersCount;
  });

  readonly filteredQuestions = computed(() => {
    const mode = this.filterMode();
    const all = this.result().questions;
    const ansMap = this.userAnswersMap();

    if (mode === 'incorrect') {
      return all.filter((q) => ansMap.get(q.id) !== q.correctLabel);
    }
    return all;
  });

  getUserAnswer(qId: number): string | undefined {
    return this.userAnswersMap().get(qId);
  }

  setFilter(mode: 'all' | 'incorrect'): void {
    this.filterMode.set(mode);
  }

  onRestart(): void {
    this.restart.emit();
  }
}

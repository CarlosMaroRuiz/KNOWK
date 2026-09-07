import { Component, computed, input, output } from '@angular/core';
import { ButtonDirective } from '@common/components/button';

@Component({
  selector: 'app-reading-result',
  standalone: true,
  imports: [ButtonDirective],
  templateUrl: './reading-result.html',
  styleUrl: './reading-result.css',
})
export class ReadingResult {
  readonly correctAnswers = input.required<number>();
  readonly totalQuestions = input.required<number>();
  readonly restart = output<void>();
  readonly backToCatalog = output<void>();

  readonly percentage = computed(() =>
    Math.round((this.correctAnswers() / this.totalQuestions()) * 100),
  );

  readonly isPerfect = computed(() => this.correctAnswers() === this.totalQuestions());
  readonly confettiPieces = Array.from({ length: 28 });

}

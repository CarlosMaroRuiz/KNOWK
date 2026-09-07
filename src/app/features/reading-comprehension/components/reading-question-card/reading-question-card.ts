import { Component, input, output } from '@angular/core';
import { ButtonDirective } from '@common/components/button';
import { ReadingQuestion } from '../../domain/models';

@Component({
  selector: 'app-reading-question-card',
  standalone: true,
  imports: [ButtonDirective],
  templateUrl: './reading-question-card.html',
  styleUrl: './reading-question-card.css',
})
export class ReadingQuestionCard {
  readonly question = input.required<ReadingQuestion>();
  readonly selectedLabel = input<string | undefined>();
  readonly index = input.required<number>();
  readonly optionSelected = output<string>();
}

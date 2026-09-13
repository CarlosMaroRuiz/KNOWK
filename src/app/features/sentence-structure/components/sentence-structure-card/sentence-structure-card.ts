import { Component, input, output } from '@angular/core';
import { ButtonDirective } from '@common/components/button';
import { SentenceStructureQuestion } from '../../domain/models';

@Component({
  selector: 'app-sentence-structure-card',
  standalone: true,
  imports: [ButtonDirective],
  templateUrl: './sentence-structure-card.html',
  styleUrl: './sentence-structure-card.css',
})
export class SentenceStructureCardComponent {
  readonly question = input.required<SentenceStructureQuestion>();
  readonly selectedAnswer = input<string | undefined>(undefined);
  readonly optionSelected = output<string>();

  protected selectOption(label: string): void {
    if (!this.selectedAnswer()) {
      this.optionSelected.emit(label);
    }
  }
}

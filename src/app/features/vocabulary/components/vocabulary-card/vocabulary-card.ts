import { Component, input, output } from '@angular/core';
import { ButtonDirective } from '@common/components/button';
import { VocabularyWord } from '../../domain/models';

@Component({
  selector: 'app-vocabulary-card',
  standalone: true,
  imports: [ButtonDirective],
  templateUrl: './vocabulary-card.html',
  styleUrl: './vocabulary-card.css',
})
export class VocabularyCardComponent {
  readonly word = input.required<VocabularyWord>();
  readonly isFlipped = input<boolean>(false);
  readonly status = input<'learned' | 'review' | undefined>(undefined);

  readonly toggleFlip = output<void>();
  readonly markStatus = output<'learned' | 'review'>();

  protected onFlip(): void {
    this.toggleFlip.emit();
  }

  protected setStatus(newStatus: 'learned' | 'review', event: Event): void {
    event.stopPropagation();
    this.markStatus.emit(newStatus);
  }
}

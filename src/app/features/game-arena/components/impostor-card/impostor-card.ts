import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CircleCheck, CircleX, LucideAngularModule } from 'lucide-angular';
import { GameQuestion } from '../../domain/models';

@Component({
  selector: 'app-impostor-card',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './impostor-card.html',
  styleUrl: './impostor-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImpostorCardComponent {
  readonly question = input.required<GameQuestion>();
  readonly answered = input<boolean>(false);

  readonly optionSelected = output<string>();

  readonly CircleCheck = CircleCheck;
  readonly CircleX = CircleX;

  protected readonly isRevealed = computed(() => this.answered());

  protected optionClass(option: string): string {
    if (!this.answered()) return '';
    return option === this.question().impostor ? 'is-impostor' : 'is-discarded';
  }

  protected onSelect(option: string): void {
    if (this.answered()) return;
    this.optionSelected.emit(option);
  }
}

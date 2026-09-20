import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonDirective } from '@common/components/button';
import { LucideAngularModule, RotateCcw, Trophy } from 'lucide-angular';

@Component({
  selector: 'app-game-result',
  standalone: true,
  imports: [ButtonDirective, LucideAngularModule],
  templateUrl: './game-result.html',
  styleUrl: './game-result.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameResultComponent {
  readonly score = input.required<number>();
  readonly maxStreak = input.required<number>();
  readonly bestScore = input.required<number>();
  readonly isNewRecord = input.required<boolean>();

  readonly playAgain = output<void>();

  readonly Trophy = Trophy;
  readonly RotateCcw = RotateCcw;

  protected onPlayAgain(): void {
    this.playAgain.emit();
  }
}

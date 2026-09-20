import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Award, Flame, LucideAngularModule, Target } from 'lucide-angular';

@Component({
  selector: 'app-game-scoreboard',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './game-scoreboard.html',
  styleUrl: './game-scoreboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameScoreboardComponent {
  readonly score = input.required<number>();
  readonly streak = input.required<number>();
  readonly bestStreak = input.required<number>();
  readonly progress = input.required<string>();

  readonly Target = Target;
  readonly Flame = Flame;
  readonly Award = Award;
}

import { Component, computed, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ButtonDirective } from '@common/components/button';
import { ErrorStateComponent } from '@common/components/error-state';
import { SkeletonComponent } from '@common/components/skeleton';
import { Level, LEVELS } from '@common/models';
import { GameResultComponent } from './components/game-result/game-result';
import { GameScoreboardComponent } from './components/game-scoreboard/game-scoreboard';
import { ImpostorCardComponent } from './components/impostor-card/impostor-card';
import { GameQuestion, GameSet } from './domain/models';
import { GameArenaUseCase } from './domain/usecases/game-arena.use-case';
import { provideGameArena } from './providers/game-arena.providers';
import { GAME_CONFIG,GamePhase } from './utils/constants';

@Component({
  selector: 'app-game-arena',
  standalone: true,
  imports: [
    ButtonDirective,
    SkeletonComponent,
    ErrorStateComponent,
    GameScoreboardComponent,
    ImpostorCardComponent,
    GameResultComponent,
  ],
  templateUrl: './game-arena.html',
  styleUrl: './game-arena.css',
  providers: [provideGameArena()],
})
export class GameArena {
  private readonly useCase = inject(GameArenaUseCase);

  protected readonly levels: readonly Level[] = LEVELS;
  protected readonly selectLevel = signal<Level>('A2');

  protected readonly phase = signal<GamePhase>('loading');
  protected readonly currentIndex = signal(0);
  protected readonly score = signal(0);
  protected readonly streak = signal(0);
  protected readonly maxStreak = signal(0);
  protected readonly answered = signal(false);
  protected readonly bestScore = signal(this.readRecord());

  protected readonly setsResource = rxResource<GameSet[], Level>({
    params: () => this.selectLevel(),
    stream: ({ params }) => this.useCase.getSet(GAME_CONFIG.ID, params),
  });

  protected readonly questions = computed<GameQuestion[]>(
    () => this.setsResource.value()?.[0]?.questions ?? [],
  );

  protected readonly currentQuestion = computed<GameQuestion | null>(
    () => this.questions()[this.currentIndex()] ?? null,
  );

  protected readonly progressLabel = computed(
    () => `${this.currentIndex() + 1} / ${this.questions().length}`,
  );

  protected readonly isNewRecord = computed(
    () => this.score() > 0 && this.score() >= this.bestScore(),
  );

  constructor() {
    // Cuando el set termina de cargar, la ronda arranca sola.
    effect(() => {
      if (this.setsResource.hasValue()) {
        this.startRound();
      }
    });
  }

  protected changeLevel(level: Level): void {
    this.phase.set('loading');
    this.selectLevel.set(level);
  }

  protected answer(option: string): void {
    const question = this.currentQuestion();
    if (!question || this.answered()) return;

    this.answered.set(true);

    if (option === question.impostor) {
      this.score.update((value) => value + GAME_CONFIG.POINTS_PER_HIT);
      this.streak.update((value) => value + 1);
      this.maxStreak.update((value) => Math.max(value, this.streak()));
    } else {
      this.streak.set(0);
    }
  }

  protected next(): void {
    if (this.currentIndex() + 1 >= this.questions().length) {
      this.finishRound();
      return;
    }

    this.currentIndex.update((index) => index + 1);
    this.answered.set(false);
  }

  protected playAgain(): void {
    this.startRound();
  }

  protected retryFetch(): void {
    this.setsResource.reload();
  }

  private startRound(): void {
    this.currentIndex.set(0);
    this.score.set(0);
    this.streak.set(0);
    this.maxStreak.set(0);
    this.answered.set(false);
    this.phase.set('playing');
  }

  private finishRound(): void {
    const finalScore = this.score();
    if (finalScore > this.bestScore()) {
      this.bestScore.set(finalScore);
      this.writeRecord(finalScore);
    }
    this.phase.set('finished');
  }

  private readRecord(): number {
    const stored = localStorage.getItem(GAME_CONFIG.RECORD_STORAGE_KEY);
    return stored ? Number(stored) : 0;
  }

  private writeRecord(score: number): void {
    localStorage.setItem(GAME_CONFIG.RECORD_STORAGE_KEY, String(score));
  }
}

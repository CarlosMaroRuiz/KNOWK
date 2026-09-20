import { Provider } from '@angular/core';
import { GameArenaHttpRepository } from '../data/repositories/game-arena-http.repository';
import { GameArenaRepository } from '../domain/repository/game-arena.repository';
import { GameArenaUseCase } from '../domain/usecases/game-arena.use-case';

export const provideGameArena = (): Provider[] => [
  GameArenaUseCase,
  GameArenaHttpRepository,
  {
    provide: GameArenaRepository,
    useExisting: GameArenaHttpRepository,
  },
];

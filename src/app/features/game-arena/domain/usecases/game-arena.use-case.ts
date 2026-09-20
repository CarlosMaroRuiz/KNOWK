import { Injectable, inject } from '@angular/core';
import { Level } from '@common/models';
import { Observable } from 'rxjs';
import { GameSet } from '../models';
import { GameArenaRepository } from '../repository/game-arena.repository';

@Injectable()
export class GameArenaUseCase {
  private readonly repository = inject(GameArenaRepository);

  getSet(gameId: string, level: Level): Observable<GameSet[]> {
    return this.repository.fetchSet(gameId, level);
  }
}

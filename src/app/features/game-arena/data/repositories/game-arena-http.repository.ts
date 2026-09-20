import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Level } from '@common/models';
import { Observable } from 'rxjs';
import { GameSet } from '../../domain/models';
import { GameArenaRepository } from '../../domain/repository/game-arena.repository';

@Injectable()
export class GameArenaHttpRepository implements GameArenaRepository {
  private readonly http = inject(HttpClient);

  fetchSet(_gameId: string, level: Level): Observable<GameSet[]> {
    return this.http.get<GameSet[]>(`/api/games/${level.toLowerCase()}.json`);
  }
}

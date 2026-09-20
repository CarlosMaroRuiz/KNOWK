import { Level } from '@common/models';
import { Observable } from 'rxjs';
import { GameSet } from '../models';

export abstract class GameArenaRepository {
  abstract fetchSet(gameId: string, level: Level): Observable<GameSet[]>;
}

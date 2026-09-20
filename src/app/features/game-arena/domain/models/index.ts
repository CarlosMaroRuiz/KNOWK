import { Level } from '@common/models';

export type GameId = 'odd-one-out' | 'word-rush';

export type ImpostorCriterion =
  | 'partOfSpeech'
  | 'synonym'
  | 'tense'
  | 'role'
  | 'category';

export interface GameQuestion {
  id: string;
  prompt: string;
  criterion: ImpostorCriterion;
  options: string[];
  impostor: string;
  explanation: string;
}

export interface GameSet {
  id: string;
  gameId: GameId;
  level: Level;
  title: string;
  questions: GameQuestion[];
}

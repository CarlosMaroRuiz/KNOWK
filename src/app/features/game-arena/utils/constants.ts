export const GAME_CONFIG = {
  ID: 'odd-one-out',
  POINTS_PER_HIT: 10,
  RECORD_STORAGE_KEY: 'knowk_game_record_odd-one-out',
} as const;

export type GamePhase = 'loading' | 'playing' | 'finished';

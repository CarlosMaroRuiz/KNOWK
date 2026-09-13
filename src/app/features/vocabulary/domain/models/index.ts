import { Level } from '@common/models';

export interface VocabularyWord {
  id: string;
  word: string;
  partOfSpeech: string;
  phonetic: string;
  definition: string;
  exampleSentence: string;
  synonyms: string[];
  level: Level;
}


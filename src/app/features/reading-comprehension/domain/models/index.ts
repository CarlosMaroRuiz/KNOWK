export interface ReadingQuestion {
  id: number;
  prompt: string;
  options: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
}

export interface Book {
  id: string;
  title: string;
  level: string;
  coverImage: string;
  wordCount: number;
  text: string;
  questions: ReadingQuestion[];
}

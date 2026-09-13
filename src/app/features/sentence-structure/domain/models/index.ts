export interface Option {
  label: string;
  text: string;
}

export interface SentenceStructureQuestion {
  id: number;
  prompt: string;
  options: Option[];
  correctLabel: string;
  explanation: string;
  category: string;
}

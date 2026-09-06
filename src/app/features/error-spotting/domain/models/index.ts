export interface Option {
  label: string;
  text: string;
}

export interface Question {
  id: number;
  category: string;
  full_sentence: string;
  options: Option[];
  correct_label: string;
  correction: string;
  explanation: string;
}
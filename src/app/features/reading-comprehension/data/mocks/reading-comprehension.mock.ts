import { ReadingQuestion } from '../../domain/models';

export function createQuestion(
  id: number,
  prompt: string,
  options: { label: string; text: string }[],
  correctLabel: string,
  explanation: string,
): ReadingQuestion {
  return { id, prompt, options, correctLabel, explanation };
}

export function createBook(
  id: string,
  title: string,
  level: string,
  coverImage: string,
  text: string,
  questions: ReadingQuestion[],
) {
  return {
    id,
    title,
    level,
    coverImage,
    wordCount: text.trim().split(/\s+/).length,
    text,
    questions,
  };
}

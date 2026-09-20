/**
 * Utilidades de puntuacion y conteo de aciertos.
 */

/** Porcentaje (0-100) con guarda contra division por cero. */
export function percentage(correct: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((correct / total) * 100);
}

/**
 * Cuenta los aciertos comparando las respuestas con la etiqueta correcta.
 * Acepta un extractor opcional para modelos cuyo campo correcto no se llama `correctLabel`
 * (ej. `error-spotting` usa `correct_label`).
 */
export function countCorrect<T>(
  questions: readonly T[],
  answers: Record<number, string>,
  getCorrectLabel: (question: T) => string = (q) => (q as { correctLabel: string }).correctLabel,
): number {
  return questions.filter(
    (question) => answers[(question as { id: number }).id] === getCorrectLabel(question),
  ).length;
}


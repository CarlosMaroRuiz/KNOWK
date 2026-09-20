/**
 * Utilidades de progreso.
 * Fuente unica de verdad para los calculos de avance repetidos en varias features.
 */

/** Porcentaje de avance (0-100) segun el indice actual y el total. */
export function calcProgress(index: number, total: number): number {
  if (total <= 0) return 0;
  const clamped = Math.max(0, Math.min(total - 1, index));
  return Math.round(((clamped + 1) / total) * 100);
}

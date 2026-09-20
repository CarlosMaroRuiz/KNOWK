/**
 * Utilidades de navegacion entre elementos de una lista.
 */

/** Indice anterior sin salir del rango inferior. */
export function prevIndex(index: number): number {
  return Math.max(0, index - 1);
}

/** Indice siguiente sin salir del rango superior. */
export function nextIndex(index: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(total - 1, index + 1);
}

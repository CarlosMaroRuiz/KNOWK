import { Injectable, signal } from '@angular/core';

const THEME_STORAGE_KEY = 'knowk_theme';
const DARK_THEME_ATTR = 'data-theme';
const DARK_THEME_VALUE = 'dark';

/**
 * Unica fuente de verdad para el tema (claro/oscuro).
 * Reemplaza las copias duplicadas que habia en index.ts y main-layout.ts.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDarkMode = signal<boolean>(this.readInitial());

  toggle(): void {
    this.set(!this.isDarkMode());
  }

  set(dark: boolean): void {
    this.isDarkMode.set(dark);
    this.apply(dark);
  }

  private readInitial(): boolean {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === DARK_THEME_VALUE) return true;
    if (stored === 'light') return false;

    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemDark;
  }

  private apply(dark: boolean): void {
    if (dark) {
      document.documentElement.setAttribute(DARK_THEME_ATTR, DARK_THEME_VALUE);
      localStorage.setItem(THEME_STORAGE_KEY, DARK_THEME_VALUE);
    } else {
      document.documentElement.removeAttribute(DARK_THEME_ATTR);
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
    }
  }
}

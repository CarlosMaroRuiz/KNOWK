import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonDirective, IconButtonDirective } from '@common/components/button';
import { APP_ROUTES } from '@core/routes/routes.config';
import { ArrowLeft, LucideAngularModule, Moon, Sun } from 'lucide-angular';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [
    ButtonDirective,
    IconButtonDirective,
    RouterOutlet,
    RouterLink,
    LucideAngularModule,
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  private readonly route = inject(ActivatedRoute);

  readonly title = computed(() => {
    let currentRoute: ActivatedRoute | null = this.route;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    return currentRoute.snapshot.data['title'] || APP_ROUTES.INDEX.title;
  });

  protected readonly isDarkMode = signal<boolean>(false);

  readonly ArrowLeft = ArrowLeft;
  readonly Sun = Sun;
  readonly Moon = Moon;

  constructor() {
    this.initTheme();

    effect(() => {
      const dark = this.isDarkMode();
      if (dark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('toefl_theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('toefl_theme', 'light');
      }
    });
  }

  private initTheme(): void {
    const savedTheme = localStorage.getItem('toefl_theme');
    if (savedTheme === 'dark') {
      this.isDarkMode.set(true);
    } else if (savedTheme === 'light') {
      this.isDarkMode.set(false);
    } else {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.set(systemDark);
    }
  }

  protected toggleDarkMode(): void {
    this.isDarkMode.update((prev) => !prev);
  }
}

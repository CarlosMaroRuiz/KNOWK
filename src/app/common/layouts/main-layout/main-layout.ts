import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonDirective, IconButtonDirective } from '@common/components/button';
import { APP_ROUTES } from '@core/routes/routes.config';
import { ThemeService } from '@core/theme';
import { ArrowLeft, BookOpen, LucideAngularModule, Moon, Sun } from 'lucide-angular';

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
  private readonly themeService = inject(ThemeService);

  protected readonly routes = APP_ROUTES;

  readonly title = computed(() => {
    let currentRoute: ActivatedRoute | null = this.route;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    return currentRoute.snapshot.data['title'] || APP_ROUTES.INDEX.title;
  });

  protected readonly isDarkMode = this.themeService.isDarkMode;

  readonly ArrowLeft = ArrowLeft;
  readonly BookOpen = BookOpen;
  readonly Sun = Sun;
  readonly Moon = Moon;

  protected toggleDarkMode(): void {
    this.themeService.toggle();
  }
}

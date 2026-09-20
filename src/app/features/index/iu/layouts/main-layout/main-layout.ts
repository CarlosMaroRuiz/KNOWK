import { Component,inject } from '@angular/core';
import { ThemeService } from '@core/theme';
import { LucideAngularModule,Moon,
    Sun, } from 'lucide-angular';
@Component({
  selector: 'index-layout',
  imports: [LucideAngularModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  private readonly themeService = inject(ThemeService);
  protected readonly isDarkMode = this.themeService.isDarkMode;
  readonly Moon = Moon;
  readonly Sun = Sun;

    protected toggleTheme(): void {
    this.themeService.toggle();
  }
}

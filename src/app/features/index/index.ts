import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CatalogCard } from '../index/components/catalog-card/catalog-card';
import { CatalogItem } from '../index/domain/models';
import { CATALOG_ITEMS } from './data/';
import { LucideAngularModule, Moon, Sun, BookOpenText } from 'lucide-angular';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CatalogCard, LucideAngularModule],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  readonly catalogItems: CatalogItem[] = CATALOG_ITEMS;
  readonly availableItems = this.catalogItems.filter((item) => item.available);
  readonly upcomingItems = this.catalogItems.filter((item) => !item.available);

  readonly stats = [
    { label: 'Categorías', value: this.catalogItems.length, tone: 'is-total' },
    { label: 'Disponibles', value: this.availableItems.length, tone: 'is-available' },
    { label: 'Próximamente', value: this.upcomingItems.length, tone: 'is-upcoming' },
  ];

  // Iconos para el Navbar
  readonly Moon = Moon;
  readonly Sun = Sun;
  readonly BookOpenText = BookOpenText;

  private platformId = inject(PLATFORM_ID);
  readonly isDarkMode = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark') {
        this.isDarkMode.set(true);
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    }
  }

  toggleTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const isDark = !this.isDarkMode();
    this.isDarkMode.set(isDark);
    
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}
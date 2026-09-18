import { Component, ChangeDetectionStrategy, OnInit, inject, signal, computed } from '@angular/core';
import { ButtonDirective } from '@common/components/button';
import { LucideAngularModule, BookOpenText, Search, Sparkles } from 'lucide-angular';
import { GetResourcesUseCase } from './domain/usecases/get-resources.usecase';
import { ResourceCategory, ResourceItem } from './domain/models/resource.model';
import { ResourceCardComponent } from './components/resource-card/resource-card';
import { ResourceDetailModalComponent } from './components/resource-detail-modal/resource-detail-modal';
import { provideResources } from './providers/resources.providers';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [ButtonDirective, LucideAngularModule, ResourceCardComponent, ResourceDetailModalComponent],
  providers: [provideResources()],
  templateUrl: './resources.html',
  styleUrl: './resources.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Resources implements OnInit {
  private readonly getResourcesUseCase = inject(GetResourcesUseCase);

  readonly BookOpenText = BookOpenText;
  readonly Search = Search;
  readonly Sparkles = Sparkles;

  readonly allItems = signal<ResourceItem[]>([]);
  readonly activeCategory = signal<ResourceCategory | 'all'>('all');
  readonly searchQuery = signal<string>('');
  readonly selectedItem = signal<ResourceItem | null>(null);

  readonly filteredItems = computed(() => {
    const category = this.activeCategory();
    const query = this.searchQuery().toLowerCase().trim();

    return this.allItems().filter((item) => {
      const matchesCategory = category === 'all' || item.category === category;
      const matchesSearch =
        query === '' ||
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  });

  async ngOnInit(): Promise<void> {
    const items = await this.getResourcesUseCase.execute();
    this.allItems.set(items);
  }

  setCategory(category: ResourceCategory | 'all'): void {
    this.activeCategory.set(category);
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  openDetail(item: ResourceItem): void {
    this.selectedItem.set(item);
  }

  closeDetail(): void {
    this.selectedItem.set(null);
  }
}

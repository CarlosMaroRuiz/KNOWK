import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Level } from '@common/models';
import { ContentModuleType, ManagedItem } from '../../domain/models';
import { ContentManagerRepository } from '../../domain/repository/content-manager.repository';

@Injectable()
export class ContentManagerLocalRepository implements ContentManagerRepository {
  private readonly http = inject(HttpClient);

  fetchItems(moduleType: ContentModuleType, level: Level): Observable<ManagedItem[]> {
    const jsonPath = `/api/${moduleType}/${level.toLowerCase()}.json`;

    return this.http.get<unknown[]>(jsonPath).pipe(
      map((rawList) => {
        const defaultItems: ManagedItem[] = rawList.map((raw, idx) =>
          this.mapRawToManaged(raw, moduleType, level, idx)
        );

        const customItems = this.getCustomItemsFromStorage(moduleType, level);
        return [...defaultItems, ...customItems];
      })
    );
  }

  addItem(moduleType: ContentModuleType, item: ManagedItem): Observable<ManagedItem> {
    const existing = this.getCustomItemsFromStorage(moduleType, item.level);
    existing.push(item);
    this.saveCustomItemsToStorage(moduleType, item.level, existing);
    return of(item);
  }

  deleteItem(moduleType: ContentModuleType, itemId: string | number): Observable<boolean> {
    const levels: Level[] = ['A2', 'B1', 'B2'];
    for (const lvl of levels) {
      const custom = this.getCustomItemsFromStorage(moduleType, lvl);
      const filtered = custom.filter((i) => i.id !== itemId);
      if (filtered.length !== custom.length) {
        this.saveCustomItemsToStorage(moduleType, lvl, filtered);
        return of(true);
      }
    }
    return of(false);
  }

  private getCustomItemsFromStorage(moduleType: ContentModuleType, level: Level): ManagedItem[] {
    const key = `cm_custom_${moduleType}_${level}`;
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as ManagedItem[];
    } catch {
      return [];
    }
  }

  private saveCustomItemsToStorage(moduleType: ContentModuleType, level: Level, items: ManagedItem[]): void {
    const key = `cm_custom_${moduleType}_${level}`;
    localStorage.setItem(key, JSON.stringify(items));
  }

  private mapRawToManaged(
    raw: unknown,
    moduleType: ContentModuleType,
    level: Level,
    idx: number
  ): ManagedItem {
    const r = raw as Record<string, unknown>;

    let titleOrPrompt = `Item #${idx + 1}`;
    let categoryOrDefinition = 'General';

    if (moduleType === 'vocabulary') {
      titleOrPrompt = (r['word'] as string) || (r['term'] as string) || titleOrPrompt;
      categoryOrDefinition = (r['definition'] as string) || categoryOrDefinition;
    } else if (moduleType === 'sentence-structure') {
      titleOrPrompt = (r['prompt'] as string) || titleOrPrompt;
      categoryOrDefinition = (r['category'] as string) || categoryOrDefinition;
    } else if (moduleType === 'error-spotting') {
      titleOrPrompt = (r['full_sentence'] as string) || (r['fullSentence'] as string) || titleOrPrompt;
      categoryOrDefinition = (r['category'] as string) || categoryOrDefinition;
    } else if (moduleType === 'reading-comprehension') {
      titleOrPrompt = (r['title'] as string) || titleOrPrompt;
      categoryOrDefinition = `${(r['questions'] as unknown[])?.length ?? 0} preguntas`;
    } else if (moduleType === 'grammar-review') {
      titleOrPrompt = (r['title'] as string) || titleOrPrompt;
      categoryOrDefinition = (r['topic'] as string) || (r['summary'] as string) || categoryOrDefinition;
    }

    return {
      id: (r['id'] as string | number) ?? `item-${idx + 1}`,
      level,
      titleOrPrompt,
      categoryOrDefinition,
      rawPayload: r,
      createdAt: new Date().toISOString().split('T')[0],
    };
  }
}

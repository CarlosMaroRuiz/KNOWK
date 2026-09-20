import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Level, LEVELS } from '@common/models';
import { map, Observable, of } from 'rxjs';
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
    const levels: readonly Level[] = LEVELS;
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

  private readonly moduleExtractors: Record<
    ContentModuleType,
    (r: Record<string, unknown>, defaultTitle: string, defaultCategory: string) => { titleOrPrompt: string; categoryOrDefinition: string }
  > = {
    'vocabulary': (r, defaultTitle, defaultCategory) => ({
      titleOrPrompt: (r['word'] as string) || (r['term'] as string) || defaultTitle,
      categoryOrDefinition: (r['definition'] as string) || defaultCategory,
    }),
    'sentence-structure': (r, defaultTitle, defaultCategory) => ({
      titleOrPrompt: (r['prompt'] as string) || defaultTitle,
      categoryOrDefinition: (r['category'] as string) || defaultCategory,
    }),
    'error-spotting': (r, defaultTitle, defaultCategory) => ({
      titleOrPrompt: (r['full_sentence'] as string) || (r['fullSentence'] as string) || defaultTitle,
      categoryOrDefinition: (r['category'] as string) || defaultCategory,
    }),
    'reading-comprehension': (r, defaultTitle, defaultCategory) => ({
      titleOrPrompt: (r['title'] as string) || defaultTitle,
      categoryOrDefinition: `${(r['questions'] as unknown[])?.length ?? 0} preguntas`,
    }),
    'grammar-review': (r, defaultTitle, defaultCategory) => ({
      titleOrPrompt: (r['title'] as string) || defaultTitle,
      categoryOrDefinition: (r['topic'] as string) || (r['summary'] as string) || defaultCategory,
    }),
  };

  private extractMetadataByModule(
    r: Record<string, unknown>,
    moduleType: ContentModuleType,
    defaultTitle: string,
    defaultCategory: string
  ): { titleOrPrompt: string; categoryOrDefinition: string } {
    const extractor = this.moduleExtractors[moduleType];
    if (!extractor) {
      return { titleOrPrompt: defaultTitle, categoryOrDefinition: defaultCategory };
    }
    return extractor(r, defaultTitle, defaultCategory);
  }

  private mapRawToManaged(
    raw: unknown,
    moduleType: ContentModuleType,
    level: Level,
    idx: number
  ): ManagedItem {
    const r = raw as Record<string, unknown>;
    const defaultTitle = `Item #${idx + 1}`;
    const defaultCategory = 'General';

    const { titleOrPrompt, categoryOrDefinition } = this.extractMetadataByModule(
      r,
      moduleType,
      defaultTitle,
      defaultCategory
    );

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

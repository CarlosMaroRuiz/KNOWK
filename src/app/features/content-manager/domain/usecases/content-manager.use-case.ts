import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Level } from '@common/models';
import { ContentModuleType, ManagedItem } from '../models';
import { ContentManagerRepository } from '../repository/content-manager.repository';

@Injectable()
export class ContentManagerUseCase {
  private readonly repository = inject(ContentManagerRepository);

  getItems(moduleType: ContentModuleType, level: Level): Observable<ManagedItem[]> {
    return this.repository.fetchItems(moduleType, level);
  }

  saveItem(moduleType: ContentModuleType, item: ManagedItem): Observable<ManagedItem> {
    return this.repository.addItem(moduleType, item);
  }

  removeItem(moduleType: ContentModuleType, itemId: string | number): Observable<boolean> {
    return this.repository.deleteItem(moduleType, itemId);
  }

  exportAsJson(items: ManagedItem[]): string {
    const rawList = items.map((i) => i.rawPayload);
    return JSON.stringify(rawList, null, 2);
  }
}

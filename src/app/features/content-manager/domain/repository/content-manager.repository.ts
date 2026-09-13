import { Observable } from 'rxjs';
import { Level } from '@common/models';
import { ContentModuleType, ManagedItem } from '../models';

export abstract class ContentManagerRepository {
  abstract fetchItems(moduleType: ContentModuleType, level: Level): Observable<ManagedItem[]>;
  abstract addItem(moduleType: ContentModuleType, item: ManagedItem): Observable<ManagedItem>;
  abstract deleteItem(moduleType: ContentModuleType, itemId: string | number): Observable<boolean>;
}

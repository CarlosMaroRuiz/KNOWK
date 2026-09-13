import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Level } from '@common/models';
import { SkeletonComponent } from '@common/components/skeleton/skeleton';
import { ErrorStateComponent } from '@common/components/error-state/error-state';
import { provideContentManager } from './providers/content-manager.providers';
import { ContentManagerUseCase } from './domain/usecases/content-manager.use-case';
import { ContentModuleType, ManagedItem } from './domain/models';
import { ModuleSelectorComponent } from './components/module-selector/module-selector';
import { ContentListComponent } from './components/content-list/content-list';
import { ContentFormComponent } from './components/content-form/content-form';

type ManagerView = 'list' | 'form';

@Component({
  selector: 'app-content-manager',
  standalone: true,
  providers: [provideContentManager()],
  imports: [
    SkeletonComponent,
    ErrorStateComponent,
    ModuleSelectorComponent,
    ContentListComponent,
    ContentFormComponent,
  ],
  templateUrl: './content-manager.html',
  styleUrl: './content-manager.css',
})
export class ContentManager {
  private readonly useCase = inject(ContentManagerUseCase);

  readonly activeModule = signal<ContentModuleType>('vocabulary');
  readonly activeLevel = signal<Level>('B1');
  readonly currentView = signal<ManagerView>('list');

  readonly itemsResource = rxResource<ManagedItem[], { mod: ContentModuleType; lvl: Level }>({
    params: () => ({ mod: this.activeModule(), lvl: this.activeLevel() }),
    stream: ({ params }) => this.useCase.getItems(params.mod, params.lvl),
  });

  handleModuleSelected(mod: ContentModuleType): void {
    this.activeModule.set(mod);
    this.currentView.set('list');
  }

  handleLevelChange(lvl: Level): void {
    this.activeLevel.set(lvl);
  }

  openForm(): void {
    this.currentView.set('form');
  }

  closeForm(): void {
    this.currentView.set('list');
  }

  handleSaveItem(item: ManagedItem): void {
    this.useCase.saveItem(this.activeModule(), item).subscribe(() => {
      this.itemsResource.reload();
      this.currentView.set('list');
    });
  }

  handleDeleteItem(id: string | number): void {
    this.useCase.removeItem(this.activeModule(), id).subscribe(() => {
      this.itemsResource.reload();
    });
  }

  handleExportJson(items: ManagedItem[]): void {
    const jsonStr = this.useCase.exportAsJson(items);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.activeModule()}-${this.activeLevel().toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

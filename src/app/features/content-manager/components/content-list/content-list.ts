import { Component, input, output, signal } from '@angular/core';
import { Level } from '@common/models';
import { ButtonDirective } from '@common/components/button/button';
import { ContentModuleType, ManagedItem } from '../../domain/models';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [ButtonDirective],
  templateUrl: './content-list.html',
  styleUrl: './content-list.css',
})
export class ContentListComponent {
  readonly items = input.required<ManagedItem[]>();
  readonly currentModule = input.required<ContentModuleType>();

  readonly levelChange = output<Level>();
  readonly addNew = output<void>();
  readonly exportJson = output<void>();
  readonly deleteItem = output<string | number>();

  readonly levels: Level[] = ['A2', 'B1', 'B2'];
  readonly selectedLevel = signal<Level>('B1');

  selectLevel(lvl: Level): void {
    this.selectedLevel.set(lvl);
    this.levelChange.emit(lvl);
  }

  onAddNew(): void {
    this.addNew.emit();
  }

  onExportJson(): void {
    this.exportJson.emit();
  }

  onDelete(id: string | number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
      this.deleteItem.emit(id);
    }
  }
}

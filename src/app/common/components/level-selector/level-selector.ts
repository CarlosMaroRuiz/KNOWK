import { Component, input, model } from '@angular/core';
import { Level, LEVELS } from '@common/models';

/**
 * Selector de nivel reutilizable (A1-B2).
 * Usa two-way binding con model() para sincronizar el nivel con el padre.
 *
 * Uso:
 *   <app-level-selector [(level)]="selectLevel" />
 */
@Component({
  selector: 'app-level-selector',
  standalone: true,
  imports: [],
  templateUrl: './level-selector.html',
  styleUrl: './level-selector.css',
})
export class LevelSelectorComponent {
  readonly level = model.required<Level>();
  readonly levels = input<readonly Level[]>(LEVELS);

  protected onSelect(value: Level): void {
    this.level.set(value);
  }
}

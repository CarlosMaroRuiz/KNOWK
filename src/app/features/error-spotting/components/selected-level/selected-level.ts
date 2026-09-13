import { Component, model } from '@angular/core';
import { Level } from '@common/models';

@Component({
  selector: 'app-selected-level',
  standalone: true,
  imports: [],
  templateUrl: './selected-level.html',
  styleUrl: './selected-level.css',
})
export class SelectedLevel {
  selectedLevel = model.required<Level>();

  readonly levels: readonly Level[] = ['A2', 'B1', 'B2'];

  onSelect(level: Level): void {
    this.selectedLevel.set(level);
  }
}
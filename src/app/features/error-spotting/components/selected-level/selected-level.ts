import { Component, model } from '@angular/core';

@Component({
  selector: 'app-selected-level',
  standalone: true,
  imports: [],
  templateUrl: './selected-level.html',
  styleUrl: './selected-level.css',
})
export class SelectedLevel {
  selectedLevel = model.required<string>();

  readonly levels: readonly string[] = ['A2', 'B1', 'B2'];

  onSelect(level: string): void {
    this.selectedLevel.set(level);
  }
}
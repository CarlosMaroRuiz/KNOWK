import { Component, input,model } from '@angular/core';
import { Level } from '@common/models';

@Component({
  selector: 'level-layout',
  imports: [],
  templateUrl: './level-layout.html',
  styleUrl: './level-layout.css',
})
export class LevelLayout {

  levels = input.required<Level[]>();
  title = input.required<string>();
  subtitle = input.required<string>();
  selectLevel = model.required<Level>();

  changeLevel(level: Level): void {
    this.selectLevel.set(level);
  }
}

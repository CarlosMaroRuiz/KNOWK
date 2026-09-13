import { Component, output, signal } from '@angular/core';
import { Level } from '@common/models';
import { ButtonDirective } from '@common/components/button/button';

@Component({
  selector: 'app-exam-setup',
  standalone: true,
  imports: [ButtonDirective],
  templateUrl: './exam-setup.html',
  styleUrl: './exam-setup.css',
})
export class ExamSetupComponent {
  readonly levels: Level[] = ['A2', 'B1', 'B2'];
  readonly selectedLevel = signal<Level>('B1');
  readonly startExam = output<{ level: Level }>();

  selectLevel(level: Level): void {
    this.selectedLevel.set(level);
  }

  onStart(): void {
    this.startExam.emit({ level: this.selectedLevel() });
  }
}

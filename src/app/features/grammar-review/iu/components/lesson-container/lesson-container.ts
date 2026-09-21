import { Component, input, output, signal } from '@angular/core';
import { ButtonDirective } from '@common/components/button';
import { GrammarTopic } from '@features/grammar-review/domain/models';

@Component({
  selector: 'app-lesson-container',
  standalone: true,
  imports: [ButtonDirective],
  templateUrl: './lesson-container.html',
  styleUrl: './lesson-container.css',
})
export class LessonContainer {

  topic = input.required<GrammarTopic>();


  backToCatalog = output<void>();

  protected readonly exerciseAnswers = signal<Record<number, string>>({});


  protected selectExerciseOption(questionId: number, label: string): void {
    this.exerciseAnswers.update((prev) => ({
      ...prev,
      [questionId]: label,
    }));
  }
}
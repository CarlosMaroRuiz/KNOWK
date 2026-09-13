import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Level } from '@common/models';
import { ButtonDirective } from '@common/components/button/button';
import { ContentModuleType, ManagedItem } from '../../domain/models';

@Component({
  selector: 'app-content-form',
  standalone: true,
  imports: [FormsModule, ButtonDirective],
  templateUrl: './content-form.html',
  styleUrl: './content-form.css',
})
export class ContentFormComponent {
  readonly moduleType = input.required<ContentModuleType>();
  readonly currentLevel = input.required<Level>();

  readonly saveItem = output<ManagedItem>();
  readonly cancel = output<void>();

  // Vocabulary Form Fields
  vocabWord = '';
  vocabDefinition = '';
  vocabExample = '';

  // Question Form Fields (Sentence Structure & Error Spotting)
  questionCategory = 'General';
  questionPrompt = '';
  optionA = '';
  optionB = '';
  optionC = '';
  optionD = '';
  correctLabel = 'A';
  correction = '';
  explanation = '';

  // Grammar Review Fields
  lessonTitle = '';
  lessonSummary = '';

  // Reading Comprehension Fields
  bookTitle = '';
  passageText = '';

  onSubmit(): void {
    const mod = this.moduleType();
    const level = this.currentLevel();

    let titleOrPrompt = '';
    let categoryOrDefinition = '';
    let rawPayload: Record<string, unknown> = {};

    if (mod === 'vocabulary') {
      titleOrPrompt = this.vocabWord;
      categoryOrDefinition = this.vocabDefinition;
      rawPayload = {
        id: `custom-word-${Date.now()}`,
        word: this.vocabWord,
        level,
        definition: this.vocabDefinition,
        example: this.vocabExample,
      };
    } else if (mod === 'sentence-structure' || mod === 'error-spotting') {
      titleOrPrompt = this.questionPrompt;
      categoryOrDefinition = this.questionCategory;
      const options = [
        { label: 'A', text: this.optionA },
        { label: 'B', text: this.optionB },
        { label: 'C', text: this.optionC },
        { label: 'D', text: this.optionD },
      ];
      rawPayload = {
        id: Date.now(),
        category: this.questionCategory,
        ...(mod === 'sentence-structure'
          ? { prompt: this.questionPrompt }
          : { full_sentence: this.questionPrompt, correction: this.correction }),
        options,
        correct_label: this.correctLabel,
        explanation: this.explanation,
      };
    } else if (mod === 'grammar-review') {
      titleOrPrompt = this.lessonTitle;
      categoryOrDefinition = this.lessonSummary;
      rawPayload = {
        id: `lesson-${Date.now()}`,
        title: this.lessonTitle,
        level,
        summary: this.lessonSummary,
      };
    } else if (mod === 'reading-comprehension') {
      titleOrPrompt = this.bookTitle;
      categoryOrDefinition = '1 pasaje';
      rawPayload = {
        id: `book-${Date.now()}`,
        title: this.bookTitle,
        level,
        text: this.passageText,
        questions: [],
      };
    }

    const newItem: ManagedItem = {
      id: (rawPayload['id'] as string | number) ?? Date.now(),
      level,
      titleOrPrompt,
      categoryOrDefinition,
      rawPayload,
      createdAt: new Date().toISOString().split('T')[0],
    };

    this.saveItem.emit(newItem);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

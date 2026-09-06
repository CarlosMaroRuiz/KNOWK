import { Component, input, output } from '@angular/core';
import { ButtonDirective } from '@common/components/button';
import { Question } from '@features/error-spotting/domain/models';

export interface SentencePart {
  text: string;
  isOption: boolean;
  label?: string;
}

@Component({
  selector: 'app-error-spotting-card',
  standalone: true,
  imports: [ButtonDirective],
  templateUrl: './error-spotting-card.html',
  styleUrl: './error-spotting-card.css'
})
export class ErrorSpottingCardComponent {
  readonly question = input.required<Question>();
  readonly index = input.required<number>();
  readonly selectedLabel = input<string | undefined>(undefined);


  readonly optionSelected = output<string>();


  protected get parsedSentence(): SentencePart[] {
    const q = this.question();
    const parts: SentencePart[] = [];
    let remaining = q.full_sentence;

    q.options.forEach(opt => {
      const idx = remaining.indexOf(opt.text);
      if (idx !== -1) {
        if (idx > 0) {
          parts.push({ text: remaining.substring(0, idx), isOption: false });
        }
        parts.push({ text: opt.text, isOption: true, label: opt.label });
        remaining = remaining.substring(idx + opt.text.length);
      }
    });

    if (remaining.length > 0) {
      parts.push({ text: remaining, isOption: false });
    }

    return parts;
  }

  protected selectOption(label: string): void {
    this.optionSelected.emit(label);
  }
}
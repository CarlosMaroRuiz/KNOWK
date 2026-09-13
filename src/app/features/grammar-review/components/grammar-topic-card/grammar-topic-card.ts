import { Component, input, output } from '@angular/core';
import { ButtonDirective } from '@common/components/button';
import { GrammarTopic } from '../../domain/models';

@Component({
  selector: 'app-grammar-topic-card',
  standalone: true,
  imports: [ButtonDirective],
  templateUrl: './grammar-topic-card.html',
  styleUrl: './grammar-topic-card.css',
})
export class GrammarTopicCardComponent {
  readonly topic = input.required<GrammarTopic>();
  readonly selectTopic = output<string>();

  protected onSelect(): void {
    this.selectTopic.emit(this.topic().id);
  }
}

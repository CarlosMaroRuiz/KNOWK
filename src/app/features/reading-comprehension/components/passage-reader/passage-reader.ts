import { Component, input, output } from '@angular/core';
import { ButtonDirective } from '@common/components/button';
import { Book } from '../../domain/models';

@Component({
  selector: 'app-passage-reader',
  standalone: true,
  imports: [ButtonDirective],
  templateUrl: './passage-reader.html',
  styleUrl: './passage-reader.css',
})
export class PassageReader {
  readonly book = input.required<Book>();
  readonly finishedReading = output<void>();
}

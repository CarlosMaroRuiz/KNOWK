import { Component, input, output } from '@angular/core';
import { ButtonDirective } from '@common/components/button';
import { Book } from '../../domain/models';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [ButtonDirective],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})
export class BookCard {
  readonly book = input.required<Book>();
  readonly selected = output<string>();
}

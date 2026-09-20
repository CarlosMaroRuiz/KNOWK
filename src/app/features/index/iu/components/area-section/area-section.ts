import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'index-area-section',
  imports: [LucideAngularModule],
  templateUrl: './area-section.html',
  styleUrl: './area-section.css',
  host: {
    'class': 'area-section',
    '[attr.aria-labelledby]': "'area-title-' + id()"
  }
})
export class AreaSection {
  readonly id = input.required<string | number>();
  readonly name = input.required<string>();
  readonly description = input<string>();
  readonly icon = input<any>();
  readonly itemCount = input<number>(0);
}
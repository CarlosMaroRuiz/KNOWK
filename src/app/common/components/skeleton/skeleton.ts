import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.css',
  host: {
    '[style.width]': 'width()',
    '[style.height]': 'height()',
    '[class.skeleton-circle]': "shape() === 'circle'",
    '[class.skeleton-card]': "shape() === 'card'",
  },
})
export class SkeletonComponent {
  readonly width = input<string>('100%');
  readonly height = input<string>('20px');
  readonly shape = input<'rectangle' | 'circle' | 'card'>('rectangle');
}

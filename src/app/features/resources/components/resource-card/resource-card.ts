import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from '@common/components/button';
import { LucideAngularModule, BookOpen, ArrowRight, Lightbulb } from 'lucide-angular';
import { ResourceItem } from '../../domain/models/resource.model';

@Component({
  selector: 'resource-card',
  standalone: true,
  imports: [RouterLink, ButtonDirective, LucideAngularModule],
  templateUrl: './resource-card.html',
  styleUrl: './resource-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceCardComponent {
  readonly item = input.required<ResourceItem>();
  readonly openDetail = output<ResourceItem>();

  readonly BookOpen = BookOpen;
  readonly ArrowRight = ArrowRight;
  readonly Lightbulb = Lightbulb;

  onReadClick(): void {
    this.openDetail.emit(this.item());
  }
}

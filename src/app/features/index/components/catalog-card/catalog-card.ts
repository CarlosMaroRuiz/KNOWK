import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowRight, LucideAngularModule } from 'lucide-angular';
import { CatalogItem } from '../../domain/models';

@Component({
  selector: 'catalog-card',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './catalog-card.html',
  styleUrl: './catalog-card.css',
})
export class CatalogCard {
  readonly item = input.required<CatalogItem>();
  readonly ArrowRight = ArrowRight;
}
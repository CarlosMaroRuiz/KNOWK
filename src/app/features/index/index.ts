import { Component, signal } from '@angular/core';
import { BookOpenText, LucideAngularModule } from 'lucide-angular';
import { CatalogCard } from './iu/components/catalog-card/catalog-card';
import { HeaderBaner } from './iu/components/header-baner/header-baner';
import { AreaSection } from './iu/components/area-section/area-section';
import { CatalogArea } from '../index/domain/models';
import { CATALOG_AREAS } from './data/';
import { MainLayout as IndexLayout } from './iu/layouts/main-layout/main-layout';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CatalogCard,
    HeaderBaner,
    LucideAngularModule,
    IndexLayout,
    AreaSection,
  ],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  readonly BookOpenText = BookOpenText;

  readonly areas = signal<readonly CatalogArea[]>(
    [...CATALOG_AREAS].sort((a, b) => a.order - b.order)
  );
}
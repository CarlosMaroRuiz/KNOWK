import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Database, ArrowRight } from 'lucide-angular';
import { AdminPanelCard } from '../domain/models';

@Component({
  selector: 'app-admin-index',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './admin-index.html',
  styleUrl: './admin-index.css',
})
export class AdminIndex {
  readonly ArrowRight = ArrowRight;

  readonly panels: AdminPanelCard[] = [
    {
      id: 'content-manager',
      title: 'Gestión de Contenido',
      description:
        'Agrega, visualiza y exporta el material educativo de cada módulo de práctica.',
      icon: Database,
      route: '/admin/content-manager',
    },
  ];
}

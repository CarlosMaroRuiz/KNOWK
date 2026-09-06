import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonDirective, IconButtonDirective } from '@common/components/button';
import { APP_ROUTES } from '@core/routes/routes.config';
import { ArrowLeft, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [ButtonDirective, IconButtonDirective, RouterOutlet, RouterLink, LucideAngularModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  private readonly route = inject(ActivatedRoute);

  readonly title = computed(() => {
    let currentRoute: ActivatedRoute | null = this.route;
    
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }
    
    return currentRoute.snapshot.data['title'] || APP_ROUTES.INDEX.title;
  });

  readonly ArrowLeft = ArrowLeft;
}

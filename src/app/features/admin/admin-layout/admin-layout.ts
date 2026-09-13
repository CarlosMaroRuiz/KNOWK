import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AdminAuthService } from '../services/admin-auth.service';
import { ButtonDirective } from '@common/components/button/button';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ButtonDirective, LucideAngularModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  private readonly auth = inject(AdminAuthService);
  private readonly router = inject(Router);

  readonly session = this.auth.session;
  readonly ArrowLeft = ArrowLeft;

  /** true when the user is exactly at /admin (the index) */
  readonly isAtIndex = signal<boolean>(this.checkIndex());

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.isAtIndex.set(this.checkIndex()));
  }

  private checkIndex(): boolean {
    return this.router.url === '/admin' || this.router.url === '/admin/';
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}

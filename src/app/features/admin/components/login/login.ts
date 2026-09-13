import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';
import { ButtonDirective } from '@common/components/button/button';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, ButtonDirective],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class AdminLogin {
  private readonly auth = inject(AdminAuthService);
  private readonly router = inject(Router);

  username = '';
  password = '';
  readonly errorMessage = signal<string | null>(null);

  onSubmit(): void {
    this.errorMessage.set(null);

    const success = this.auth.login({
      username: this.username,
      password: this.password,
    });

    if (success) {
      this.router.navigate(['/admin']);
    } else {
      this.errorMessage.set('Credenciales incorrectas. Verifica tu usuario y contraseña.');
    }
  }
}

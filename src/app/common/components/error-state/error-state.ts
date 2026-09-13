import { Component, input, output } from '@angular/core';
import { ButtonDirective } from '@common/components/button';

@Component({
  selector: 'app-error-state',
  standalone: true,
  imports: [ButtonDirective],
  templateUrl: './error-state.html',
  styleUrl: './error-state.css',
})
export class ErrorStateComponent {
  readonly title = input<string>('Ocurrio un error al cargar');
  readonly message = input<string>('No se pudieron obtener los datos. Por favor reintenta.');
  readonly retryText = input<string>('Reintentar');
  readonly retry = output<void>();

  protected onRetry(): void {
    this.retry.emit();
  }
}

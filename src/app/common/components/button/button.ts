import { booleanAttribute, Directive, input } from '@angular/core';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'outline'
  | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Directive({
  selector: 'button[appButton], a[appButton]',
  standalone: true,
  host: {
    class: 'ds-button',
    '[class.ds-button--primary]': "variant() === 'primary'",
    '[class.ds-button--secondary]': "variant() === 'secondary'",
    '[class.ds-button--success]': "variant() === 'success'",
    '[class.ds-button--danger]': "variant() === 'danger'",
    '[class.ds-button--outline]': "variant() === 'outline'",
    '[class.ds-button--ghost]': "variant() === 'ghost'",
    '[class.ds-button--sm]': "size() === 'sm'",
    '[class.ds-button--md]': "size() === 'md'",
    '[class.ds-button--lg]': "size() === 'lg'",
    '[class.ds-button--loading]': 'loading()',
    '[class.ds-button--full-width]': 'fullWidth()',
    '[attr.aria-busy]': "loading() ? 'true' : null",
  }
})
export class ButtonDirective {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly loading = input(false, { transform: booleanAttribute });
  readonly fullWidth = input(false, { transform: booleanAttribute });
}
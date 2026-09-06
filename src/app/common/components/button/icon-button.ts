import { Directive, input } from '@angular/core';

export type IconButtonVariant = 'primary' | 'secondary' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

@Directive({
  selector: 'button[appIconButton], a[appIconButton]',
  standalone: true,
  host: {
    class: 'ds-icon-button',
    '[class.ds-icon-button--primary]': "variant() === 'primary'",
    '[class.ds-icon-button--secondary]': "variant() === 'secondary'",
    '[class.ds-icon-button--ghost]': "variant() === 'ghost'",
    '[class.ds-icon-button--sm]': "size() === 'sm'",
    '[class.ds-icon-button--md]': "size() === 'md'",
    '[class.ds-icon-button--lg]': "size() === 'lg'"
  }
})
export class IconButtonDirective {
  readonly variant = input<IconButtonVariant>('secondary');
  readonly size = input<IconButtonSize>('md');
}
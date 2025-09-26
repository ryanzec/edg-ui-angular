import { Directive, input, HostBinding } from '@angular/core';

/**
 * Colors that can be applied to a component
 * @internal Only exposed for testing purposes
 */
export const _colors = ['primary', 'secondary', 'neutral', 'success', 'info', 'caution', 'warning', 'danger'] as const;

export type ComponentColor = (typeof _colors)[number];

@Directive({
  selector: '[orgColor]',
  // Directives should be standalone in modern Angular
  standalone: true,
})
export class ComponentColorDirective {
  public orgColor = input<ComponentColor | null>(null);

  // Each getter toggles a specific class based on the input value.
  // This is safe and won't remove other classes on the element.
  @HostBinding('class.org-primary')
  get isPrimary(): boolean {
    return this.orgColor() === 'primary';
  }

  @HostBinding('class.org-secondary')
  get isSecondary(): boolean {
    return this.orgColor() === 'secondary';
  }

  @HostBinding('class.org-neutral')
  get isNeutral(): boolean {
    return this.orgColor() === 'neutral';
  }

  @HostBinding('class.org-success')
  get isSuccess(): boolean {
    return this.orgColor() === 'success';
  }

  @HostBinding('class.org-info')
  get isInfo(): boolean {
    return this.orgColor() === 'info';
  }

  @HostBinding('class.org-caution')
  get isCaution(): boolean {
    return this.orgColor() === 'caution';
  }

  @HostBinding('class.org-warning')
  get isWarning(): boolean {
    return this.orgColor() === 'warning';
  }

  @HostBinding('class.org-danger')
  get isDanger(): boolean {
    return this.orgColor() === 'danger';
  }
}

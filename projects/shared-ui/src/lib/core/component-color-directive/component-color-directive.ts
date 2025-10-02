import { Directive, input, HostBinding } from '@angular/core';

export const ComponentColor = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  NEUTRAL: 'neutral',
  SAFE: 'safe',
  INFO: 'info',
  CAUTION: 'caution',
  WARNING: 'warning',
  DANGER: 'danger',
} as const;

export type ComponentColor = (typeof ComponentColor)[keyof typeof ComponentColor];

export const componentColors = Object.values(ComponentColor);

export const COMPONENT_COLOR_COLOR_DEFAULT: ComponentColor | null = null;

@Directive({
  selector: '[orgColor]',
  standalone: true,
})
export class ComponentColorDirective {
  public orgColor = input<ComponentColor | null>(COMPONENT_COLOR_COLOR_DEFAULT);

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

  @HostBinding('class.org-safe')
  get isSafe(): boolean {
    return this.orgColor() === 'safe';
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

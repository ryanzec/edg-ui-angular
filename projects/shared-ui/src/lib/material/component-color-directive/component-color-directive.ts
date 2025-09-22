import { Directive, ElementRef, Renderer2, input, effect, inject } from '@angular/core';

const colors = [
  'primary',
  'secondary',
  'neutral',
  'success',
  'info',
  'caution',
  'warning',
  'danger',
] as const;

export type ComponentColor = (typeof colors)[number];

@Directive({
  selector: '[orgColor]',
})
export class ComponentColorDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  public orgColor = input<ComponentColor | null>(null);

  constructor() {
    effect(() => {
      this.clearClasses();

      const variant = this.orgColor();

      if (variant === null) {
        this.clearClasses();

        return;
      }

      this.renderer.addClass(this.el.nativeElement, `org-${variant}`);
    });
  }

  private clearClasses(): void {
    colors.forEach((cssClass) => {
      this.renderer.removeClass(this.el.nativeElement, `org-${cssClass}`);
    });
  }
}

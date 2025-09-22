import { Directive, ElementRef, Renderer2, input, effect, inject } from '@angular/core';

@Directive({
  selector: '[orgColor]',
})
export class ComponentColorDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  orgColor = input<
    | 'primary'
    | 'secondary'
    | 'neutral'
    | 'success'
    | 'info'
    | 'caution'
    | 'warning'
    | 'danger'
    | null
  >(null);

  constructor() {
    effect(() => {
      this.clearClasses();

      const variant = this.orgColor();

      if (variant) {
        this.renderer.addClass(this.el.nativeElement, `mat-${variant}`);
      }
    });
  }

  private clearClasses(): void {
    ['success', 'info', 'warning', 'danger'].forEach((cssClass) => {
      this.renderer.removeClass(this.el.nativeElement, `mat-${cssClass}`);
    });
  }
}

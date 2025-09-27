import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[orgGroupedElements]',
})
export class GroupedElementsDirective {
  public readonly orgGroupedElements = input<boolean | null>(true);

  @HostBinding('class.flex')
  public get flexClass(): boolean {
    return this.enabled();
  }

  @HostBinding('class.gap-1')
  public get gap2Class(): boolean {
    return this.enabled();
  }

  private enabled(): boolean {
    return this.orgGroupedElements() === true;
  }
}

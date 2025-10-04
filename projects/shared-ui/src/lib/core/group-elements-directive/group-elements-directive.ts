import { Directive, input } from '@angular/core';

@Directive({
  selector: '[orgGroupElements]',
  host: {
    '[class.flex]': 'enabled()',
    '[class.flex-col]': 'shouldApplyFlexCol()',
    '[class.gap-2]': 'enabled()',
  },
})
export class GroupElementsDirective {
  public readonly orgGroupElements = input<boolean | '' | null>(true);
  public readonly flexDirection = input<'row' | 'col'>('row');

  public enabled(): boolean {
    const value = this.orgGroupElements();

    // Handle empty string (attribute without value) as true
    if (value === '' || value === true) {
      return true;
    }

    // Handle string 'false' as false
    if (value === false) {
      return false;
    }

    // Handle null as false
    return false;
  }

  public shouldApplyFlexCol(): boolean {
    return this.enabled() && this.flexDirection() === 'col';
  }
}

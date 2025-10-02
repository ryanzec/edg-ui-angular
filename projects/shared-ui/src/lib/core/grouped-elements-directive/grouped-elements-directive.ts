import { Directive, input } from '@angular/core';

@Directive({
  selector: '[orgGroupedElements]',
  host: {
    '[class.flex]': 'enabled()',
    '[class.flex-col]': 'shouldApplyFlexCol()',
    '[class.gap-2]': 'enabled()',
  },
})
export class GroupedElementsDirective {
  public readonly orgGroupedElements = input<boolean | '' | null>(true);
  public readonly flexDirection = input<'row' | 'col'>('row');

  public enabled(): boolean {
    const value = this.orgGroupedElements();

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

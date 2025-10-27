import { Component, input } from '@angular/core';
import { tailwindUtils } from '@organization/shared-utils';

@Component({
  selector: 'org-button-group',
  imports: [],
  templateUrl: './button-group.html',
})
export class ButtonGroup {
  public readonly containerClass = input<string>('');

  protected mergeClasses = tailwindUtils.merge;
}

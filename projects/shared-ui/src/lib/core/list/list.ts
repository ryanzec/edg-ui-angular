import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { tailwindUtils } from '@organization/shared-utils';

@Component({
  selector: 'org-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './list.html',
  host: {
    ['attr.data-testid']: 'list',
  },
})
export class List {
  public containerClass = input<string>('');

  public mergeClasses = tailwindUtils.merge;
}

import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { tailwindUtils } from '@organization/shared-utils';

@Component({
  selector: 'org-table-th',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <th
      [class]="
        mergeClasses(
          'px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background',
          containerClass()
        )
      "
    >
      <ng-content />
    </th>
  `,
  host: {
    dataid: 'table-th',
    style: 'display: contents',
  },
})
export class TableHeader {
  public containerClass = input<string>('');

  public mergeClasses = tailwindUtils.merge;
}

import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { tailwindUtils } from '@organization/shared-utils';

/**
 * variant for table row component
 */
export type TableRowVariant = 'header' | 'body';

export const tableRowVariants: TableRowVariant[] = ['header', 'body'] as const;

@Component({
  selector: 'org-table-tr',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  styles: `
    @layer components {
      /*
       * since this required host element related selection, we need to use the css file instead of just tailwind
       * as since trs can't have sticky on them (not all browsers support this), we need to select teh ths like this
       * (this allow us to set it once and make sure all hths have the correct styles)
       */
      :host ::ng-deep tr.org-table-tr-sticky th {
        position: sticky;
        top: 0;
        z-index: 10;
      }
    }
  `,
  template: `
    <tr
      [class]="
        mergeClasses(
          {
            'border-b border-table-row-border hover:bg-table-row-hover': variant() === 'body',
            'org-table-tr-sticky': isSticky(),
          },
          containerClass()
        )
      "
    >
      <ng-content />
    </tr>
  `,
  host: {
    dataid: 'table-tr',
    style: 'display: contents',
  },
})
export class TableRow {
  public variant = input<TableRowVariant>('body');
  public isSticky = input<boolean>(false);
  public containerClass = input<string>('');

  public mergeClasses = tailwindUtils.merge;
}

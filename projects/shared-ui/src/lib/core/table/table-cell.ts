import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { tailwindUtils } from '@organization/shared-utils';

@Component({
  selector: 'org-table-td',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <td [class]="mergeClasses('px-4 py-3 text-sm text-table-text', containerClass())">
      <div
        [class]="mergeClasses({ 'org-table-ellipsis': useEllipsis() })"
        [style]="{
          '--ellipsis-lines': useEllipsis() ? ellipsisLines() : null,
        }"
      >
        <ng-content />
      </div>
    </td>
  `,
  styles: `
    .org-table-ellipsis {
      --ellipsis-lines: 1;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: var(--ellipsis-lines);
      line-clamp: var(--ellipsis-lines);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      word-break: break-all;
    }
  `,
  host: {
    dataid: 'table-td',
    style: 'display: contents',
  },
})
export class TableCell {
  public useEllipsis = input<boolean>(false);
  public ellipsisLines = input<number>(1);
  public containerClass = input<string>('');

  public mergeClasses = tailwindUtils.merge;
}

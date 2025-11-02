import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
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
    ['attr.data-testid']: 'table-td',
    style: 'display: contents',
  },
})
export class TableCell {
  public ellipsisLines = input<number>(0);
  public containerClass = input<string>('');

  public useEllipsis = computed<boolean>(() => this.ellipsisLines() > 0);

  public mergeClasses = tailwindUtils.merge;
}

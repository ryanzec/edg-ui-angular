import { Component, ChangeDetectionStrategy, input, InjectionToken } from '@angular/core';
import { tailwindUtils } from '@organization/shared-utils';

export type ListSize = 'sm' | 'base';

export const LIST_COMPONENT = new InjectionToken<List>('List Component');

@Component({
  selector: 'org-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './list.html',
  providers: [{ provide: LIST_COMPONENT, useExisting: List }],
  host: {
    ['attr.data-testid']: 'list',
  },
})
export class List {
  public containerClass = input<string>('');
  public size = input<ListSize>('sm');

  public mergeClasses = tailwindUtils.merge;
}

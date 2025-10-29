import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { tailwindUtils } from '@organization/shared-utils';

export type SkeletonType = 'table' | 'card';

@Component({
  selector: 'org-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.css',
  host: {
    ['attr.data-testid']: 'skeleton',
    class: 'inline-block',
  },
})
export class Skeleton {
  public type = input.required<SkeletonType>();
  public containerClass = input<string>('');

  public mergeClasses = tailwindUtils.merge;

  public readonly isTable = computed<boolean>(() => {
    return this.type() === 'table';
  });

  public readonly isCard = computed<boolean>(() => {
    return this.type() === 'card';
  });

  // varying widths for table skeleton bars
  protected readonly tableBarWidths = ['w-[90%]', 'w-[75%]', 'w-[95%]', 'w-[60%]', 'w-[85%]', 'w-[70%]', 'w-[80%]'];
}

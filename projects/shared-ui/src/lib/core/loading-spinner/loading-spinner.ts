import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { Icon } from '../icon/icon';

export type IconSize = 'small' | 'base' | 'large';

@Component({
  selector: 'org-loading-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: ` <org-icon name="circle-notch" [size]="size()" [class]="spinnerClasses()" />`,
  host: {
    class: 'inline-flex',
  },
})
export class LoadingSpinner {
  public size = input<IconSize>('base');

  public readonly spinnerClasses = computed(() => {
    return 'animate-spin';
  });
}

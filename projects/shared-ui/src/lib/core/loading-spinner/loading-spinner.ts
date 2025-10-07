import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Icon, IconSize } from '../icon/icon';

@Component({
  selector: 'org-loading-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: ` <org-icon name="circle-notch" [size]="size()" class="animate-spin" />`,
  host: {
    class: 'inline-flex',
  },
})
export class LoadingSpinner {
  public size = input<IconSize>('base');
}

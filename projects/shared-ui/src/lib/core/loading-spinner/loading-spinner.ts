import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Icon, IconColor, IconSize } from '../icon/icon';

@Component({
  selector: 'org-loading-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: ` <org-icon name="spinner" [size]="size()" class="animate-spin" [color]="iconColor()" />`,
  host: {
    class: 'inline-flex',
  },
})
export class LoadingSpinner {
  public size = input<IconSize>('base');
  public iconColor = input<IconColor>('inherit');
}

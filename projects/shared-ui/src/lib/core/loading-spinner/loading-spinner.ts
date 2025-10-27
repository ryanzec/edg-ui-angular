import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Icon, IconColor, IconSize } from '../icon/icon';
import { tailwindUtils } from '@organization/shared-utils';

@Component({
  selector: 'org-loading-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `<org-icon
    name="spinner"
    [size]="size()"
    [class]="mergeClasses('animate-spin', containerClass())"
    [color]="iconColor()"
  />`,
  host: {
    class: 'inline-flex',
  },
})
export class LoadingSpinner {
  public size = input<IconSize>('base');
  public iconColor = input<IconColor>('inherit');
  public containerClass = input<string>('');

  public mergeClasses = tailwindUtils.merge;
}

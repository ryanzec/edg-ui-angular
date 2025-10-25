import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { tailwindUtils } from '@organization/shared-utils';
import { ComponentColor, componentColors, ComponentSize } from '../types/component-types';

export type IconName =
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'arrows-down-up'
  | 'bell'
  | 'bell-slash'
  | 'calendar'
  | 'caret-down'
  | 'caret-left'
  | 'caret-right'
  | 'caret-up'
  | 'check'
  | 'check-circle'
  | 'check-square'
  | 'circle'
  | 'copy'
  | 'dots-three'
  | 'download-simple'
  | 'envelope'
  | 'eye'
  | 'eye-slash'
  | 'gear'
  | 'lock-key'
  | 'minus-circle'
  | 'minus-square'
  | 'pencil-simple'
  | 'plus'
  | 'sign-out'
  | 'spinner'
  | 'square'
  | 'trash'
  | 'upload-simple'
  | 'x'
  | 'x-circle';

export const iconNames: IconName[] = [
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'arrow-up',
  'arrows-down-up',
  'bell',
  'bell-slash',
  'calendar',
  'caret-down',
  'caret-left',
  'caret-right',
  'caret-up',
  'check',
  'check-circle',
  'check-square',
  'circle',
  'copy',
  'dots-three',
  'download-simple',
  'envelope',
  'eye',
  'eye-slash',
  'gear',
  'lock-key',
  'minus-circle',
  'minus-square',
  'pencil-simple',
  'plus',
  'sign-out',
  'spinner',
  'square',
  'trash',
  'upload-simple',
  'x',
  'x-circle',
];

export type IconSize = Extract<ComponentSize, 'sm' | 'base' | 'lg'>;

export const iconSizes: IconSize[] = ['sm', 'base', 'lg'];

export type IconWeight = 'regular' | 'bold' | 'fill';

export const iconWeights: IconWeight[] = ['regular', 'bold', 'fill'];

export type IconColor = 'inherit' | ComponentColor;

export const iconColors: IconColor[] = ['inherit', ...componentColors];

@Component({
  selector: 'org-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon.html',
  host: {
    class: 'inline-flex',
  },
})
export class Icon {
  public name = input.required<IconName>();
  public size = input<IconSize>('base');
  public weight = input<IconWeight>('regular');
  public color = input<IconColor>('inherit');

  public mergeClasses = tailwindUtils.merge;
}

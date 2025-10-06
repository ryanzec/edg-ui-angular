import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { tailwindUtils } from '@organization/shared-utils';
import { ComponentColor, componentColors } from '../types/component-types';

export type IconName =
  | 'caret-right'
  | 'caret-left'
  | 'caret-up'
  | 'caret-down'
  | 'arrow-up'
  | 'arrow-down'
  | 'arrows-down-up'
  | 'plus'
  | 'check'
  | 'x'
  | 'arrow-right'
  | 'arrow-left'
  | 'download-simple'
  | 'upload-simple'
  | 'trash'
  | 'pencil-simple'
  | 'gear'
  | 'circle-notch'
  | 'eye'
  | 'eye-slash'
  | 'envelope'
  | 'lock-key'
  | 'copy'
  | 'square'
  | 'check-square'
  | 'minus-square'
  | 'circle'
  | 'check-circle';

export const iconNames: IconName[] = [
  'caret-right',
  'caret-left',
  'caret-up',
  'caret-down',
  'arrow-up',
  'arrow-down',
  'arrows-down-up',
  'plus',
  'check',
  'x',
  'arrow-right',
  'arrow-left',
  'download-simple',
  'upload-simple',
  'trash',
  'pencil-simple',
  'gear',
  'circle-notch',
  'eye',
  'eye-slash',
  'envelope',
  'lock-key',
  'copy',
  'square',
  'check-square',
  'minus-square',
  'circle',
  'check-circle',
];

export type IconSize = 'small' | 'base' | 'large';

export const iconSizes: IconSize[] = ['small', 'base', 'large'];

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

import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { tailwindUtils } from '@organization/shared-utils';

export const IconName = {
  CARET_RIGHT: 'caret-right',
  CARET_LEFT: 'caret-left',
  PLUS: 'plus',
  CHECK: 'check',
  X: 'x',
  ARROW_RIGHT: 'arrow-right',
  ARROW_LEFT: 'arrow-left',
  DOWNLOAD_SIMPLE: 'download-simple',
  UPLOAD_SIMPLE: 'upload-simple',
  TRASH: 'trash',
  PENCIL_SIMPLE: 'pencil-simple',
  GEAR: 'gear',
  CIRCLE_NOTCH: 'circle-notch',
  EYE: 'eye',
  EYE_SLASH: 'eye-slash',
  ENVELOPE: 'envelope',
  LOCK_KEY: 'lock-key',
} as const;

export type IconName = (typeof IconName)[keyof typeof IconName];

export const iconNames = Object.values(IconName);

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
  public size = input<'small' | 'base' | 'large'>('base');
  public weight = input<'regular' | 'bold' | 'fill'>('regular');

  public mergeClasses = tailwindUtils.merge;
}

import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { tailwindUtils } from '@organization/shared-utils';
import { ComponentSize } from '../types/component-types';

export type AvatarStackSize = Extract<ComponentSize, 'sm' | 'base' | 'lg'>;

export const avatarStackSizes: AvatarStackSize[] = ['sm', 'base', 'lg'];

export const AVATAR_STACK_SIZE_DEFAULT: AvatarStackSize = 'base';

@Component({
  selector: 'org-avatar-stack',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './avatar-stack.html',
  host: {
    ['attr.data-testid']: 'avatar-stack',
  },
})
export class AvatarStack {
  public size = input<AvatarStackSize | null>(AVATAR_STACK_SIZE_DEFAULT);
  public class = input<string>('base');

  public mergeClasses = tailwindUtils.merge;
}

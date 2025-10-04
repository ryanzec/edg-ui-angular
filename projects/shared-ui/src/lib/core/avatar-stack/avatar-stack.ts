import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { tailwindUtils } from '@organization/shared-utils';

export const AvatarStackSize = {
  SM: 'sm',
  BASE: 'base',
  LG: 'lg',
} as const;

export type AvatarStackSize = (typeof AvatarStackSize)[keyof typeof AvatarStackSize];

export const avatarStackSizes = Object.values(AvatarStackSize);

export const AVATAR_STACK_SIZE_DEFAULT: AvatarStackSize = 'base';

@Component({
  selector: 'org-avatar-stack',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './avatar-stack.html',
  host: {
    dataid: 'avatar-stack',
  },
})
export class AvatarStack {
  public size = input<AvatarStackSize | null>(AVATAR_STACK_SIZE_DEFAULT);
  public class = input<string>('base');

  public mergeClasses = tailwindUtils.merge;
}

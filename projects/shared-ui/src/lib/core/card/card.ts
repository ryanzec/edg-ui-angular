import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ComponentColor } from '../types/component-types';
import { tailwindUtils } from 'projects/shared-utils/src/utils/tailwind';

export type CardAlignment = 'start' | 'center' | 'end';

@Component({
  selector: 'org-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.html',
  host: {
    class: 'block',
  },
})
export class Card {
  public color = input<ComponentColor | null>(null);

  public mergeClasses = tailwindUtils.merge;
}

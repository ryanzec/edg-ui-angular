import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ComponentColor, componentColors } from '../types/component-types';
import { tailwindUtils } from 'projects/shared-utils/src/utils/tailwind';

export type CardColor = ComponentColor;

export const cardColors: CardColor[] = componentColors;

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
  public color = input<CardColor | null>(null);

  public mergeClasses = tailwindUtils.merge;
}

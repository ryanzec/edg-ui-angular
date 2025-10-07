import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ComponentColor } from '../types/component-types';
import { tailwindUtils } from 'projects/shared-utils/src/utils/tailwind';

export type CardColor = Extract<
  ComponentColor,
  'primary' | 'secondary' | 'safe' | 'info' | 'caution' | 'warning' | 'danger'
>;

export const cardColors: CardColor[] = ['primary', 'secondary', 'safe', 'info', 'caution', 'warning', 'danger'];

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

import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ComponentColor, ComponentColorDirective } from '../component-color-directive/component-color-directive';
import { tailwindUtils } from 'projects/shared-utils/src/utils/tailwind';

export type CardAlignment = 'start' | 'center' | 'end';

@Component({
  selector: 'org-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.html',
  hostDirectives: [
    {
      directive: ComponentColorDirective,
      inputs: ['orgColor'],
    },
  ],
})
export class Card {
  public orgColor = input<ComponentColor | null>(null);

  public mergeClasses = tailwindUtils.merge;
}

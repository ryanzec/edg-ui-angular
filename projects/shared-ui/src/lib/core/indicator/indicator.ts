import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { ComponentColor, ComponentSize } from '../types/component-types';
import { tailwindUtils } from '@organization/shared-utils';

export type IndicatorColor = ComponentColor;

export type IndicatorSize = Extract<ComponentSize, 'sm' | 'base' | 'lg'>;

@Component({
  selector: 'org-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './indicator.html',
  host: {
    ['attr.data-testid']: 'indicator',
    class: 'inline-flex',
  },
})
export class Indicator {
  public color = input<IndicatorColor>('primary');
  public number = input<number | null>(null);
  public containerClass = input<string>('');
  public size = input<IndicatorSize>('sm');

  public readonly displayValue = computed<string>(() => {
    const num = this.number();

    if (num === null) {
      return '';
    }

    if (num >= 100) {
      return '99+';
    }

    return num.toString();
  });

  public readonly hasNumber = computed<boolean>(() => {
    return this.number() !== null;
  });

  public mergeClasses = tailwindUtils.merge;
}

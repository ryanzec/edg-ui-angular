import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { ComponentColor } from '../types/component-types';
import { tailwindUtils } from '@organization/shared-utils';

export type IndicatorColor = ComponentColor;

@Component({
  selector: 'org-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './indicator.html',
  styleUrl: './indicator.css',
  host: {
    dataid: 'indicator',
    class: 'inline-flex',
  },
})
export class Indicator {
  public color = input<IndicatorColor>('primary');
  public number = input<number | null>(null);
  public containerClass = input<string>('');

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

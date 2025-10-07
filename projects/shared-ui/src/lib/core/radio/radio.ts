import { Component, ChangeDetectionStrategy, input, output, computed, ViewChild, ElementRef } from '@angular/core';
import { Icon, IconName } from '../icon/icon';
import { tailwindUtils } from '@organization/shared-utils';
import { TextDirective, TextSize } from '../text-directive/text-directive';
import { ComponentSize } from '../types/component-types';

export type RadioSize = Extract<ComponentSize, 'sm' | 'base' | 'lg'>;

export const radioSizes: RadioSize[] = ['sm', 'base', 'lg'];

@Component({
  selector: 'org-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, TextDirective],
  templateUrl: './radio.html',
  host: {
    dataid: 'radio',
    class: 'inline-flex',
  },
})
export class Radio {
  @ViewChild('inputRef', { static: true })
  public readonly inputRef!: ElementRef<HTMLInputElement>;

  // required inputs
  public name = input.required<string>();
  public value = input.required<string>();

  // optional inputs
  public checked = input<boolean>(false);
  public size = input<RadioSize>('base');
  public containerClass = input<string>('');

  // outputs
  public checkedChange = output<boolean>();

  // computed properties
  public readonly isChecked = computed<boolean>(() => this.checked());
  public readonly textSize = computed<TextSize>(() => {
    switch (this.size()) {
      case 'sm':
        return 'sm';
      case 'lg':
        return 'lg';
      default:
        return 'base';
    }
  });

  public readonly currentIcon = computed<IconName>(() => {
    if (this.isChecked()) {
      return 'check-circle';
    }

    return 'circle';
  });

  public mergeClasses = tailwindUtils.merge;

  protected handleClick(event: Event): void {
    event.preventDefault();

    // radios can only be checked, not unchecked by clicking
    if (!this.isChecked()) {
      this.checkedChange.emit(true);
    }
  }

  protected handleKeyDown(event: KeyboardEvent): void {
    // handle space and enter keys
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.handleClick(event);
    }
  }
}

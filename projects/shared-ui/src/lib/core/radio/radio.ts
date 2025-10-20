import { Component, ChangeDetectionStrategy, input, computed, signal, inject } from '@angular/core';
import { Icon, IconName } from '../icon/icon';
import { tailwindUtils } from '@organization/shared-utils';
import { TextDirective, TextSize } from '../text-directive/text-directive';
import { ComponentSize } from '../types/component-types';
import { RadioGroup } from './radio-group';

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
  // Inject parent radio group if exists
  private readonly _radioGroup = inject(RadioGroup, { optional: true });

  // Internal selected state (managed by radio group or standalone)
  private readonly _selected = signal<boolean>(false);

  // Required inputs
  public value = input.required<string>();
  public name = input.required<string>();

  // Optional inputs
  public size = input<RadioSize>('base');
  public containerClass = input<string>('');

  // Computed properties
  public readonly isChecked = computed<boolean>(() => this._selected());
  public readonly finalName = computed<string>(() => this._radioGroup?.name() ?? this.name() ?? '');
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

  // Called by parent RadioGroup to set selected state
  public _setSelected(selected: boolean): void {
    this._selected.set(selected);
  }

  protected handleClick(event: Event): void {
    event.preventDefault();

    // If part of a radio group, notify the group
    if (this._radioGroup) {
      this._radioGroup._onRadioSelect(this.value());

      return;
    }

    // Standalone mode: just update own state (backward compatibility)
    if (!this.isChecked()) {
      this._selected.set(true);
    }
  }

  protected handleKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.handleClick(event);
    }
  }
}

import { Component, ChangeDetectionStrategy, input, computed, signal, inject, OnInit } from '@angular/core';
import { Icon, IconName } from '../icon/icon';
import { tailwindUtils } from '@organization/shared-utils';
import { TextDirective, TextSize } from '../text-directive/text-directive';
import { ComponentSize } from '../types/component-types';
import { RadioGroup } from './radio-group';
import { LogManager } from '../log-manager/log-manager';

export type RadioSize = Extract<ComponentSize, 'sm' | 'base' | 'lg'>;

export const radioSizes: RadioSize[] = ['sm', 'base', 'lg'];

@Component({
  selector: 'org-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, TextDirective],
  templateUrl: './radio.html',
  host: {
    ['attr.data-testid']: 'radio',
    class: 'inline-flex',
  },
})
export class Radio implements OnInit {
  private readonly _logManager = inject(LogManager);

  // Inject parent radio group if exists
  private readonly _radioGroup = inject(RadioGroup, { optional: true });

  // Internal selected state (managed by radio group or standalone)
  private readonly _selected = signal<boolean>(false);

  // Required inputs
  public value = input.required<string>();
  public name = input<string>('');

  // Optional inputs
  public size = input<RadioSize>('sm');
  public containerClass = input<string>('');

  // Computed properties
  public readonly isChecked = computed<boolean>(() => this._selected());
  public readonly finalName = computed<string>(() => this._radioGroup?.name() ?? this.name());
  public readonly textSize = computed<TextSize>(() => {
    switch (this.size()) {
      case 'base':
        return 'base';
      case 'lg':
        return 'lg';
      default:
        return 'sm';
    }
  });

  public readonly currentIcon = computed<IconName>(() => {
    if (this.isChecked()) {
      return 'check-circle';
    }

    return 'circle';
  });

  public mergeClasses = tailwindUtils.merge;

  public ngOnInit(): void {
    const groupName = this._radioGroup?.name() ?? '';
    const radioName = this.name();

    if (!groupName && !radioName) {
      this._logManager.error(
        'Radio component requires a name either directly on the radio or from a parent radio-group'
      );
    }
  }

  // Called by parent RadioGroup to set selected state
  public _setSelected(selected: boolean): void {
    this._selected.set(selected);
  }

  protected onClick(event: Event): void {
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

  protected onKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.onClick(event);
    }
  }
}

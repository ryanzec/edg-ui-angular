import { Component, ChangeDetectionStrategy, input, output, computed, ViewChild, ElementRef } from '@angular/core';
import { Icon, IconName } from '../icon/icon';
import { tailwindUtils } from '@organization/shared-utils';
import { TextDirective, TextSize } from '../text-directive/text-directive';
import { ComponentSize } from '../types/component-types';

export type CheckboxToggleSize = Extract<ComponentSize, 'sm' | 'base' | 'lg'>;

export const checkboxToggleSizes: CheckboxToggleSize[] = ['sm', 'base', 'lg'];

@Component({
  selector: 'org-checkbox-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, TextDirective],
  templateUrl: './checkbox-toggle.html',
  host: {
    dataid: 'checkbox-toggle',
    class: 'inline-flex',
  },
})
export class CheckboxToggle {
  @ViewChild('inputRef', { static: true })
  public readonly inputRef!: ElementRef<HTMLInputElement>;

  // required inputs
  public name = input.required<string>();
  public value = input.required<string>();

  // optional inputs
  public checked = input<boolean>(false);
  public disabled = input<boolean>(false);
  public size = input<CheckboxToggleSize>('base');
  public containerClass = input<string>('');
  public onIcon = input<IconName | null>(null);
  public offIcon = input<IconName | null>(null);
  public onText = input<string | null>(null);
  public offText = input<string | null>(null);

  // outputs
  public checkedChange = output<boolean>();

  // computed properties
  public readonly isChecked = computed<boolean>(() => this.checked());
  public readonly isDisabled = computed<boolean>(() => this.disabled());
  public readonly textSize = computed<TextSize>(() => {
    switch (this.size()) {
      case 'sm':
        return 'xs';
      case 'lg':
        return 'base';
      default:
        return 'sm';
    }
  });

  public readonly displayIcon = computed<IconName | null>(() => {
    if (this.isChecked()) {
      return this.onIcon();
    }

    return this.offIcon();
  });

  public readonly displayText = computed<string | null>(() => {
    if (this.isChecked()) {
      return this.onText();
    }

    return this.offText();
  });

  public mergeClasses = tailwindUtils.merge;

  protected handleClick(event: Event): void {
    if (this.isDisabled()) {
      event.preventDefault();

      return;
    }

    event.preventDefault();

    const newChecked = !this.isChecked();

    this.checkedChange.emit(newChecked);
  }

  protected handleKeyDown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    // handle space and enter keys
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.handleClick(event);
    }
  }
}

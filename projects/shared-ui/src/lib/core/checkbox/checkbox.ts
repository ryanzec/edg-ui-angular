import { Component, ChangeDetectionStrategy, input, output, computed, ViewChild, ElementRef } from '@angular/core';
import { Icon, IconName } from '../icon/icon';
import { tailwindUtils } from '@organization/shared-utils';
import { TextDirective, TextSize } from '../text-directive/text-directive';

@Component({
  selector: 'org-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, TextDirective],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
  host: {
    dataid: 'checkbox',
    class: 'inline-flex',
  },
})
export class Checkbox {
  @ViewChild('inputRef', { static: true })
  public readonly inputRef!: ElementRef<HTMLInputElement>;

  // required inputs
  public name = input.required<string>();
  public value = input.required<string>();

  // optional inputs
  public checked = input<boolean>(false);
  public indeterminate = input<boolean>(false);
  public disabled = input<boolean>(false);
  public size = input<'small' | 'base' | 'large'>('base');
  public containerClass = input<string>('');

  // outputs
  public checkedChange = output<boolean>();
  public indeterminateChange = output<boolean>();

  // computed properties
  public readonly isChecked = computed<boolean>(() => this.checked());
  public readonly isIndeterminate = computed<boolean>(() => this.indeterminate());
  public readonly isDisabled = computed<boolean>(() => this.disabled());
  public readonly textSize = computed<TextSize>(() => {
    switch (this.size()) {
      case 'small':
        return 'sm';
      case 'large':
        return 'lg';
      default:
        return 'base';
    }
  });

  public readonly currentIcon = computed<IconName>(() => {
    if (this.isChecked()) {
      return 'check-square';
    }

    if (this.isIndeterminate()) {
      return 'minus-square';
    }

    return 'square';
  });

  public mergeClasses = tailwindUtils.merge;

  protected handleClick(event: Event): void {
    if (this.isDisabled()) {
      event.preventDefault();

      return;
    }

    event.preventDefault();

    // when clicking, if indeterminate, go to checked
    // if checked, go to unchecked
    // if unchecked, go to checked

    const newChecked = this.isIndeterminate() ? true : !this.isChecked();
    const newIndeterminate = false;

    this.checkedChange.emit(newChecked);
    this.indeterminateChange.emit(newIndeterminate);
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

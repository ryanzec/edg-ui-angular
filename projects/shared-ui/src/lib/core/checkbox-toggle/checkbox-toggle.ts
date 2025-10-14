import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
  ViewChild,
  ElementRef,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxToggle),
      multi: true,
    },
  ],
})
export class CheckboxToggle implements ControlValueAccessor {
  // control value accessor callbacks
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onChange: (value: boolean) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onTouched: () => void = () => {};

  // Track if component is controlled by reactive forms
  private _isFormControlled = false;

  // internal state for reactive forms
  private readonly _internalChecked = signal<boolean>(false);

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
  public validationMessage = input<string>('');

  // outputs
  public checkedChange = output<boolean>();

  // computed properties - use internal state when using reactive forms, otherwise use inputs
  public readonly isChecked = computed<boolean>(() => {
    // If form-controlled, use internal state only
    if (this._isFormControlled) {
      return this._internalChecked();
    }

    // Otherwise, use the checked input (for simple binding)
    return this.checked();
  });
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

  public readonly hasValidationMessage = computed<boolean>(() => !!this.validationMessage().trim());
  public readonly isInvalid = computed<boolean>(() => this.hasValidationMessage());

  public mergeClasses = tailwindUtils.merge;

  protected handleClick(event: Event): void {
    if (this.isDisabled()) {
      event.preventDefault();

      return;
    }

    event.preventDefault();

    const newChecked = !this.isChecked();

    this._internalChecked.set(newChecked);
    this._onChange(newChecked);
    this._onTouched();
    this.checkedChange.emit(newChecked);
  }

  protected handleKeyDown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.handleClick(event);
    }
  }

  // control value accessor implementation
  public writeValue(value: boolean): void {
    const checkedValue = value ?? false;

    this._internalChecked.set(checkedValue);

    if (this.inputRef?.nativeElement) {
      this.inputRef.nativeElement.checked = checkedValue;
    }
  }

  public registerOnChange(fn: (value: boolean) => void): void {
    this._isFormControlled = true;
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  public setDisabledState(_isDisabled: boolean): void {
    // the disabled state is handled via the disabled input
    // this method is required by ControlValueAccessor but the implementation
    // can be empty since we're using the disabled input signal
  }
}

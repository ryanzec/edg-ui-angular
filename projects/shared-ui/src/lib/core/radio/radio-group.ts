import {
  Component,
  ChangeDetectionStrategy,
  signal,
  forwardRef,
  contentChildren,
  effect,
  input,
  output,
  computed,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Radio } from './radio';
import { tailwindUtils } from '@organization/shared-utils';

@Component({
  selector: 'org-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './radio-group.html',
  host: {
    dataid: 'radio-group',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroup),
      multi: true,
    },
  ],
})
export class RadioGroup implements ControlValueAccessor {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onChange: (value: string) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onTouched: () => void = () => {};

  // Track if component is controlled by reactive forms
  private _isFormControlled = false;

  // Internal state for the selected value
  private readonly _internalValue = signal<string>('');

  // Optional inputs
  public value = input<string>('');
  public disabled = input<boolean>(false);
  public name = input<string>('');
  public validationMessage = input<string | null>(null);

  // Outputs
  public valueChange = output<string>();

  // Computed value - use internal state when using reactive forms, otherwise use input
  public readonly currentValue = computed<string>(() => {
    // If form-controlled, use internal state only
    if (this._isFormControlled) {
      return this._internalValue();
    }

    // Otherwise, use the value input (for simple binding)
    return this.value();
  });

  public readonly hasValidationMessage = computed<boolean>(() => !!this.validationMessage()?.trim());
  public readonly isInvalid = computed<boolean>(() => this.hasValidationMessage());

  public mergeClasses = tailwindUtils.merge;

  // Get all radio children - use forwardRef to handle circular dependency
  private readonly _radios = contentChildren(
    forwardRef(() => Radio),
    { descendants: true }
  );

  constructor() {
    // When value changes, update all child radios
    effect(() => {
      const currentValue = this.currentValue();
      const radios = this._radios();

      radios.forEach((radio) => {
        radio._setSelected(currentValue === radio.value());
      });
    });
  }

  // Called by child radio when selected
  public _onRadioSelect(value: string): void {
    if (this.disabled()) {
      return;
    }

    // Update internal state
    this._internalValue.set(value);

    // Notify form control (if form-controlled)
    this._onChange(value);
    this._onTouched();

    // Emit for simple binding
    this.valueChange.emit(value);
  }

  // ControlValueAccessor implementation
  public writeValue(value: string): void {
    this._internalValue.set(value ?? '');
  }

  public registerOnChange(fn: (value: string) => void): void {
    this._isFormControlled = true;
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  public setDisabledState(_isDisabled: boolean): void {
    // Disabled state is handled via the disabled input
    // Could be enhanced to programmatically set the input
  }
}

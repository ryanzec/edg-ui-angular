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
  inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Icon, IconName } from '../icon/icon';
import { tailwindUtils } from '@organization/shared-utils';
import { TextDirective, TextSize } from '../text-directive/text-directive';
import { ComponentSize } from '../types/component-types';
import { FORM_FIELD_COMPONENT } from '../form-field/form-field';

export type CheckboxSize = Extract<ComponentSize, 'sm' | 'base' | 'lg'>;

export const checkboxSizes: CheckboxSize[] = ['sm', 'base', 'lg'];

@Component({
  selector: 'org-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, TextDirective],
  templateUrl: './checkbox.html',
  host: {
    ['attr.data-testid']: 'checkbox',
    class: 'inline-flex',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Checkbox),
      multi: true,
    },
  ],
})
export class Checkbox implements ControlValueAccessor {
  private readonly _formField = inject(FORM_FIELD_COMPONENT, { optional: true, host: true });

  // control value accessor callbacks
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onChange: (value: boolean) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onTouched: () => void = () => {};

  // Track if component is controlled by reactive forms
  private _isFormControlled = false;

  // internal state for reactive forms
  private readonly _internalChecked = signal<boolean>(false);
  private readonly _internalIndeterminate = signal<boolean>(false);

  @ViewChild('inputRef', { static: true })
  public readonly inputRef!: ElementRef<HTMLInputElement>;

  // required inputs
  public name = input.required<string>();
  public value = input.required<string>();

  // optional inputs
  public checked = input<boolean>(false);
  public indeterminate = input<boolean>(false);
  public disabled = input<boolean>(false);
  public size = input<CheckboxSize>('base');
  public containerClass = input<string>('');

  // outputs
  public checkedChange = output<boolean>();
  public indeterminateChange = output<boolean>();

  // computed properties - use internal state when using reactive forms, otherwise use inputs
  public readonly isChecked = computed<boolean>(() => {
    // If form-controlled, use internal state only
    if (this._isFormControlled) {
      return this._internalChecked();
    }

    // Otherwise, use the checked input (for simple binding)
    return this.checked();
  });
  public readonly isIndeterminate = computed<boolean>(() => {
    if (this._isFormControlled) {
      return this._internalIndeterminate();
    }

    return this.indeterminate();
  });
  public readonly isDisabled = computed<boolean>(() => this.disabled());
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
      return 'check-square';
    }

    if (this.isIndeterminate()) {
      return 'minus-square';
    }

    return 'square';
  });

  public readonly hasValidationMessage = computed<boolean>(() => {
    return !!this._formField?.hasValidationMessage();
  });

  public readonly ariaDescribedBy = computed<string | null>(() => {
    if (this.hasValidationMessage()) {
      return `validation-message-${this.name()}`;
    }

    return null;
  });

  public readonly ariaInvalid = computed<boolean | null>(() => {
    if (this.hasValidationMessage()) {
      return true;
    }

    return null;
  });

  public mergeClasses = tailwindUtils.merge;

  protected onClick(event: Event): void {
    if (this.isDisabled()) {
      event.preventDefault();

      return;
    }

    event.preventDefault();

    const newChecked = this.isIndeterminate() ? true : !this.isChecked();
    const newIndeterminate = false;

    this._internalChecked.set(newChecked);
    this._internalIndeterminate.set(newIndeterminate);
    this._onChange(newChecked);
    this._onTouched();
    this.checkedChange.emit(newChecked);
    this.indeterminateChange.emit(newIndeterminate);
  }

  protected onKeyDown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.onClick(event);
    }
  }

  // control value accessor implementation
  public writeValue(value: boolean): void {
    const checkedValue = value ?? false;

    this._internalChecked.set(checkedValue);
    this._internalIndeterminate.set(false);

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

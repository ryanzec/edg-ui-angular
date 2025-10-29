import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
  inject,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Icon, type IconName } from '../icon/icon';
import { Tag } from '../tag/tag';
import { Subject } from 'rxjs';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { tailwindUtils } from '@organization/shared-utils';
import { FORM_FIELD_COMPONENT } from '../form-field/form-field';

export type InputVariant = 'bordered' | 'borderless';

export const inputVariants: InputVariant[] = ['bordered', 'borderless'];

export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';

export const inputTypes: InputType[] = ['text', 'password', 'email', 'number', 'tel', 'url'];

export type InlineItem = {
  id: string;
  label: string;
  removable?: boolean;
};

export type InputState = {
  isFocused: boolean;
  showPassword: boolean;
};

@Component({
  selector: 'org-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Tag],
  templateUrl: './input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Input),
      multi: true,
    },
  ],
})
export class Input implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _elementRef = inject(ElementRef<HTMLElement>);
  private readonly _formField = inject(FORM_FIELD_COMPONENT, { optional: true, host: true });

  // control value accessor callbacks
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onChange: (value: string) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onTouched: () => void = () => {};

  // Track if component is controlled by reactive forms
  private _isFormControlled = false;

  // we need the static to match sure we can bind the dom event to properly managed the focused state
  @ViewChild('inputRef', { static: true })
  public readonly inputRef!: ElementRef<HTMLInputElement>;

  /**
   * @internal Only exposed for testing purposes
   */
  public readonly _state = signal<InputState>({
    isFocused: false,
    showPassword: false,
  });

  // Input properties
  public variant = input<InputVariant>('bordered');
  public type = input<InputType>('text');
  public placeholder = input<string>('');
  public value = input<string>('');
  public disabled = input<boolean>(false);
  public readonly = input<boolean>(false);
  public preIcon = input<IconName | null>(null);
  public postIcon = input<IconName | null>(null);
  public inlineItems = input<InlineItem[]>([]);
  public selectAllOnFocus = input<boolean>(false);
  public autoFocus = input<boolean>(false);
  public showPasswordToggle = input<boolean>(false);
  public containerClass = input<string>('');
  public autocomplete = input<string>('off');
  public name = input.required<string>();
  public inputClass = input<string>('');
  public blockPasswordManager = input<boolean>(true);

  // needs in order to determine if the output event is being listened to
  private _preIconClicked$ = new Subject<void>();
  private _postIconClicked$ = new Subject<void>();

  // Output events
  public valueChange = output<string>();
  public preIconClicked = outputFromObservable(this._preIconClicked$);
  public postIconClicked = outputFromObservable(this._postIconClicked$);
  public inlineItemRemoved = output<InlineItem>();
  public focused = output<void>();
  public blurred = output<void>();

  // Computed properties
  public readonly isDisabled = computed(() => this.disabled());
  public readonly isReadonly = computed(() => this.readonly());
  public readonly isFocused = computed(() => this._state().isFocused);
  public readonly showPassword = computed(() => this._state().showPassword);

  public readonly currentInputType = computed(() => {
    if (this.type() === 'password' && this.showPasswordToggle()) {
      return this.showPassword() ? 'text' : 'password';
    }

    return this.type();
  });

  public readonly currentPostIcon = computed((): IconName | null => {
    if (this.showPasswordToggle() && this.type() === 'password') {
      return this.showPassword() ? 'eye-slash' : 'eye';
    }

    return this.postIcon();
  });

  public readonly hasPreIcon = computed(() => !!this.preIcon());
  public readonly hasPostIcon = computed(() => !!this.currentPostIcon());
  public readonly hasInlineItems = computed(() => this.inlineItems().length > 0);
  public readonly isPreIconClickable = computed(() => this._preIconClicked$.observed);
  public readonly isPostIconClickable = computed(() => this._postIconClicked$.observed);

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

  public ngOnInit(): void {
    this._focusMonitor.monitor(this.inputRef.nativeElement).subscribe((origin) => {
      const wasFocused = this._state().isFocused;
      const isFocused = !!origin;

      this._state.update((state) => ({
        ...state,
        isFocused,
      }));

      if (isFocused && !wasFocused) {
        this.focused.emit();

        if (this.selectAllOnFocus()) {
          this.inputRef.nativeElement.select();
        }
      } else if (!isFocused && wasFocused) {
        this.blurred.emit();
      }
    });

    // Sync initial value for simple binding mode
    if (!this._isFormControlled && this.value()) {
      this.inputRef.nativeElement.value = this.value();
    }
  }

  public ngAfterViewInit(): void {
    if (this.autoFocus()) {
      this.inputRef.nativeElement.focus();
    }
  }

  public ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this.inputRef.nativeElement);
  }

  public onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this._onChange(value);
    this.valueChange.emit(value);
  }

  public onBlur(): void {
    this._onTouched();
  }

  public onPreIconClick(_event: MouseEvent): void {
    if (this.isDisabled()) {
      return;
    }

    this._preIconClicked$.next();
  }

  public onPostIconClick(_event: MouseEvent): void {
    if (this.isDisabled()) {
      return;
    }

    if (this.showPasswordToggle() && this.type() === 'password') {
      this._state.update((state) => ({
        ...state,
        showPassword: !state.showPassword,
      }));
    } else {
      this._postIconClicked$.next();
    }
  }

  public onInlineItemRemove(item: InlineItem): void {
    if (this.isDisabled() || this.isReadonly()) {
      return;
    }

    this.inlineItemRemoved.emit(item);
  }

  public focusInput(): void {
    this.inputRef.nativeElement.focus();
  }

  // control value accessor implementation
  public writeValue(value: string): void {
    if (this.inputRef?.nativeElement) {
      this.inputRef.nativeElement.value = value ?? '';
    }
  }

  public registerOnChange(fn: (value: string) => void): void {
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

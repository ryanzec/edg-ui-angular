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

export type TextareaVariant = 'bordered' | 'borderless';

export const textareaVariants: TextareaVariant[] = ['bordered', 'borderless'];

export type TextareaIconAlignment = 'start' | 'center' | 'end';

export const textareaIconAlignments: TextareaIconAlignment[] = ['start', 'center', 'end'];

export type InlineItem = {
  id: string;
  label: string;
  removable?: boolean;
};

export type TextareaState = {
  isFocused: boolean;
};

@Component({
  selector: 'org-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Tag],
  templateUrl: './textarea.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Textarea),
      multi: true,
    },
  ],
})
export class Textarea implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
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
  @ViewChild('textareaRef', { static: true })
  public readonly textareaRef!: ElementRef<HTMLTextAreaElement>;

  /**
   * @internal Only exposed for testing purposes
   */
  public readonly _state = signal<TextareaState>({
    isFocused: false,
  });

  // Input properties
  public variant = input<TextareaVariant>('bordered');
  public placeholder = input<string>('');
  public value = input<string>('');
  public disabled = input<boolean>(false);
  public readonly = input<boolean>(false);
  public preIcon = input<IconName | null>(null);
  public postIcon = input<IconName | null>(null);
  public preIconAlignment = input<TextareaIconAlignment>('start');
  public postIconAlignment = input<TextareaIconAlignment>('end');
  public inlineItems = input<InlineItem[]>([]);
  public selectAllOnFocus = input<boolean>(false);
  public autoFocus = input<boolean>(false);
  public containerClass = input<string>('');
  public inverseEnter = input<boolean>(false);
  public rows = input<number>(3);
  public name = input.required<string>();

  // needs in order to determine if the output event is being listened to
  private _preIconClicked$ = new Subject<void>();
  private _postIconClicked$ = new Subject<void>();
  private _enterPressed$ = new Subject<void>();

  // Output events
  public valueChange = output<string>();
  public preIconClicked = outputFromObservable(this._preIconClicked$);
  public postIconClicked = outputFromObservable(this._postIconClicked$);
  public inlineItemRemoved = output<InlineItem>();
  public focused = output<void>();
  public blurred = output<void>();
  public enterPressed = outputFromObservable(this._enterPressed$);

  // Computed properties
  public readonly isDisabled = computed<boolean>(() => this.disabled());
  public readonly isReadonly = computed<boolean>(() => this.readonly());
  public readonly isFocused = computed<boolean>(() => this._state().isFocused);

  public readonly hasPreIcon = computed<boolean>(() => !!this.preIcon());
  public readonly hasPostIcon = computed<boolean>(() => !!this.postIcon());
  public readonly hasInlineItems = computed<boolean>(() => this.inlineItems().length > 0);
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
    this._focusMonitor.monitor(this.textareaRef.nativeElement).subscribe((origin) => {
      const wasFocused = this._state().isFocused;
      const isFocused = !!origin;

      this._state.update((state) => ({
        ...state,
        isFocused,
      }));

      if (isFocused && !wasFocused) {
        this.focused.emit();

        if (this.selectAllOnFocus()) {
          this.textareaRef.nativeElement.select();
        }
      } else if (!isFocused && wasFocused) {
        this.blurred.emit();
      }
    });

    // Sync initial value for simple binding mode
    if (!this._isFormControlled && this.value()) {
      this.textareaRef.nativeElement.value = this.value();
    }
  }

  public ngAfterViewInit(): void {
    if (this.autoFocus()) {
      this.textareaRef.nativeElement.focus();
    }
  }

  public ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this.textareaRef.nativeElement);
  }

  public onInputChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    const value = target.value;

    this._onChange(value);
    this.valueChange.emit(value);
  }

  public onBlur(): void {
    this._onTouched();
  }

  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const shouldSubmit = this.inverseEnter() ? !event.shiftKey : event.shiftKey;

      if (shouldSubmit) {
        event.preventDefault();
        this._enterPressed$.next();
      }
      // if not submitting, let the default behavior happen (new line)
    }
  }

  public onPreIconClick(): void {
    if (this.isDisabled() || this.isReadonly()) {
      return;
    }

    this._preIconClicked$.next();
  }

  public onPostIconClick(): void {
    if (this.isDisabled() || this.isReadonly()) {
      return;
    }

    this._postIconClicked$.next();
  }

  public onInlineItemRemove(item: InlineItem): void {
    if (this.isDisabled() || this.isReadonly()) {
      return;
    }

    this.inlineItemRemoved.emit(item);
  }

  public focusTextarea(): void {
    this.textareaRef.nativeElement.focus();
  }

  // control value accessor implementation
  public writeValue(value: string): void {
    if (this.textareaRef?.nativeElement) {
      this.textareaRef.nativeElement.value = value ?? '';
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

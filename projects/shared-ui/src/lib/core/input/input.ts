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
} from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Icon, type IconName } from '../icon/icon';
import { Tag } from '../tag/tag';
import { Subject } from 'rxjs';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { tailwindUtils } from '@organization/shared-utils';

export const InputVariant = {
  BORDERED: 'bordered',
  BORDERLESS: 'borderless',
} as const;

export type InputVariant = (typeof InputVariant)[keyof typeof InputVariant];

export const inputVariants = Object.values(InputVariant);

export const InputType = {
  TEXT: 'text',
  PASSWORD: 'password',
  EMAIL: 'email',
  NUMBER: 'number',
  TEL: 'tel',
  URL: 'url',
} as const;

export type InputType = (typeof InputType)[keyof typeof InputType];

export const inputTypes = Object.values(InputType);

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
  styleUrl: './input.css',
})
export class Input implements OnInit, OnDestroy, AfterViewInit {
  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _elementRef = inject(ElementRef<HTMLElement>);

  @ViewChild('inputElement', { static: true })
  private readonly _inputElementRef!: ElementRef<HTMLInputElement>;

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
  public validationMessage = input<string>('');
  public containerClass = input<string>('');

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
  public readonly hasValidationMessage = computed(() => !!this.validationMessage().trim());
  public readonly isInvalid = computed(() => this.hasValidationMessage());

  public readonly containerClasses = computed<string>(() => {
    const baseClasses = ['relative', 'inline-flex', 'items-center', 'w-full', 'transition-all', 'duration-200'];

    const variantClasses = {
      bordered: [
        'border',
        'rounded-md',
        'bg-input-background-default',
        this.isInvalid() && !this.isFocused()
          ? 'border-input-border-error'
          : this.isFocused()
            ? this.isInvalid()
              ? 'border-input-border-error ring-1 ring-input-ring-error'
              : 'border-input-border-focused ring-1 ring-input-ring-focused'
            : 'border-input-border-default',
        this.isDisabled() ? 'bg-input-background-disabled border-input-border-default' : '',
      ],
      borderless: [
        'border-0',
        'bg-input-background-default',
        this.isFocused() ? (this.isInvalid() ? '' : '') : this.isInvalid() ? 'ring-input-ring-error' : '',
        this.isDisabled() ? 'bg-input-background-disabled' : '',
      ],
    };

    // the min height is to make sure inputs with icons and without are consistent
    const defaultClasses = 'px-1.5 py-0.5 gap-1 min-h-[30px]';

    const stateClasses = [];

    if (this.isDisabled()) {
      stateClasses.push('cursor-not-allowed', 'opacity-50');
    }

    return tailwindUtils.merge(
      [...baseClasses, ...variantClasses[this.variant()], defaultClasses, ...stateClasses, this.containerClass()]
        .filter(Boolean)
        .join(' ')
    );
  });

  public readonly inputClasses = computed<string>(() => {
    const baseClasses = [
      'flex-1',
      'bg-transparent',
      'border-0',
      'outline-none',
      'placeholder-input-text-placeholder',
      'text-base',
    ];

    const stateClasses = [];

    if (this.isDisabled()) {
      stateClasses.push('cursor-not-allowed');
    } else if (this.isReadonly()) {
      stateClasses.push('cursor-default');
    }

    return tailwindUtils.merge([...baseClasses, ...stateClasses].join(' '));
  });

  public readonly preIconClasses = computed<string>(() => {
    const baseClasses = ['flex-shrink-0', 'text-input-icon'];

    const stateClasses = [];

    if (!this.isDisabled() && !this.isReadonly() && this._preIconClicked$.observed) {
      stateClasses.push('cursor-pointer', 'hover:text-input-icon-hover');
    }

    return tailwindUtils.merge([...baseClasses, ...stateClasses].join(' '));
  });

  public readonly postIconClasses = computed<string>(() => {
    const baseClasses = ['flex-shrink-0', 'text-input-icon'];

    const stateClasses = [];

    if (this.showPasswordToggle() || (!this.isDisabled() && !this.isReadonly() && this._postIconClicked$.observed)) {
      stateClasses.push('cursor-pointer', 'hover:text-input-icon-hover');
    }

    return tailwindUtils.merge([...baseClasses, ...stateClasses].join(' '));
  });

  public readonly validationMessageClasses = computed(() => {
    const baseClasses = ['text-input-validation-error', 'transition-all', 'duration-200', 'text-sm', 'mt-1.5'];

    const visibilityClass = this.hasValidationMessage() ? 'visible' : 'invisible';

    return tailwindUtils.merge([...baseClasses, visibilityClass].join(' '));
  });

  public readonly hostClasses = computed(() => {
    return tailwindUtils.merge('inline-block w-full');
  });

  public mergeClasses = tailwindUtils.merge;

  public ngOnInit(): void {
    this._focusMonitor.monitor(this._inputElementRef.nativeElement).subscribe((origin) => {
      const wasFocused = this._state().isFocused;
      const isFocused = !!origin;

      this._state.update((state) => ({
        ...state,
        isFocused,
      }));

      if (isFocused && !wasFocused) {
        this.focused.emit();

        if (this.selectAllOnFocus()) {
          this._inputElementRef.nativeElement.select();
        }
      } else if (!isFocused && wasFocused) {
        this.blurred.emit();
      }
    });
  }

  public ngAfterViewInit(): void {
    if (this.autoFocus()) {
      this._inputElementRef.nativeElement.focus();
    }
  }

  public ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._inputElementRef.nativeElement);
  }

  public handleInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.valueChange.emit(target.value);
  }

  public handlePreIconClick(): void {
    if (this.isDisabled() || this.isReadonly()) {
      return;
    }

    this._preIconClicked$.next();
  }

  public handlePostIconClick(): void {
    if (this.isDisabled() || this.isReadonly()) {
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

  public handleInlineItemRemove(item: InlineItem): void {
    if (this.isDisabled() || this.isReadonly()) {
      return;
    }

    this.inlineItemRemoved.emit(item);
  }

  public focusInput(): void {
    this._inputElementRef.nativeElement.focus();
  }
}

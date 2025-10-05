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
})
export class Input implements OnInit, OnDestroy, AfterViewInit {
  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _elementRef = inject(ElementRef<HTMLElement>);

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
  public readonly isPreIconClickable = computed(() => this._preIconClicked$.observed);
  public readonly isPostIconClickable = computed(() => this._postIconClicked$.observed);

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
  }

  public ngAfterViewInit(): void {
    if (this.autoFocus()) {
      this.inputRef.nativeElement.focus();
    }
  }

  public ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this.inputRef.nativeElement);
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
    this.inputRef.nativeElement.focus();
  }
}

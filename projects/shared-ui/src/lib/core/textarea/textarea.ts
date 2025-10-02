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

export const TextareaVariant = {
  BORDERED: 'bordered',
  BORDERLESS: 'borderless',
} as const;

export type TextareaVariant = (typeof TextareaVariant)[keyof typeof TextareaVariant];

export const textareaVariants = Object.values(TextareaVariant);

export const IconAlignment = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
} as const;

export type IconAlignment = (typeof IconAlignment)[keyof typeof IconAlignment];

export const iconAlignments = Object.values(IconAlignment);

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
  styleUrl: './textarea.css',
})
export class Textarea implements OnInit, OnDestroy, AfterViewInit {
  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _elementRef = inject(ElementRef<HTMLElement>);

  @ViewChild('textareaElement', { static: true })
  private readonly _textareaElementRef!: ElementRef<HTMLTextAreaElement>;

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
  public preIconAlignment = input<IconAlignment>('start');
  public postIconAlignment = input<IconAlignment>('end');
  public inlineItems = input<InlineItem[]>([]);
  public selectAllOnFocus = input<boolean>(false);
  public autoFocus = input<boolean>(false);
  public validationMessage = input<string>('');
  public containerClass = input<string>('');
  public inverseEnter = input<boolean>(false);
  public rows = input<number>(3);

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
  public readonly hasValidationMessage = computed<boolean>(() => !!this.validationMessage().trim());
  public readonly isInvalid = computed<boolean>(() => this.hasValidationMessage());

  public readonly containerClasses = computed<string>(() => {
    const baseClasses = ['relative', 'inline-flex', 'w-full', 'transition-all', 'duration-200'];

    const variantClasses = {
      bordered: [
        'border',
        'rounded-md',
        'bg-textarea-background-default',
        this.isInvalid() && !this.isFocused()
          ? 'border-textarea-border-error'
          : this.isFocused()
            ? this.isInvalid()
              ? 'border-textarea-border-error ring-1 ring-textarea-ring-error'
              : 'border-textarea-border-focused ring-1 ring-textarea-ring-focused'
            : 'border-textarea-border-default',
        this.isDisabled() ? 'bg-textarea-background-disabled border-textarea-border-default' : '',
      ],
      borderless: [
        'border-0',
        'bg-textarea-background-default',
        this.isFocused() ? (this.isInvalid() ? '' : '') : this.isInvalid() ? 'ring-textarea-ring-error' : '',
        this.isDisabled() ? 'bg-textarea-background-disabled' : '',
      ],
    };

    // the min height is to make sure textareas with icons and without are consistent
    const defaultClasses = 'px-1.5 py-0.5 gap-1 min-h-[70px] bg-input-background';

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

  public readonly textareaClasses = computed<string>(() => {
    const baseClasses = [
      'flex-1',
      'border-0',
      'outline-none',
      'placeholder-textarea-text-placeholder',
      'text-base',
      'resize-none',
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
    const baseClasses = ['flex-shrink-0', 'text-textarea-icon'];

    const alignmentClasses = {
      start: 'self-start',
      center: 'self-center',
      end: 'self-end',
    };

    const stateClasses = [];

    if (!this.isDisabled() && !this.isReadonly() && this._preIconClicked$.observed) {
      stateClasses.push('cursor-pointer', 'hover:text-textarea-icon-hover');
    }

    return tailwindUtils.merge([...baseClasses, alignmentClasses[this.preIconAlignment()], ...stateClasses].join(' '));
  });

  public readonly postIconClasses = computed<string>(() => {
    const baseClasses = ['flex-shrink-0', 'text-textarea-icon'];

    const alignmentClasses = {
      start: 'self-start',
      center: 'self-center',
      end: 'self-end',
    };

    const stateClasses = [];

    if (!this.isDisabled() && !this.isReadonly() && this._postIconClicked$.observed) {
      stateClasses.push('cursor-pointer', 'hover:text-textarea-icon-hover');
    }

    return tailwindUtils.merge([...baseClasses, alignmentClasses[this.postIconAlignment()], ...stateClasses].join(' '));
  });

  public readonly validationMessageClasses = computed<string>(() => {
    const baseClasses = ['text-textarea-validation-error', 'transition-all', 'duration-200', 'text-sm', 'mt-1.5'];

    const visibilityClass = this.hasValidationMessage() ? 'visible' : 'invisible';

    return tailwindUtils.merge([...baseClasses, visibilityClass].join(' '));
  });

  public readonly hostClasses = computed<string>(() => {
    return tailwindUtils.merge('inline-block w-full');
  });

  public mergeClasses = tailwindUtils.merge;

  public ngOnInit(): void {
    this._focusMonitor.monitor(this._textareaElementRef.nativeElement).subscribe((origin) => {
      const wasFocused = this._state().isFocused;
      const isFocused = !!origin;

      this._state.update((state) => ({
        ...state,
        isFocused,
      }));

      if (isFocused && !wasFocused) {
        this.focused.emit();

        if (this.selectAllOnFocus()) {
          this._textareaElementRef.nativeElement.select();
        }
      } else if (!isFocused && wasFocused) {
        this.blurred.emit();
      }
    });
  }

  public ngAfterViewInit(): void {
    if (this.autoFocus()) {
      this._textareaElementRef.nativeElement.focus();
    }
  }

  public ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._textareaElementRef.nativeElement);
  }

  public handleInputChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;

    this.valueChange.emit(target.value);
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const shouldSubmit = this.inverseEnter() ? !event.shiftKey : event.shiftKey;

      if (shouldSubmit) {
        event.preventDefault();
        this._enterPressed$.next();
      }
      // if not submitting, let the default behavior happen (new line)
    }
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

    this._postIconClicked$.next();
  }

  public handleInlineItemRemove(item: InlineItem): void {
    if (this.isDisabled() || this.isReadonly()) {
      return;
    }

    this.inlineItemRemoved.emit(item);
  }

  public focusTextarea(): void {
    this._textareaElementRef.nativeElement.focus();
  }
}

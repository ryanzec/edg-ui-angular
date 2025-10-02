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
  public readonly isPreIconClickable = computed(() => this._preIconClicked$.observed);
  public readonly isPostIconClickable = computed(() => this._postIconClicked$.observed);

  public readonly containerClasses = computed<string>(() => {
    const baseClasses = ['org-textarea-container'];
    const variantClass = this.variant();
    const stateClasses = [];

    if (this.isInvalid()) {
      stateClasses.push('invalid');
    }

    if (this.isDisabled()) {
      stateClasses.push('disabled');
    }

    return tailwindUtils.merge(
      [...baseClasses, variantClass, ...stateClasses, this.containerClass()].filter(Boolean).join(' ')
    );
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

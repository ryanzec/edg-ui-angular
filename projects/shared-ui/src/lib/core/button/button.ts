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
} from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Icon } from '../icon/icon';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import { type IconName } from '../icon/icon';
import { ComponentColor, ComponentSize } from '../types/component-types';
import { tailwindUtils } from '@organization/shared-utils';

export type ButtonColor = ComponentColor;

export type ButtonSize = Extract<ComponentSize, 'sm' | 'base' | 'lg'>;

export type ButtonType = 'button' | 'submit' | 'reset';

export type ButtonVariant = 'filled' | 'ghost' | 'text';

export type ButtonState = {
  isPressed: boolean;
  isFocused: boolean;
};

@Component({
  selector: 'org-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, LoadingSpinner],
  templateUrl: './button.html',
  styleUrl: './button.css',
  host: {
    class: 'inline-flex',
  },
})
export class Button implements OnInit, OnDestroy {
  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _elementRef = inject(ElementRef<HTMLElement>);

  /**
   * @internal Only exposed for testing purposes
   */
  private readonly _state = signal<ButtonState>({
    isPressed: false,
    isFocused: false,
  });

  /**
   * @internal Only exposed for testing purposes
   */
  public get _stateForTesting(): ButtonState {
    return this._state();
  }

  public color = input<ButtonColor>('primary');
  public size = input<ButtonSize>('base');
  public variant = input<ButtonVariant>('filled');
  public disabled = input<boolean>(false);
  public loading = input<boolean>(false);
  public preIcon = input<IconName | null>(null);
  public postIcon = input<IconName | null>(null);
  public icon = input<IconName | null>(null);
  public type = input<ButtonType>('button');
  public excludeSpacing = input<boolean>(false);
  public buttonClass = input<string>('');

  public clicked = output<void>();

  public readonly isLoading = computed(() => this.loading());
  public readonly isDisabled = computed(() => this.disabled() || this.isLoading());
  public readonly isIconOnly = computed<boolean>(() => {
    return !!this.icon();
  });

  public mergeClasses = tailwindUtils.merge;

  public ngOnInit(): void {
    this._focusMonitor.monitor(this._elementRef.nativeElement).subscribe((origin) => {
      queueMicrotask(() => {
        this._state.update((state) => ({
          ...state,
          isFocused: !!origin,
        }));
      });
    });
  }

  public ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
  }

  public onClick(): void {
    if (this.isDisabled()) {
      return;
    }

    this.clicked.emit();
  }

  public onMouseDown(): void {
    if (this.isDisabled()) {
      return;
    }

    this._state.update((state) => ({
      ...state,
      isPressed: true,
    }));
  }

  public onMouseUp(): void {
    this._state.update((state) => ({
      ...state,
      isPressed: false,
    }));
  }

  public onMouseLeave(): void {
    this._state.update((state) => ({
      ...state,
      isPressed: false,
    }));
  }
}

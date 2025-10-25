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
  effect,
  untracked,
  AfterViewInit,
  afterNextRender,
  inject,
  Injector,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Input, type InlineItem } from '../input/input';
import { List } from '../list/list';
import { ListItem } from '../list/list-item';
import { ScrollAreaDirective } from '../scroll-area-directive/scroll-area-directive';
import { domUtils, tailwindUtils } from '@organization/shared-utils';
import {
  ComboboxStore,
  type ComboboxOption,
  type ComboboxOptionInput,
  type ComboboxGroupedOptions,
} from '../combobox-store/combobox-store';
import { outputFromObservable } from '@angular/core/rxjs-interop';

/**
 * internal state for the combobox component
 */
type ComboboxState = {
  isFocused: boolean;
  isScrollNeeded: boolean;
};

/**
 * combobox component for single/multi-select autocomplete functionality
 */
@Component({
  selector: 'org-combobox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Input, CdkOverlayOrigin, CdkConnectedOverlay, List, ListItem, ScrollAreaDirective],
  templateUrl: './combobox.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Combobox),
      multi: true,
    },
  ],
  host: {
    dataid: 'combobox',
  },
})
export class Combobox implements AfterViewInit, ControlValueAccessor {
  private readonly _store = new ComboboxStore();
  private readonly _injector = inject(Injector);

  // control value accessor callbacks
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onChange: (value: (string | number)[]) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onTouched: () => void = () => {};

  // track if component is controlled by reactive forms
  private _isFormControlled = false;

  // track if we're in initialization to prevent marking form as dirty
  private _isInitializing = true;

  @ViewChild('inputComponent', { static: true })
  public readonly inputComponent!: Input;

  @ViewChild('optionsContainer')
  public readonly optionsContainer?: ElementRef<HTMLDivElement>;

  @ViewChild(CdkConnectedOverlay)
  public readonly connectedOverlay?: CdkConnectedOverlay;

  /**
   * @internal Only exposed for testing purposes
   */
  public readonly _state = signal<ComboboxState>({
    isFocused: false,
    isScrollNeeded: false,
  });

  // input properties
  public autoShowOption = input<boolean>(true);
  public allowNewOptions = input<boolean>(false);
  public isMultiSelect = input<boolean>(false);
  public optionFilter = input<((inputValue: string, option: ComboboxOption) => boolean) | null>(null);
  public placeholder = input<string>('Select...');
  public isGroupingEnabled = input<boolean>(false);
  public options = input<ComboboxOptionInput[]>([]);
  public disabled = input<boolean>(false);
  public validationMessage = input<string | null>(null);
  public containerClass = input<string>('');
  public name = input.required<string>();

  // output events - proxy from store
  public inputValueChanged = outputFromObservable(this._store.inputValueChanged$);
  public selectedValuesChanged = outputFromObservable(this._store.selectedValuesChanged$);
  public focusedOptionChanged = outputFromObservable(this._store.focusedOptionChanged$);
  public isOpenedChanged = outputFromObservable(this._store.isOpenedChanged$);

  // additional output events
  public focused = output<void>();
  public blurred = output<void>();

  // computed properties
  public readonly isFocused = computed<boolean>(() => this._state().isFocused);
  public readonly isScrollNeeded = computed<boolean>(() => this._state().isScrollNeeded);
  public readonly isOpened = computed<boolean>(() => this._store.isOpened());
  public readonly filteredOptions = computed<ComboboxOption[]>(() => this._store.filteredOptions());
  public readonly filteredGroupedOptions = computed<ComboboxGroupedOptions[]>(() =>
    this._store.filteredGroupedOptions()
  );
  public readonly selectedOptions = computed<ComboboxOption[]>(() => this._store.selectedOptions());
  public readonly focusedOption = computed<ComboboxOption | null>(() => this._store.focusedOption());
  public readonly inputValue = computed<string>(() => this._store.inputValue());
  public readonly hasValidationMessage = computed<boolean>(() => !!this.validationMessage()?.trim());
  public readonly hasFilteredOptions = computed<boolean>(() => this.filteredOptions().length > 0);
  public readonly isDisabled = computed<boolean>(() => this.disabled());

  /**
   * inline items for multi-select display
   */
  public readonly inlineItems = computed<InlineItem[]>(() => {
    if (!this.isMultiSelect()) {
      return [];
    }

    return this.selectedOptions().map((option) => ({
      id: String(option.value),
      label: option.label,
      removable: true,
    }));
  });

  /**
   * input value for the input component
   */
  public readonly currentInputValue = computed<string>(() => {
    if (this.isMultiSelect()) {
      return this.inputValue();
    }

    // in single select mode, show selected option label when not focused
    if (!this.isFocused() && this.selectedOptions().length > 0) {
      return this.selectedOptions()[0].label;
    }

    return this.inputValue();
  });

  public mergeClasses = tailwindUtils.merge;

  /**
   * overlay position configurations
   */
  public readonly overlayPositions = [
    {
      originX: 'start' as const,
      originY: 'bottom' as const,
      overlayX: 'start' as const,
      overlayY: 'top' as const,
      // this need to account for the spacing that is reserved for the validation message so it is negative to
      // bring it up instead or positive to bring it down
      offsetY: -20,
    },
    {
      originX: 'start' as const,
      originY: 'top' as const,
      overlayX: 'start' as const,
      overlayY: 'bottom' as const,
      offsetY: -4,
    },
  ];

  constructor() {
    // initialize store (use untracked to avoid triggering effects during init)
    untracked(() => {
      this._store.initialize(this.options(), {
        isMultiSelect: this.isMultiSelect(),
        allowNewOptions: this.allowNewOptions(),
        optionFilter: this.optionFilter(),
        isGroupingEnabled: this.isGroupingEnabled(),
      });
    });

    // sync options when they change (skip first run since we just initialized)
    effect(() => {
      const currentOptions = this.options();
      untracked(() => {
        this._store.setOptions(currentOptions);
      });
    });

    // sync config when inputs change (skip first run since we just initialized)
    effect(() => {
      const config = {
        isMultiSelect: this.isMultiSelect(),
        allowNewOptions: this.allowNewOptions(),
        optionFilter: this.optionFilter(),
        isGroupingEnabled: this.isGroupingEnabled(),
      };
      untracked(() => {
        this._store.setConfig(config);
      });
    });

    // sync selected values changes to form control (skip during initialization)
    effect(() => {
      const selectedValues = this._store.selectedValues();

      if (this._isFormControlled && !this._isInitializing) {
        untracked(() => {
          this._onChange(selectedValues);
        });
      }
    });

    // scroll focused option into view when it changes
    effect(() => {
      const focusedOption = this.focusedOption();

      if (focusedOption && this.isOpened()) {
        untracked(() => {
          this._scrollFocusedOptionIntoView(focusedOption);
        });
      }
    });

    // update overlay position when selected values change in multi-select mode
    effect(() => {
      const selectedOptions = this.selectedOptions();
      const isMultiSelect = this.isMultiSelect();
      const isOpened = this.isOpened();

      if (isMultiSelect && isOpened && selectedOptions) {
        untracked(() => {
          this._updateOverlayPosition();
        });
      }
    });

    // check if scrolling is needed when overlay opens or filtered options change
    effect(() => {
      const isOpened = this.isOpened();
      const filteredOptions = this.filteredOptions();

      if (isOpened && filteredOptions) {
        untracked(() => {
          this._checkScrollNeeded();
        });
      }
    });
  }

  public ngAfterViewInit(): void {
    // mark initialization as complete after view is initialized
    // this ensures writeValue has been called if there's an initial value
    this._isInitializing = false;
  }

  /**
   * handles input value changes
   */
  public handleInputValueChange(value: string): void {
    this._store.setInputValue(value);

    // open menu when typing if auto show is enabled
    if (this.autoShowOption() && value.length > 0 && !this.isOpened()) {
      this._store.open();
    }
  }

  /**
   * handles input focus
   */
  public handleInputFocus(): void {
    this._state.update((state) => ({ ...state, isFocused: true }));
    this.focused.emit();

    // auto show options on focus
    if (this.autoShowOption()) {
      this._store.open();
    }
  }

  /**
   * handles input click - opens menu when clicked
   */
  public handleInputClick(): void {
    const currentIsFocused = this._state().isFocused;

    // there is a small area where the input is clicked but but not focused so thi make sure that spot properly
    // focuses the input
    if (currentIsFocused === false) {
      this.inputComponent.focusInput();
    }

    // open menu if it's not already open
    if (!this.isOpened()) {
      this._store.open();
    }
  }

  /**
   * handles input blur
   */
  public handleInputBlur(): void {
    this._state.update((state) => ({ ...state, isFocused: false }));
    this._onTouched();
    this.blurred.emit();

    // close options menu
    this._store.close();

    // handle input value based on selection
    const selectedOptions = this.selectedOptions();

    if (selectedOptions.length === 0) {
      // no selection - clear input and emit empty array
      this._store.clearInputValue();

      if (this._isFormControlled) {
        this._onChange([]);
      }
    } else if (!this.isMultiSelect()) {
      // single select mode - set input to selected option label
      this._store.setInputValue(selectedOptions[0].label);
    } else {
      // multi select mode - clear input
      this._store.clearInputValue();
    }
  }

  /**
   * handles keyboard navigation
   */
  public handleKeyDown(event: KeyboardEvent): void {
    const key = event.key;

    switch (key) {
      case 'Enter':
        event.preventDefault();
        this._handleEnterKey();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this._handleArrowDownKey();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this._handleArrowUpKey();
        break;
      case 'Home':
        event.preventDefault();
        this._handleHomeKey();
        break;
      case 'End':
        event.preventDefault();
        this._handleEndKey();
        break;
      case 'Escape':
        event.preventDefault();
        this._handleEscapeKey();
        break;
    }
  }

  /**
   * handles option mousedown to prevent blur and select option
   */
  public handleOptionMouseDown(event: MouseEvent, option: ComboboxOption): void {
    // prevent blur event on input when clicking option
    event.preventDefault();

    if (option.disabled) {
      return;
    }

    this._selectOption(option);
  }

  /**
   * handles option mouse enter to prevent blur and select option
   */
  public handleOptionMouseEnter(event: MouseEvent, option: ComboboxOption): void {
    event.preventDefault();

    this._store.setFocusedOption(option);
  }

  /**
   * handles option mouse leave to prevent blur and select option
   */
  public handleOptionMouseLeave(event: MouseEvent, _option: ComboboxOption): void {
    event.preventDefault();

    this._store.setFocusedOption(null);
  }

  /**
   * handles inline item removal (multi-select tags)
   */
  public handleInlineItemRemove(item: InlineItem): void {
    const currentSelected = this._store.selectedValues();
    const newSelected = currentSelected.filter((value) => String(value) !== item.id);
    this._store.setSelectedValues(newSelected);

    // focus input after removal
    this.inputComponent.focusInput();
  }

  /**
   * public api: get selected options
   */
  public getSelectedOptions(): ComboboxOption[] {
    return this.selectedOptions();
  }

  /**
   * public api: set selected options
   */
  public setSelectedOptions(values: (string | number)[]): void {
    this._store.setSelectedValues(values);
  }

  /**
   * public api: open the combobox
   */
  public open(): void {
    this._store.open();
  }

  /**
   * public api: close the combobox
   */
  public close(): void {
    this._store.close();
  }

  // control value accessor implementation
  public writeValue(value: (string | number)[]): void {
    // there seem to be cases where the options are updated for the component but not the store to this ensure
    // that works properly
    this._store.setOptions(this.options());

    if (value) {
      this._store.setSelectedValues(value);
    } else {
      this._store.setSelectedValues([]);
    }
  }

  public registerOnChange(fn: (value: (string | number)[]) => void): void {
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

  /**
   * handles enter key press
   */
  private _handleEnterKey(): void {
    const focusedOption = this.focusedOption();

    if (focusedOption && !focusedOption.disabled) {
      this._selectOption(focusedOption);
    }
  }

  /**
   * handles arrow down key press
   */
  private _handleArrowDownKey(): void {
    // open menu if closed
    if (!this.isOpened()) {
      this._store.open();
    }

    // navigate focus
    if (this.isGroupingEnabled()) {
      if (!this.focusedOption()) {
        this._store.groupFocusFirst();
      } else {
        this._store.groupFocusNext();
      }
    } else {
      if (!this.focusedOption()) {
        this._store.focusFirst();
      } else {
        this._store.focusNext();
      }
    }
  }

  /**
   * handles arrow up key press
   */
  private _handleArrowUpKey(): void {
    // open menu if closed
    if (!this.isOpened()) {
      this._store.open();
    }

    // navigate focus
    if (this.isGroupingEnabled()) {
      if (!this.focusedOption()) {
        this._store.groupFocusLast();
      } else {
        this._store.groupFocusPrevious();
      }
    } else {
      if (!this.focusedOption()) {
        this._store.focusLast();
      } else {
        this._store.focusPrevious();
      }
    }
  }

  /**
   * handles home key press
   */
  private _handleHomeKey(): void {
    if (this.isGroupingEnabled()) {
      this._store.groupFocusFirst();
    } else {
      this._store.focusFirst();
    }
  }

  /**
   * handles end key press
   */
  private _handleEndKey(): void {
    if (this.isGroupingEnabled()) {
      this._store.groupFocusLast();
    } else {
      this._store.focusLast();
    }
  }

  /**
   * handles escape key press
   */
  private _handleEscapeKey(): void {
    if (this.isOpened()) {
      this._store.close();
    } else {
      // blur the input
      this.inputComponent.inputRef.nativeElement.blur();
    }
  }

  /**
   * selects an option
   */
  private _selectOption(option: ComboboxOption): void {
    const currentSelected = this._store.selectedValues();

    if (this.isMultiSelect()) {
      // multi-select: add to selection if not already selected
      if (!currentSelected.includes(option.value)) {
        this._store.setSelectedValues([...currentSelected, option.value]);
      }

      // clear input and keep menu open
      this._store.clearInputValue();

      // focus input
      this.inputComponent.focusInput();
    } else {
      // single-select: replace selection
      this._store.setSelectedValues([option.value]);

      // close menu
      this._store.close();
    }
  }

  /**
   * scrolls the focused option into view only if completely out of view
   */
  private _scrollFocusedOptionIntoView(focusedOption: ComboboxOption): void {
    // wait for next render to ensure DOM is updated
    afterNextRender(
      () => {
        if (!this.optionsContainer) {
          return;
        }

        const container = this.optionsContainer.nativeElement;
        const focusedElement = container.querySelector(`[data-option-value="${focusedOption.value}"]`);

        if (focusedElement) {
          const isCompletelyOutOfView = domUtils.isElementOutOfView(container, focusedElement as HTMLElement);

          console.log('isCompletelyOutOfView', isCompletelyOutOfView);

          if (isCompletelyOutOfView) {
            focusedElement.scrollIntoView({
              block: 'nearest',
              inline: 'nearest',
            });
          }
        }
      },
      { injector: this._injector }
    );
  }

  /**
   * updates the overlay position to account for changes in origin size
   */
  private _updateOverlayPosition(): void {
    // wait for next render to ensure DOM is updated with new inline items
    afterNextRender(
      () => {
        if (this.connectedOverlay) {
          // use CDK's updatePosition method (preferred)
          this.connectedOverlay.overlayRef?.updatePosition();
        } else {
          // fallback: force position recalculation using native APIs
          // this shouldn't typically be needed as CDK handles this well
          const trigger = this.inputComponent?.inputRef?.nativeElement;

          if (trigger) {
            // trigger a reflow to ensure layout is up-to-date
            void trigger.offsetHeight;
          }
        }
      },
      { injector: this._injector }
    );
  }

  /**
   * checks if the options container needs scrolling
   */
  private _checkScrollNeeded(): void {
    // wait for next render to ensure DOM is updated
    afterNextRender(
      () => {
        if (!this.optionsContainer) {
          this._state.update((state) => ({ ...state, isScrollNeeded: false }));

          return;
        }

        const container = this.optionsContainer.nativeElement;
        const isScrollNeeded = domUtils.hasScrollableContent(container, 'vertical');

        this._state.update((state) => ({ ...state, isScrollNeeded }));
      },
      { injector: this._injector }
    );
  }
}

import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
  ViewChild,
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
import { DateTime } from 'luxon';
import { Input } from '../input/input';
import { Calendar, CalendarPartialRangeSelectionType } from '../calendar/calendar';
import { DateFormat, TimeFormat } from '@organization/shared-utils';
import { tailwindUtils } from '@organization/shared-utils';

type DatePickerInputState = {
  selectedStartDate: DateTime | null;
  selectedEndDate: DateTime | null;
  disabled: boolean;
};

/**
 * date picker input component for date selection in forms
 */
@Component({
  selector: 'org-date-picker-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Input, CdkOverlayOrigin, CdkConnectedOverlay, Calendar],
  templateUrl: './date-picker-input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerInput),
      multi: true,
    },
  ],
  host: {
    dataid: 'date-picker-input',
  },
})
export class DatePickerInput implements AfterViewInit, ControlValueAccessor {
  private readonly _injector = inject(Injector);

  // control value accessor callbacks
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onChange: (value: { startDate: DateTime | null; endDate: DateTime | null }) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onTouched: () => void = () => {};

  // track if component is controlled by reactive forms
  private _isFormControlled = false;

  // track if we're in initialization to prevent marking form as dirty
  private _isInitializing = true;

  // track the last emitted value to detect changes
  private _lastEmittedValue: { startDate: DateTime | null; endDate: DateTime | null } = {
    startDate: null,
    endDate: null,
  };

  /**
   * internal state for form control values
   * used when the component is form-controlled
   */
  private readonly _state = signal<DatePickerInputState>({
    selectedStartDate: null,
    selectedEndDate: null,
    disabled: false,
  });

  @ViewChild('inputComponent', { static: true })
  public readonly inputComponent!: Input;

  @ViewChild('calendarComponent')
  public readonly calendarComponent?: Calendar;

  @ViewChild(CdkConnectedOverlay)
  public readonly connectedOverlay?: CdkConnectedOverlay;

  /**
   * tracks the overlay open state (synced with CDK overlay attach/detach events)
   */
  private readonly _isOverlayOpen = signal<boolean>(false);

  // custom input properties
  public dateFormat = input<DateFormat>(DateFormat.STANDARD);
  public timeFormat = input<TimeFormat | null>(null);
  public allowPartialRangeSelection = input<boolean>(false);
  public partialRangeSelectionType = input<CalendarPartialRangeSelectionType>('range');

  // proxied input properties - input component
  public placeholder = input<string>('Select date...');
  public autoFocus = input<boolean>(false);
  public name = input.required<string>();

  // proxied input properties - calendar component
  public defaultDisplayDate = input<DateTime>(DateTime.now());
  public startYear = input<number>(DateTime.now().year - 100);
  public endYear = input<number>(DateTime.now().year + 20);
  public selectedStartDate = input<DateTime | null>(null);
  public selectedEndDate = input<DateTime | null>(null);
  public allowRangeSelection = input<boolean>(false);
  public disableBefore = input<DateTime | null>(null);
  public disableAfter = input<DateTime | null>(null);
  public allowedDateRange = input<number>(0);

  // additional input properties
  public disabled = input<boolean>(false);
  public containerClass = input<string>('');

  // output events - proxied from input
  public focused = output<void>();
  public blurred = output<void>();

  // output events - custom
  public dateSelected = output<{ startDate: DateTime | null; endDate: DateTime | null }>();
  public partialRangeSelectionTypeChange = output<CalendarPartialRangeSelectionType>();

  // computed properties
  public readonly isOverlayOpen = this._isOverlayOpen.asReadonly();
  public readonly isDisabled = computed<boolean>(() => {
    if (this._isFormControlled) {
      return this._state().disabled;
    }

    return this.disabled();
  });

  /**
   * get the current start date - uses internal state if form-controlled, otherwise uses input
   */
  public readonly currentSelectedStartDate = computed<DateTime | null>(() => {
    if (this._isFormControlled) {
      return this._state().selectedStartDate;
    }

    return this.selectedStartDate();
  });

  /**
   * get the current end date - uses internal state if form-controlled, otherwise uses input
   */
  public readonly currentSelectedEndDate = computed<DateTime | null>(() => {
    if (this._isFormControlled) {
      return this._state().selectedEndDate;
    }

    return this.selectedEndDate();
  });

  /**
   * formatted display value for the input
   */
  public readonly displayValue = computed<string>(() => {
    const startDate = this.currentSelectedStartDate();
    const endDate = this.currentSelectedEndDate();
    const dateFormat = this.dateFormat();
    const timeFormat = this.timeFormat() ? ` ${this.timeFormat()}` : '';
    const allowPartial = this.allowPartialRangeSelection();
    const selectionType = this.partialRangeSelectionType();
    const isRange = this.allowRangeSelection();
    const format = `${dateFormat}${timeFormat}`;

    // single select mode
    if (!isRange) {
      if (!startDate) {
        return '';
      }

      return startDate.toFormat(format);
    }

    // range select mode
    if (!startDate && !endDate) {
      return '';
    }

    // only start date
    if (startDate && !endDate) {
      if (allowPartial && selectionType === 'onOrAfter') {
        return `On or after ${startDate.toFormat(format)}`;
      }

      return `${startDate.toFormat(format)} - `;
    }

    // only end date
    if (!startDate && endDate) {
      if (allowPartial && selectionType === 'onOrBefore') {
        return `On or before ${endDate.toFormat(format)}`;
      }

      return ` - ${endDate.toFormat(format)}`;
    }

    // both dates
    return `${startDate!.toFormat(format)} - ${endDate!.toFormat(format)}`;
  });

  /**
   * overlay position configurations
   */
  public readonly overlayPositions = computed(() => {
    return [
      {
        originX: 'start' as const,
        originY: 'bottom' as const,
        overlayX: 'start' as const,
        overlayY: 'top' as const,
        offsetY: 4,
      },
      {
        originX: 'end' as const,
        originY: 'bottom' as const,
        overlayX: 'end' as const,
        overlayY: 'top' as const,
        offsetY: 4,
      },
      {
        originX: 'start' as const,
        originY: 'top' as const,
        overlayX: 'start' as const,
        overlayY: 'bottom' as const,
        offsetY: -4,
      },
      {
        originX: 'end' as const,
        originY: 'top' as const,
        overlayX: 'end' as const,
        overlayY: 'bottom' as const,
        offsetY: -4,
      },
    ];
  });

  public mergeClasses = tailwindUtils.merge;

  constructor() {
    // handle date selection from calendar
    effect(() => {
      const startDate = this.currentSelectedStartDate();
      const endDate = this.currentSelectedEndDate();

      // skip during initialization
      if (this._isInitializing) {
        return;
      }

      untracked(() => {
        // check if value actually changed
        const hasChanged =
          this._lastEmittedValue.startDate?.toMillis() !== startDate?.toMillis() ||
          this._lastEmittedValue.endDate?.toMillis() !== endDate?.toMillis();

        if (!hasChanged) {
          return;
        }

        // update last emitted value
        this._lastEmittedValue = { startDate, endDate };

        // emit to form control if controlled
        if (this._isFormControlled) {
          this._onChange({ startDate, endDate });
        }
      });
    });
  }

  public ngAfterViewInit(): void {
    // mark initialization as complete after view is initialized
    this._isInitializing = false;
  }

  /**
   * handles input click - opens overlay when clicked
   */
  public handleInputClick(): void {
    if (this.isDisabled()) {
      return;
    }

    // open overlay if it's not already open
    if (!this.isOverlayOpen()) {
      this._openOverlay();
    }
  }

  /**
   * handles post-icon (caret) click
   */
  public handlePostIconClick(): void {
    if (this.isDisabled()) {
      return;
    }

    if (this.isOverlayOpen()) {
      this._closeOverlay();
    } else {
      this.inputComponent.focusInput();
    }
  }

  /**
   * handles date selection from calendar
   */
  public handleDateSelected(dates: { startDate: DateTime | null; endDate: DateTime | null }): void {
    // update internal state if form-controlled
    if (this._isFormControlled) {
      this._state.update((state) => ({
        ...state,
        selectedStartDate: dates.startDate,
        selectedEndDate: dates.endDate,
      }));
    } else {
      // emit immediately for non-form-controlled usage so parent can update inputs
      this.dateSelected.emit(dates);
    }
  }

  /**
   * handles partial range selection type change from calendar
   */
  public handlePartialRangeSelectionTypeChange(type: CalendarPartialRangeSelectionType): void {
    this.partialRangeSelectionTypeChange.emit(type);
  }

  /**
   * handles escape key to close overlay
   */
  public handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isOverlayOpen()) {
      event.preventDefault();
      this._closeOverlay();
    }
  }

  /**
   * handles escape key to close overlay
   */
  public handleInputKeyDown(event: KeyboardEvent): void {
    if ((event.key === 'Enter' || event.key === ' ') && this.isOverlayOpen() == false) {
      event.preventDefault();

      this._openOverlay();
    }
  }

  /**
   * handles backdrop click to close overlay
   */
  public handleBackdropClick(): void {
    this._closeOverlay();
  }

  /**
   * handles overlay attach event from CDK
   */
  public handleOverlayAttach(): void {
    this._isOverlayOpen.set(true);

    // focus the calendar after it's rendered
    afterNextRender(
      () => {
        if (this.calendarComponent?.calendarContainer) {
          this.calendarComponent.calendarContainer.nativeElement.focus();
        }
      },
      { injector: this._injector }
    );
  }

  /**
   * handles overlay detach event from CDK
   */
  public handleOverlayDetach(): void {
    this._isOverlayOpen.set(false);
    this._onTouched();
  }

  /**
   * public api: get selected dates
   */
  public getSelectedDates(): { startDate: DateTime | null; endDate: DateTime | null } {
    return {
      startDate: this.currentSelectedStartDate(),
      endDate: this.currentSelectedEndDate(),
    };
  }

  // control value accessor implementation
  public writeValue(value: { startDate: DateTime | null; endDate: DateTime | null } | null): void {
    // update internal state that drives the display
    if (value) {
      this._state.update((state) => ({
        ...state,
        selectedStartDate: value.startDate,
        selectedEndDate: value.endDate,
      }));
      this._lastEmittedValue = value;
    } else {
      this._state.update((state) => ({
        ...state,
        selectedStartDate: null,
        selectedEndDate: null,
      }));
      this._lastEmittedValue = { startDate: null, endDate: null };
    }
  }

  public registerOnChange(fn: (value: { startDate: DateTime | null; endDate: DateTime | null }) => void): void {
    this._isFormControlled = true;
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    // update internal state for form-controlled disabled state
    this._state.update((state) => ({
      ...state,
      disabled: isDisabled,
    }));
  }

  /**
   * opens the overlay (triggers CDK attach event which syncs state)
   */
  private _openOverlay(): void {
    if (this.isDisabled()) {
      return;
    }

    this._isOverlayOpen.set(true);
  }

  /**
   * closes the overlay (triggers CDK detach event which syncs state)
   */
  private _closeOverlay(): void {
    this._isOverlayOpen.set(false);
  }
}

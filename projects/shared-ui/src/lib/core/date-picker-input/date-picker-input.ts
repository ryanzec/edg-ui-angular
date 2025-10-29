import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
  ViewChild,
  forwardRef,
  AfterViewInit,
  afterNextRender,
  inject,
  Injector,
  effect,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { DateTime } from 'luxon';
import { Input } from '../input/input';
import { Calendar, CalendarPartialRangeSelectionType } from '../calendar/calendar';
import { DateFormat, TimeFormat } from '@organization/shared-utils';
import { tailwindUtils } from '@organization/shared-utils';

type DatePickerInputState = {
  // committed values (shown in input field, sent to form control)
  committedStartDate: DateTime | null;
  committedEndDate: DateTime | null;
  committedPartialRangeSelectionType: CalendarPartialRangeSelectionType;
  // in-progress values (being selected in calendar)
  inProgressStartDate: DateTime | null;
  inProgressEndDate: DateTime | null;
  inProgressPartialRangeSelectionType: CalendarPartialRangeSelectionType;
  // snapshot when overlay opened (for cancel behavior)
  snapshotStartDate: DateTime | null;
  snapshotEndDate: DateTime | null;
  snapshotPartialRangeSelectionType: CalendarPartialRangeSelectionType;
  // track if first selection in range mode has been made
  hasFirstRangeSelection: boolean;
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
    ['attr.data-testid']: 'date-picker-input',
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
   * internal state for managing committed, in-progress, and snapshot values
   */
  private readonly _state = signal<DatePickerInputState>({
    committedStartDate: null,
    committedEndDate: null,
    committedPartialRangeSelectionType: 'range',
    inProgressStartDate: null,
    inProgressEndDate: null,
    inProgressPartialRangeSelectionType: 'range',
    snapshotStartDate: null,
    snapshotEndDate: null,
    snapshotPartialRangeSelectionType: 'range',
    hasFirstRangeSelection: false,
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
   * get the committed start date (shown in input field)
   */
  public readonly committedStartDate = computed<DateTime | null>(() => {
    if (this._isFormControlled) {
      return this._state().committedStartDate;
    }

    return this.selectedStartDate();
  });

  /**
   * get the committed end date (shown in input field)
   */
  public readonly committedEndDate = computed<DateTime | null>(() => {
    if (this._isFormControlled) {
      return this._state().committedEndDate;
    }

    return this.selectedEndDate();
  });

  /**
   * get the in-progress start date (shown in calendar during selection)
   */
  public readonly inProgressStartDate = computed<DateTime | null>(() => {
    return this._state().inProgressStartDate;
  });

  /**
   * get the in-progress end date (shown in calendar during selection)
   */
  public readonly inProgressEndDate = computed<DateTime | null>(() => {
    return this._state().inProgressEndDate;
  });

  /**
   * get the in-progress partial range selection type (shown in calendar during selection)
   */
  public readonly inProgressPartialRangeSelectionType = computed<CalendarPartialRangeSelectionType>(() => {
    return this._state().inProgressPartialRangeSelectionType;
  });

  /**
   * formatted display value for the input (uses committed values only)
   */
  public readonly displayValue = computed<string>(() => {
    const startDate = this.committedStartDate();
    const endDate = this.committedEndDate();
    const dateFormat = this.dateFormat();
    const timeFormat = this.timeFormat() ? ` ${this.timeFormat()}` : '';
    const allowPartial = this.allowPartialRangeSelection();
    // use committed partial range selection type for display
    const selectionType = this._isFormControlled
      ? this._state().committedPartialRangeSelectionType
      : this.partialRangeSelectionType();
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
    // sync partialRangeSelectionType input to internal state for form-controlled components
    effect(() => {
      const type = this.partialRangeSelectionType();
      this._state.update((state) => ({
        ...state,
        committedPartialRangeSelectionType: type,
        inProgressPartialRangeSelectionType: type,
        snapshotPartialRangeSelectionType: type,
      }));
    });
  }

  public ngAfterViewInit(): void {
    // mark initialization as complete after view is initialized
    this._isInitializing = false;
  }

  /**
   * handles input click - opens overlay when clicked
   */
  public onInputClick(): void {
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
  public onPostIconClick(): void {
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
  public onDateSelected(dates: { startDate: DateTime | null; endDate: DateTime | null }): void {
    const isRange = this.allowRangeSelection();
    const currentState = this._state();
    const selectionType = currentState.inProgressPartialRangeSelectionType;

    // handle range mode with first selection
    if (isRange && !currentState.hasFirstRangeSelection && selectionType === 'range') {
      // first click in range mode - detect which date was actually clicked
      // by comparing what changed from the previous in-progress state
      let clickedDate: DateTime | null = null;

      // check if start date changed
      const startChanged = dates.startDate?.toMillis() !== currentState.inProgressStartDate?.toMillis();
      // check if end date changed
      const endChanged = dates.endDate?.toMillis() !== currentState.inProgressEndDate?.toMillis();

      if (startChanged && dates.startDate) {
        // start date changed, so user clicked that date
        clickedDate = dates.startDate;
      } else if (endChanged && dates.endDate) {
        // end date changed, so user clicked that date
        clickedDate = dates.endDate;
      } else if (dates.startDate) {
        // fallback: use start date if nothing changed
        clickedDate = dates.startDate;
      }

      // use the clicked date as new start, clear end
      this._state.update((state) => ({
        ...state,
        inProgressStartDate: clickedDate,
        inProgressEndDate: null,
        hasFirstRangeSelection: true,
      }));

      return;
    }

    // update in-progress state
    this._state.update((state) => ({
      ...state,
      inProgressStartDate: dates.startDate,
      inProgressEndDate: dates.endDate,
    }));

    // check if selection is complete
    const isComplete = this._isSelectionComplete(dates.startDate, dates.endDate);

    if (isComplete) {
      // commit the values and close
      this._commitSelection(dates.startDate, dates.endDate);
    }
  }

  /**
   * handles partial range selection type change from calendar
   * updates in-progress mode but does NOT emit change event until selection commits
   */
  public onPartialRangeSelectionTypeChange(type: CalendarPartialRangeSelectionType): void {
    const currentType = this._state().inProgressPartialRangeSelectionType;

    // determine if we should clear the selection
    const shouldClear =
      // switching FROM range mode to any partial mode
      (currentType === 'range' && type !== 'range') ||
      // switching between partial modes (onOrBefore ↔ onOrAfter)
      (currentType === 'onOrBefore' && type === 'onOrAfter') ||
      (currentType === 'onOrAfter' && type === 'onOrBefore') ||
      // switching FROM partial mode to range mode
      (currentType !== 'range' && type === 'range');

    if (shouldClear) {
      this._state.update((state) => ({
        ...state,
        inProgressPartialRangeSelectionType: type,
        inProgressStartDate: null,
        inProgressEndDate: null,
        hasFirstRangeSelection: false,
      }));
    } else {
      // just update the mode
      this._state.update((state) => ({
        ...state,
        inProgressPartialRangeSelectionType: type,
      }));
    }

    // do NOT emit the change here - it will be emitted when selection is committed
  }

  /**
   * handles escape key to close overlay
   */
  public onInputKeyDown(event: KeyboardEvent): void {
    if ((event.key === 'Enter' || event.key === ' ') && this.isOverlayOpen() == false) {
      event.preventDefault();

      this._openOverlay();
    }
  }

  /**
   * handles backdrop click to close overlay
   * cancellation logic is handled in onOverlayDetach()
   */
  public onBackdropClick(): void {
    this._closeOverlay();
  }

  /**
   * handles overlay attach event from CDK
   */
  public onOverlayAttach(): void {
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
   * this is called whenever the overlay closes (backdrop click, escape key, or programmatic close)
   */
  public onOverlayDetach(): void {
    // always revert or clear selection when overlay closes without explicit commit
    this._revertOrClearSelection();

    this._isOverlayOpen.set(false);
    this._onTouched();
  }

  /**
   * public api: get committed selected dates
   */
  public getSelectedDates(): { startDate: DateTime | null; endDate: DateTime | null } {
    return {
      startDate: this.committedStartDate(),
      endDate: this.committedEndDate(),
    };
  }

  // control value accessor implementation
  public writeValue(value: { startDate: DateTime | null; endDate: DateTime | null } | null): void {
    // update committed values
    if (value) {
      this._state.update((state) => ({
        ...state,
        committedStartDate: value.startDate,
        committedEndDate: value.endDate,
      }));
      this._lastEmittedValue = value;
    } else {
      this._state.update((state) => ({
        ...state,
        committedStartDate: null,
        committedEndDate: null,
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
   * checks if the current selection is complete based on selection mode
   */
  private _isSelectionComplete(startDate: DateTime | null, endDate: DateTime | null): boolean {
    const isRange = this.allowRangeSelection();
    const allowPartial = this.allowPartialRangeSelection();
    const selectionType = this._state().inProgressPartialRangeSelectionType;

    // single date mode - complete when we have a start date
    if (!isRange) {
      return startDate !== null;
    }

    // range mode with partial selection
    if (allowPartial) {
      // onOrAfter mode - complete when we have start date
      if (selectionType === 'onOrAfter') {
        return startDate !== null;
      }

      // onOrBefore mode - complete when we have end date
      if (selectionType === 'onOrBefore') {
        return endDate !== null;
      }
    }

    // normal range mode - complete when we have both dates
    return startDate !== null && endDate !== null;
  }

  /**
   * checks if current in-progress selection is incomplete and needs clearing
   */
  private _shouldClearIncompleteRange(): boolean {
    const isRange = this.allowRangeSelection();
    const allowPartial = this.allowPartialRangeSelection();
    const state = this._state();
    const selectionType = state.inProgressPartialRangeSelectionType;

    if (!isRange) {
      return false;
    }

    // check if we have a previous committed value to revert to
    const hasSnapshot = state.snapshotStartDate !== null || state.snapshotEndDate !== null;

    // if we have a snapshot, always revert instead of clearing
    if (hasSnapshot) {
      return false;
    }

    // if partial range is allowed and we're in range mode, check for incomplete
    if (allowPartial && selectionType === 'range') {
      const hasOnlyOne = (state.inProgressStartDate !== null) !== (state.inProgressEndDate !== null);

      return hasOnlyOne;
    }

    // if partial range is not allowed, check for incomplete
    if (!allowPartial) {
      const hasOnlyOne = (state.inProgressStartDate !== null) !== (state.inProgressEndDate !== null);

      return hasOnlyOne;
    }

    return false;
  }

  /**
   * reverts to snapshot or clears selection based on current state
   * does not close the overlay - caller is responsible for that
   */
  private _revertOrClearSelection(): void {
    const state = this._state();
    const shouldClear = this._shouldClearIncompleteRange();

    if (shouldClear) {
      // clear incomplete range for form-controlled
      if (this._isFormControlled) {
        this._state.update((s) => ({
          ...s,
          committedStartDate: null,
          committedEndDate: null,
        }));

        const value = { startDate: null, endDate: null };
        this._onChange(value);
        this._lastEmittedValue = value;
      } else {
        // emit clear for non-form mode
        this.dateSelected.emit({ startDate: null, endDate: null });
      }
    } else {
      // revert to snapshot for form-controlled
      if (this._isFormControlled) {
        this._state.update((s) => ({
          ...s,
          committedStartDate: state.snapshotStartDate,
          committedEndDate: state.snapshotEndDate,
          committedPartialRangeSelectionType: state.snapshotPartialRangeSelectionType,
        }));

        const value = { startDate: state.snapshotStartDate, endDate: state.snapshotEndDate };
        this._onChange(value);
        this._lastEmittedValue = value;
      }
      // for non-form mode, no need to emit - inputs already have the right values
    }
  }

  /**
   * commits the selection, updates form control, emits events, and closes overlay
   */
  private _commitSelection(startDate: DateTime | null, endDate: DateTime | null): void {
    const state = this._state();
    const inProgressMode = state.inProgressPartialRangeSelectionType;
    const committedMode = state.committedPartialRangeSelectionType;

    // update committed state
    if (this._isFormControlled) {
      this._state.update((s) => ({
        ...s,
        committedStartDate: startDate,
        committedEndDate: endDate,
        committedPartialRangeSelectionType: inProgressMode,
      }));

      // call onChange immediately
      const value = { startDate, endDate };
      this._onChange(value);
      this._lastEmittedValue = value;
    } else {
      // for non-form mode, emit the event
      // but still update the committed mode for proper comparison
      this._state.update((s) => ({
        ...s,
        committedPartialRangeSelectionType: inProgressMode,
      }));
      this.dateSelected.emit({ startDate, endDate });
    }

    // emit partial range selection type change if it changed
    if (inProgressMode !== committedMode) {
      this.partialRangeSelectionTypeChange.emit(inProgressMode);
    }

    // close the overlay
    this._closeOverlay();
  }

  /**
   * opens the overlay, snapshots current values, and initializes in-progress state
   */
  private _openOverlay(): void {
    if (this.isDisabled()) {
      return;
    }

    // get current committed values
    const currentStart = this.committedStartDate();
    const currentEnd = this.committedEndDate();
    const currentMode = this._isFormControlled
      ? this._state().committedPartialRangeSelectionType
      : this.partialRangeSelectionType();

    // snapshot and initialize in-progress state
    // show existing dates in calendar for visual reference
    this._state.update((state) => ({
      ...state,
      snapshotStartDate: currentStart,
      snapshotEndDate: currentEnd,
      snapshotPartialRangeSelectionType: currentMode,
      inProgressStartDate: currentStart,
      inProgressEndDate: currentEnd,
      inProgressPartialRangeSelectionType: currentMode,
      hasFirstRangeSelection: false,
    }));

    this._isOverlayOpen.set(true);
  }

  /**
   * closes the overlay (triggers CDK detach event which syncs state)
   */
  private _closeOverlay(): void {
    this._isOverlayOpen.set(false);
  }
}

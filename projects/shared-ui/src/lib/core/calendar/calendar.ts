import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  effect,
  untracked,
  ViewChild,
  ElementRef,
  afterNextRender,
  inject,
  Injector,
} from '@angular/core';
import { DateTime } from 'luxon';
import { tailwindUtils } from '@organization/shared-utils';
import { CalendarHeader } from './calendar-header';
import { CalendarDates } from './calendar-dates';

/**
 * internal state for the calendar component
 */
type CalendarState = {
  displayYear: number;
  displayMonth: number;
  focusedDate: DateTime | null;
};

/**
 * data structure for a calendar date cell
 */
export type CalendarDateData = {
  date: DateTime;
  isCurrentMonth: boolean;
  isDisabled: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isFocused: boolean;
};

/**
 * calendar component for date selection with range support
 */
@Component({
  selector: 'org-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CalendarHeader, CalendarDates],
  templateUrl: './calendar.html',
  host: {
    dataid: 'calendar',
  },
})
export class Calendar {
  private readonly _injector = inject(Injector);
  private _isInitialized = false;

  @ViewChild('calendarContainer')
  public readonly calendarContainer?: ElementRef<HTMLDivElement>;

  /**
   * @internal Only exposed for testing purposes
   */
  public readonly _state = signal<CalendarState>({
    displayYear: DateTime.now().year,
    displayMonth: DateTime.now().month,
    focusedDate: null,
  });

  // input properties
  public defaultDisplayDate = input<DateTime>(DateTime.now());
  public startYear = input<number>(DateTime.now().year - 100);
  public endYear = input<number>(DateTime.now().year + 20);
  public selectedStartDate = input<DateTime | null>(null);
  public selectedEndDate = input<DateTime | null>(null);
  public allowRangeSelection = input<boolean>(false);
  public disableBefore = input<DateTime | null>(null);
  public disableAfter = input<DateTime | null>(null);
  public allowedDateRange = input<number>(0);
  public containerClass = input<string>('');

  // output events
  public dateSelected = output<{ startDate: DateTime | null; endDate: DateTime | null }>();
  public displayMonthChanged = output<{
    currentMonth: number;
    currentYear: number;
    previousMonth: number;
    previousYear: number;
  }>();

  // computed properties
  public readonly displayYear = computed<number>(() => this._state().displayYear);
  public readonly displayMonth = computed<number>(() => this._state().displayMonth);
  public readonly focusedDate = computed<DateTime | null>(() => this._state().focusedDate);

  /**
   * generates array of years for dropdown
   */
  public readonly yearOptions = computed<number[]>(() => {
    const start = this.startYear();
    const end = this.endYear();
    const years: number[] = [];

    for (let year = end; year >= start; year--) {
      years.push(year);
    }

    return years;
  });

  /**
   * generates array of months for dropdown
   */
  public readonly monthOptions = computed<{ value: number; label: string }[]>(() => {
    const months: { value: number; label: string }[] = [];

    for (let month = 1; month <= 12; month++) {
      const date = DateTime.local(2000, month, 1);
      months.push({ value: month, label: date.toFormat('MMMM') });
    }

    return months;
  });

  /**
   * generates calendar grid data for the current display month
   */
  public readonly calendarDates = computed<CalendarDateData[][]>(() => {
    const year = this.displayYear();
    const month = this.displayMonth();
    const startDate = this.selectedStartDate();
    const endDate = this.selectedEndDate();
    const focusedDate = this.focusedDate();
    const disableBefore = this.disableBefore();
    const disableAfter = this.disableAfter();
    const allowedRange = this.allowedDateRange();

    // get first day of month
    const firstDayOfMonth = DateTime.local(year, month, 1);

    // get start of calendar grid (previous month days to fill first week)
    const startOfGrid = firstDayOfMonth.startOf('week');

    // generate 6 weeks (42 days) to cover all possible month layouts
    const weeks: CalendarDateData[][] = [];
    let currentDate = startOfGrid;

    for (let week = 0; week < 6; week++) {
      const weekDays: CalendarDateData[] = [];

      for (let day = 0; day < 7; day++) {
        const isCurrentMonth = currentDate.month === month;
        const isDisabled = this._isDateDisabled(
          currentDate,
          startDate,
          endDate,
          disableBefore,
          disableAfter,
          allowedRange
        );
        const isSelected = this._isDateSelected(currentDate, startDate, endDate);
        const isInRange = this._isDateInRange(currentDate, startDate, endDate);
        const isFocused = focusedDate ? currentDate.hasSame(focusedDate, 'day') : false;

        weekDays.push({
          date: currentDate,
          isCurrentMonth,
          isDisabled,
          isSelected,
          isInRange,
          isFocused,
        });

        currentDate = currentDate.plus({ days: 1 });
      }

      weeks.push(weekDays);
    }

    // filter out weeks that don't contain any dates from the current month
    return weeks.filter((week) => week.some((dateData) => dateData.isCurrentMonth));
  });

  /**
   * day of week labels
   */
  public readonly dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  public mergeClasses = tailwindUtils.merge;

  constructor() {
    // initialize display date from selectedStartDate or defaultDisplayDate
    effect(() => {
      const selectedStart = this.selectedStartDate();
      const defaultDisplay = this.defaultDisplayDate();

      if (!this._isInitialized) {
        untracked(() => {
          const initialDate = selectedStart || defaultDisplay;
          this._state.update((state) => ({
            ...state,
            displayYear: initialDate.year,
            displayMonth: initialDate.month,
            focusedDate: initialDate,
          }));
          this._isInitialized = true;
        });
      }
    });
  }

  /**
   * public api: set the current display date
   */
  public setDisplayDate(date: DateTime): void {
    const previousYear = this._state().displayYear;
    const previousMonth = this._state().displayMonth;

    this._state.update((state) => ({
      ...state,
      displayYear: date.year,
      displayMonth: date.month,
    }));

    this.displayMonthChanged.emit({
      currentMonth: date.month,
      currentYear: date.year,
      previousMonth,
      previousYear,
    });
  }

  public getSelectedDates(): { startDate: DateTime | null; endDate: DateTime | null } {
    return {
      startDate: this.selectedStartDate(),
      endDate: this.selectedEndDate(),
    };
  }

  /**
   * handles year change from dropdown
   */
  public handleYearChange(year: number): void {
    const previousYear = this._state().displayYear;
    const previousMonth = this._state().displayMonth;

    this._state.update((state) => ({
      ...state,
      displayYear: year,
    }));

    this.displayMonthChanged.emit({
      currentMonth: this._state().displayMonth,
      currentYear: year,
      previousMonth,
      previousYear,
    });
  }

  /**
   * handles month change from dropdown
   */
  public handleMonthChange(month: number): void {
    const previousYear = this._state().displayYear;
    const previousMonth = this._state().displayMonth;

    this._state.update((state) => ({
      ...state,
      displayMonth: month,
    }));

    this.displayMonthChanged.emit({
      currentMonth: month,
      currentYear: this._state().displayYear,
      previousMonth,
      previousYear,
    });
  }

  /**
   * handles previous month navigation
   */
  public handlePreviousMonth(): void {
    const currentYear = this._state().displayYear;
    const currentMonth = this._state().displayMonth;
    const previousYear = currentYear;
    const previousMonth = currentMonth;

    const newDate = DateTime.local(currentYear, currentMonth, 1).minus({ months: 1 });

    this._state.update((state) => ({
      ...state,
      displayYear: newDate.year,
      displayMonth: newDate.month,
    }));

    this.displayMonthChanged.emit({
      currentMonth: newDate.month,
      currentYear: newDate.year,
      previousMonth,
      previousYear,
    });
  }

  /**
   * handles next month navigation
   */
  public handleNextMonth(): void {
    const currentYear = this._state().displayYear;
    const currentMonth = this._state().displayMonth;
    const previousYear = currentYear;
    const previousMonth = currentMonth;

    const newDate = DateTime.local(currentYear, currentMonth, 1).plus({ months: 1 });

    this._state.update((state) => ({
      ...state,
      displayYear: newDate.year,
      displayMonth: newDate.month,
    }));

    this.displayMonthChanged.emit({
      currentMonth: newDate.month,
      currentYear: newDate.year,
      previousMonth,
      previousYear,
    });
  }

  /**
   * handles date click
   */
  public handleDateClick(dateData: CalendarDateData): void {
    if (dateData.isDisabled) {
      return;
    }

    const clickedDate = dateData.date;
    const currentStart = this.selectedStartDate();
    const currentEnd = this.selectedEndDate();

    // clicking on already selected start date - clear it
    if (currentStart && clickedDate.hasSame(currentStart, 'day')) {
      this.dateSelected.emit({ startDate: null, endDate: currentEnd });

      return;
    }

    // clicking on already selected end date - clear it
    if (currentEnd && clickedDate.hasSame(currentEnd, 'day')) {
      this.dateSelected.emit({ startDate: currentStart, endDate: null });

      return;
    }

    // no selection yet - set as start date (00:00:00)
    if (!currentStart) {
      const startDate = clickedDate.startOf('day');
      this.dateSelected.emit({ startDate, endDate: currentEnd });

      return;
    }

    // has start date only
    if (!currentEnd) {
      if (this.allowRangeSelection()) {
        // if clicked date is after start, it becomes end date
        if (clickedDate > currentStart) {
          const endDate = clickedDate.endOf('day').minus({ seconds: 1 });
          this.dateSelected.emit({ startDate: currentStart, endDate });
        } else if (clickedDate < currentStart) {
          // if clicked date is before start, swap them
          const startDate = clickedDate.startOf('day');
          const endDate = currentStart.endOf('day').minus({ seconds: 1 });
          this.dateSelected.emit({ startDate, endDate });
        }
      } else {
        // replace start date
        const startDate = clickedDate.startOf('day');
        this.dateSelected.emit({ startDate, endDate: null });
      }

      return;
    }

    // has both start and end (range mode)
    if (this.allowRangeSelection()) {
      // if date is between, it becomes new end date
      if (clickedDate > currentStart && clickedDate < currentEnd) {
        const endDate = clickedDate.endOf('day').minus({ seconds: 1 });
        this.dateSelected.emit({ startDate: currentStart, endDate });

        return;
      }

      // if date is after current start, it becomes new end date
      if (clickedDate > currentStart) {
        const endDate = clickedDate.endOf('day').minus({ seconds: 1 });
        this.dateSelected.emit({ startDate: currentStart, endDate });

        return;
      }

      // if date is before current start, swap them
      if (clickedDate < currentStart) {
        const startDate = clickedDate.startOf('day');
        const endDate = currentStart.endOf('day').minus({ seconds: 1 });
        this.dateSelected.emit({ startDate, endDate });

        return;
      }
    }
  }

  /**
   * handles keyboard navigation
   */
  public handleKeyDown(event: KeyboardEvent): void {
    const currentFocused = this.focusedDate();

    if (!currentFocused) {
      return;
    }

    let newFocused: DateTime | null = null;

    const selectCurrentDate = (() => {
      event.preventDefault();
      const dateData = this._findDateData(currentFocused);

      if (dateData) {
        this.handleDateClick(dateData);
      }
    }).bind(this);

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newFocused = currentFocused.minus({ days: 1 });
        break;
      case 'ArrowRight':
        event.preventDefault();
        newFocused = currentFocused.plus({ days: 1 });
        break;
      case 'ArrowUp':
        event.preventDefault();
        newFocused = currentFocused.minus({ weeks: 1 });
        break;
      case 'ArrowDown':
        event.preventDefault();
        newFocused = currentFocused.plus({ weeks: 1 });
        break;
      case 'PageUp':
        event.preventDefault();
        newFocused = currentFocused.minus({ months: 1 });
        break;
      case 'PageDown':
        event.preventDefault();
        newFocused = currentFocused.plus({ months: 1 });
        break;
      case 'Home':
        event.preventDefault();
        newFocused = currentFocused.startOf('month');
        break;
      case 'End':
        event.preventDefault();
        newFocused = currentFocused.endOf('month');
        break;

      case 'Enter':
      case ' ':
        selectCurrentDate();

        return;
    }

    if (newFocused) {
      this._state.update((state) => ({
        ...state,
        focusedDate: newFocused,
      }));

      // auto-navigate to new month if needed
      if (newFocused.month !== this._state().displayMonth || newFocused.year !== this._state().displayYear) {
        const previousYear = this._state().displayYear;
        const previousMonth = this._state().displayMonth;

        this._state.update((state) => ({
          ...state,
          displayYear: newFocused!.year,
          displayMonth: newFocused!.month,
        }));

        this.displayMonthChanged.emit({
          currentMonth: newFocused.month,
          currentYear: newFocused.year,
          previousMonth,
          previousYear,
        });

        // refocus the container after month change to maintain keyboard navigation
        afterNextRender(
          () => {
            this.calendarContainer?.nativeElement.focus();
          },
          { injector: this._injector }
        );
      }
    }
  }

  /**
   * updates focused date when date is hovered
   */
  public handleDateHover(dateData: CalendarDateData): void {
    this._state.update((state) => ({
      ...state,
      focusedDate: dateData.date,
    }));
  }

  /**
   * checks if a date is disabled
   */
  private _isDateDisabled(
    date: DateTime,
    startDate: DateTime | null,
    endDate: DateTime | null,
    disableBefore: DateTime | null,
    disableAfter: DateTime | null,
    allowedRange: number
  ): boolean {
    // check disableBefore constraint
    if (disableBefore && date < disableBefore.startOf('day')) {
      return true;
    }

    // check disableAfter constraint
    if (disableAfter && date > disableAfter.startOf('day')) {
      return true;
    }

    // check allowedDateRange constraint
    if (allowedRange > 0) {
      if (startDate && !endDate) {
        // only start date is selected - enforce range in both directions from start
        const rangeStart = startDate.startOf('day');
        const rangeEnd = rangeStart.plus({ days: allowedRange - 1 }).endOf('day');
        const rangeStartBackward = rangeStart.minus({ days: allowedRange - 1 }).startOf('day');

        if (date > rangeEnd || date < rangeStartBackward) {
          return true;
        }
      } else if (!startDate && endDate) {
        // only end date is selected - enforce range in both directions from end
        const rangeEnd = endDate.startOf('day');
        const rangeEndForward = rangeEnd.plus({ days: allowedRange - 1 }).endOf('day');
        const rangeEndBackward = rangeEnd.minus({ days: allowedRange - 1 }).startOf('day');

        if (date > rangeEndForward || date < rangeEndBackward) {
          return true;
        }
      } else if (startDate && endDate) {
        // both dates selected - allow dates within range of start and within range of end
        const rangeStart = startDate.startOf('day');
        const rangeEnd = endDate.startOf('day');
        const allowedAfterStart = rangeStart.plus({ days: allowedRange - 1 }).endOf('day');
        const allowedBeforeEnd = rangeEnd.minus({ days: allowedRange - 1 }).startOf('day');

        // date must be within range after start OR within range before end
        const withinStartRange = date >= rangeStart && date <= allowedAfterStart;
        const withinEndRange = date >= allowedBeforeEnd && date <= rangeEnd;

        if (!withinStartRange && !withinEndRange) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * checks if a date is selected
   */
  private _isDateSelected(date: DateTime, startDate: DateTime | null, endDate: DateTime | null): boolean {
    if (startDate && date.hasSame(startDate, 'day')) {
      return true;
    }

    if (endDate && date.hasSame(endDate, 'day')) {
      return true;
    }

    return false;
  }

  /**
   * checks if a date is in the selected range
   */
  private _isDateInRange(date: DateTime, startDate: DateTime | null, endDate: DateTime | null): boolean {
    if (!startDate || !endDate) {
      return false;
    }

    return date > startDate && date < endDate;
  }

  /**
   * finds date data for a given date
   */
  private _findDateData(date: DateTime): CalendarDateData | null {
    const weeks = this.calendarDates();

    for (const week of weeks) {
      for (const dateData of week) {
        if (dateData.date.hasSame(date, 'day')) {
          return dateData;
        }
      }
    }

    return null;
  }
}

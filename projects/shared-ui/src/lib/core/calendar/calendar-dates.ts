import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { type CalendarDateData } from './calendar';
import { tailwindUtils } from '@organization/shared-utils';

/**
 * calendar dates grid component
 */
@Component({
  selector: 'org-calendar-dates',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './calendar-dates.html',
})
export class CalendarDates {
  public calendarDates = input.required<CalendarDateData[][]>();
  public dayLabels = input.required<string[]>();
  public datesClass = input<string>('');

  public dateClick = output<CalendarDateData>();
  public dateHover = output<CalendarDateData>();

  public mergeClasses = tailwindUtils.merge;

  /**
   * handles date click
   */
  protected handleDateClick(dateData: CalendarDateData): void {
    this.dateClick.emit(dateData);
  }

  /**
   * handles date hover
   */
  protected handleDateHover(dateData: CalendarDateData): void {
    this.dateHover.emit(dateData);
  }

  /**
   * gets the day number from a date
   */
  protected getDay(dateData: CalendarDateData): string {
    return dateData.date.day.toString();
  }
}

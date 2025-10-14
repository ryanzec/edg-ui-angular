import { Component, ChangeDetectionStrategy, input, output, effect } from '@angular/core';
import { Button } from '../button/button';
import { tailwindUtils } from '@organization/shared-utils';

/**
 * month option data
 */
export type CalendarMonthOption = {
  value: number;
  label: string;
};

/**
 * calendar header component with year/month dropdowns and navigation
 */
@Component({
  selector: 'org-calendar-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  templateUrl: './calendar-header.html',
})
export class CalendarHeader {
  public displayYear = input.required<number>();
  public displayMonth = input.required<number>();
  public yearOptions = input.required<number[]>();
  public monthOptions = input.required<CalendarMonthOption[]>();
  public headerClass = input<string>('');

  public yearChanged = output<number>();
  public monthChanged = output<number>();
  public previousMonth = output<void>();
  public nextMonth = output<void>();

  public mergeClasses = tailwindUtils.merge;

  constructor() {
    effect(() => {
      console.log('displayYear', this.displayYear());
      console.log('displayMonth', this.displayMonth());
    });
  }

  /**
   * handles year dropdown change
   */
  protected handleYearChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const year = parseInt(target.value, 10);
    this.yearChanged.emit(year);
  }

  /**
   * handles month dropdown change
   */
  protected handleMonthChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const month = parseInt(target.value, 10);
    this.monthChanged.emit(month);
  }

  /**
   * handles previous month click
   */
  protected handlePreviousClick(): void {
    this.previousMonth.emit();
  }

  /**
   * handles next month click
   */
  protected handleNextClick(): void {
    this.nextMonth.emit();
  }
}

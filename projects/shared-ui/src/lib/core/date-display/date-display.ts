import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { type DateTime } from 'luxon';
import { DateFormat, TimeFormat } from '@organization/shared-utils';
import { TextDirective } from '../text-directive/text-directive';

@Component({
  selector: 'org-date-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextDirective],
  templateUrl: './date-display.html',
  host: {
    ['attr.data-testid']: 'date-display',
    class: 'inline-flex',
  },
})
export class DateDisplay {
  public date = input.required<DateTime>();
  public dateFormat = input<DateFormat>(DateFormat.STANDARD);
  public timeFormat = input<TimeFormat | null>(null);
  public showTimezone = input<boolean>(true);
  public isInline = input<boolean>(true);
  public containerClass = input<string>('');

  public isDateValid = computed<boolean>(() => {
    return this.date().isValid;
  });

  public formattedDate = computed<string>(() => {
    if (!this.isDateValid()) {
      return '----';
    }

    const dateString = this.date().toFormat(this.dateFormat());

    // if no time format, just return the date
    if (!this.timeFormat()) {
      return dateString;
    }

    // build the time string
    let timeString = this.date().toFormat(this.timeFormat()!);

    // add timezone if requested
    if (this.showTimezone()) {
      timeString += ` ${this.date().toFormat('ZZZZ')}`;
    }

    return `${dateString} ${timeString}`;
  });
}

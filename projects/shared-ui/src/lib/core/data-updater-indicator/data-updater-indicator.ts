import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { type DateTime } from 'luxon';
import { Indicator } from '../indicator/indicator';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import { DateDisplay } from '../date-display/date-display';
import { DateFormat, TimeFormat } from '@organization/shared-utils';

export type DataUpdaterIndicatorStatus = 'active' | 'inactive';

@Component({
  selector: 'org-data-updater-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Indicator, LoadingSpinner, DateDisplay],
  templateUrl: './data-updater-indicator.html',
  host: {
    ['attr.data-testid']: 'data-updater-indicator',
    class: 'inline-flex',
  },
})
export class DataUpdaterIndicator {
  public status = input.required<DataUpdaterIndicatorStatus>();
  public isLoading = input<boolean>(false);
  public lastUpdatedAt = input.required<DateTime>();
  public containerClass = input<string>('');

  protected readonly DateFormat = DateFormat;
  protected readonly TimeFormat = TimeFormat;

  protected readonly indicatorColor = computed<'safe' | 'neutral'>(() => {
    return this.status() === 'active' ? 'safe' : 'neutral';
  });
}

import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { tailwindUtils } from '@organization/shared-utils';

/**
 * calendar footer component - generic container for footer content
 */
@Component({
  selector: 'org-calendar-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './calendar-footer.html',
})
export class CalendarFooter {
  public footerClass = input<string>('');

  public mergeClasses = tailwindUtils.merge;
}

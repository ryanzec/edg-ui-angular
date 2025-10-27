import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import { tailwindUtils } from '@organization/shared-utils';

/**
 * loading blocker component for blocking user interaction with content while loading
 */
@Component({
  selector: 'org-loading-blocker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkTrapFocus, LoadingSpinner],
  templateUrl: './loading-blocker.html',
  host: {
    dataid: 'loading-blocker',
  },
})
export class LoadingBlocker {
  /**
   * controls visibility of the loading blocker
   */
  public isVisible = input<boolean>(false);

  /**
   * optional text to display next to the loading spinner
   */
  public text = input<string>('');

  /**
   * additional css classes to apply to the container
   */
  public containerClass = input<string>('');

  public mergeClasses = tailwindUtils.merge;
}

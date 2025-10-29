import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { tailwindUtils } from '@organization/shared-utils';

@Component({
  selector: 'org-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog.html',
  host: {
    ['attr.data-testid']: 'dialog',
  },
})
export class Dialog {
  public readonly hasRoundedCorners = input<boolean>(true);
  public readonly containerClass = input<string>('');

  protected mergeClasses = tailwindUtils.merge;
}

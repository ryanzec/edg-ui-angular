import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { tailwindUtils } from '@organization/shared-utils';

@Component({
  selector: 'org-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog.html',
  host: {
    dataid: 'dialog',
  },
})
export class Dialog {
  protected readonly hasRoundedCorners = input<boolean>(true);

  protected mergeClasses = tailwindUtils.merge;
}

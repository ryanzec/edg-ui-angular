import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'org-dialog-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-header.html',
  host: {
    ['attr.data-testid']: 'dialog',
  },
})
export class DialogHeader {
  public readonly title = input<string>('');
}

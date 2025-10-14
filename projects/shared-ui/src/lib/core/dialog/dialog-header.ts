import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'org-dialog-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-header.html',
  host: {
    dataid: 'dialog',
  },
})
export class DialogHeader {
  public readonly title = input<string>('');
}

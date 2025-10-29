import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'org-dialog-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  templateUrl: './dialog-content.html',
  host: {
    ['attr.data-testid']: 'dialog',
  },
})
export class DialogContent {}

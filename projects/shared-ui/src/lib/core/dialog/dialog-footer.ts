import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'org-dialog-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  templateUrl: './dialog-footer.html',
  host: {
    ['attr.data-testid']: 'dialog',
    class: 'contents',
  },
})
export class DialogFooter {}

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'org-chat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chat.html',
  host: {
    ['attr.data-testid']: 'chat',
  },
})
export class Chat {}

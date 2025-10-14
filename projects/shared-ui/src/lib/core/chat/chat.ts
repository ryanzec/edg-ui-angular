import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'org-chat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chat.html',
  host: {
    dataid: 'chat',
  },
})
export class Chat {}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GroupElementsDirective } from '../group-elements-directive/group-elements-directive';

@Component({
  selector: 'org-chat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GroupElementsDirective],
  templateUrl: './chat.html',
  host: {
    dataid: 'chat',
  },
})
export class Chat {}

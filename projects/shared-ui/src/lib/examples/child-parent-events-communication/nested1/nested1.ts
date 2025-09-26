import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'org-example-nested-1',
  imports: [MatButtonModule],
  templateUrl: './nested1.html',
})
export class EXAMPLENested1 {
  public messageEvent = output<string>();

  public emitEvent() {
    this.messageEvent.emit('message from child');
  }
}

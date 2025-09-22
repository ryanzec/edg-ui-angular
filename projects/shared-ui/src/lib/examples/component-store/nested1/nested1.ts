import { Component, inject } from '@angular/core';
import { Nested2 } from '../nested2/nested2';
import { ComponentStore } from '../component-store/component-store';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'org-example-workflow-details-view-details',
  imports: [Nested2, MatButtonModule],
  templateUrl: './nested1.html',
})
export class Nested1 {
  protected chatService = inject(ComponentStore);

  protected setValue() {
    this.chatService.setValue('value form nested level 1');
  }
}

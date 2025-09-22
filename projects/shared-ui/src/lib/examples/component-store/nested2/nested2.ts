import { Component, inject } from '@angular/core';
import { ComponentStore } from '../component-store/component-store';

@Component({
  selector: 'org-example-workflow-details-view-chat',
  imports: [],
  templateUrl: './nested2.html',
})
export class Nested2 {
  protected chatService = inject(ComponentStore);

  protected logValue() {
    console.log(this.chatService.inputValue());
  }
}

import { Component, inject } from '@angular/core';
import { Nested1 } from './nested1/nested1';
import { ComponentStore } from './component-store/component-store';

@Component({
  selector: 'org-example-workflow-details-view',
  imports: [Nested1],
  providers: [ComponentStore],
  templateUrl: './component-store.html',
  styleUrl: './component-store.scss',
})
// NOTE: only using suffix for the context of this example
export class ComponentStoreComponent {
  protected chatService = inject(ComponentStore);

  constructor() {
    this.chatService.setValue('initial value from parent');
  }
}

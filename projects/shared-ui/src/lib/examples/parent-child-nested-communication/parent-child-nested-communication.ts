import { Component, inject, AfterViewInit } from '@angular/core';
import { EXAMPLENested1 } from './nested1/nested1';
import { EXAMPLENested2Registry } from './nested2-registry/nested2-registry';

@Component({
  selector: 'org-example-parent-child-nested-communication',
  imports: [EXAMPLENested1],
  providers: [EXAMPLENested2Registry],
  templateUrl: './parent-child-nested-communication.html',
  styleUrl: './parent-child-nested-communication.scss',
})
// NOTE: only using Component suffix for the context of this example
export class EXAMPLEParentChildNestedCommunication implements AfterViewInit {
  private readonly _nested2Registry = inject(EXAMPLENested2Registry);

  public ngAfterViewInit(): void {
    const nested2 = this._nested2Registry.get('component-store');

    if (!nested2) {
      throw new Error('Nested2 not found');
    }

    nested2.setValue('initial value from parent');
  }
}

import { Component, inject } from '@angular/core';
import { EXAMPLENested2, EXAMPLENested2Registry } from '../nested2/nested2';
import { Button } from '../../../core/button/button';

@Component({
  selector: 'org-example-nested-1',
  imports: [EXAMPLENested2, Button],
  templateUrl: './nested1.html',
})
export class EXAMPLENested1 {
  private readonly _nested2Registry = inject(EXAMPLENested2Registry);

  protected setValue() {
    const nested2 = this._nested2Registry.get('component-store');

    if (!nested2) {
      throw new Error('Component store not found');
    }

    nested2.setValue('value from nested level 1');
  }
}

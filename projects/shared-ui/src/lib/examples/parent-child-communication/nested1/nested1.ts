import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'org-example-nested-1',
  imports: [MatButtonModule],
  templateUrl: './nested1.html',
})
export class EXAMPLENested1 {
  private _value = signal<string>('');

  public readonly value = this._value.asReadonly();

  public setValue(value: string) {
    this._value.set(value);
  }
}

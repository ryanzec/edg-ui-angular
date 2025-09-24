import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { EXAMPLENested2Registry } from '../nested2-registry/nested2-registry';

@Component({
  selector: 'org-example-nested-2',
  templateUrl: './nested2.html',
})
export class EXAMPLENested2 implements OnInit, OnDestroy {
  private readonly _nested2Registry = inject(EXAMPLENested2Registry, { optional: true });
  private _value = signal<string>('');

  public readonly value = this._value.asReadonly();

  public ngOnInit(): void {
    if (!this._nested2Registry) {
      return;
    }

    this._nested2Registry.register('component-store', this);
  }

  public ngOnDestroy(): void {
    if (!this._nested2Registry) {
      return;
    }

    this._nested2Registry.unregister('component-store');
  }

  public setValue(value: string) {
    this._value.set(value);
  }
}

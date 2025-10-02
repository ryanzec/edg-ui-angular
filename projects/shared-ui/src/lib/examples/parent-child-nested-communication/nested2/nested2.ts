import { Component, inject, OnDestroy, OnInit, signal, Injectable } from '@angular/core';

@Injectable()
export class EXAMPLENested2Registry {
  private registryData = new Map<string, EXAMPLENested2>();

  get(key: string) {
    return this.registryData.get(key);
  }

  register(key: string, nested2: EXAMPLENested2) {
    this.registryData.set(key, nested2);
  }

  unregister(key: string) {
    this.registryData.delete(key);
  }
}

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

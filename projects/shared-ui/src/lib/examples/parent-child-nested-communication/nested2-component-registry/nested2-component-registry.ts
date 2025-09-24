import { Injectable } from '@angular/core';
import { EXAMPLENested2 } from '../nested2/nested2';

@Injectable()
export class EXAMPLEComponentStoreRegistry {
  private _stores = new Map<string, EXAMPLENested2>();

  get(key: string) {
    return this._stores.get(key);
  }

  register(key: string, componentStore: EXAMPLENested2) {
    this._stores.set(key, componentStore);
  }

  unregister(key: string) {
    this._stores.delete(key);
  }
}

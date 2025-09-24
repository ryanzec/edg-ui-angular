import { Injectable } from '@angular/core';
import { EXAMPLENested2 } from '../nested2/nested2';

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

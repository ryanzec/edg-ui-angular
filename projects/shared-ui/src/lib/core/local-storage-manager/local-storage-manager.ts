import { inject, Injectable } from '@angular/core';
import { LogManager } from '../log-manager/log-manager';

export type LocalStorageCacheData = {
  // any is being used as we do want to be able to store any kind of data here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  expires: number | boolean;
};

@Injectable({
  providedIn: 'root',
})
export class LocalStorageManager {
  private readonly _logManager = inject(LogManager);

  public get<T = unknown>(key: string | undefined): T | undefined {
    if (!key) {
      return;
    }

    const now = new Date().getTime();
    const rawData = localStorage.getItem(key);

    if (!rawData) {
      return;
    }

    try {
      const storedData = JSON.parse(rawData);

      if (storedData?.expires && storedData.expires <= now) {
        localStorage.removeItem(key);

        return;
      }

      if (storedData) {
        return storedData.value;
      }
    } catch (error: unknown) {
      this._logManager.error({
        type: 'local-storage-manager-error',
        message: 'a value was stored in localStorage but it was invalid JSON',
        error,
      });

      // since there is nothing else we can do, we jsut log and remove the invalid data
      localStorage.removeItem(key);

      return;
    }

    return;
  }

  public set<T = unknown>(key: string | undefined, value: T, expireIn = 0): void {
    if (!key) {
      return;
    }

    const expires = new Date().getTime();

    const data: LocalStorageCacheData = {
      value: value,
      expires: expireIn > 0 ? expires + expireIn : false,
    };

    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error: unknown) {
      this._logManager.error({
        type: 'local-storage-manager-set-data-error',
        message: 'failed to set localStorage item',
        error,
      });
    }
  }

  public remove(key: string | undefined): void {
    if (!key) {
      return;
    }

    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }

  public has(key: string | undefined): boolean {
    if (!key) {
      return false;
    }

    return this.get(key) !== undefined;
  }

  public getAllKeys(): string[] {
    const keys: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key) {
        keys.push(key);
      }
    }

    return keys;
  }

  public size(): number {
    return localStorage.length;
  }
}

import { Injectable, computed, signal } from '@angular/core';

export type SortingDirection = 'asc' | 'desc';

export const sortingDirections: SortingDirection[] = ['asc', 'desc'];

export type SortingState = {
  key: string | null;
  direction: SortingDirection | null;
};

@Injectable({
  providedIn: 'root',
})
export class SortingStore {
  private readonly _state = signal<SortingState>({
    key: null,
    direction: null,
  });

  public readonly key = computed<string | null>(() => this._state().key);
  public readonly direction = computed<SortingDirection | null>(() => this._state().direction);
  public readonly isSorting = computed<boolean>(() => this._state().key !== null && this._state().direction !== null);

  public setSort(key: string | null, direction: SortingDirection | null = null): void {
    this._state.set({
      key,
      direction,
    });
  }

  public toggleSort(key: string): void {
    const currentState = this._state();

    if (currentState.key !== key) {
      this._state.set({
        key,
        direction: 'asc',
      });

      return;
    }

    if (currentState.direction === 'asc') {
      this._state.update((state) => ({
        ...state,
        direction: 'desc',
      }));

      return;
    }

    if (currentState.direction === 'desc') {
      this._state.update((state) => ({
        ...state,
        direction: null,
      }));

      return;
    }

    this._state.update((state) => ({
      ...state,
      direction: 'asc',
    }));
  }

  public clearSort(): void {
    this._state.set({
      key: null,
      direction: null,
    });
  }
}

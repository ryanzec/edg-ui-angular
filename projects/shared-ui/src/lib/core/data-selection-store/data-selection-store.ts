import { computed, signal } from '@angular/core';

export type DataSelectionState<T> = {
  selectedItems: Set<T>;
  selectAllEnabled: boolean;
};

export class DataSelectionStore<T> {
  private readonly _state = signal<DataSelectionState<T>>({
    selectedItems: new Set<T>(),
    selectAllEnabled: false,
  });

  public readonly selectedItems = computed<Set<T>>(() => this._state().selectedItems);
  public readonly selectedItemsArray = computed<T[]>(() => Array.from(this._state().selectedItems));
  public readonly selectedCount = computed<number>(() => this._state().selectedItems.size);
  public readonly selectAllEnabled = computed<boolean>(() => this._state().selectAllEnabled);
  public readonly hasSelection = computed<boolean>(() => this._state().selectedItems.size > 0);

  public isSelected(item: T): boolean {
    return this._state().selectedItems.has(item);
  }

  public set(item: T, selected: boolean): void {
    if (selected) {
      this.select(item);
    } else {
      this.deselect(item);
    }
  }

  public select(item: T): void {
    const currentItems = this._state().selectedItems;

    if (currentItems.has(item)) {
      return;
    }

    const newItems = new Set(currentItems);
    newItems.add(item);

    this._state.update((state) => ({
      ...state,
      selectedItems: newItems,
    }));
  }

  public deselect(item: T): void {
    const currentItems = this._state().selectedItems;

    if (!currentItems.has(item)) {
      return;
    }

    const newItems = new Set(currentItems);
    newItems.delete(item);

    this._state.update((state) => ({
      ...state,
      selectedItems: newItems,
    }));
  }

  public toggle(item: T): void {
    if (this.isSelected(item)) {
      this.deselect(item);

      return;
    }

    this.select(item);
  }

  public setMultiple(items: T[], selected: boolean): void {
    if (selected) {
      this.selectMultiple(items);
    } else {
      this.deselectMultiple(items);
    }
  }

  public selectMultiple(items: T[]): void {
    const currentItems = this._state().selectedItems;
    const newItems = new Set(currentItems);

    for (const item of items) {
      newItems.add(item);
    }

    this._state.update((state) => ({
      ...state,
      selectedItems: newItems,
    }));
  }

  public deselectMultiple(items: T[]): void {
    const currentItems = this._state().selectedItems;
    const newItems = new Set(currentItems);

    for (const item of items) {
      newItems.delete(item);
    }

    this._state.update((state) => ({
      ...state,
      selectedItems: newItems,
    }));
  }

  public selectAll(items: T[]): void {
    this._state.update((state) => ({
      ...state,
      selectedItems: new Set(items),
      selectAllEnabled: true,
    }));
  }

  public deselectAll(): void {
    this._state.set({
      selectedItems: new Set<T>(),
      selectAllEnabled: false,
    });
  }

  public toggleSelectAll(items: T[]): void {
    if (this._state().selectAllEnabled) {
      this.deselectAll();

      return;
    }

    this.selectAll(items);
  }

  public replaceSelection(items: T[]): void {
    this._state.update((state) => ({
      ...state,
      selectedItems: new Set(items),
    }));
  }

  public clear(): void {
    this.deselectAll();
  }

  public areAllSelected(items: T[]): boolean {
    if (items.length === 0) {
      return false;
    }

    return items.every((item) => this.isSelected(item));
  }

  public areSomeSelected(items: T[]): boolean {
    const selectedCount = items.filter((item) => this.isSelected(item)).length;

    return selectedCount > 0 && selectedCount < items.length;
  }

  public areNoneSelected(items: T[]): boolean {
    return items.every((item) => !this.isSelected(item));
  }
}

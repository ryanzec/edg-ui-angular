import { computed, signal } from '@angular/core';
import { BaseDataStore } from './base-data-store';
import { ResponseMeta } from '@organization/shared-types';

type LimitState = {
  offset: number;
  limit: number;
  totalItemCount: number;
  currentPage: number;
};

const generateDefaultLimitState = (): LimitState => ({
  offset: 0,
  limit: 10,
  totalItemCount: 0,
  currentPage: 1,
});

export abstract class BaseLimitDataStore<T> extends BaseDataStore<T> {
  private readonly _limitState = signal<LimitState>(generateDefaultLimitState());

  public readonly totalPages = computed(() => Math.ceil(this._limitState().totalItemCount / this._limitState().limit));
  public readonly currentPage = computed(() => this._limitState().currentPage);
  public readonly offset = computed(() => this._limitState().offset);
  public readonly limit = computed(() => this._limitState().limit);
  public readonly totalItemCount = computed(() => this._limitState().totalItemCount);

  constructor(idField: keyof T, defaultLimitState: Partial<LimitState> = {}) {
    super(idField);

    this._limitState.set({
      offset: defaultLimitState.offset ?? 0,
      limit: defaultLimitState.limit ?? 10,
      totalItemCount: defaultLimitState.totalItemCount ?? 0,
      currentPage: defaultLimitState.currentPage ?? 1,
    });
  }

  protected override unshiftLocalData(items: T[]): void {
    super.unshiftLocalData(items);
  }

  protected override updateLocalData(updateItem: T): void {
    super.updateLocalData(updateItem);
  }

  protected override deleteLocalData(id: unknown): void {
    super.deleteLocalData(id);
  }

  protected override setLocalMeta(meta: ResponseMeta | undefined): void {
    super.setLocalMeta(meta);

    this._limitState.set({
      offset: meta?.offset ?? 0,
      limit: meta?.itemsPerPage ?? 10,
      totalItemCount: meta?.totalItemCount ?? 0,
      currentPage: meta?.currentPage ?? 1,
    });
  }

  public override reset(): void {
    super.reset();
    this._limitState.set(generateDefaultLimitState());
  }
}

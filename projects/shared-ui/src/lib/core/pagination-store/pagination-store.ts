import { Injectable, signal, computed } from '@angular/core';

export type PaginationConfig = {
  pageSize?: number;
  pageSizeOptions?: number[];
  showFirstLast?: boolean;
  showPageSize?: boolean;
};

export type PaginationState = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  pageSizeOptions: number[];
  showFirstLast: boolean;
  showPageSize: boolean;
};

@Injectable()
export class PaginationStore {
  private readonly _currentPage = signal(1);
  private readonly _pageSize = signal(10);
  private readonly _totalItems = signal(0);
  private readonly _pageSizeOptions = signal([5, 10, 20, 50]);
  private readonly _showFirstLast = signal(true);
  private readonly _showPageSize = signal(true);

  readonly currentPage = this._currentPage.asReadonly();
  readonly pageSize = this._pageSize.asReadonly();
  readonly totalItems = this._totalItems.asReadonly();
  readonly pageSizeOptions = this._pageSizeOptions.asReadonly();
  readonly showFirstLast = this._showFirstLast.asReadonly();
  readonly showPageSize = this._showPageSize.asReadonly();

  readonly totalPages = computed(() => Math.ceil(this._totalItems() / this._pageSize()) || 1);

  readonly startIndex = computed(() => (this._currentPage() - 1) * this._pageSize());

  readonly endIndex = computed(() => Math.min(this.startIndex() + this._pageSize(), this._totalItems()));

  readonly hasNext = computed(() => this._currentPage() < this.totalPages());

  readonly hasPrevious = computed(() => this._currentPage() > 1);

  readonly pageNumbers = computed(() => {
    const total = this.totalPages();
    const current = this._currentPage();
    const delta = 2;
    const pages: number[] = [];

    const start = Math.max(1, current - delta);
    const end = Math.min(total, current + delta);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  });

  readonly state = computed(
    (): PaginationState => ({
      currentPage: this._currentPage(),
      pageSize: this._pageSize(),
      totalItems: this._totalItems(),
      pageSizeOptions: this._pageSizeOptions(),
      showFirstLast: this._showFirstLast(),
      showPageSize: this._showPageSize(),
    })
  );

  configure(config: PaginationConfig): void {
    if (config.pageSize) {
      this._pageSize.set(config.pageSize);
    }

    if (config.pageSizeOptions) {
      this._pageSizeOptions.set(config.pageSizeOptions);
    }

    if (config.showFirstLast !== undefined) {
      this._showFirstLast.set(config.showFirstLast);
    }

    if (config.showPageSize !== undefined) {
      this._showPageSize.set(config.showPageSize);
    }
  }

  setTotalItems(total: number): void {
    this._totalItems.set(Math.max(0, total));

    if (this._currentPage() > this.totalPages()) {
      this._currentPage.set(Math.max(1, this.totalPages()));
    }
  }

  setCurrentPage(page: number): void {
    const validPage = Math.max(1, Math.min(page, this.totalPages()));

    this._currentPage.set(validPage);
  }

  setPageSize(size: number): void {
    if (this._pageSizeOptions().includes(size) === false) {
      // @todo logger

      return;
    }

    const currentItem = this.startIndex() + 1;
    this._pageSize.set(size);
    const newPage = Math.ceil(currentItem / size);
    this.setCurrentPage(newPage);
  }

  nextPage(): void {
    if (this.hasNext() == false) {
      return;
    }

    this._currentPage.update((page) => page + 1);
  }

  previousPage(): void {
    if (this.hasPrevious() == false) {
      return;
    }

    this._currentPage.update((page) => page - 1);
  }

  firstPage(): void {
    this._currentPage.set(1);
  }

  lastPage(): void {
    this._currentPage.set(this.totalPages());
  }

  reset(): void {
    this._currentPage.set(1);
    this._pageSize.set(10);
    this._totalItems.set(0);
  }
}

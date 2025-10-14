import { Injectable, computed, signal, inject } from '@angular/core';
import { LogManager } from '../log-manager/log-manager';

export type PaginationState = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
};

export type VisiblePage = {
  type: 'page' | 'ellipsis';
  value: number | null;
  isActive: boolean;
};

export type PaginationConfig = {
  defaultCurrentPage: number;
  defaultTotalItems: number;
  defaultItemsPerPage: number;
  visiblePages: number;
  itemsPerPageOptions: number[];
  disabled: boolean;
};

@Injectable()
export class PaginationStore {
  private readonly _logManager = inject(LogManager);

  private readonly _state = signal<PaginationState>({
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  private readonly _config = signal<PaginationConfig>({
    defaultCurrentPage: 1,
    defaultTotalItems: 0,
    defaultItemsPerPage: 10,
    visiblePages: 7,
    itemsPerPageOptions: [5, 10, 20, 50],
    disabled: false,
  });

  public readonly activePage = computed<number>(() => this._state().currentPage);
  public readonly activeItemsPerPage = computed<number>(() => this._state().itemsPerPage);
  public readonly totalItems = computed<number>(() => this._state().totalItems);
  public readonly disabled = computed<boolean>(() => this._config().disabled);
  public readonly itemsPerPageOptions = computed<number[]>(() => this._config().itemsPerPageOptions);
  public readonly visiblePages = computed<number>(() => this._config().visiblePages);

  public readonly totalPages = computed<number>(
    () => Math.ceil(this._state().totalItems / this._state().itemsPerPage) || 1
  );

  public readonly startIndex = computed<number>(() => (this._state().currentPage - 1) * this._state().itemsPerPage);

  public readonly endIndex = computed<number>(() =>
    Math.min(this.startIndex() + this._state().itemsPerPage, this._state().totalItems)
  );

  public readonly hasPrevious = computed<boolean>(() => this._state().currentPage > 1);

  public readonly hasNext = computed<boolean>(() => this._state().currentPage < this.totalPages());

  public readonly visiblePageItems = computed<VisiblePage[]>(() => {
    const total = this.totalPages();
    const current = this._state().currentPage;
    let visible = this._config().visiblePages;

    // log warning for even visiblePages and adjust
    if (visible % 2 === 0) {
      this._logManager.warn(
        `visiblePages is even (${visible}). It is recommended to use an odd number. Adding extra page on the left.`
      );
      visible = visible + 1; // add extra page on the left
    }

    // show all pages if total is within visible limit
    if (total <= visible) {
      return Array.from({ length: total }, (_, i) => ({
        type: 'page',
        value: i + 1,
        isActive: i + 1 === current,
      }));
    }

    const pages: VisiblePage[] = [];

    // always show first page
    pages.push({
      type: 'page',
      value: 1,
      isActive: current === 1,
    });

    // calculate how many pages we can show in the middle (excluding first and last)
    const middlePages = visible - 2; // reserve space for first and last page
    const halfMiddle = Math.floor(middlePages / 2);

    // determine the range of pages to show around current
    let startPage = Math.max(2, current - halfMiddle);
    let endPage = Math.min(total - 1, current + halfMiddle);

    // adjust range to always show exactly middlePages when possible
    if (endPage - startPage + 1 < middlePages) {
      if (startPage === 2) {
        // we're at the beginning, extend to the right
        endPage = Math.min(total - 1, startPage + middlePages - 1);
      } else if (endPage === total - 1) {
        // we're at the end, extend to the left
        startPage = Math.max(2, endPage - middlePages + 1);
      }
    }

    // add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push({
        type: 'ellipsis',
        value: null,
        isActive: false,
      });
    }

    // add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push({
        type: 'page',
        value: i,
        isActive: i === current,
      });
    }

    // add ellipsis before last page if needed
    if (endPage < total - 1) {
      pages.push({
        type: 'ellipsis',
        value: null,
        isActive: false,
      });
    }

    // always show last page (if different from first)
    if (total > 1) {
      pages.push({
        type: 'page',
        value: total,
        isActive: current === total,
      });
    }

    return pages;
  });

  public readonly resultText = computed<string>(() => {
    const start = this.startIndex() + 1;
    const end = this.endIndex();
    const total = this._state().totalItems;

    return `result ${start} - ${end} of ${total}`;
  });

  public initialize(config: Partial<PaginationConfig>): void {
    this._config.update((currentConfig) => ({ ...currentConfig, ...config }));

    const defaultItemsPerPage = this._config().defaultItemsPerPage;
    const validItemsPerPage = this._config().itemsPerPageOptions.includes(defaultItemsPerPage)
      ? defaultItemsPerPage
      : this._config().itemsPerPageOptions[0];

    this._state.set({
      currentPage: this._config().defaultCurrentPage,
      totalItems: this._config().defaultTotalItems,
      itemsPerPage: validItemsPerPage,
    });
  }

  public setTotalItems(total: number): void {
    const validTotal = Math.max(0, total);
    this._state.update((state) => ({
      ...state,
      totalItems: validTotal,
    }));

    // adjust current page if it exceeds new total pages
    const newTotalPages = Math.ceil(validTotal / this._state().itemsPerPage) || 1;

    if (this._state().currentPage > newTotalPages) {
      this.setCurrentPage(Math.max(1, newTotalPages));
    }
  }

  public setCurrentPage(page: number): number {
    if (this._config().disabled) {
      return this._state().currentPage;
    }

    const validPage = Math.max(1, Math.min(page, this.totalPages()));
    this._state.update((state) => ({
      ...state,
      currentPage: validPage,
    }));

    return validPage;
  }

  public setItemsPerPage(itemsPerPage: number): void {
    if (this._config().disabled || !this._config().itemsPerPageOptions.includes(itemsPerPage)) {
      return;
    }

    this._state.update((state) => ({
      ...state,
      itemsPerPage,
    }));
  }

  public goToPage(page: number): number {
    return this.setCurrentPage(page);
  }

  public previousPage(): number {
    if (this.hasPrevious()) {
      return this.setCurrentPage(this.activePage() - 1);
    }

    return this.activePage();
  }

  public nextPage(): number {
    if (this.hasNext()) {
      return this.setCurrentPage(this.activePage() + 1);
    }

    return this.activePage();
  }

  public firstPage(): number {
    return this.setCurrentPage(1);
  }

  public lastPage(): number {
    return this.setCurrentPage(this.totalPages());
  }

  public updateConfig(config: Partial<PaginationConfig>): void {
    this._config.update((currentConfig) => ({ ...currentConfig, ...config }));
  }
}

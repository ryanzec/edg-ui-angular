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

  private _hasInitialized = false;

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
    const totalPages = this.totalPages();
    const currentPage = this._state().currentPage;
    let visiblePages = this._config().visiblePages;

    // log warning for even visiblePages and adjust
    if (visiblePages % 2 === 0) {
      this._logManager.warn({
        type: 'pagination-store-visible-pages-even',
        message: `it is recommended to use an odd number to avoid uneven numbers of the left / right`,
        setVisiblePages: visiblePages,
      });
      visiblePages = visiblePages + 1; // add extra page on the left
    }

    // show all pages if total is within visible limit
    if (totalPages <= visiblePages) {
      return Array.from({ length: totalPages }, (_, i) => ({
        type: 'page',
        value: i + 1,
        isActive: i + 1 === currentPage,
      }));
    }

    const pages: VisiblePage[] = [];

    // always show first page
    pages.push({
      type: 'page',
      value: 1,
      isActive: currentPage === 1,
    });

    // calculate how many pages we can show in the middle (excluding first and last)
    const middlePages = visiblePages - 2; // reserve space for first and last page
    const halfMiddle = Math.floor(middlePages / 2);

    // determine the range of pages to show around current
    let startPage = Math.max(2, currentPage - halfMiddle);
    let endPage = Math.min(totalPages - 1, currentPage + halfMiddle);

    // adjust range to always show exactly middlePages when possible
    if (endPage - startPage + 1 < middlePages) {
      if (startPage === 2) {
        // we're at the beginning, extend to the right
        endPage = Math.min(totalPages - 1, startPage + middlePages - 1);
      } else if (endPage === totalPages - 1) {
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
        isActive: i === currentPage,
      });
    }

    // add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push({
        type: 'ellipsis',
        value: null,
        isActive: false,
      });
    }

    // always show last page (if different from first)
    if (totalPages > 1) {
      pages.push({
        type: 'page',
        value: totalPages,
        isActive: currentPage === totalPages,
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
    if (this._hasInitialized) {
      return;
    }

    this._hasInitialized = true;

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

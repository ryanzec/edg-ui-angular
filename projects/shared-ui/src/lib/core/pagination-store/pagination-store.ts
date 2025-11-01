import { Injectable, computed, signal, inject } from '@angular/core';
import { LogManager } from '../log-manager/log-manager';

export type PaginationState = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  visiblePages: number;
  itemsPerPageOptions: number[];
  disabled: boolean;
};

export type VisiblePage = {
  type: 'page' | 'ellipsis';
  value: number | null;
  isActive: boolean;
};

@Injectable()
export class PaginationStore {
  private readonly _logManager = inject(LogManager);

  private _hasInitialized = false;

  private readonly _state = signal<PaginationState>({
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 10,
    visiblePages: 7,
    itemsPerPageOptions: [5, 10, 20, 50],
    disabled: false,
  });

  public readonly activePage = computed<number>(() => this._state().currentPage);
  public readonly activeItemsPerPage = computed<number>(() => this._state().itemsPerPage);
  public readonly totalItems = computed<number>(() => this._state().totalItems);
  public readonly disabled = computed<boolean>(() => this._state().disabled);
  public readonly itemsPerPageOptions = computed<number[]>(() => this._state().itemsPerPageOptions);
  public readonly visiblePages = computed<number>(() => this._state().visiblePages);

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
    let visiblePages = this._state().visiblePages;

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

  public initialize(state: Partial<PaginationState>): void {
    if (this._hasInitialized) {
      return;
    }

    this._hasInitialized = true;

    this.setState(state);
  }

  public setState(partialState: Partial<PaginationState>): void {
    this._state.update((currentState) => {
      const newState = { ...currentState };

      // update itemsPerPageOptions first if provided, as it's needed for validation
      if (partialState.itemsPerPageOptions !== undefined) {
        newState.itemsPerPageOptions = partialState.itemsPerPageOptions;
      }

      // validate and update itemsPerPage
      if (partialState.itemsPerPage !== undefined) {
        if (newState.itemsPerPageOptions.includes(partialState.itemsPerPage)) {
          newState.itemsPerPage = partialState.itemsPerPage;
        }
      }

      // update totalItems
      if (partialState.totalItems !== undefined) {
        newState.totalItems = Math.max(0, partialState.totalItems);
      }

      // update other properties
      if (partialState.visiblePages !== undefined) {
        newState.visiblePages = partialState.visiblePages;
      }

      if (partialState.disabled !== undefined) {
        newState.disabled = partialState.disabled;
      }

      // calculate total pages with potentially updated values
      const newTotalPages = Math.ceil(newState.totalItems / newState.itemsPerPage) || 1;

      // validate and update currentPage last, as it depends on totalPages
      if (partialState.currentPage !== undefined) {
        newState.currentPage = Math.max(1, Math.min(partialState.currentPage, newTotalPages));
      }

      // adjust current page if it exceeds new total pages (even if not explicitly updated)
      if (newState.currentPage > newTotalPages) {
        newState.currentPage = Math.max(1, newTotalPages);
      }

      return newState;
    });
  }

  public goToPage(page: number): number {
    if (this._state().disabled) {
      return this._state().currentPage;
    }

    const totalPages = this.totalPages();
    const validPage = Math.max(1, Math.min(page, totalPages));
    this.setState({ currentPage: validPage });

    return validPage;
  }

  public goToPreviousPage(): number {
    if (this.hasPrevious()) {
      const newPage = this.activePage() - 1;
      this.setState({ currentPage: newPage });

      return newPage;
    }

    return this.activePage();
  }

  public goToNextPage(): number {
    if (this.hasNext()) {
      const newPage = this.activePage() + 1;
      this.setState({ currentPage: newPage });

      return newPage;
    }

    return this.activePage();
  }

  public goToFirstPage(): number {
    this.setState({ currentPage: 1 });

    return 1;
  }

  public goToLastPage(): number {
    const lastPage = this.totalPages();
    this.setState({ currentPage: lastPage });

    return lastPage;
  }
}

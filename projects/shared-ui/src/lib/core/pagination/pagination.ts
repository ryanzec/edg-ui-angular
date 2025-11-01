import { Component, ChangeDetectionStrategy, input, model, inject, OnInit, computed, effect } from '@angular/core';
import { Button } from '../button/button';
import { tailwindUtils } from '@organization/shared-utils';
import { PaginationStore, type PaginationState } from '../pagination-store/pagination-store';

@Component({
  selector: 'org-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  providers: [PaginationStore],
  templateUrl: './pagination.html',
})
export class Pagination implements OnInit {
  private readonly _paginationStore = inject(PaginationStore);

  public currentPage = model<number>(1);
  public totalItems = input<number>(0);
  public itemsPerPage = model<number>(10);
  public visiblePages = input<number>(7);
  public itemsPerPageOptions = input<number[]>([5, 10, 20, 50]);
  public class = input<string>('');
  public disabled = input<boolean>(false);

  protected readonly inputState = computed<Partial<PaginationState>>(() => ({
    currentPage: this.currentPage(),
    totalItems: this.totalItems(),
    itemsPerPage: this.itemsPerPage(),
    visiblePages: this.visiblePages(),
    itemsPerPageOptions: this.itemsPerPageOptions(),
    disabled: this.disabled(),
  }));

  constructor() {
    effect(() => {
      const state = this.inputState();

      this._paginationStore.setState(state);
    });
  }

  // expose store computed properties
  protected readonly activePage = this._paginationStore.activePage;
  protected readonly activeItemsPerPage = this._paginationStore.activeItemsPerPage;
  protected readonly totalPages = this._paginationStore.totalPages;
  protected readonly startIndex = this._paginationStore.startIndex;
  protected readonly endIndex = this._paginationStore.endIndex;
  protected readonly hasPrevious = this._paginationStore.hasPrevious;
  protected readonly hasNext = this._paginationStore.hasNext;
  protected readonly visiblePageItems = this._paginationStore.visiblePageItems;
  protected readonly resultText = this._paginationStore.resultText;

  protected mergeClasses = tailwindUtils.merge;

  public ngOnInit(): void {
    // initialize the store with component inputs
    this._paginationStore.initialize(this.inputState());
  }

  protected onGoToPage(page: number): void {
    const newPage = this._paginationStore.goToPage(page);

    this.currentPage.set(newPage);
  }

  protected onPreviousPage(): void {
    const activePage = this.activePage();
    const newPage = this._paginationStore.goToPreviousPage();

    if (newPage !== activePage) {
      this.currentPage.set(newPage);
    }
  }

  protected onNextPage(): void {
    const activePage = this.activePage();
    const newPage = this._paginationStore.goToNextPage();

    if (newPage !== activePage) {
      this.currentPage.set(newPage);
    }
  }

  protected onFirstPage(): void {
    const newPage = this._paginationStore.goToFirstPage();

    this.currentPage.set(newPage);
  }

  protected onLastPage(): void {
    const newPage = this._paginationStore.goToLastPage();

    this.currentPage.set(newPage);
  }

  protected onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage.set(itemsPerPage);
    this.currentPage.set(1);
  }
}

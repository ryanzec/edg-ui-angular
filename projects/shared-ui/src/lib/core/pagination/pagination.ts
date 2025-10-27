import { Component, ChangeDetectionStrategy, input, output, inject, OnInit } from '@angular/core';
import { Button } from '../button/button';
import { tailwindUtils } from '@organization/shared-utils';
import { PaginationStore } from '../pagination-store/pagination-store';

@Component({
  selector: 'org-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  templateUrl: './pagination.html',
})
export class Pagination implements OnInit {
  private readonly _paginationStore = inject(PaginationStore);

  public defaultCurrentPage = input<number>(1);
  public defaultTotalItems = input<number>(0);
  public defaultItemsPerPage = input<number>(10);
  public defaultVisiblePages = input<number>(7);
  public defaultItemsPerPageOptions = input<number[]>([5, 10, 20, 50]);
  public class = input<string>('');
  public disabled = input<boolean>(false);

  public pageChanged = output<number>();
  public itemsPerPageChanged = output<number>();

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
  protected readonly itemsPerPageOptions = this._paginationStore.itemsPerPageOptions;

  protected mergeClasses = tailwindUtils.merge;

  public ngOnInit(): void {
    // initialize the store with component inputs
    this._paginationStore.initialize({
      defaultCurrentPage: this.defaultCurrentPage(),
      defaultTotalItems: this.defaultTotalItems(),
      defaultItemsPerPage: this.defaultItemsPerPage(),
      visiblePages: this.defaultVisiblePages(),
      itemsPerPageOptions: this.defaultItemsPerPageOptions(),
      disabled: this.disabled(),
    });
  }

  public setTotalItems(total: number): void {
    this._paginationStore.setTotalItems(total);
  }

  public setCurrentPage(page: number): void {
    const newPage = this._paginationStore.setCurrentPage(page);
    this.pageChanged.emit(newPage);
  }

  public setItemsPerPage(itemsPerPage: number): void {
    this._paginationStore.setItemsPerPage(itemsPerPage);
    this.itemsPerPageChanged.emit(itemsPerPage);

    this.setCurrentPage(1);
  }

  public goToPage(page: number): void {
    this.setCurrentPage(page);
  }

  public previousPage(): void {
    const currentPage = this.activePage();
    const previousPage = this._paginationStore.previousPage();

    if (previousPage !== currentPage) {
      this.setCurrentPage(previousPage);
    }
  }

  public nextPage(): void {
    const currentPage = this.activePage();
    const nextPage = this._paginationStore.nextPage();

    if (nextPage !== currentPage) {
      this.setCurrentPage(nextPage);
    }
  }

  public firstPage(): void {
    this.setCurrentPage(1);
  }

  public lastPage(): void {
    const newPage = this._paginationStore.lastPage();
    this.pageChanged.emit(newPage);
  }
}

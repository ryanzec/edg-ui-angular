import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
  inject,
  OnInit,
  OnDestroy,
  Injectable,
} from '@angular/core';
import { Button } from '../button/button';
import { tailwindUtils } from '@organization/shared-utils';

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

@Injectable()
export class PaginationRegistry {
  private registryData = new Map<string, Pagination>();

  public get(key: string): Pagination | undefined {
    return this.registryData.get(key);
  }

  public register(key: string, pagination: Pagination): void {
    this.registryData.set(key, pagination);
  }

  public unregister(key: string): void {
    this.registryData.delete(key);
  }
}

@Component({
  selector: 'org-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination implements OnInit, OnDestroy {
  private readonly _paginationRegistry = inject(PaginationRegistry, { optional: true });

  private readonly _state = signal<PaginationState>({
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  public defaultCurrentPage = input<number>(1);
  public defaultTotalItems = input<number>(0);
  public defaultItemsPerPage = input<number>(10);
  public maximumVisiblePages = input<number>(7);
  public itemsPerPageOptions = input<number[]>([5, 10, 20, 50]);
  public disabled = input<boolean>(false);
  public registryKey = input<string | null>(null);
  public class = input<string>('');

  public pageChanged = output<number>();
  public itemsPerPageChanged = output<number>();

  public readonly activePage = computed<number>(() => this._state().currentPage);
  public readonly activeItemsPerPage = computed<number>(() => this._state().itemsPerPage);

  public readonly totalPages = computed<number>(
    () => Math.ceil(this._state().totalItems / this._state().itemsPerPage) || 1
  );

  public readonly startIndex = computed<number>(() => (this._state().currentPage - 1) * this._state().itemsPerPage);

  public readonly endIndex = computed<number>(() =>
    Math.min(this.startIndex() + this._state().itemsPerPage, this._state().totalItems)
  );

  public readonly hasPrevious = computed<boolean>(() => this._state().currentPage > 1);

  public readonly hasNext = computed<boolean>(() => this._state().currentPage < this.totalPages());

  public readonly visiblePages = computed<VisiblePage[]>(() => {
    const total = this.totalPages();
    const current = this._state().currentPage;
    const maxVisible = this.maximumVisiblePages();

    if (total <= maxVisible) {
      // Show all pages if total is within max visible limit
      return Array.from({ length: total }, (_, i) => ({
        type: 'page' as const,
        value: i + 1,
        isActive: i + 1 === current,
      }));
    }

    const pages: VisiblePage[] = [];

    // Always show first page
    pages.push({
      type: 'page',
      value: 1,
      isActive: current === 1,
    });

    // Calculate range around current page
    const sidePages = Math.floor((maxVisible - 3) / 2); // Reserve space for first, last, and ellipsis
    const startPage = Math.max(2, current - sidePages);
    const endPage = Math.min(total - 1, current + sidePages);

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push({
        type: 'ellipsis',
        value: null,
        isActive: false,
      });
    }

    // Add pages around current
    for (let i = startPage; i <= endPage; i++) {
      pages.push({
        type: 'page',
        value: i,
        isActive: i === current,
      });
    }

    // Add ellipsis before last page if needed
    if (endPage < total - 1) {
      pages.push({
        type: 'ellipsis',
        value: null,
        isActive: false,
      });
    }

    // Always show last page (if different from first)
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

  public mergeClasses = tailwindUtils.merge;

  public ngOnInit(): void {
    const defaultItemsPerPage = this.defaultItemsPerPage();
    const validItemsPerPage = this.itemsPerPageOptions().includes(defaultItemsPerPage)
      ? defaultItemsPerPage
      : this.itemsPerPageOptions()[0];

    this._state.set({
      currentPage: this.defaultCurrentPage(),
      totalItems: this.defaultTotalItems(),
      itemsPerPage: validItemsPerPage,
    });

    // Register with pagination registry if available and key provided
    if (this._paginationRegistry && this.registryKey()) {
      this._paginationRegistry.register(this.registryKey()!, this);
    }
  }

  public ngOnDestroy(): void {
    // Unregister from pagination registry if registered
    if (this._paginationRegistry && this.registryKey()) {
      this._paginationRegistry.unregister(this.registryKey()!);
    }
  }

  public setTotalItems(total: number): void {
    const validTotal = Math.max(0, total);
    this._state.update((state) => ({
      ...state,
      totalItems: validTotal,
    }));

    // Adjust current page if it exceeds new total pages
    const newTotalPages = Math.ceil(validTotal / this._state().itemsPerPage) || 1;

    if (this._state().currentPage > newTotalPages) {
      this.setCurrentPage(Math.max(1, newTotalPages));
    }
  }

  public setCurrentPage(page: number): void {
    if (this.disabled()) {
      return;
    }

    const validPage = Math.max(1, Math.min(page, this.totalPages()));
    this._state.update((state) => ({
      ...state,
      currentPage: validPage,
    }));

    this.pageChanged.emit(validPage);
  }

  public setItemsPerPage(itemsPerPage: number): void {
    if (this.disabled() || !this.itemsPerPageOptions().includes(itemsPerPage)) {
      return;
    }

    const currentItem = this.startIndex() + 1;
    this._state.update((state) => ({
      ...state,
      itemsPerPage,
    }));

    // Adjust current page to maintain approximate position
    const newPage = Math.ceil(currentItem / itemsPerPage);
    this.setCurrentPage(newPage);
    this.itemsPerPageChanged.emit(itemsPerPage);
  }

  public goToPage(page: number): void {
    this.setCurrentPage(page);
  }

  public previousPage(): void {
    if (this.hasPrevious()) {
      this.setCurrentPage(this.activePage() - 1);
    }
  }

  public nextPage(): void {
    if (this.hasNext()) {
      this.setCurrentPage(this.activePage() + 1);
    }
  }

  public firstPage(): void {
    this.setCurrentPage(1);
  }

  public lastPage(): void {
    this.setCurrentPage(this.totalPages());
  }
}

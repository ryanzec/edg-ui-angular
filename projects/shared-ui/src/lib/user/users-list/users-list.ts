import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  OnDestroy,
  effect,
  inject,
  InjectionToken,
  computed,
} from '@angular/core';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import { DateTime } from 'luxon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { type User, type UserRoleName } from '@organization/shared-types';
import { Button } from '../../core/button/button';
import { Table } from '../../core/table/table';
import { Tag, type TagColor } from '../../core/tag/tag';
import { OverlayMenu, type OverlayMenuItem } from '../../core/overlay-menu/overlay-menu';
import { tailwindUtils } from '@organization/shared-utils';
import { Skeleton } from '../../core/skeleton/skeleton';
import { Input } from '../../core/input/input';
import { Combobox } from '../../core/combobox/combobox';
import { DatePickerInput } from '../../core/date-picker-input/date-picker-input';
import { SortingStore, type SortingDirection } from '../../core/sorting-store/sorting-store';
import { SortableDirective } from '../../core/sortable-directive/sortable-directive';
import { type ComboboxOptionInput } from '../../core/combobox-store/combobox-store';
import { FormFields } from '../../core/form-fields/form-fields';
import { FormField } from '../../core/form-field/form-field';
import { DateDisplay } from '@organization/shared-ui';
import { LoadingSpinner } from '../../core/loading-spinner/loading-spinner';
import { Pagination } from '../../core/pagination/pagination';
import { PaginationStore } from '../../core/pagination-store/pagination-store';

/**
 * injection token for users list pagination store
 */
export const USERS_LIST_PAGINATION_STORE = new InjectionToken<PaginationStore>('Users List Pagination Store');

/**
 * date field options for filtering
 */
export const dateFieldOptions: ComboboxOptionInput[] = [
  { label: 'Created', value: 'createdAt' },
  { label: 'Updated', value: 'updatedAt' },
];

/**
 * filter values type
 */
export type UsersListFilterValues = {
  nameSearch: string;
  dateField: string;
  dateValue: { startDate: DateTime | null; endDate: DateTime | null };
};

/**
 * sorting data type
 */
export type UsersListSortingData = {
  key: string | null;
  direction: SortingDirection | null;
};

@Component({
  selector: 'org-users-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Button,
    CdkMenuTrigger,
    OverlayMenu,
    Table,
    Tag,
    Skeleton,
    Input,
    Combobox,
    DatePickerInput,
    ReactiveFormsModule,
    SortableDirective,
    FormFields,
    FormField,
    DateDisplay,
    LoadingSpinner,
    Pagination,
  ],
  providers: [SortingStore],
  templateUrl: './users-list.html',
  host: {
    dataid: 'users-list',
  },
})
export class UsersList implements OnDestroy {
  private readonly _destroy$ = new Subject<void>();
  private readonly _sortingStore = inject(SortingStore);
  private readonly _paginationStore = inject(USERS_LIST_PAGINATION_STORE, { optional: true });

  public users = input.required<User[]>();
  public isLoading = input<boolean>(false);
  public isBackgroundLoading = input<boolean>(false);
  public containerClass = input<string>('');
  public tableContainerClass = input<string>('');
  public enableFilters = input<boolean>(false);
  public enableSorting = input<boolean>(false);
  public defaultSortKey = input<string | null>('createdAt');
  public defaultSortDirection = input<SortingDirection | null>('desc');

  public userEdit = output<User>();
  public userDelete = output<User>();
  public filtersChanged = output<UsersListFilterValues>();
  public sortingChanged = output<UsersListSortingData>();
  public pageChanged = output<number>();
  public itemsPerPageChanged = output<number>();

  public mergeClasses = tailwindUtils.merge;
  public readonly dateFieldOptions = dateFieldOptions;
  public readonly menuPosition = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: 8,
    },
  ];

  public readonly key = computed<string | null>(() => this._sortingStore.key());
  public readonly direction = computed<SortingDirection | null>(() => this._sortingStore.direction());

  protected readonly hasPagination = computed<boolean>(() => this._paginationStore !== null);
  protected readonly paginationDisabled = computed<boolean>(() => this.isLoading() || this.isBackgroundLoading());

  /**
   * reactive form for filters
   */
  public readonly filterForm = new FormGroup({
    nameSearch: new FormControl('', { nonNullable: true }),
    dateField: new FormControl<(string | number)[]>(['updatedAt'], { nonNullable: true }),
    dateValue: new FormControl<{ startDate: DateTime | null; endDate: DateTime | null }>(
      { startDate: null, endDate: null },
      { nonNullable: true }
    ),
  });

  constructor() {
    // initialize sorting store with default values
    effect(() => {
      const key = this.defaultSortKey();
      const direction = this.defaultSortDirection();

      this._sortingStore.setSort(key, direction);
    });

    // handle name search with debounce
    this.filterForm.controls.nameSearch.valueChanges
      .pipe(debounceTime(300), takeUntil(this._destroy$))
      .subscribe(() => {
        this._resetPaginationToFirstPage();
        this._emitFilterChanges();
      });

    // handle date field changes immediately
    this.filterForm.controls.dateField.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this._resetPaginationToFirstPage();
      this._emitFilterChanges();
    });

    // handle date value changes immediately
    this.filterForm.controls.dateValue.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this._resetPaginationToFirstPage();
      this._emitFilterChanges();
    });

    // emit sorting changes whenever sorting state changes
    effect(() => {
      const key = this._sortingStore.key();
      const direction = this._sortingStore.direction();

      this._resetPaginationToFirstPage();
      this.sortingChanged.emit({ key, direction });
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  protected getUserActionsMenuItems(_user: User): OverlayMenuItem[] {
    return [
      {
        id: 'edit',
        label: 'Edit',
        icon: 'pencil-simple',
      },
      {
        id: 'delete',
        label: 'Delete',
        icon: 'trash',
      },
    ];
  }

  protected onUserActionMenuItemClick(menuItem: OverlayMenuItem, user: User): void {
    if (menuItem.id === 'edit') {
      this.userEdit.emit(user);
    } else if (menuItem.id === 'delete') {
      this.userDelete.emit(user);
    }
  }

  protected toDateTime(dateString: string): DateTime {
    // @todo fix date issue in backend
    return DateTime.fromISO(dateString.split(' ').join('T'));
  }

  protected getRoleColor(role: UserRoleName): TagColor {
    return role === 'admin' ? 'danger' : 'info';
  }

  protected asUser(tempUser: unknown): User {
    return tempUser as User;
  }

  protected onPageChanged(page: number): void {
    this.pageChanged.emit(page);
  }

  protected onItemsPerPageChanged(itemsPerPage: number): void {
    this.itemsPerPageChanged.emit(itemsPerPage);
  }

  /**
   * emit filter changes with current form values
   */
  private _emitFilterChanges(): void {
    const formValue = this.filterForm.getRawValue();
    const dateFieldArray = formValue.dateField;
    const dateField = dateFieldArray.length > 0 ? String(dateFieldArray[0]) : 'updatedAt';

    this.filtersChanged.emit({
      nameSearch: formValue.nameSearch,
      dateField,
      dateValue: formValue.dateValue,
    });
  }

  /**
   * reset pagination to first page when filters or sorting changes
   */
  private _resetPaginationToFirstPage(): void {
    if (this._paginationStore) {
      this._paginationStore.setCurrentPage(1);
    }
  }
}

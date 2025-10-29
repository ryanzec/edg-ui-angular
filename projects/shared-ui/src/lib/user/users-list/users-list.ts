import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  effect,
  inject,
  InjectionToken,
  computed,
  afterNextRender,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import { DateTime } from 'luxon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, combineLatestWith, startWith, map } from 'rxjs';
import { type User, type UserRoleName } from '@organization/shared-types';
import { Button } from '../../core/button/button';
import { Table } from '../../core/table/table';
import { TableRow } from '../../core/table/table-row';
import { TableHeader } from '../../core/table/table-header';
import { TableCell } from '../../core/table/table-cell';
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
import { Pagination } from '../../core/pagination/pagination';
import { PaginationStore } from '../../core/pagination-store/pagination-store';
import { LogManager } from '../../core/log-manager/log-manager';

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
  name: string;
  dateType: 'createdAt' | 'updatedAt';
  startDate: DateTime | null;
  endDate: DateTime | null;
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
    TableRow,
    TableHeader,
    TableCell,
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
    Pagination,
  ],
  providers: [SortingStore],
  templateUrl: './users-list.html',
  host: {
    ['attr.data-testid']: 'users-list',
  },
})
export class UsersList {
  private readonly _logManager = inject(LogManager);
  private readonly _sortingStore = inject(SortingStore);
  private readonly _paginationStore = inject(USERS_LIST_PAGINATION_STORE, { optional: true });

  private _filterFormInitialized = false;

  public users = input.required<User[]>();
  public isInitialLoading = input<boolean>(false);
  public isLoading = input<boolean>(false);
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
  protected readonly usersActionsMenuPosition = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: 8,
    },
  ];
  protected readonly usersActionsMenuItems: OverlayMenuItem[] = [
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

  public readonly key = computed<string | null>(() => this._sortingStore.key());
  public readonly direction = computed<SortingDirection | null>(() => this._sortingStore.direction());

  protected readonly hasPagination = computed<boolean>(() => this._paginationStore !== null);
  protected readonly paginationDisabled = computed<boolean>(() => this.isLoading() || this.isInitialLoading());

  /**
   * reactive form for filters
   */
  protected readonly filterForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, updateOn: 'change' }),
    dateType: new FormControl<UsersListFilterValues['dateType'][]>([], {
      nonNullable: true,
      updateOn: 'change',
    }),
    dateValue: new FormControl<{ startDate: DateTime | null; endDate: DateTime | null }>(
      { startDate: null, endDate: null },
      { nonNullable: true, updateOn: 'change' }
    ),
  });

  constructor() {
    const nameControl = this.filterForm.get('name');
    const dateTypeControl = this.filterForm.get('dateType');
    const dateValueControl = this.filterForm.get('dateValue');

    if (!nameControl || !dateTypeControl || !dateValueControl) {
      this._logManager.error({
        type: 'users-list-filter-form-control-not-found',
        hasNameControl: !!nameControl,
        hasDateTypeControl: !!dateTypeControl,
        hasDateValueControl: !!dateValueControl,
      });

      return;
    }

    const nameFilter$ = nameControl.valueChanges.pipe(startWith(''), debounceTime(300));
    const dateTypeFilter$ = dateTypeControl.valueChanges.pipe(startWith(['updated']));
    const dateValueFilter$ = dateValueControl.valueChanges.pipe(startWith({ startDate: null, endDate: null }));

    // combineLatest() will be removed in v8 so we have to use this newer pattern
    nameFilter$
      .pipe(
        combineLatestWith(dateTypeFilter$, dateValueFilter$),
        takeUntilDestroyed(),
        map(([nameFilter, dateTypeFilter, dateValueFilter]) => {
          const dateType = dateTypeFilter.length > 0 ? dateTypeFilter[0] : 'updatedAt';

          return {
            name: nameFilter,
            dateType: dateType as UsersListFilterValues['dateType'],
            startDate: dateValueFilter.startDate,
            endDate: dateValueFilter.endDate,
          };
        })
      )
      .subscribe((filters) => {
        this.filtersChanged.emit(filters);
      });

    // propagate sorting changes up the tree
    effect(() => {
      const key = this._sortingStore.direction() ? this._sortingStore.key() : null;
      const direction = this._sortingStore.direction();

      this._resetPaginationToFirstPage();
      this.sortingChanged.emit({ key, direction });
    });

    afterNextRender(() => {
      if (this.enableFilters() === false || this._filterFormInitialized) {
        this._filterFormInitialized = this.enableFilters();

        return;
      }

      this._initializeFilterForm();
    });
  }

  protected onUserActionMenuItemClick(menuItem: OverlayMenuItem, user: User): void {
    if (menuItem.id === 'edit') {
      this.userEdit.emit(user);

      return;
    }

    if (menuItem.id === 'delete') {
      this.userDelete.emit(user);

      return;
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
   * reset pagination to first page when filters or sorting changes
   */
  private _resetPaginationToFirstPage(): void {
    if (this._paginationStore) {
      this._paginationStore.setCurrentPage(1);
    }
  }

  private _initializeFilterForm(): void {
    if (this._filterFormInitialized) {
      return;
    }

    console.log('initializeFilterForm');
    this._filterFormInitialized = true;

    this.filterForm.patchValue({
      dateType: ['updatedAt'],
    });

    this._sortingStore.setSort(this.defaultSortKey(), this.defaultSortDirection());
  }
}

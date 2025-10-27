import { Component, ChangeDetectionStrategy, inject, effect, untracked, ViewChild, AfterViewInit } from '@angular/core';
import {
  UsersList,
  PaginationStore,
  UsersDataStore,
  Icon,
  Button,
  UsersListFilterValues,
  LoadingSpinner,
  USERS_LIST_PAGINATION_STORE,
  UsersListSortingData,
} from '@organization/shared-ui';
import { User } from '@organization/shared-types';

@Component({
  selector: 'cp-users-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UsersList, Icon, Button, LoadingSpinner],
  providers: [
    PaginationStore,
    {
      provide: USERS_LIST_PAGINATION_STORE,
      useExisting: PaginationStore,
    },
  ],
  templateUrl: './users-view.html',
})
export class UsersView implements AfterViewInit {
  private readonly usersDataStore = inject(UsersDataStore);
  private readonly paginationStore = inject(USERS_LIST_PAGINATION_STORE);
  public readonly users = this.usersDataStore.data;
  public readonly loadingState = this.usersDataStore.loadingState;
  public readonly error = this.usersDataStore.error;

  @ViewChild('usersListComponent')
  public usersListComponent!: UsersList;

  constructor() {
    this.paginationStore.initialize({
      itemsPerPageOptions: [1, 2, 5, 10],
    });

    // sync pagination data
    effect(() => {
      const totalItemCount = this.usersDataStore.totalItemCount();
      const currentPage = this.usersDataStore.currentPage();
      const limit = this.usersDataStore.limit();

      untracked(() => {
        this.paginationStore.setTotalItems(totalItemCount);
        this.paginationStore.setCurrentPage(currentPage);
        this.paginationStore.setItemsPerPage(limit);
      });
    });
  }

  ngAfterViewInit(): void {
    this.usersDataStore.fetch({
      orderBy: this.usersListComponent.key(),
      orderDirection: this.usersListComponent.direction(),
    });
  }

  public onUserEdit(user: User): void {
    console.log('Edit user:', user);
  }

  public onUserDelete(user: User): void {
    console.log('Delete user:', user);
  }

  public onFiltersChanged(filters: UsersListFilterValues): void {
    this.usersDataStore.fetch({ offset: 0, ...filters });
  }

  public onSortingChanged(sorting: UsersListSortingData): void {
    this.usersDataStore.fetch({ offset: 0, orderBy: sorting.key, orderDirection: sorting.direction });
  }

  public onPageChanged(page: number): void {
    this.usersDataStore.fetch({
      offset: (page - 1) * this.paginationStore.activeItemsPerPage(),
      limit: this.paginationStore.activeItemsPerPage(),
    });
  }

  public onItemsPerPageChanged(itemsPerPage: number): void {
    this.usersDataStore.fetch({ offset: 0, limit: itemsPerPage });
  }
}

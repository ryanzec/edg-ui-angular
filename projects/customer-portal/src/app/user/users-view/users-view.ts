import {
  Component,
  ChangeDetectionStrategy,
  inject,
  effect,
  untracked,
  ViewChild,
  AfterViewInit,
  signal,
  runInInjectionContext,
  Injector,
} from '@angular/core';
import {
  UsersList,
  PaginationStore,
  UsersDataStore,
  UsersListFilterValues,
  USERS_LIST_PAGINATION_STORE,
  UsersListSortingData,
  GlobalNotificationManager,
  LogManager,
  Button,
  DialogController,
  UserFormDialog,
  UserDeleteDialog,
  UserFormData,
  UserDeleteData,
  Card,
  CardHeader,
  CardContent,
} from '@organization/shared-ui';
import { GetUsersRequest, type User } from '@organization/shared-types';
import { debounceTime, distinctUntilChanged, firstValueFrom } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';
import { toObservable } from '@angular/core/rxjs-interop';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isEqual } from 'es-toolkit';
@Component({
  selector: 'cp-users-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UsersList, DialogController, Button, Card, CardHeader, CardContent],
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
  private readonly _usersDataStore = inject(UsersDataStore);
  private readonly _paginationStore = inject(USERS_LIST_PAGINATION_STORE);
  private readonly _globalNotificationManager = inject(GlobalNotificationManager);
  private readonly _logManager = inject(LogManager);
  private readonly _injector = inject(Injector);

  private _selectedUser = signal<User | null>(null);
  private readonly _fetchRequestData = signal<GetUsersRequest>({
    orderBy: 'createdAt',
    orderDirection: 'desc',
  });
  private _userFormDialogRef: DialogRef<UserFormDialog, UserFormDialog> | null = null;
  private _userDeleteDialogRef: DialogRef<UserDeleteDialog, UserDeleteDialog> | null = null;

  protected readonly UserFormDialogComponent = UserFormDialog;
  protected readonly UserDeleteDialogComponent = UserDeleteDialog;

  public readonly users = this._usersDataStore.data;
  public readonly usersInitialized = this._usersDataStore.hasInitialized;
  public readonly loadingState = this._usersDataStore.loadingState;
  public readonly usersError = this._usersDataStore.error;

  @ViewChild('usersListComponent')
  public usersListComponent!: UsersList;

  @ViewChild('userFormDialogController')
  public userFormDialogController!: DialogController<UserFormDialog>;

  @ViewChild('userDeleteDialogController')
  public userDeleteDialogController!: DialogController<UserDeleteDialog>;

  constructor() {
    this._paginationStore.initialize({
      itemsPerPageOptions: [1, 2, 5, 10],
    });

    // sync pagination data
    effect(() => {
      const totalItemCount = this._usersDataStore.totalItemCount();
      const currentPage = this._usersDataStore.currentPage();
      const limit = this._usersDataStore.limit();

      untracked(() => {
        this._paginationStore.setTotalItems(totalItemCount);
        this._paginationStore.setCurrentPage(currentPage);
        this._paginationStore.setItemsPerPage(limit);
      });
    });
  }

  public ngAfterViewInit(): void {
    runInInjectionContext(this._injector, () => {
      toObservable(this._fetchRequestData)
        .pipe(debounceTime(0), takeUntilDestroyed(), distinctUntilChanged(isEqual))
        .subscribe((fetchRequestData) => {
          this._usersDataStore.fetch(fetchRequestData);
        });
    });
  }

  private _openFormDialog(existingUser: User | null): void {
    this._selectedUser.set(existingUser);

    this._userFormDialogRef = this.userFormDialogController.openDialog({
      existingUser: null,
      dialogClass: 'w-[400px]',
      dialogController: this.userFormDialogController,
    });

    if (!this._userFormDialogRef || !this._userFormDialogRef.componentInstance) {
      this._logManager.error({
        type: 'user-form-dialog-error',
        message: 'failed to open dialog',
        hasDialogRef: !!this._userFormDialogRef,
        hasComponentInstance: !!this._userFormDialogRef?.componentInstance,
      });

      this._globalNotificationManager.add({
        message: `Failed to ${existingUser ? 'update' : 'add'} user`,
        color: 'danger',
        canClose: true,
      });

      return;
    }

    const componentInstance = this._userFormDialogRef.componentInstance as UserFormDialog;

    componentInstance.formSubmitted.subscribe((formData: UserFormData) => {
      this._processUserForm(formData);
    });
  }

  protected onAddUserClick(): void {
    this._openFormDialog(null);
  }

  protected onUserEdit(user: User): void {
    this._openFormDialog(user);
  }

  protected onUserDelete(user: User): void {
    this._selectedUser.set(user);

    this._userDeleteDialogRef = this.userDeleteDialogController.openDialog({
      user: {
        id: user.id,
        name: user.name,
      },
      dialogController: this.userDeleteDialogController,
    });

    if (!this._userDeleteDialogRef || !this._userDeleteDialogRef.componentInstance) {
      this._logManager.error({
        type: 'user-delete-dialog-error',
        message: 'failed to open dialog',
        hasDialogRef: !!this._userFormDialogRef,
        hasComponentInstance: !!this._userFormDialogRef?.componentInstance,
      });

      this._globalNotificationManager.add({
        message: 'Failed to delete user',
        color: 'danger',
        canClose: true,
      });

      return;
    }

    const componentInstance = this._userDeleteDialogRef.componentInstance as UserDeleteDialog;

    componentInstance.deleteConfirmed.subscribe((userData: UserDeleteData) => {
      this._deleteUser(userData);
    });

    componentInstance.cancelConfirmed.subscribe(() => {
      this.userDeleteDialogController.closeDialog();
    });
  }

  protected onFiltersChanged(filters: UsersListFilterValues): void {
    const requestData = structuredClone(this._fetchRequestData());

    delete requestData.name;
    delete requestData.createdAfter;
    delete requestData.createdBefore;
    delete requestData.updatedAfter;
    delete requestData.updatedBefore;

    if (filters.name) {
      requestData.name = filters.name;
    }

    const startDateValue = filters.startDate?.toISO() || null;
    const endDateValue = filters.endDate?.toISO() || null;

    if (filters.dateType === 'createdAt') {
      if (startDateValue) {
        requestData.createdAfter = startDateValue;
      }

      if (endDateValue) {
        requestData.createdBefore = endDateValue;
      }
    }

    if (filters.dateType === 'updatedAt') {
      if (startDateValue) {
        requestData.updatedAfter = startDateValue;
      }

      if (endDateValue) {
        requestData.updatedBefore = endDateValue;
      }
    }

    this._fetchRequestData.set(requestData);
  }

  protected onSortingChanged(sorting: UsersListSortingData): void {
    const requestData = structuredClone(this._fetchRequestData());

    requestData.orderBy = sorting.key as GetUsersRequest['orderBy'];
    requestData.orderDirection = sorting.direction;

    this._fetchRequestData.set(requestData);
  }

  protected onPageChanged(page: number): void {
    const requestData = structuredClone(this._fetchRequestData());

    requestData.offset = (page - 1) * this._paginationStore.activeItemsPerPage();
    requestData.limit = this._paginationStore.activeItemsPerPage();

    this._fetchRequestData.set(requestData);
  }

  protected onItemsPerPageChanged(itemsPerPage: number): void {
    const requestData = structuredClone(this._fetchRequestData());

    requestData.offset = 0;
    requestData.limit = itemsPerPage;

    this._fetchRequestData.set(requestData);
  }

  protected clearSelectedUser(): void {
    this._selectedUser.set(null);
  }

  private async _processUserForm(formData: UserFormData): Promise<void> {
    this._userFormDialogRef?.componentInstance?.setProcessing(true);
    this.userFormDialogController.setEnableEscapeKey(false);

    try {
      if (formData.id) {
        const { error } = await firstValueFrom(this._usersDataStore.update(formData as Required<UserFormData>));

        if (error?.message) {
          throw new Error(error.message);
        }

        this._globalNotificationManager.add({
          message: 'User updated successfully',
          color: 'safe',
          canClose: true,
        });
      } else {
        await firstValueFrom(this._usersDataStore.create(formData));
        this._globalNotificationManager.add({
          message: 'User added successfully',
          color: 'safe',
          canClose: true,
        });
      }

      this.userFormDialogController.closeDialog();
    } catch (error) {
      const errorType = formData.id ? 'update-user-error' : 'create-user-error';
      const errorMessage = formData.id ? 'Failed to update user' : 'Failed to add user';

      this._logManager.error({
        type: errorType,
        message: errorMessage,
        error,
      });

      this._globalNotificationManager.add({
        message: errorMessage,
        color: 'danger',
        canClose: true,
      });
    } finally {
      this._userFormDialogRef?.componentInstance?.setProcessing(false);
      this.userFormDialogController.setEnableEscapeKey(true);
    }
  }

  private async _deleteUser(userData: UserDeleteData): Promise<void> {
    this._userDeleteDialogRef?.componentInstance?.setProcessing(true);
    this.userDeleteDialogController.setEnableEscapeKey(false);

    try {
      const response = await firstValueFrom(this._usersDataStore.delete(userData.id));

      const { error } = response;

      if (error?.message) {
        throw new Error(error?.message);
      }

      this._globalNotificationManager.add({
        message: 'User deleted successfully',
        color: 'safe',
        canClose: true,
      });

      this.userDeleteDialogController.closeDialog();
    } catch (error: unknown) {
      this._logManager.error({
        type: 'delete-user-error',
        message: this._logManager.getErrorMessage(error as Error),
        error,
      });

      this._globalNotificationManager.add({
        message: 'Failed to delete user',
        color: 'danger',
        canClose: true,
      });
    } finally {
      this._userDeleteDialogRef?.componentInstance?.setProcessing(false);
      this.userDeleteDialogController.setEnableEscapeKey(true);
    }
  }
}

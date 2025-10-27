import { inject, Injectable } from '@angular/core';
import {
  CreateUser,
  CreateUserResponse,
  DeleteUserResponse,
  GetUsersRequest,
  UpdateUser,
  UpdateUserResponse,
  User,
} from '@organization/shared-types';
import { UsersApi } from '../users-api/users-api';
import { Observable, tap } from 'rxjs';
import { BaseLimitDataStore } from '../../core/data-store/base-limit-data-store';

@Injectable({
  providedIn: 'root',
})
export class UsersDataStore extends BaseLimitDataStore<User> {
  private readonly _usersApi = inject(UsersApi);

  constructor() {
    super('id', {
      limit: 1,
    });
  }

  public fetch(requestData: GetUsersRequest = {}) {
    this.startRemoteLoading();

    this._usersApi
      .getUsers({
        offset: this.offset(),
        limit: this.limit(),
        ...requestData,
      })
      .subscribe({
        next: (response) => {
          const { data, meta } = response ?? {};

          if (!data) {
            throw new Error('No data returned from the server');
          }

          if (meta?.error) {
            throw new Error(meta.error.message);
          }

          this.setLocalData(data);
          this.setLocalMeta(meta);
          this.endRemoteLoading(data);
        },
        error: (error: unknown) => {
          this.setLocalData([]);
          this.endRemoteLoading(error);
        },
      });
  }

  public create(user: CreateUser): Observable<CreateUserResponse> {
    this.startMutation();

    return this._usersApi.createUser(user).pipe(
      tap({
        next: (response) => {
          const { data } = response ?? {};

          if (!data) {
            return;
          }

          this.unshiftLocalData([data as User]);

          this.endMutation();
        },
        error: (error: unknown) => {
          this.endMutation(error);
        },
      })
    );
  }

  public update(user: UpdateUser): Observable<UpdateUserResponse> {
    return this._usersApi.updateUser(user).pipe(
      tap({
        next: (response) => {
          const { data } = response ?? {};

          if (!data) {
            return;
          }

          this.updateLocalData(data as User);

          this.endMutation();
        },
        error: (error: unknown) => {
          this.endMutation(error);
        },
      })
    );
  }

  public delete(id: User['id']): Observable<DeleteUserResponse> {
    return this._usersApi.deleteUser(id).pipe(
      tap({
        next: () => {
          this.deleteLocalData(id);

          this.endMutation();
        },
        error: (error: unknown) => {
          this.endMutation(error);
        },
      })
    );
  }
}

import { inject, Injectable, signal, computed } from '@angular/core';
import { User } from '@organization/shared-types';
import { UsersApi } from '../users-api/users-api';
import { LogManager } from '../../core/log-manager/log-manager';

type UsersState = {
  users: User[];
  loading: boolean;
  error: string | null;
};

@Injectable()
export class UsersDataStore {
  private readonly _logManager = inject(LogManager);
  private readonly _usersApi = inject(UsersApi);

  private readonly state = signal<UsersState>({
    users: [],
    loading: false,
    error: null,
  });

  public readonly users = computed(() => this.state().users);
  public readonly loading = computed(() => this.state().loading);
  public readonly error = computed(() => this.state().error);

  constructor() {
    this.loadUsers();
  }

  loadUsers() {
    this.state.update((currentState) => ({ ...currentState, loading: true }));

    this._usersApi.getUsers().subscribe({
      next: (response) => {
        const { data, meta } = response ?? {};

        if (!data) {
          this._logManager.error({
            type: 'users-data-store-error',
            message: 'Users api response successfully but no data returned',
            error: response,
          });

          this.state.update((state) => ({ ...state, error: 'No data returned from the server' }));
        }

        if (meta?.error) {
          this.state.update((state) => ({ ...state, error: meta.error.message }));
        }

        this.state.set({ users: response.data ?? [], loading: false, error: null });
      },
      error: (err) => this.state.update((currentState) => ({ ...currentState, loading: false, error: err.message })),
    });
  }
}

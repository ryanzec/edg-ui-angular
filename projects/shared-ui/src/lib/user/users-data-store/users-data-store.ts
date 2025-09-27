import { inject, Injectable, signal, computed } from '@angular/core';
import { User } from '@organization/shared-types';
import { UsersApi } from '../users-api/users-api';

type UsersState = {
  users: User[];
  loading: boolean;
  error: string | null;
};

@Injectable()
export class UsersDataStore {
  private readonly usersApi = inject(UsersApi);

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

    this.usersApi.getUsers().subscribe({
      next: (users) => this.state.set({ users, loading: false, error: null }),
      error: (err) => this.state.update((currentState) => ({ ...currentState, loading: false, error: err.message })),
    });
  }
}

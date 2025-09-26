import { Injectable, signal, computed, inject } from '@angular/core';
import { AuthenticationApi } from '../authentication-api/authentication-api';
import { AuthenticationAuthenticateRequest, ErrorMessage, User } from '@organization/shared-types';
import { catchError, finalize, of, tap } from 'rxjs';

type AuthenticationState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationStore {
  private authenticationApi = inject(AuthenticationApi);

  private readonly _state = signal<AuthenticationState>({
    user: null,
    isLoading: false,
    error: null,
  });

  public readonly user = computed(() => this._state().user);
  public readonly isLoading = computed(() => this._state().isLoading);
  public readonly error = computed(() => this._state().error);
  public readonly isAuthenticated = computed(() => !!this._state().user);

  public authenticate(request: AuthenticationAuthenticateRequest): void {
    this._state.update((state) => ({ ...state, isLoading: true, error: null }));

    this.authenticationApi
      .authenticate(request)
      .pipe(
        tap((response) => {
          const { data, meta } = response ?? {};

          if (data?.user) {
            this._state.update((state) => ({ ...state, user: data.user }));
          } else if (meta?.error) {
            this._state.update((state) => ({ ...state, error: meta.error.message }));
          }
        }),
        catchError((error) => {
          const errorMessage = error.message || ErrorMessage.UNKNOWN;
          this._state.update((state) => ({ ...state, error: errorMessage }));
          return of(null);
        }),
        finalize(() => {
          this._state.update((state) => ({ ...state, isLoading: false }));
        })
      )
      .subscribe();
  }

  public logout(): void {
    this._state.update((state) => ({ ...state, user: null, error: null }));
  }

  public clearError(): void {
    this._state.update((state) => ({ ...state, error: null }));
  }
}

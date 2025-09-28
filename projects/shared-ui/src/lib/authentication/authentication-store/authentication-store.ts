import { Injectable, signal, computed, inject } from '@angular/core';
import { AuthenticationApi } from '../authentication-api/authentication-api';
import { AuthenticationAuthenticateRequest, ErrorMessage, User } from '@organization/shared-types';
import { catchError, finalize, of, tap, map, Observable, delay } from 'rxjs';
import { LogManager } from '@organization/shared-ui';
import { LocalStorageManager } from '../../core/local-storage-manager/local-storage-manager';

type AuthenticationState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  hasInitialized: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationStore {
  private readonly _logManager = inject(LogManager);
  private readonly _localStorageManager = inject(LocalStorageManager);
  private readonly _authenticationApi = inject(AuthenticationApi);

  private readonly _sessionUserKey = 'sessionUser';

  private readonly _state = signal<AuthenticationState>({
    isLoading: false,
    hasInitialized: false,
    user: null,
    error: null,
  });

  public readonly user = computed(() => this._state().user);
  public readonly isLoading = computed(() => this._state().isLoading);
  public readonly error = computed(() => this._state().error);
  public readonly isAuthenticated = computed(() => !!this._state().user);
  public readonly hasInitialized = computed(() => this._state().hasInitialized);

  public check(): void {
    this.checkAsync().subscribe();
  }

  public checkAsync(): Observable<boolean> {
    this._state.update((state) => ({ ...state, isLoading: true, error: null }));

    return this._authenticationApi.check().pipe(
      delay(2000),
      map((response) => {
        const { data } = response ?? {};

        if (data?.status !== 'ok') {
          this._logManager.error({
            type: 'authentication-check-error',
            message: 'authentication check responded with a success but not ok status',
            error: response,
          });

          this._state.update((state) => ({
            ...state,
            error: 'Not authenticated',
          }));

          return false;
        }

        const user = this._localStorageManager.get<User>(this._sessionUserKey);

        if (!user) {
          this._state.update((state) => ({
            ...state,
            error: ErrorMessage.UNAUTHENTICATED,
          }));

          return false;
        }

        this._state.update((state) => ({ ...state, user }));

        return true;
      }),
      catchError((error) => {
        this._logManager.error({
          type: 'authentication-check-error',
          message: 'authentication check failed',
          error,
        });

        this._state.update((state) => ({
          ...state,
          error: ErrorMessage.UNKNOWN,
        }));

        return of(false);
      }),
      finalize(() => {
        this._state.update((state) => ({ ...state, isLoading: false, hasInitialized: true }));
      })
    );
  }

  public authenticate(request: AuthenticationAuthenticateRequest): void {
    this._state.update((state) => ({ ...state, isLoading: true, error: null }));

    this._authenticationApi
      .authenticate(request)
      .pipe(
        tap((response) => {
          const { data } = response ?? {};

          if (!data?.user) {
            this._logManager.error({
              type: 'authentication-authenticate-error',
              message: 'authentication authenticate responded with a success but no user',
              error: response,
            });

            this._state.update((state) => ({ ...state, error: ErrorMessage.UNKNOWN }));

            return;
          }

          this._state.update((state) => ({ ...state, user: data.user }));
          this._localStorageManager.set<User>(this._sessionUserKey, data.user);
        }),
        catchError((error) => {
          const errorMessage = error.message || ErrorMessage.UNKNOWN;
          this._state.update((state) => ({ ...state, error: errorMessage }));
          return of(null);
        }),
        finalize(() => {
          this._state.update((state) => ({ ...state, isLoading: false, hasInitialized: true }));
        })
      )
      .subscribe();
  }

  public logout(): void {
    this._state.update((state) => ({ ...state, user: null, error: null }));
  }
}

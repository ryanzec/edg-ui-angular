import { inject, signal, computed } from '@angular/core';
import { LogManager } from '../../core/log-manager/log-manager';

export type DataStoreLoadingState = 'idle' | 'uninitialized' | 'initializing' | 'pending';

export type DataStoreRemoteState = 'idle' | 'pending';

type BaseDataStoreState<T, TMeta = unknown> = {
  data?: T;
  meta?: TMeta;
  error: string | null;
  hasInitialized: boolean;
  remoteState: DataStoreRemoteState;
};

const generateDefaultDataStoreState = <T, TMeta = unknown>(): BaseDataStoreState<T, TMeta> => ({
  data: undefined,
  meta: undefined,
  error: null,
  hasInitialized: false,
  remoteState: 'idle',
});

export abstract class BaseEntityDataStore<T, TMeta = unknown> {
  protected readonly _logManager = inject(LogManager);

  private readonly _state = signal<BaseDataStoreState<T, TMeta>>(generateDefaultDataStoreState());

  public readonly data = computed(() => this._state().data);
  public readonly meta = computed(() => this._state().meta);
  public readonly error = computed(() => this._state().error);
  public readonly hasInitialized = computed(() => this._state().hasInitialized);
  public readonly loadingState = computed<DataStoreLoadingState>(() => {
    const remoteState = this._state().remoteState;
    const hasInitialized = this._state().hasInitialized;

    if (hasInitialized === false && remoteState === 'idle') {
      return 'uninitialized';
    }

    if (hasInitialized === false && remoteState === 'pending') {
      return 'initializing';
    }

    return remoteState;
  });
  public readonly remoteState = computed(() => this._state().remoteState);

  public reset(): void {
    this._state.set(generateDefaultDataStoreState());
  }

  protected startRemoteLoading(): void {
    this._state.update((currentState) => ({ ...currentState, remoteState: 'pending', error: null }));
  }

  protected endRemoteLoading(error: unknown = null): void {
    let errorMessage = null;

    if (error instanceof Error) {
      errorMessage = this._logManager.getErrorMessage(error);
    }

    this._state.update((currentState) => ({
      ...currentState,
      hasInitialized: true,
      remoteState: 'idle',
      error: errorMessage,
    }));
  }

  protected startMutation(): void {
    this._state.update((currentState) => ({ ...currentState, remoteState: 'pending', error: null }));
  }

  protected endMutation(error: unknown = null): void {
    let errorMessage = null;

    if (error instanceof Error) {
      errorMessage = this._logManager.getErrorMessage(error);
    }

    this._state.update((currentState) => ({ ...currentState, remoteState: 'idle', error: errorMessage }));
  }

  protected updateLocalData(updateItem: T): void {
    this._state.update((currentState) => ({ ...currentState, data: updateItem }));
  }

  protected setLocalData(data: T | undefined): void {
    this._state.update((currentState) => ({ ...currentState, data }));
  }

  protected setLocalMeta(meta: TMeta | undefined): void {
    this._state.update((currentState) => ({ ...currentState, meta }));
  }
}

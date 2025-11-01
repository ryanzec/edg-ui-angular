import { inject, signal, computed } from '@angular/core';
import { LogManager } from '../../core/log-manager/log-manager';
import { ResponseMeta } from '@organization/shared-types';

export type DataStoreLoadingState = 'idle' | 'uninitialized' | 'initializing' | 'pending';

export type DataStoreRemoteState = 'idle' | 'pending';

type BaseDataStoreState<T> = {
  data: T[];
  meta?: ResponseMeta;
  error: string | null;
  hasInitialized: boolean;
  remoteState: DataStoreRemoteState;
};

const generateDefaultDataStoreState = <T>(): BaseDataStoreState<T> => ({
  data: [],
  meta: undefined,
  hasInitialized: false,
  remoteState: 'idle',
  error: null,
});

export abstract class BaseDataStore<T> {
  protected readonly _logManager = inject(LogManager);

  private _idField: keyof T;
  private readonly state = signal<BaseDataStoreState<T>>(generateDefaultDataStoreState());

  protected readonly idField = () => this._idField;

  public readonly data = computed(() => this.state().data);
  public readonly error = computed(() => this.state().error);
  public readonly hasInitialized = computed(() => this.state().hasInitialized);
  public readonly loadingState = computed<DataStoreLoadingState>(() => {
    const remoteState = this.state().remoteState;
    const hasInitialized = this.state().hasInitialized;

    if (hasInitialized === false && remoteState === 'idle') {
      return 'uninitialized';
    }

    if (hasInitialized === false && remoteState === 'pending') {
      return 'initializing';
    }

    return remoteState;
  });
  public readonly remoteState = computed(() => this.state().remoteState);

  constructor(idField: keyof T) {
    this._idField = idField;
  }

  public reset(): void {
    this.state.set(generateDefaultDataStoreState());
  }

  protected startRemoteLoading(): void {
    this.state.update((currentState) => ({ ...currentState, remoteState: 'pending', error: null }));
  }

  protected endRemoteLoading(error: unknown = null): void {
    let errorMessage = null;

    if (error instanceof Error) {
      errorMessage = this._logManager.getErrorMessage(error);
    }

    this.state.update((currentState) => ({
      ...currentState,
      hasInitialized: true,
      remoteState: 'idle',
      error: errorMessage,
    }));
  }

  protected startMutation(): void {
    this.state.update((currentState) => ({ ...currentState, remoteState: 'pending', error: null }));
  }

  protected endMutation(error: unknown = null): void {
    let errorMessage = null;

    if (error instanceof Error) {
      errorMessage = this._logManager.getErrorMessage(error);
    }

    this.state.update((currentState) => ({ ...currentState, remoteState: 'idle', error: errorMessage }));
  }

  protected unshiftLocalData(items: T[]): void {
    this.state.update((currentState) => ({
      ...currentState,
      data: [...items, ...currentState.data],
    }));
  }

  protected pushLocalData(items: T[]): void {
    this.state.update((currentState) => ({
      ...currentState,
      data: [...currentState.data, ...items],
    }));
  }

  protected updateLocalData(updateItem: T): void {
    this.state.update((currentState) => {
      const existingUserIndex = currentState.data.findIndex(
        (item) => item[this._idField] === updateItem[this._idField]
      );

      if (existingUserIndex === -1) {
        return currentState;
      }

      const updatedUsers = [...currentState.data];
      updatedUsers[existingUserIndex] = {
        ...updatedUsers[existingUserIndex],
        ...updateItem,
      };

      return {
        ...currentState,
        data: updatedUsers,
      };
    });
  }

  protected deleteLocalData(id: unknown): void {
    this.state.update((currentState) => {
      const updatedUsers = currentState.data.filter((item) => item[this._idField] !== id);

      return {
        ...currentState,
        data: updatedUsers,
      };
    });
  }

  protected setLocalData(data: T[]): void {
    this.state.update((currentState) => ({ ...currentState, data }));
  }

  protected setLocalMeta(meta: ResponseMeta | undefined): void {
    this.state.update((currentState) => ({ ...currentState, meta }));
  }
}

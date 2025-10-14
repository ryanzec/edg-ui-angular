import { inject, Injectable, signal } from '@angular/core';
import * as LDClient from 'launchdarkly-js-client-sdk';
import { LogManager } from '../log-manager/log-manager';

export type FeatureFlag = 'internal-tools' | 'work-in-progress';
@Injectable({
  providedIn: 'root',
})
export class FeatureFlagStore {
  private readonly logManager = inject(LogManager);

  private _client: LDClient.LDClient | undefined;
  private _isInitialized = signal(false);
  private _featureFlags = signal<Record<FeatureFlag, boolean>>({
    'internal-tools': false,
    'work-in-progress': false,
  });

  readonly isInitialized = this._isInitialized.asReadonly();

  public initialize(launchDarklyClientId: string, context: LDClient.LDContext, hash: string): void {
    this._client = LDClient.initialize(launchDarklyClientId, context, { hash });

    this._client.on('ready', () => {
      if (!this._client) {
        this.logManager.error({
          type: 'launchdarkly-not-initialized',
          message: 'launch darkly client triggered ready event but client is not initialized',
        });

        return;
      }

      this.logManager.log({
        type: 'launchdarkly-connected',
        wasAlreadyInitialized: this.isInitialized(),
      });

      const featureFlags = this._client.allFlags();

      this.logManager.log({
        type: 'feature-flags',
        featureFlags,
      });

      this._featureFlags.set({
        'internal-tools': featureFlags['internal-tools'] ?? false,
        'work-in-progress': featureFlags['work-in-progress'] ?? false,
      });

      this._isInitialized.set(true);
    });

    this._client.on('change', (changes) => {
      const newFeatureflags: Partial<Record<FeatureFlag, boolean>> = {};
      const keys = Object.keys(changes);

      for (const key of keys) {
        newFeatureflags[key as FeatureFlag] = changes[key].current;
      }

      this._featureFlags.set({
        ...this._featureFlags(),
        ...newFeatureflags,
      });
    });

    this._client.on('error', (error) => {
      this.logManager.error({
        type: 'launchdarkly-error',
        error,
      });
    });
  }
}

import { ApplicationConfig, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptorsFromDi, withInterceptors } from '@angular/common/http';
import { provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import {
  AUTHENTICATION_API_URL,
  httpWithCredentialsInterceptor,
  unauthorizedInterceptor,
  USERS_API_URL,
} from '@organization/shared-ui';
import { CookieService } from 'ngx-cookie-service';
// import { FeatureFlagStore } from '@organization/shared-ui';
import { dateUtils } from '@organization/shared-utils';

export const appConfig: ApplicationConfig = {
  providers: [
    // NOTE: remember to async changes here to storybook for the ones the matter in the context of storybook
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi(),
      withInterceptors([httpWithCredentialsInterceptor, unauthorizedInterceptor])
    ),
    CookieService,
    { provide: AUTHENTICATION_API_URL, useValue: environment.authenticationApiUrl },
    { provide: USERS_API_URL, useValue: environment.usersApiUrl },
    provideAppInitializer(() => {
      dateUtils.configureTimezone('UTC');

      return Promise.resolve();
      //   const globalService = inject(FeatureFlagStore);
      //   return globalService.initialize(LAUNCH_DARKLY_CLIENT_ID, LAUNCH_DARKLY_CONTEXT, LAUNCH_DARKLY_HASH);
    }),
  ],
};

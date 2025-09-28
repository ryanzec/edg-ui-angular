import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptorsFromDi, withInterceptors } from '@angular/common/http';
import { MAT_BUTTON_CONFIG, MAT_FAB_DEFAULT_OPTIONS } from '@angular/material/button';
import { MAT_CARD_CONFIG } from '@angular/material/card';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MAT_LUXON_DATE_ADAPTER_OPTIONS } from '@angular/material-luxon-adapter';
import { provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { BASE_API_URL, httpWithCredentialsInterceptor, unauthorizedInterceptor } from '@organization/shared-ui';
import { CookieService } from 'ngx-cookie-service';
// import { FeatureFlagStore } from '@organization/shared-ui';

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
    provideLuxonDateAdapter(),
    CookieService,
    { provide: MAT_LUXON_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_BUTTON_CONFIG, useValue: { defaultAppearance: 'tonal' } },
    { provide: MAT_FAB_DEFAULT_OPTIONS, useValue: { defaultAppearance: 'tonal' } },
    { provide: MAT_CARD_CONFIG, useValue: { appearance: 'outlined' } },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: BASE_API_URL, useValue: environment.apiUrl },
    // provideAppInitializer(() => {
    //   const globalService = inject(FeatureFlagStore);
    //   return globalService.initialize(LAUNCH_DARKLY_CLIENT_ID, LAUNCH_DARKLY_CONTEXT, LAUNCH_DARKLY_HASH);
    // }),
  ],
};

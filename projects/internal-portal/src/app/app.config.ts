import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

// Zoneless configuration (Developer Preview)
import { provideZonelessChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Modern zoneless change detection (recommended for new projects)
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),

    // Alternative: Traditional zone-based (if you prefer)
    // provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
  ],
};

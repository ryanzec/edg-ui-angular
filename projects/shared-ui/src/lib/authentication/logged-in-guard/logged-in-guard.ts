import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationStore } from '../authentication-store/authentication-store';
import { ApplicationRoute } from '../../core/types/application-route';
import { LogManager } from '../../core/log-manager/log-manager';

export const loggedInGuard: CanActivateFn = (route, _state) => {
  const authenticationStore = inject(AuthenticationStore);
  const router = inject(Router);
  const logManager = inject(LogManager);
  const routeData = (route as ApplicationRoute).data;

  if (authenticationStore.isAuthenticated()) {
    return true;
  }

  if (!routeData?.unauthenticatedRedirect) {
    logManager.error({
      type: 'unauthenticated-redirect-not-found',
      message: 'No unauthenticated redirect route data found',
      context: {
        routeData,
      },
    });

    return router.createUrlTree(['/']);
  }

  return router.createUrlTree([routeData.unauthenticatedRedirect]);
};

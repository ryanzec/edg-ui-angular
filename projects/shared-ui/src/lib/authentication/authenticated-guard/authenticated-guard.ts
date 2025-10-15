import { map } from 'rxjs';
import { Router } from '@angular/router';
import { LogManager } from '../../core/log-manager/log-manager';
import { ApplicationRoute } from '../../core/types/application-route';
import { inject } from '@angular/core';
import { AuthenticationManager } from '../authentication-manager/authentication-manager';
import { CanActivateFn } from '@angular/router';

export const loggedInGuard: CanActivateFn = (route) => {
  const authenticationManager = inject(AuthenticationManager);
  const router = inject(Router);
  const logManager = inject(LogManager);
  const routeData = (route as ApplicationRoute).data;

  // If already authenticated, allow access
  if (authenticationManager.isAuthenticated()) {
    return true;
  }

  // Check authentication first, then handle the result
  return authenticationManager.checkAsync().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      }

      // Handle unauthenticated case
      if (!routeData?.unauthenticatedRedirect) {
        logManager.error({
          type: 'unauthenticated-redirect-not-found',
          context: { routeData },
        });

        return router.createUrlTree(['/']);
      }

      return router.createUrlTree([routeData.unauthenticatedRedirect]);
    })
  );
};

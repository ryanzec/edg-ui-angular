import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthenticationStore } from '../authentication-store/authentication-store';
import { BASE_API_URL } from '@organization/shared-ui';

export const unauthorizedInterceptor: HttpInterceptorFn = (request, next) => {
  const authenticationStore = inject(AuthenticationStore);
  const router = inject(Router);
  const baseUrl = inject(BASE_API_URL);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && request.url.startsWith(baseUrl)) {
        authenticationStore.logout();

        router.navigate(['/login']);
      }

      // Re-throw the error for other handling
      return throwError(() => error);
    })
  );
};

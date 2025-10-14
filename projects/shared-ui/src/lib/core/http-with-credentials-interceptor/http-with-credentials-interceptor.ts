import { HttpInterceptorFn } from '@angular/common/http';

export const httpWithCredentialsInterceptor: HttpInterceptorFn = (request, next) => {
  const clonedRequest = request.clone({
    withCredentials: true,
  });

  return next(clonedRequest);
};

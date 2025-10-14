import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { of, throwError } from 'rxjs';
import { unauthorizedInterceptor } from './unauthorized-interceptor';
import { AuthenticationManager } from '../authentication-manager/authentication-manager';

describe('unauthorizedInterceptor', () => {
  let mockAuthenticationManager: any;
  let mockRouter: any;
  let interceptor: HttpInterceptorFn;

  beforeEach(() => {
    mockAuthenticationManager = {
      logout: vi.fn(),
    };

    mockRouter = {
      navigate: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationManager, useValue: mockAuthenticationManager },
        { provide: Router, useValue: mockRouter },
      ],
    });

    interceptor = (request, next) => TestBed.runInInjectionContext(() => unauthorizedInterceptor(request, next));
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should call next and return response when no error occurs', () => {
    const request = new HttpRequest('GET', 'https://localhost:3000/test');
    const mockResponse = { status: 200 };
    const mockNext = vi.fn().mockReturnValue(of(mockResponse));

    const result = interceptor(request, mockNext);

    result.subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(mockNext).toHaveBeenCalledWith(request);
      expect(mockAuthenticationManager.logout).not.toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });
  });

  it('should logout and redirect to login when 401 error from https://localhost:3000', () => {
    const request = new HttpRequest('GET', 'https://localhost:3000/api/users');
    const mockError = new HttpErrorResponse({ status: 401, url: 'https://localhost:3000/api/users' });
    const mockNext = vi.fn().mockReturnValue(throwError(() => mockError));

    const result = interceptor(request, mockNext);

    result.subscribe({
      error: (error) => {
        expect(error).toEqual(mockError);
        expect(mockAuthenticationManager.logout).toHaveBeenCalledOnce();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
      },
    });
  });

  it('should not logout or redirect when 401 error from different domain', () => {
    const request = new HttpRequest('GET', 'https://other-domain.com/api/users');
    const mockError = new HttpErrorResponse({ status: 401, url: 'https://other-domain.com/api/users' });
    const mockNext = vi.fn().mockReturnValue(throwError(() => mockError));

    const result = interceptor(request, mockNext);

    result.subscribe({
      error: (error) => {
        expect(error).toEqual(mockError);
        expect(mockAuthenticationManager.logout).not.toHaveBeenCalled();
        expect(mockRouter.navigate).not.toHaveBeenCalled();
      },
    });
  });

  it('should not logout or redirect when non-401 error from https://localhost:3000', () => {
    const request = new HttpRequest('GET', 'https://localhost:3000/api/users');
    const mockError = new HttpErrorResponse({ status: 500, url: 'https://localhost:3000/api/users' });
    const mockNext = vi.fn().mockReturnValue(throwError(() => mockError));

    const result = interceptor(request, mockNext);

    result.subscribe({
      error: (error) => {
        expect(error).toEqual(mockError);
        expect(mockAuthenticationManager.logout).not.toHaveBeenCalled();
        expect(mockRouter.navigate).not.toHaveBeenCalled();
      },
    });
  });
});

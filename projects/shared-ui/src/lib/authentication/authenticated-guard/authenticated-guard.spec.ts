import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { signal } from '@angular/core';

import { loggedInGuard } from './authenticated-guard';
import { AuthenticationManager } from '../authentication-manager/authentication-manager';
import { LogManager } from '../../core/log-manager/log-manager';

const unauthenticatedRedirect = '/home';

describe('loggedInGuard', () => {
  let mockAuthenticationManager: {
    isAuthenticated: ReturnType<typeof signal<boolean>>;
  };
  let mockRouter: {
    createUrlTree: ReturnType<typeof vi.fn>;
  };
  let mockLogManager: {
    error: ReturnType<typeof vi.fn>;
  };
  let mockUrlTree: UrlTree;

  beforeEach(() => {
    mockUrlTree = { toString: () => unauthenticatedRedirect } as UrlTree;
    mockRouter = {
      createUrlTree: vi.fn().mockReturnValue(mockUrlTree),
    };
    mockAuthenticationManager = {
      isAuthenticated: signal(false),
    };
    mockLogManager = {
      error: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationManager, useValue: mockAuthenticationManager },
        { provide: Router, useValue: mockRouter },
        { provide: LogManager, useValue: mockLogManager },
      ],
    });
  });

  describe('when user is authenticated', () => {
    beforeEach(() => {
      mockAuthenticationManager.isAuthenticated.set(true);
    });

    it('should return true', () => {
      const result = TestBed.runInInjectionContext(() => loggedInGuard({} as any, {} as any));

      expect(result).toBe(true);
    });

    it('should not call router.createUrlTree', () => {
      TestBed.runInInjectionContext(() => loggedInGuard({} as any, {} as any));

      expect(mockRouter.createUrlTree).not.toHaveBeenCalled();
    });

    it('should not call logManager.error', () => {
      TestBed.runInInjectionContext(() => loggedInGuard({} as any, {} as any));

      expect(mockLogManager.error).not.toHaveBeenCalled();
    });
  });

  describe('when user is not authenticated', () => {
    beforeEach(() => {
      mockAuthenticationManager.isAuthenticated.set(false);
    });

    describe('with unauthenticatedRedirect in route data', () => {
      it('should return UrlTree for specified redirect route', () => {
        const result = TestBed.runInInjectionContext(() =>
          loggedInGuard({ data: { unauthenticatedRedirect } } as any, {} as any)
        );

        expect(result).toBe(mockUrlTree);
      });

      it('should call router.createUrlTree with correct route', () => {
        TestBed.runInInjectionContext(() => loggedInGuard({ data: { unauthenticatedRedirect } } as any, {} as any));

        expect(mockRouter.createUrlTree).toHaveBeenCalledWith([unauthenticatedRedirect]);
        expect(mockRouter.createUrlTree).toHaveBeenCalledTimes(1);
      });

      it('should not call logManager.error', () => {
        TestBed.runInInjectionContext(() => loggedInGuard({ data: { unauthenticatedRedirect } } as any, {} as any));

        expect(mockLogManager.error).not.toHaveBeenCalled();
      });
    });

    describe('without unauthenticatedRedirect in route data', () => {
      it('should return UrlTree for default home route', () => {
        const result = TestBed.runInInjectionContext(() => loggedInGuard({ data: {} } as any, {} as any));

        expect(result).toBe(mockUrlTree);
      });

      it('should call router.createUrlTree with default home route', () => {
        TestBed.runInInjectionContext(() => loggedInGuard({ data: {} } as any, {} as any));

        expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/']);
        expect(mockRouter.createUrlTree).toHaveBeenCalledTimes(1);
      });

      it('should log error for missing unauthenticatedRedirect', () => {
        const routeData = {};
        TestBed.runInInjectionContext(() => loggedInGuard({ data: routeData } as any, {} as any));

        expect(mockLogManager.error).toHaveBeenCalledWith({
          type: 'unauthenticated-redirect-not-found',
          message: 'No unauthenticated redirect route data found',
          context: {
            routeData,
          },
        });
        expect(mockLogManager.error).toHaveBeenCalledTimes(1);
      });
    });

    describe('with no route data', () => {
      it('should return UrlTree for default home route', () => {
        const result = TestBed.runInInjectionContext(() => loggedInGuard({} as any, {} as any));

        expect(result).toBe(mockUrlTree);
      });

      it('should call router.createUrlTree with default home route', () => {
        TestBed.runInInjectionContext(() => loggedInGuard({} as any, {} as any));

        expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/']);
        expect(mockRouter.createUrlTree).toHaveBeenCalledTimes(1);
      });

      it('should log error for missing route data', () => {
        TestBed.runInInjectionContext(() => loggedInGuard({} as any, {} as any));

        expect(mockLogManager.error).toHaveBeenCalledWith({
          type: 'unauthenticated-redirect-not-found',
          message: 'No unauthenticated redirect route data found',
          context: {
            routeData: undefined,
          },
        });
        expect(mockLogManager.error).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('dependency injection', () => {
    it('should inject AuthenticationManager, Router, and LogManager correctly', () => {
      mockAuthenticationManager.isAuthenticated.set(false);

      TestBed.runInInjectionContext(() => loggedInGuard({} as any, {} as any));

      expect(mockRouter.createUrlTree).toHaveBeenCalled();
      expect(mockLogManager.error).toHaveBeenCalled();
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest';
import { signal } from '@angular/core';

import { LoginView } from './login-view';
import { AuthenticationStore } from '@organization/shared-ui';
import { AuthenticationAuthenticateRequest } from '@organization/shared-types';

describe('LoginView', () => {
  let component: LoginView;
  let fixture: ComponentFixture<LoginView>;
  let router: Router;
  let authenticationStore: AuthenticationStore;

  const mockAuthenticationStore = {
    isAuthenticated: signal(false),
    error: signal<string | null>(null),
    authenticate: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginView],
      providers: [
        provideRouter([{ path: 'home', component: class {} }]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthenticationStore, useValue: mockAuthenticationStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginView);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authenticationStore = TestBed.inject(AuthenticationStore);

    vi.spyOn(router, 'navigate').mockResolvedValue(true);
  });

  afterEach(() => {
    vi.clearAllMocks();
    mockAuthenticationStore.isAuthenticated.set(false);
    mockAuthenticationStore.error.set(null);
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render login form', () => {
      fixture.detectChanges();
      const loginForm = fixture.nativeElement.querySelector('org-login-form');
      expect(loginForm).toBeTruthy();
    });
  });

  describe('Authentication Effects', () => {
    it('should navigate to home when user becomes authenticated', () => {
      fixture.detectChanges();

      mockAuthenticationStore.isAuthenticated.set(true);
      fixture.detectChanges();

      expect(router.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('should not navigate when user is not authenticated', () => {
      fixture.detectChanges();

      mockAuthenticationStore.isAuthenticated.set(false);
      fixture.detectChanges();

      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should display error message in snackbar when error occurs', () => {
      const errorMessage = 'Invalid credentials';
      fixture.detectChanges();

      mockAuthenticationStore.error.set(errorMessage);
      fixture.detectChanges();
    });

    it('should not display snackbar when no error exists', () => {
      fixture.detectChanges();

      mockAuthenticationStore.error.set(null);
      fixture.detectChanges();
    });

    it('should display snackbar with correct configuration', () => {
      const errorMessage = 'Network error';
      fixture.detectChanges();

      mockAuthenticationStore.error.set(errorMessage);
      fixture.detectChanges();
    });
  });

  describe('Login Submission', () => {
    it('should call authentication store when login form is submitted', () => {
      const loginRequest: AuthenticationAuthenticateRequest = {
        email: 'test@example.com',
        password: 'password123',
      };

      component.onLoginSubmit(loginRequest);

      expect(authenticationStore.authenticate).toHaveBeenCalledWith(loginRequest);
    });

    it('should be called when login form emits loginSubmit event', () => {
      const loginRequest: AuthenticationAuthenticateRequest = {
        email: 'user@example.com',
        password: 'securepassword',
      };

      vi.spyOn(component, 'onLoginSubmit');
      fixture.detectChanges();

      const loginForm = fixture.nativeElement.querySelector('org-login-form');
      loginForm.dispatchEvent(new CustomEvent('loginSubmit', { detail: loginRequest }));

      expect(component.onLoginSubmit).toHaveBeenCalledWith(loginRequest);
    });
  });
});

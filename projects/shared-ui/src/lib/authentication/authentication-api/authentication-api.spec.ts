import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthenticationApi } from './authentication-api';
import { AuthenticationAuthenticateRequest, AuthenticationAuthenticateResponse } from '@organization/shared-types';
import { describe, beforeEach, it, expect, afterEach } from 'vitest';

describe('AuthenticationApi', () => {
  let service: AuthenticationApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthenticationApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make authentication request', () => {
    const mockRequest: AuthenticationAuthenticateRequest = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockResponse: AuthenticationAuthenticateResponse = {
      user: 'testuser',
      launchDarklyHash: 'hash123',
    };

    service.authenticate(mockRequest).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const request = httpMock.expectOne('https://localhost:3000/authentication/authenticate');

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(mockRequest);

    request.flush(mockResponse);
  });
});

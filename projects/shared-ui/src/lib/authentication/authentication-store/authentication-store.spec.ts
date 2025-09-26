import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, it, expect } from 'vitest';

import { AuthenticationStore } from './authentication-store';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AuthenticationStore', () => {
  let service: AuthenticationStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthenticationStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

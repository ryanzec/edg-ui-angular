import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, it, expect } from 'vitest';

import { AuthenticationManager } from './authentication-manager';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AuthenticationManager', () => {
  let service: AuthenticationManager;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthenticationManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

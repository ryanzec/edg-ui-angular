import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, it, expect } from 'vitest';

import { FeatureFlagStore } from './feature-flag-store';

describe('FeatureFlagStore', () => {
  let service: FeatureFlagStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureFlagStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

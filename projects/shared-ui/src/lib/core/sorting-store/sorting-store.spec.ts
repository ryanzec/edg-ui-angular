import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, it, expect } from 'vitest';
import { SortingStore } from './sorting-store';

describe('SortingStore', () => {
  let service: SortingStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

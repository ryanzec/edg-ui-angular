import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, it, expect } from 'vitest';

import { PaginationStore } from './pagination-store';

describe('PaginationStore', () => {
  let service: PaginationStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginationStore],
    });
    service = TestBed.inject(PaginationStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

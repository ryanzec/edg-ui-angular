import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, it, expect } from 'vitest';
import { UsersDataStore } from './users-data-store';

describe('UsersDataStore', () => {
  let service: UsersDataStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersDataStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

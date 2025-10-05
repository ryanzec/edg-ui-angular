import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersView } from './users-view';
import { UsersDataStore } from '@organization/shared-ui';
import { User } from '@organization/shared-types';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { signal } from '@angular/core';

describe('UsersView', () => {
  let component: UsersView;
  let fixture: ComponentFixture<UsersView>;
  let mockUsersDataStore: Partial<UsersDataStore>;

  const mockUsers: User[] = [
    {
      id: '1',
      organizationId: 'org1',
      name: 'John Doe',
      email: 'john@example.com',
      roles: ['admin'],
      hasPassword: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
  ];

  beforeEach(async () => {
    mockUsersDataStore = {
      users: signal(mockUsers),
      loading: signal(false),
      error: signal(null),
    };

    await TestBed.configureTestingModule({
      imports: [UsersView],
      providers: [{ provide: UsersDataStore, useValue: mockUsersDataStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display users from data store', () => {
    expect(component.users()).toEqual(mockUsers);
  });

  it('should handle user edit', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    component.onUserEdit(mockUsers[0]);
    expect(consoleSpy).toHaveBeenCalledWith('Edit user:', mockUsers[0]);
  });

  it('should handle user delete', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    component.onUserDelete(mockUsers[0]);
    expect(consoleSpy).toHaveBeenCalledWith('Delete user:', mockUsers[0]);
  });
});

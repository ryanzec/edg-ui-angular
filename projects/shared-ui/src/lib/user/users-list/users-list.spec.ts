import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersList } from './users-list';
import { User, UserRoleName } from '@organization/shared-types';
import { describe, beforeEach, it, expect, vi } from 'vitest';

describe('UsersList', () => {
  let component: UsersList;
  let fixture: ComponentFixture<UsersList>;

  const mockUsers: User[] = [
    {
      id: '1',
      organizationId: 'org1',
      name: 'John Doe',
      email: 'john@example.com',
      roles: [UserRoleName.ADMIN],
      hasPassword: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '2',
      organizationId: 'org1',
      name: 'Jane Smith',
      email: 'jane@example.com',
      roles: [UserRoleName.USER],
      hasPassword: true,
      createdAt: '2024-01-02T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersList],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersList);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('users', mockUsers);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display users in table', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('John Doe');
    expect(compiled.textContent).toContain('jane@example.com');
  });

  it('should emit userEdit when edit button is clicked', () => {
    vi.spyOn(component.userEdit, 'emit');
    component.onEdit(mockUsers[0]);
    expect(component.userEdit.emit).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('should emit userDelete when delete button is clicked', () => {
    vi.spyOn(component.userDelete, 'emit');
    component.onDelete(mockUsers[0]);
    expect(component.userDelete.emit).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('should format dates correctly', () => {
    const formattedDate = component.formatDate('2024-01-01T00:00:00Z');
    expect(formattedDate).toBe('Jan 1, 2024');
  });

  it('should return correct CSS classes for roles', () => {
    expect(component.getRoleChipClass(UserRoleName.ADMIN)).toBe('bg-red-100 text-red-800');
    expect(component.getRoleChipClass(UserRoleName.USER)).toBe('bg-blue-100 text-blue-800');
  });

  it('should show loading state', () => {
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Loading users...');
  });

  it('should show empty state when no users', () => {
    fixture.componentRef.setInput('users', []);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('No users found');
  });
});

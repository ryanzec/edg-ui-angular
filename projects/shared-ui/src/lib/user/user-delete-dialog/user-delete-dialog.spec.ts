import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDeleteDialog, type UserDeleteDialogData } from './user-delete-dialog';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('UserDeleteDialog', () => {
  let component: UserDeleteDialog;
  let fixture: ComponentFixture<UserDeleteDialog>;
  let mockDialogController: any;

  beforeEach(async () => {
    mockDialogController = {
      setEnableEscapeKey: vi.fn(),
    };

    const mockDialogData: UserDeleteDialogData = {
      user: {
        id: 'user-123',
        name: 'Test User',
      },
      hasRoundedCorners: true,
      dialogController: mockDialogController,
    };

    await TestBed.configureTestingModule({
      imports: [UserDeleteDialog],
      providers: [
        {
          provide: DIALOG_DATA,
          useValue: mockDialogData,
        },
        {
          provide: DialogRef,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDeleteDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set processing state to true', () => {
    component.setProcessing(true);

    expect(component['isProcessing']()).toBe(true);
  });

  it('should set processing state to false', () => {
    component.setProcessing(true);
    component.setProcessing(false);

    expect(component['isProcessing']()).toBe(false);
  });

  it('should disable escape key when processing is true', () => {
    component.setProcessing(true);

    expect(mockDialogController.setEnableEscapeKey).toHaveBeenCalledWith(false);
  });

  it('should enable escape key when processing is false', () => {
    component.setProcessing(false);

    expect(mockDialogController.setEnableEscapeKey).toHaveBeenCalledWith(true);
  });
});

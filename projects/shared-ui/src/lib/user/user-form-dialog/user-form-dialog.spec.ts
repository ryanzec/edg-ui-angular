import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormDialog } from './user-form-dialog';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('UserFormDialog', () => {
  let component: UserFormDialog;
  let fixture: ComponentFixture<UserFormDialog>;
  let mockDialogController: any;

  beforeEach(async () => {
    mockDialogController = {
      setEnableEscapeKey: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [UserFormDialog],
      providers: [
        {
          provide: DIALOG_DATA,
          useValue: {
            existingUser: null,
            hasRoundedCorners: true,
            dialogController: mockDialogController,
          },
        },
        {
          provide: DialogRef,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormDialog);
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

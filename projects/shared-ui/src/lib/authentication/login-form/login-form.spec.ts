import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { describe, beforeEach, it, expect, vi } from 'vitest';

import { LoginForm } from './login-form';

describe('LoginForm', () => {
  let component: LoginForm;
  let fixture: ComponentFixture<LoginForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginForm, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an invalid form', () => {
    expect(component.loginForm.valid).toBeFalsy();
    expect(component.loginForm.get('email')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should validate email field', () => {
    const emailControl = component.loginForm.get('email');

    // Test required validation
    emailControl?.setValue('');
    emailControl?.markAsTouched();
    expect(component.getFieldError('email')).toBe('Email is required');

    // Test email format validation
    emailControl?.setValue('invalid-email');
    expect(component.getFieldError('email')).toBe('Please enter a valid email address');

    // Test valid email
    emailControl?.setValue('test@example.com');
    expect(component.getFieldError('email')).toBeNull();
  });

  it('should validate password field', () => {
    const passwordControl = component.loginForm.get('password');

    // Test required validation
    passwordControl?.setValue('');
    passwordControl?.markAsTouched();
    expect(component.getFieldError('password')).toBe('Password is required');

    // Test valid password
    passwordControl?.setValue('password123');
    expect(component.getFieldError('password')).toBeNull();
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBe(false);

    component.togglePasswordVisibility();
    expect(component.showPassword).toBe(true);

    component.togglePasswordVisibility();
    expect(component.showPassword).toBe(false);
  });

  it('should emit loginSubmit event when form is valid', () => {
    vi.spyOn(component.loginSubmit, 'emit');

    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'password123',
    });

    component.login();

    expect(component.loginSubmit.emit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('should not emit loginSubmit event when form is invalid', () => {
    vi.spyOn(component.loginSubmit, 'emit');

    component.loginForm.patchValue({
      email: '',
      password: '',
    });

    component.login();

    expect(component.loginSubmit.emit).not.toHaveBeenCalled();
  });

  it('should mark all fields as touched when form is invalid on submit', () => {
    component.loginForm.patchValue({
      email: '',
      password: '',
    });

    component.login();

    expect(component.loginForm.get('email')?.touched).toBe(true);
    expect(component.loginForm.get('password')?.touched).toBe(true);
  });
});

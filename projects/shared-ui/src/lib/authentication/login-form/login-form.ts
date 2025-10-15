import { Component, ChangeDetectionStrategy, output, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  authenticationAuthenticateRequestSchema,
  type AuthenticationAuthenticateRequest,
} from '@organization/shared-types';
import { z } from 'zod';
import { Card } from '../../core/card/card';
import { CardContent } from '../../core/card/card-content';
import { CardHeader } from '../../core/card/card-header';
import { Input } from '../../core/input/input';
import { Button } from '../../core/button/button';

@Component({
  selector: 'org-login-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, CardContent, CardHeader, Input, ReactiveFormsModule, Button],
  templateUrl: './login-form.html',
})
export class LoginForm {
  public readonly isProcessing = input<boolean>(false);

  public readonly loginSubmit = output<AuthenticationAuthenticateRequest>();

  public readonly loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
      updateOn: 'submit',
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
      updateOn: 'submit',
    }),
  });

  public showPassword = false;

  public login(): void {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.getRawValue();

      try {
        const validatedData = authenticationAuthenticateRequestSchema.parse(formValue);

        this.loginSubmit.emit(validatedData);
      } catch (error) {
        if (error instanceof z.ZodError) {
          error.issues.forEach((err) => {
            const field = err.path[0] as keyof typeof this.loginForm.controls;

            if (field && this.loginForm.controls[field]) {
              this.loginForm.controls[field].setErrors({ zodError: err.message });
            }
          });
        }
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  public getFieldError(fieldName: keyof typeof this.loginForm.controls): string | null {
    const field = this.loginForm.get(fieldName);

    if (field?.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }

      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }

      if (field.errors['zodError']) {
        return field.errors['zodError'];
      }
    }

    return null;
  }

  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      email: 'Email',
      password: 'Password',
    };

    return labels[fieldName] || fieldName;
  }
}

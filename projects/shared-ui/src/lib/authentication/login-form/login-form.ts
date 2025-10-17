import { Component, ChangeDetectionStrategy, output, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  authenticationAuthenticateRequestSchema,
  type AuthenticationAuthenticateRequest,
} from '@organization/shared-types';
import { Card } from '../../core/card/card';
import { CardContent } from '../../core/card/card-content';
import { CardHeader } from '../../core/card/card-header';
import { Input } from '../../core/input/input';
import { Button } from '../../core/button/button';
import { validationUtils } from '@organization/shared-ui';

@Component({
  selector: 'org-login-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, CardContent, CardHeader, Input, ReactiveFormsModule, Button],
  templateUrl: './login-form.html',
})
export class LoginForm {
  public readonly isProcessing = input<boolean>(false);

  public readonly loginSubmitted = output<AuthenticationAuthenticateRequest>();

  public readonly loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [validationUtils.zodValidator(authenticationAuthenticateRequestSchema.shape.email)],
      updateOn: 'change',
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [validationUtils.zodValidator(authenticationAuthenticateRequestSchema.shape.password)],
      updateOn: 'change',
    }),
  });

  public showPassword = false;

  public login(): void {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.getRawValue();

      this.loginSubmitted.emit(formValue);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  public getFieldError(fieldName: keyof typeof this.loginForm.controls): string | null {
    const field = this.loginForm.get(fieldName);

    if (!field?.errors || field.touched === false) {
      return null;
    }

    return validationUtils.getFormErrorMessage(field.errors, this.getFieldLabel(fieldName));
  }

  protected getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      email: 'Email',
      password: 'Password',
    };

    return labels[fieldName] || fieldName;
  }
}

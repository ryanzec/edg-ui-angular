import { Component, ChangeDetectionStrategy, inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm, AuthenticationStore } from '@organization/shared-ui';
import { AuthenticationAuthenticateRequest } from '@organization/shared-types';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'cp-login-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoginForm],
  templateUrl: './login-view.html',
  styleUrl: './login-view.scss',
})
export class LoginView {
  private readonly router = inject(Router);
  private readonly authenticationStore = inject(AuthenticationStore);
  private readonly snackBar = inject(MatSnackBar);

  constructor() {
    effect(() => {
      if (this.authenticationStore.isAuthenticated()) {
        this.router.navigate(['/home']);
      }
    });

    effect(() => {
      const error = this.authenticationStore.error();

      if (error) {
        this.snackBar.open(error, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    });
  }

  public onLoginSubmit(request: AuthenticationAuthenticateRequest): void {
    this.authenticationStore.authenticate(request);
  }
}

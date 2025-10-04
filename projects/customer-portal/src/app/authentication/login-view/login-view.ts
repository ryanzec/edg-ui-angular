import { Component, ChangeDetectionStrategy, inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm, AuthenticationManager } from '@organization/shared-ui';
import { AuthenticationAuthenticateRequest } from '@organization/shared-types';

@Component({
  selector: 'cp-login-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoginForm],
  templateUrl: './login-view.html',
})
export class LoginView {
  private readonly router = inject(Router);
  private readonly authenticationManager = inject(AuthenticationManager);

  constructor() {
    effect(() => {
      if (this.authenticationManager.isAuthenticated()) {
        this.router.navigate(['/home']);
      }
    });

    effect(() => {
      const error = this.authenticationManager.error();

      if (error) {
        // @todo(!) something
      }
    });
  }

  public onLoginSubmit(request: AuthenticationAuthenticateRequest): void {
    this.authenticationManager.authenticate(request);
  }
}

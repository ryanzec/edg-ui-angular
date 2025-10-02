import { Component, ChangeDetectionStrategy, inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm, AuthenticationStore } from '@organization/shared-ui';
import { AuthenticationAuthenticateRequest } from '@organization/shared-types';

@Component({
  selector: 'cp-login-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoginForm],
  templateUrl: './login-view.html',
})
export class LoginView {
  private readonly router = inject(Router);
  private readonly authenticationStore = inject(AuthenticationStore);

  constructor() {
    effect(() => {
      if (this.authenticationStore.isAuthenticated()) {
        this.router.navigate(['/home']);
      }
    });

    effect(() => {
      const error = this.authenticationStore.error();

      if (error) {
        // @todo(!) something
      }
    });
  }

  public onLoginSubmit(request: AuthenticationAuthenticateRequest): void {
    this.authenticationStore.authenticate(request);
  }
}

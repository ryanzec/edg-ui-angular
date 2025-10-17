import { Component, ChangeDetectionStrategy, inject, effect, computed } from '@angular/core';
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
  private readonly _router = inject(Router);
  private readonly _authenticationManager = inject(AuthenticationManager);

  protected readonly isProcessing = computed(() => this._authenticationManager.isLoading());

  constructor() {
    effect(() => {
      if (this._authenticationManager.isAuthenticated()) {
        this._router.navigate(['/home']);
      }
    });

    effect(() => {
      const error = this._authenticationManager.error();

      if (error) {
        // @todo(!) something
      }
    });
  }

  public onLoginSubmit(request: AuthenticationAuthenticateRequest): void {
    this._authenticationManager.authenticate(request);
  }
}

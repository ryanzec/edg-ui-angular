import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UiThemeSwitcher, AuthenticationManager } from '@organization/shared-ui';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cp-root',
  imports: [RouterOutlet, RouterLink, UiThemeSwitcher, CommonModule],
  templateUrl: './app.html',
})
export class App {
  public readonly authenticationManager = inject(AuthenticationManager);

  protected readonly title = signal('customer-portal');

  constructor() {
    this.authenticationManager.check();
  }
}

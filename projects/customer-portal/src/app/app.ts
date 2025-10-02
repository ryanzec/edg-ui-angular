import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UiThemeSwitcher, AuthenticationStore } from '@organization/shared-ui';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cp-root',
  imports: [RouterOutlet, RouterLink, UiThemeSwitcher, CommonModule],
  templateUrl: './app.html',
})
export class App {
  public readonly authenticationStore = inject(AuthenticationStore);

  protected readonly title = signal('customer-portal');

  constructor() {
    this.authenticationStore.check();
  }
}

import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  UiThemeSwitcher,
  AuthenticationManager,
  ApplicationNavigation,
  SettingsMenuItem,
} from '@organization/shared-ui';
import { CommonModule } from '@angular/common';
import { tailwindUtils } from '@organization/shared-utils';

@Component({
  selector: 'cp-root',
  imports: [RouterOutlet, UiThemeSwitcher, CommonModule, ApplicationNavigation],
  templateUrl: './app.html',
})
export class App {
  public readonly authenticationManager = inject(AuthenticationManager);

  protected readonly title = signal('customer-portal');

  protected readonly isAuthenticated = computed(() => this.authenticationManager.isAuthenticated());
  protected readonly hasInitialized = computed(() => this.authenticationManager.hasInitialized());

  protected mergeClasses = tailwindUtils.merge;

  constructor() {
    this.authenticationManager.check();
  }

  protected handleSettingsMenuItemClick(item: SettingsMenuItem): void {
    console.log('Settings menu item clicked:', item);
  }

  protected handleLogout(): void {
    this.authenticationManager.logout();
  }
}

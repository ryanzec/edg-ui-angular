import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UiThemeSwitcher } from '@organization/shared-ui';

@Component({
  selector: 'cp-root',
  imports: [RouterOutlet, RouterLink, UiThemeSwitcher],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('customer-portal');
}

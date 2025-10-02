import { Component, inject, OnInit, input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Button } from '../../core/button/button';
import { UiThemeStoreService } from '../ui-theme-store/ui-theme-store';

@Component({
  selector: 'org-ui-theme-switcher',
  imports: [Button],
  templateUrl: './ui-theme-switcher.html',
})
export class UiThemeSwitcher implements OnInit {
  private readonly themeStoreService = inject(UiThemeStoreService);

  private readonly document = inject(DOCUMENT);

  // @todo(!) default based on user
  public isChecked = input<boolean>(true);

  public ngOnInit(): void {
    this.themeStoreService.setDarkMode(this.isChecked());
  }

  public onToggleChange(): void {
    this.themeStoreService.toggleMode();
  }
}

import { Component, inject, OnInit, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UiThemeStoreService } from '../ui-theme-store/ui-theme-store';

@Component({
  selector: 'org-ui-theme-switcher',
  imports: [MatSlideToggleModule],
  templateUrl: './ui-theme-switcher.html',
  styleUrl: './ui-theme-switcher.scss',
})
export class UiThemeSwitcher implements OnInit {
  readonly themeStoreService = inject(UiThemeStoreService);

  private readonly document = inject(DOCUMENT);

  @Input()
  isChecked = true;

  ngOnInit(): void {
    this.themeStoreService.setDarkMode(this.isChecked);
  }

  onToggleChange(checked: boolean): void {
    this.themeStoreService.setDarkMode(checked);
  }
}

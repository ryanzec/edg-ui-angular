import { Injectable, signal, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  // makes the service a singleton available app-wide
  providedIn: 'root',
})
export class UiThemeStoreService {
  private readonly document = inject(DOCUMENT);

  readonly isDarkMode = signal<boolean>(false);

  constructor() {
    effect(() => {
      const bodyElement = this.document.body;

      if (this.isDarkMode()) {
        bodyElement.classList.add('dark-theme');
      } else {
        bodyElement.classList.remove('dark-theme');
      }
    });
  }

  setDarkMode(isDark: boolean): void {
    this.isDarkMode.set(isDark);
  }
}

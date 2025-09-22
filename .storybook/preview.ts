import type { Preview } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { MAT_BUTTON_CONFIG, MAT_FAB_DEFAULT_OPTIONS } from '@angular/material/button';
import { MAT_CARD_CONFIG } from '@angular/material/card';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { withInterceptorsFromDi } from '@angular/common/http';
import { withFetch } from '@angular/common/http';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
      dynamicTitle: true,
    },
  },
};

// dx code, any is fine here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withThemeDecorator = (Story: any, context: any) => {
  const { globals } = context;
  const newTheme = globals.theme;

  // this is in the context of the iframe of the story
  const body = document.querySelector('body');

  if (!body) {
    return Story();
  }

  body.classList.remove('dark-theme');
  body.classList.add(`${newTheme}-theme`);

  return Story();
};

const preview: Preview = {
  decorators: [
    withThemeDecorator,
    applicationConfig({
      providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideHttpClient(withFetch(), withInterceptorsFromDi()),
        { provide: MAT_BUTTON_CONFIG, useValue: { defaultAppearance: 'tonal' } },
        { provide: MAT_FAB_DEFAULT_OPTIONS, useValue: { defaultAppearance: 'tonal' } },
        { provide: MAT_CARD_CONFIG, useValue: { appearance: 'outlined' } },
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
      ],
    }),
  ],
};

export default preview;

import type { Preview } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import {
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { withInterceptorsFromDi } from '@angular/common/http';
import { withFetch } from '@angular/common/http';

// @todo(refactor) for some reason the inclusion of the tailwind css in the styles.scss files does not get
// @todo(refactor) applied to storybook but including it here does so while this feels hack, the hack is in storybook
// @todo(refactor) code so it is fine for the time being
import '../projects/shared-ui/src/lib/tailwind.css';
import '@phosphor-icons/web/regular/style.css';
import '@phosphor-icons/web/bold/style.css';
import '@phosphor-icons/web/fill/style.css';
// import '@fontsource/geist-sans/400.css';
// import '@fontsource/geist-sans/500.css';
// import '@fontsource/geist-sans/600.css';
// import '@fontsource/geist-sans/700.css';
import '../.storybook/storybook-styles.css';
import { dateUtils } from '@organization/shared-utils';

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
        provideAppInitializer(() => {
          dateUtils.configureTimezone('UTC');

          return Promise.resolve();
          //   const globalService = inject(FeatureFlagStore);
          //   return globalService.initialize(LAUNCH_DARKLY_CLIENT_ID, LAUNCH_DARKLY_CONTEXT, LAUNCH_DARKLY_HASH);
        }),
      ],
    }),
  ],
  parameters: {
    controls: {
      disableSaveFromUI: true,
    },
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
  },
};

export default preview;

import type { Meta, StoryObj } from '@storybook/angular';
import { UiThemeSwitcher } from './ui-theme-switcher';
import { UiThemeStoreService } from '../ui-theme-store/ui-theme-store';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<UiThemeSwitcher> = {
  title: 'Shared UI/UI Theme Switcher',
  component: UiThemeSwitcher,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (story) => ({
      ...story(),
      providers: [importProvidersFrom(UiThemeStoreService)],
    }),
  ],
};

export default meta;
type Story = StoryObj<UiThemeSwitcher>;

export const DefaultLight: Story = {
  args: {
    isChecked: false,
  },
};

export const DefaultDark: Story = {
  args: {
    isChecked: true,
  },
};

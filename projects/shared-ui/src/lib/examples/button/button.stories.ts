import type { Meta, StoryObj } from '@storybook/angular';
import { EXAMPLEButton } from './button';

const meta: Meta<EXAMPLEButton> = {
  title: 'Shared UI/Examples/Button',
  component: EXAMPLEButton,
};

export default meta;
type Story = StoryObj<EXAMPLEButton>;

export const Default: Story = {
  args: {
    // Add args here when the component has inputs
  },
};

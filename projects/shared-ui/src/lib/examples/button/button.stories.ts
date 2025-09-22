import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';

const meta: Meta<Button> = {
  title: 'Shared UI/Examples/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<Button>;

export const Default: Story = {
  args: {
    // Add args here when the component has inputs
  },
};

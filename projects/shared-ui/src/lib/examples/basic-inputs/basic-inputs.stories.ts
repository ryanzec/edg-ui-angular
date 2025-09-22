import type { Meta, StoryObj } from '@storybook/angular';
import { BasicInputs } from './basic-inputs';

const meta: Meta<BasicInputs> = {
  title: 'Shared UI/Examples/Basic Inputs',
  component: BasicInputs,
};

export default meta;
type Story = StoryObj<BasicInputs>;

export const Default: Story = {
  args: {
    // Add args here when the component has inputs
  },
};

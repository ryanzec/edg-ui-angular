import type { Meta, StoryObj } from '@storybook/angular';
import { BasicInputsComponent } from './basic-inputs';

const meta: Meta<BasicInputsComponent> = {
  title: 'Shared UI/Examples/Basic Inputs',
  component: BasicInputsComponent,
};

export default meta;
type Story = StoryObj<BasicInputsComponent>;

export const Default: Story = {
  args: {
    // Add args here when the component has inputs
  },
};

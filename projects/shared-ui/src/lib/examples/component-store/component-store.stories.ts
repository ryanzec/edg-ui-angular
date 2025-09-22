import type { Meta, StoryObj } from '@storybook/angular';
import { ComponentStoreComponent } from './component-store';

const meta: Meta<ComponentStoreComponent> = {
  title: 'Shared UI/Examples/ComponentStore',
  component: ComponentStoreComponent,
};

export default meta;
type Story = StoryObj<ComponentStoreComponent>;

export const Default: Story = {
  args: {
    // Add args here when the component has inputs
  },
};

import type { Meta, StoryObj } from '@storybook/angular';
import { EXAMPLERefForwarding } from './ref-forwarding';

const meta: Meta<EXAMPLERefForwarding> = {
  title: 'Examples/Patterns/Ref Forwarding',
  component: EXAMPLERefForwarding,
};

export default meta;
type Story = StoryObj<EXAMPLERefForwarding>;

export const Nested: Story = {
  args: {
    // Add args here when the component has inputs
  },
};

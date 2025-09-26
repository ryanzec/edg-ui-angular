import type { Meta, StoryObj } from '@storybook/angular';
import { EXAMPLEChildParentEventsCommunication } from './child-parent-events-communication';

const meta: Meta<EXAMPLEChildParentEventsCommunication> = {
  title: 'Shared UI/Examples/Patterns/Child -> Parent Communication',
  component: EXAMPLEChildParentEventsCommunication,
};

export default meta;
type Story = StoryObj<EXAMPLEChildParentEventsCommunication>;

export const Events: Story = {
  args: {
    // Add args here when the component has inputs
  },
};

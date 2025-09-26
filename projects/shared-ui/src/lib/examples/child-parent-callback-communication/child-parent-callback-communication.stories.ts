import type { Meta, StoryObj } from '@storybook/angular';
import { EXAMPLEChildParentCallbackCommunication } from './child-parent-callback-communication';

const meta: Meta<EXAMPLEChildParentCallbackCommunication> = {
  title: 'Shared UI/Examples/Patterns/Child -> Parent Communication',
  component: EXAMPLEChildParentCallbackCommunication,
};

export default meta;
type Story = StoryObj<EXAMPLEChildParentCallbackCommunication>;

export const Callback: Story = {
  args: {
    // Add args here when the component has inputs
  },
};

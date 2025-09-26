import type { Meta, StoryObj } from '@storybook/angular';
import { EXAMPLEParentChildCommunication } from './parent-child-communication';

const meta: Meta<EXAMPLEParentChildCommunication> = {
  title: 'Shared UI/Examples/Patterns/Parent -> Child Communication',
  component: EXAMPLEParentChildCommunication,
};

export default meta;
type Story = StoryObj<EXAMPLEParentChildCommunication>;

export const DirectChild: Story = {
  args: {
    // Add args here when the component has inputs
  },
};

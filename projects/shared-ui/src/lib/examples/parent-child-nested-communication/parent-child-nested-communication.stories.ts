import type { Meta, StoryObj } from '@storybook/angular';
import { EXAMPLEParentChildNestedCommunication } from './parent-child-nested-communication';

const meta: Meta<EXAMPLEParentChildNestedCommunication> = {
  title: 'Shared UI/Examples/Patterns/Parent -> Child Communication',
  component: EXAMPLEParentChildNestedCommunication,
};

export default meta;
type Story = StoryObj<EXAMPLEParentChildNestedCommunication>;

export const Nested: Story = {
  args: {
    // Add args here when the component has inputs
  },
};

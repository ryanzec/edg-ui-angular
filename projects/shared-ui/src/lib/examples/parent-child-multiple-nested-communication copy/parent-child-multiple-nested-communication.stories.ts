import type { Meta, StoryObj } from '@storybook/angular';
import { EXAMPLEParentChildMultipleNestedCommunication } from './parent-child-multiple-nested-communication';

const meta: Meta<EXAMPLEParentChildMultipleNestedCommunication> = {
  title: 'Examples/Patterns/Parent -> Child Communication',
  component: EXAMPLEParentChildMultipleNestedCommunication,
};

export default meta;
type Story = StoryObj<EXAMPLEParentChildMultipleNestedCommunication>;

export const MutlipleNested: Story = {
  args: {
    // Add args here when the component has inputs
  },
};

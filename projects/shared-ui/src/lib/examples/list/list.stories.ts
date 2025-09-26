import type { Meta, StoryObj } from '@storybook/angular';
import { EXAMPLEList } from './list';

const meta: Meta<EXAMPLEList> = {
  title: 'Shared UI/Examples/Styling/List',
  component: EXAMPLEList,
};

export default meta;
type Story = StoryObj<EXAMPLEList>;

export const Default: Story = {
  args: {
    // Add args here when the component has inputs
  },
};

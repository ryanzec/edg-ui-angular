import type { Meta, StoryObj } from '@storybook/angular';
import { EXAMPLETable } from './table';

const meta: Meta<EXAMPLETable> = {
  title: 'Shared UI/Examples/Styling/Table',
  component: EXAMPLETable,
};

export default meta;
type Story = StoryObj<EXAMPLETable>;

export const Default: Story = {
  args: {
    // Add args here when the component has inputs
  },
};

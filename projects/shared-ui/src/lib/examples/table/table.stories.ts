import type { Meta, StoryObj } from '@storybook/angular';
import { Table } from './table';

const meta: Meta<Table> = {
  title: 'Shared UI/Examples/Table',
  component: Table,
};

export default meta;
type Story = StoryObj<Table>;

export const Default: Story = {
  args: {
    // Add args here when the component has inputs
  },
};

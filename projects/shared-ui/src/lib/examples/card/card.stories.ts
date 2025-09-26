import type { Meta, StoryObj } from '@storybook/angular';
import { EXAMPLECard } from './card';

const meta: Meta<EXAMPLECard> = {
  title: 'Shared UI/Examples/Styling/Card',
  component: EXAMPLECard,
};

export default meta;
type Story = StoryObj<EXAMPLECard>;

export const Default: Story = {
  args: {
    // Add args here when the component has inputs
  },
};

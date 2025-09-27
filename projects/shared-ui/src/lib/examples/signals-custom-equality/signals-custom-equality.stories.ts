import type { Meta, StoryObj } from '@storybook/angular';
import { EXAMPLESignalsCustomEquality } from './signals-custom-equality';

const meta: Meta<EXAMPLESignalsCustomEquality> = {
  title: 'Shared UI/Examples/Patterns/Signals',
  component: EXAMPLESignalsCustomEquality,
};

export default meta;
type Story = StoryObj<EXAMPLESignalsCustomEquality>;

export const CustomEquality: Story = {
  args: {
    // Add args here when the component has inputs
  },
};

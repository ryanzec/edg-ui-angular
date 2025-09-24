import type { Meta, StoryObj } from '@storybook/angular';
import { EXAMPLEBasicInputs } from './basic-inputs';

const meta: Meta<EXAMPLEBasicInputs> = {
  title: 'Shared UI/Examples/Basic Inputs',
  component: EXAMPLEBasicInputs,
};

export default meta;
type Story = StoryObj<EXAMPLEBasicInputs>;

export const Default: Story = {
  args: {
    // Add args here when the component has inputs
  },
};

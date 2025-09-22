import type { Meta, StoryObj } from '@storybook/angular';
import { BasicInputsComponent } from './basic-inputs';

const meta: Meta<BasicInputsComponent> = {
  title: 'Shared UI/Examples/Basic Input',
  component: BasicInputsComponent,
  parameters: {
    docs: {
      description: {
        component: `
The AllComponents component is an example component that serves as a showcase or container
for demonstrating various UI components within the shared UI library.

**Features:**
- Basic component structure
- Serves as a foundation for component demonstrations
- Can be extended to showcase multiple UI components

**Usage:**
\`\`\`html
<org-all-components></org-all-components>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    // Add argTypes here when the component has inputs
  },
};

export default meta;
type Story = StoryObj<BasicInputsComponent>;

export const Default: Story = {
  args: {
    // Add args here when the component has inputs
  },
};

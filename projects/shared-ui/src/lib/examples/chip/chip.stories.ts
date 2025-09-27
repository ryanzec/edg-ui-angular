import type { Meta, StoryObj } from '@storybook/angular';
import { EXAMPLEChip } from './chip';

const meta: Meta<EXAMPLEChip> = {
  title: 'Shared UI/Examples/Styling/Chip',
  component: EXAMPLEChip,
  parameters: {
    docs: {
      description: {
        component: `
## Angular Material Chip Variations

This component showcases all available Angular Material chip variations and configurations:

### Chip Types
- **Static Chips**: Display fixed content that is not interactive
- **Selection Chips**: Allow single or multiple selection from a set of options
- **Dynamic Chips**: Enable adding/removing chips through user input
- **Icon Chips**: Include avatar or trailing icons for visual enhancement

### Styling Options
- **Themed Chips**: Primary, accent, and warn color themes
- **Disabled State**: Non-interactive chips for unavailable options
- **Vertical Layout**: Stacked orientation for space-constrained layouts

### Interactive Features
- Removable chips with cancel buttons
- Input field integration for dynamic content
- Selection state management
- Keyboard navigation support

### Use Cases
- Tag management systems
- Filter selections
- Contact/user lists
- Category selection
- Technology stack displays
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<EXAMPLEChip>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Complete showcase of all Angular Material chip variations including static, selection, dynamic, icon, themed, disabled, and vertical orientation chips.',
      },
    },
  },
};

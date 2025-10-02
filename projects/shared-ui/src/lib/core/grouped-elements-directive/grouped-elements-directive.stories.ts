import type { Meta, StoryObj } from '@storybook/angular';
import { Component, input } from '@angular/core';
import { GroupedElementsDirective } from './grouped-elements-directive';

@Component({
  selector: 'org-story-wrapper',
  template: `
    <div class="p-4 space-y-4">
      <h3 class="text-lg font-semibold mb-2">Grouped Elements Directive Demo</h3>

      <div class="border-2 border-dashed border-gray-300 p-4 rounded-lg">
        <p class="text-sm text-text-color mb-2">
          Directive state: <strong>{{ getDisplayValue() }}</strong> | Flex Direction:
          <strong>{{ getFlexDirectionValue() }}</strong>
        </p>
        <div
          [orgGroupedElements]="getEnabledValue()"
          [flexDirection]="getFlexDirectionValue()"
          class="bg-blue-50 border border-blue-200 p-4 rounded"
        >
          <div class="bg-white p-2 border border-outline rounded-md">First Item</div>
          <div class="bg-white p-2 border border-outline rounded-md">Second Item</div>
          <div class="bg-white p-2 border border-outline rounded-md">Third Item</div>
        </div>
      </div>

      <div class="text-sm text-text-color">
        <p><strong>Expected behavior:</strong></p>
        <ul class="list-disc list-inside mt-1 space-y-1">
          <li>
            When <strong>enabled (true)</strong> with <strong>flex-row (default)</strong>: Items display horizontally
            with consistent spacing
          </li>
          <li>
            When <strong>enabled (true)</strong> with <strong>flex-col</strong>: Items stack vertically with consistent
            spacing
          </li>
          <li>When <strong>disabled (false/null)</strong>: Items display in default layout (inline)</li>
        </ul>
      </div>
    </div>
  `,
  imports: [GroupedElementsDirective],
})
class StoryWrapperComponent {
  public readonly enabled = input<'true' | 'false' | 'null'>('true');
  public readonly flexDirection = input<'row' | 'col'>('row');

  public getEnabledValue(): boolean | null {
    const value = this.enabled();
    if (value === 'true') return true;
    if (value === 'false') return false;
    return null;
  }

  public getFlexDirectionValue(): 'row' | 'col' {
    return this.flexDirection();
  }

  public getDisplayValue(): string {
    return this.getEnabledValue()?.toString() ?? 'null';
  }
}

type StoryArgs = {
  enabled: 'true' | 'false' | 'null';
  flexDirection: 'row' | 'col';
};

const meta: Meta<StoryArgs> = {
  title: 'Shared UI/Core/Directives/Grouped Elements',
  component: StoryWrapperComponent,
  parameters: {
    docs: {
      description: {
        component: `
## Grouped Elements Directive

A directive that applies flexbox layout classes to create grouped elements with consistent spacing.

### Features
- Adds \`flex\` and \`gap-2\` CSS classes when enabled
- Conditionally adds \`flex-col\` based on the \`flexDirection\` input
- Can be disabled by setting to \`false\` or \`null\`
- Enabled by default when no value is provided
- Defaults to row direction when \`flexDirection\` is not specified (maintains original behavior)

### CSS Classes Applied
- \`flex\`: Makes the element a flex container (always applied when enabled)
- \`flex-col\`: Sets flex direction to column (only when \`flexDirection="col"\`)
- \`gap-2\`: Adds consistent spacing between child elements (always applied when enabled)

### Usage Examples
\`\`\`html
<!-- Enabled by default with row direction (original behavior) -->
<div orgGroupedElements>Content</div>

<!-- Explicitly enabled with row direction (no flex-col class) -->
<div [orgGroupedElements]="true" flexDirection="row">Content</div>

<!-- Enabled with column direction (applies flex-col class) -->
<div [orgGroupedElements]="true" flexDirection="col">Content</div>

<!-- Disabled -->
<div [orgGroupedElements]="false">Content</div>
<div [orgGroupedElements]="null">Content</div>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    enabled: {
      control: {
        type: 'radio',
      },
      options: ['true', 'false', 'null'],
      description: 'Controls whether the directive applies the grouped elements styling',
      table: {
        type: { summary: 'boolean | null' },
        defaultValue: { summary: 'true' },
      },
    },
    flexDirection: {
      control: {
        type: 'radio',
      },
      options: ['row', 'col'],
      description: 'Controls the flex direction - determines if flex-col class is applied',
      table: {
        type: { summary: 'row | col' },
        defaultValue: { summary: 'row' },
      },
    },
  },
  render: (args) => ({
    props: args,
  }),
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Interactive: Story = {
  args: {
    enabled: 'true',
    flexDirection: 'row',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive controls to test different combinations of enabled state and flex direction.',
      },
    },
  },
};

export const ColumnDirection: Story = {
  args: {
    enabled: 'true',
    flexDirection: 'col',
  },
  parameters: {
    docs: {
      description: {
        story: 'Directive is enabled with column direction, applying flex, flex-col, and gap-2 classes.',
      },
    },
  },
};

export const RowDirection: Story = {
  args: {
    enabled: 'true',
    flexDirection: 'row',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Directive is enabled with row direction (default behavior), applying flex and gap-2 classes (no flex-col).',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    enabled: 'false',
    flexDirection: 'col',
  },
  parameters: {
    docs: {
      description: {
        story: 'Directive is disabled, no flex classes are applied regardless of flex direction setting.',
      },
    },
  },
};

import type { Meta, StoryObj } from '@storybook/angular';
import { Component, input } from '@angular/core';
import { GroupedElementsDirective } from './grouped-elements-directive';

@Component({
  selector: 'org-story-wrapper',
  template: `
    <div class="p-4 space-y-4">
      <h3 class="text-lg font-semibold mb-2">Grouped Elements Directive Demo</h3>

      <div class="border-2 border-dashed border-gray-300 p-4 rounded-lg">
        <p class="text-sm text-gray-600 mb-2">
          Directive state: <strong>{{ getDisplayValue() }}</strong>
        </p>
        <div [orgGroupedElements]="getEnabledValue()" class="bg-blue-50 border border-blue-200 p-4 rounded">
          <div class="bg-white p-2 border border-outline rounded-md">First Item</div>
          <div class="bg-white p-2 border border-outline rounded-md">Second Item</div>
          <div class="bg-white p-2 border border-outline rounded-md">Third Item</div>
        </div>
      </div>

      <div class="text-sm text-gray-600">
        <p><strong>Expected behavior:</strong></p>
        <ul class="list-disc list-inside mt-1 space-y-1">
          <li>When <strong>enabled (true)</strong>: Items stack vertically with consistent spacing</li>
          <li>When <strong>disabled (false/null)</strong>: Items display in default layout (inline)</li>
        </ul>
      </div>
    </div>
  `,
  imports: [GroupedElementsDirective],
})
class StoryWrapperComponent {
  public readonly enabled = input<'true' | 'false' | 'null'>('true');

  public getEnabledValue(): boolean | null {
    const value = this.enabled();
    if (value === 'true') return true;
    if (value === 'false') return false;
    return null;
  }

  public getDisplayValue(): string {
    return this.getEnabledValue()?.toString() ?? 'null';
  }
}

type StoryArgs = {
  enabled: 'true' | 'false' | 'null';
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
- Adds \`flex\`, \`flex-col\`, and \`gap-2\` CSS classes when enabled
- Can be disabled by setting to \`false\` or \`null\`
- Enabled by default when no value is provided

### CSS Classes Applied
- \`flex\`: Makes the element a flex container
- \`flex-col\`: Sets flex direction to column
- \`gap-2\`: Adds consistent spacing between child elements

### Usage Examples
\`\`\`html
<!-- Enabled by default -->
<div orgGroupedElements>Content</div>

<!-- Explicitly enabled -->
<div [orgGroupedElements]="true">Content</div>

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
  },
  parameters: {
    docs: {
      description: {
        story: 'Directive is enabled, applying flex column layout with gap spacing to create grouped elements.',
      },
    },
  },
};

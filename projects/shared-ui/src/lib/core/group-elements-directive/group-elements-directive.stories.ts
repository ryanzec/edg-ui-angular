import type { Meta, StoryObj } from '@storybook/angular';
import { GroupElementsDirective } from './group-elements-directive';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';

const meta: Meta<GroupElementsDirective> = {
  title: 'Core/Directives/Group Elements',
  component: GroupElementsDirective,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Grouped Elements Directive

  A directive that applies flexbox layout classes to create grouped elements with consistent spacing.

  ### Features
  - Adds \`flex\` and \`gap-2\` CSS classes when enabled
  - Conditionally adds \`flex-col\` based on the \`flexDirection\` input
  - Can be disabled by setting to \`false\` or \`null\`
  - Enabled by default when no value is provided
  - Defaults to row direction when \`flexDirection\` is not specified

  ### CSS Classes Applied
  - \`flex\`: Makes the element a flex container (always applied when enabled)
  - \`flex-col\`: Sets flex direction to column (only when \`flexDirection="col"\`)
  - \`gap-2\`: Adds consistent spacing between child elements (always applied when enabled)

  ### Usage Examples
  \`\`\`html
  <!-- Enabled by default with row direction -->
  <div orgGroupElements>
    <button>Button 1</button>
    <button>Button 2</button>
    <button>Button 3</button>
  </div>

  <!-- Explicitly enabled with row direction -->
  <div [orgGroupElements]="true" flexDirection="row">
    <button>Button 1</button>
    <button>Button 2</button>
  </div>

  <!-- Enabled with column direction -->
  <div [orgGroupElements]="true" flexDirection="col">
    <button>Button 1</button>
    <button>Button 2</button>
  </div>

  <!-- Disabled -->
  <div [orgGroupElements]="false">
    <button>Button 1</button>
    <button>Button 2</button>
  </div>
</div>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<GroupElementsDirective>;

export const Default: Story = {
  args: {
    orgGroupElements: true,
    flexDirection: 'row',
  },
  argTypes: {
    orgGroupElements: {
      control: 'boolean',
      description: 'Controls whether the directive applies the grouped elements styling',
    },
    flexDirection: {
      control: 'select',
      options: ['row', 'col'],
      description: 'Controls the flex direction - determines if flex-col class is applied',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default grouped elements with row direction. Use the controls below to interact with the directive.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div
        [orgGroupElements]="orgGroupElements"
        [flexDirection]="flexDirection"
        class="bg-background border border-border p-4 rounded"
      >
        <div class="bg-background p-2 border border-outline rounded-md">First Item</div>
        <div class="bg-background p-2 border border-outline rounded-md">Second Item</div>
        <div class="bg-background p-2 border border-outline rounded-md">Third Item</div>
      </div>
    `,
    moduleMetadata: {
      imports: [GroupElementsDirective],
    },
  }),
};

export const FlexDirections: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of row and column flex directions.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Flex Direction Variants"
        currentState="Comparing row and column directions"
      >
        <org-storybook-example-container-section label="Row (default)">
          <div
            orgGroupElements
            flexDirection="row"
            class="bg-background border border-border p-4 rounded"
          >
            <div class="bg-background p-2 border border-outline rounded-md">Item 1</div>
            <div class="bg-background p-2 border border-outline rounded-md">Item 2</div>
            <div class="bg-background p-2 border border-outline rounded-md">Item 3</div>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Column">
          <div
            orgGroupElements
            flexDirection="col"
            class="bg-background border border-border p-4 rounded"
          >
            <div class="bg-background p-2 border border-outline rounded-md">Item 1</div>
            <div class="bg-background p-2 border border-outline rounded-md">Item 2</div>
            <div class="bg-background p-2 border border-outline rounded-md">Item 3</div>
          </div>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>row</strong>: Items display horizontally with gap-2 spacing (default)</li>
          <li><strong>col</strong>: Items stack vertically with gap-2 spacing</li>
          <li>Both apply flex and gap-2 classes</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [GroupElementsDirective, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const EnabledStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of enabled and disabled states.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Enabled vs Disabled"
        currentState="Comparing enabled and disabled states"
      >
        <org-storybook-example-container-section label="Enabled (true)">
          <div
            [orgGroupElements]="true"
            class="bg-background border border-border p-4 rounded"
          >
            <div class="bg-background p-2 border border-outline rounded-md">Item 1</div>
            <div class="bg-background p-2 border border-outline rounded-md">Item 2</div>
            <div class="bg-background p-2 border border-outline rounded-md">Item 3</div>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Disabled (false)">
          <div
            [orgGroupElements]="false"
            class="bg-background border border-border p-4 rounded"
          >
            <div class="bg-background p-2 border border-outline rounded-md">Item 1</div>
            <div class="bg-background p-2 border border-outline rounded-md">Item 2</div>
            <div class="bg-background p-2 border border-outline rounded-md">Item 3</div>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Disabled (null)">
          <div
            [orgGroupElements]="null"
            class="bg-background border border-border p-4 rounded"
          >
            <div class="bg-background p-2 border border-outline rounded-md">Item 1</div>
            <div class="bg-background p-2 border border-outline rounded-md">Item 2</div>
            <div class="bg-background p-2 border border-outline rounded-md">Item 3</div>
          </div>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Enabled (true)</strong>: Applies flex, gap-2, and optionally flex-col classes</li>
          <li><strong>Disabled (false)</strong>: No flex classes applied, items use default layout</li>
          <li><strong>Disabled (null)</strong>: Same as false, no flex classes applied</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [GroupElementsDirective, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const PracticalExamples: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Practical examples showing common use cases for the directive.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Practical Use Cases"
        currentState="Real-world examples of grouped elements"
      >
        <org-storybook-example-container-section label="Button Group (Row)">
          <div orgGroupElements class="bg-background border border-border p-4 rounded">
            <button class="rounded bg-brand px-4 py-2 text-white">Save</button>
            <button class="rounded bg-secondary px-4 py-2 text-white">Cancel</button>
            <button class="rounded bg-neutral px-4 py-2 text-white">Reset</button>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Form Actions (Row)">
          <div orgGroupElements flexDirection="row" class="bg-background border border-border p-4 rounded">
            <button class="rounded bg-safe px-4 py-2 text-white">Submit</button>
            <button class="rounded bg-danger px-4 py-2 text-white">Delete</button>
            <button class="rounded border border-outline bg-background px-4 py-2">Preview</button>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Navigation Links (Column)">
          <div orgGroupElements flexDirection="col" class="bg-background border border-border p-4 rounded">
            <a href="#" class="rounded p-2 hover:bg-background-hover">Dashboard</a>
            <a href="#" class="rounded p-2 hover:bg-background-hover">Settings</a>
            <a href="#" class="rounded p-2 hover:bg-background-hover">Profile</a>
            <a href="#" class="rounded p-2 hover:bg-background-hover">Logout</a>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Card Actions (Row)">
          <div orgGroupElements class="bg-background border border-border p-4 rounded">
            <button class="rounded border border-outline bg-background px-3 py-1.5 text-sm">Edit</button>
            <button class="rounded border border-outline bg-background px-3 py-1.5 text-sm">Share</button>
            <button class="rounded border border-outline bg-background px-3 py-1.5 text-sm">Delete</button>
          </div>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>Perfect for button groups and form actions</li>
          <li>Useful for navigation menus (especially with column direction)</li>
          <li>Provides consistent spacing without manual gap classes</li>
          <li>Can be toggled on/off for responsive layouts</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [GroupElementsDirective, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

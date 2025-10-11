import type { Meta, StoryObj } from '@storybook/angular';
import { Label } from './label';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';
import { Button } from '../button/button';
import { Input } from '../input/input';

const meta: Meta<Label> = {
  title: 'Core/Components/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Label Component

  A label component designed to be used in connection with input elements. It features a text label with optional loading indicator and slot projection for additional content.

  ### Features
  - Required label text
  - Optional loading indicator
  - Slot projection for additional content (placed after label text/loading indicator)
  - Inline-flex layout for seamless integration
  - Fully accessible
  - Light and dark theme support

  ### Usage Examples
  \`\`\`html
  <!-- Basic label -->
  <org-label label="Username" />

  <!-- With loading indicator -->
  <org-label label="Fetching data..." [isLoading]="true" />

  <!-- With slot projection -->
  <org-label label="Email">
    <span class="text-danger-text">*</span>
  </org-label>

  <!-- Combined features -->
  <org-label label="Processing" [isLoading]="true">
    <span class="text-text-subtle">(optional)</span>
  </org-label>
  \`\`\`

  ### Notes
  - The label text is always displayed
  - Loading indicator appears after the label text when isLoading is true
  - Slot content is projected after the label text and loading indicator on the same line
  - Uses inline-flex for seamless integration with form layouts
</div>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<Label>;

export const Default: Story = {
  args: {
    label: 'Username',
    isLoading: false,
    containerClass: '',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The main label text (required)',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether to display a loading indicator',
    },
    containerClass: {
      control: 'text',
      description: 'Additional CSS classes for the container',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default label with just the label text. Use the controls below to interact with the component.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <org-label
        [label]="label"
        [isLoading]="isLoading"
        [containerClass]="containerClass"
      />
    `,
    moduleMetadata: {
      imports: [Label],
    },
  }),
};

export const WithLoadingIndicator: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of labels with and without loading indicators.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Loading Indicator Variants"
        currentState="Comparing labels with and without loading indicators"
      >
        <org-storybook-example-container-section label="Without Loading">
          <org-label label="Username" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Loading">
          <org-label label="Fetching data..." [isLoading]="true" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Processing">
          <org-label label="Processing request" [isLoading]="true" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Without Loading</strong>: Displays only the label text</li>
          <li><strong>With Loading</strong>: Displays a spinning loading indicator after the label text</li>
          <li><strong>Processing</strong>: Shows loading indicator for longer operations</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Label, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const WithSlotProjection: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Examples showing the slot projection feature with different types of content.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Slot Projection"
        currentState="Comparing labels with different projected content"
      >
        <org-storybook-example-container-section label="With Required Asterisk">
          <org-label label="Email">
            <span class="text-danger-text">*</span>
          </org-label>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Optional Text">
          <org-label label="Phone Number">
            <span class="text-text-subtle">(optional)</span>
          </org-label>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Info Badge">
          <org-label label="API Key">
            <span class="rounded-sm bg-info-background-subtle px-1 py-0.5 text-3xs text-info-text">NEW</span>
          </org-label>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Multiple Elements">
          <org-label label="Password">
            <span class="text-danger-text">*</span>
            <span class="text-text-subtle">(8+ chars)</span>
          </org-label>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Right Aligned Content">
          <org-label label="Password" containerClass="w-full">
            <div class="ml-auto">
              <span class="text-danger-text">*</span>
              <span class="text-text-subtle">(8+ chars)</span>
            </div>
          </org-label>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Required Asterisk</strong>: Common pattern for required fields</li>
          <li><strong>Optional Text</strong>: Indicates optional fields</li>
          <li><strong>Info Badge</strong>: Highlights new or special features</li>
          <li><strong>Multiple Elements</strong>: Shows combining different types of content</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Label, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const CombinedFeatures: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Examples combining loading indicator with slot projection.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Combined Features"
        currentState="Combining loading indicator and slot projection"
      >
        <org-storybook-example-container-section label="Loading with Required">
          <org-label label="Validating..." [isLoading]="true">
            <span class="text-danger-text">*</span>
          </org-label>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Loading with Info">
          <org-label label="Checking availability" [isLoading]="true">
            <span class="text-text-subtle">(realtime)</span>
          </org-label>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Loading with Badge">
          <org-label label="Processing data" [isLoading]="true">
            <span class="rounded-sm bg-caution-background-subtle px-1 py-0.5 text-3xs text-caution-text">BETA</span>
          </org-label>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Loading with Required</strong>: Shows validation in progress for required field</li>
          <li><strong>Loading with Info</strong>: Indicates realtime validation with loading state</li>
          <li><strong>Loading with Badge</strong>: Combines beta badge with processing state</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Label, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const FormContexts: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Examples of labels in various form contexts.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Form Contexts"
        currentState="Labels in different form scenarios"
      >
        <org-storybook-example-container-section label="Login Form">
          <div class="flex flex-col gap-2">
            <org-label label="Email Address">
              <span class="text-danger-text">*</span>
            </org-label>
            <org-label label="Password">
              <span class="text-danger-text">*</span>
            </org-label>
            <org-label label="Remember Me" />
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Registration Form">
          <div class="flex flex-col gap-2">
            <org-label label="Full Name">
              <span class="text-danger-text">*</span>
            </org-label>
            <org-label label="Email">
              <span class="text-danger-text">*</span>
            </org-label>
            <org-label label="Company">
              <span class="text-text-subtle">(optional)</span>
            </org-label>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Settings Form">
          <div class="flex flex-col gap-2">
            <org-label label="Display Name" />
            <org-label label="Email Notifications" />
            <org-label label="Two-Factor Authentication">
              <span class="rounded-sm bg-safe-background-subtle px-1 py-0.5 text-3xs text-safe-text">SECURE</span>
            </org-label>
          </div>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Login Form</strong>: Basic required fields with asterisks</li>
          <li><strong>Registration Form</strong>: Mix of required and optional fields</li>
          <li><strong>Settings Form</strong>: Fields with informational badges</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Label, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const WithCustomStyling: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Examples showing how to use containerClass for custom styling.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Custom Styling"
        currentState="Comparing labels with custom container classes"
      >
        <org-storybook-example-container-section label="Default">
          <org-label label="Default Label" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Bold Text">
          <org-label label="Bold Label" containerClass="font-bold" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Larger Text">
          <org-label label="Larger Label" containerClass="text-base" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Custom Color">
          <org-label label="Custom Color Label" containerClass="text-primary-text" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Default</strong>: Standard label styling</li>
          <li><strong>Bold Text</strong>: Makes the label text bold</li>
          <li><strong>Larger Text</strong>: Increases the font size</li>
          <li><strong>Custom Color</strong>: Changes the text color using design tokens</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Label, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const RealWorldExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A realistic example showing labels used with actual form inputs.',
      },
    },
  },
  render: () => ({
    props: {
      handleSubmit: () => {
        console.log('form submitted');
      },
    },
    template: `
      <org-storybook-example-container
        title="Real World Example"
        currentState="Complete form with labels and inputs"
      >
        <org-storybook-example-container-section label="User Profile Form">
          <div class="flex w-[400px] flex-col gap-3">
            <div class="flex flex-col gap-1">
              <org-label label="Full Name">
                <span class="text-danger-text">*</span>
              </org-label>
              <org-input type="text" placeholder="John Doe" />
            </div>

            <div class="flex flex-col gap-1">
              <org-label label="Email Address">
                <span class="text-danger-text">*</span>
              </org-label>
              <org-input type="email" placeholder="john@example.com" />
            </div>

            <div class="flex flex-col gap-1">
              <org-label label="Phone Number">
                <span class="text-text-subtle">(optional)</span>
              </org-label>
              <org-input type="tel" placeholder="+1 (555) 000-0000" />
            </div>

            <div class="flex flex-col gap-1">
              <org-label label="Company">
                <span class="text-text-subtle">(optional)</span>
              </org-label>
              <org-input type="text" placeholder="Acme Inc." />
            </div>

            <org-button color="primary" (clicked)="handleSubmit()">
              Save Profile
            </org-button>
          </div>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>Shows labels properly associated with form inputs</li>
          <li>Required fields marked with asterisks</li>
          <li>Optional fields clearly indicated</li>
          <li>Consistent spacing and alignment</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Label, Input, Button, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

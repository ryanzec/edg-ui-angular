import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';

const meta: Meta<Button> = {
  title: 'Core/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Button Component

  A versatile button component with multiple color variants, sizes, icon support, and interactive states.

  ### Features
  - 8 color variants for different semantic meanings
  - 3 size options (small, base, large)
  - Icon support (pre-icon, post-icon, or icon-only)
  - Loading state with spinner
  - Disabled state
  - Accessible with focus management
  - Smooth hover and pressed states
  - Form support (button, submit, reset types)

  ### Color Options
  - **brand**: Primary brand color (default)
  - **secondary**: Secondary accent color
  - **neutral**: Neutral gray color
  - **safe**: Success/safe state (green)
  - **info**: Informational state (blue)
  - **caution**: Caution state (yellow)
  - **warning**: Warning state (orange)
  - **danger**: Danger/error state (red)

  ### Size Options
  - **small**: Compact button for tight spaces
  - **base**: Standard button size (default)
  - **large**: Prominent button for primary actions

  ### Usage Examples
  \`\`\`html
  <!-- Basic button -->
  <org-button orgColor="brand">Click Me</org-button>

  <!-- Button with icon -->
  <org-button orgColor="brand" preIcon="plus">Add Item</org-button>

  <!-- Loading button -->
  <org-button orgColor="brand" [loading]="true">Saving...</org-button>

  <!-- Disabled button -->
  <org-button orgColor="brand" [disabled]="true">Disabled</org-button>

  <!-- Icon-only button -->
  <org-button orgColor="brand" icon="gear"></org-button>

  <!-- Large button with icons -->
  <org-button orgColor="brand" size="large" preIcon="download-simple" postIcon="arrow-right">
    Download
  </org-button>
</div>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<Button>;

export const Default: Story = {
  args: {
    orgColor: 'brand',
    size: 'base',
    disabled: false,
    loading: false,
    preIcon: null,
    postIcon: null,
    icon: null,
    type: 'button',
    class: '',
  },
  argTypes: {
    orgColor: {
      control: 'select',
      options: ['brand', 'secondary', 'neutral', 'safe', 'info', 'caution', 'warning', 'danger'],
      description: 'The color variant of the button',
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
    },
    preIcon: {
      control: 'text',
      description: 'Icon to display before the button text',
    },
    postIcon: {
      control: 'text',
      description: 'Icon to display after the button text',
    },
    icon: {
      control: 'text',
      description: 'Icon for icon-only button (overrides text)',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'The HTML button type',
    },
    class: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default button with brand color. Use the controls below to interact with the component.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <org-button
        [orgColor]="orgColor"
        [size]="size"
        [disabled]="disabled"
        [loading]="loading"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [icon]="icon"
        [type]="type"
        [class]="class"
      >
        Click Me
      </org-button>
    `,
    moduleMetadata: {
      imports: [Button],
    },
  }),
};

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all 8 color variants for different semantic meanings.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Color Variants"
        currentState="Comparing all 8 color options"
      >
        <org-storybook-example-container-section label="Brand (Primary)">
          <org-button orgColor="brand">Brand Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Secondary">
          <org-button orgColor="secondary">Secondary Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Neutral">
          <org-button orgColor="neutral">Neutral Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Safe (Success)">
          <org-button orgColor="safe">Safe Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Info">
          <org-button orgColor="info">Info Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Caution">
          <org-button orgColor="caution">Caution Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Warning">
          <org-button orgColor="warning">Warning Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Danger (Destructive)">
          <org-button orgColor="danger">Danger Button</org-button>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Brand</strong>: Primary brand color for main actions</li>
          <li><strong>Secondary</strong>: Secondary accent color for alternative actions</li>
          <li><strong>Neutral</strong>: Neutral gray for low-emphasis actions</li>
          <li><strong>Safe</strong>: Green for success/positive actions</li>
          <li><strong>Info</strong>: Blue for informational actions</li>
          <li><strong>Caution</strong>: Yellow for caution/warning actions</li>
          <li><strong>Warning</strong>: Orange for important warnings</li>
          <li><strong>Danger</strong>: Red for destructive/dangerous actions</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Button, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all 3 size variants (small, base, large).',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Size Variants"
        currentState="Comparing small, base, and large sizes"
      >
        <org-storybook-example-container-section label="Small">
          <org-button orgColor="brand" size="small">Small Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Base (Default)">
          <org-button orgColor="brand" size="base">Base Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Large">
          <org-button orgColor="brand" size="large">Large Button</org-button>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Small</strong>: Compact button for tight spaces or secondary actions</li>
          <li><strong>Base</strong>: Standard button size for most use cases (default)</li>
          <li><strong>Large</strong>: Prominent button for primary/important actions</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Button, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const IconVariations: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different icon configurations: pre-icon, post-icon, both, and icon-only.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Icon Variations"
        currentState="Comparing different icon placements"
      >
        <org-storybook-example-container-section label="With Pre-Icon">
          <org-button orgColor="brand" preIcon="plus">Add Item</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Post-Icon">
          <org-button orgColor="brand" postIcon="arrow-right">Continue</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Both Icons">
          <org-button orgColor="brand" preIcon="download-simple" postIcon="arrow-right">Download</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Icon-Only">
          <org-button orgColor="brand" icon="gear"></org-button>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Pre-Icon</strong>: Icon displayed before text (e.g., "Add", "Create")</li>
          <li><strong>Post-Icon</strong>: Icon displayed after text (e.g., "Next", "Continue")</li>
          <li><strong>Both Icons</strong>: Icons on both sides for emphasis</li>
          <li><strong>Icon-Only</strong>: Compact button with only an icon, no text</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Button, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different button states: normal, disabled, and loading.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Button States"
        currentState="Comparing normal, disabled, and loading states"
      >
        <org-storybook-example-container-section label="Normal">
          <org-button orgColor="brand">Normal Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Disabled">
          <org-button orgColor="brand" [disabled]="true">Disabled Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Loading">
          <org-button orgColor="brand" [loading]="true">Loading Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Loading with Icon">
          <org-button orgColor="brand" [loading]="true" preIcon="upload-simple">Uploading...</org-button>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Normal</strong>: Interactive with hover and focus states</li>
          <li><strong>Disabled</strong>: Non-interactive, reduced opacity, no hover effects</li>
          <li><strong>Loading</strong>: Shows spinner, non-interactive during operation</li>
          <li><strong>Loading with Icon</strong>: Icon is replaced by spinner during loading</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Button, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

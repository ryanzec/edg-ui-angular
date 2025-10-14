import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';

const meta: Meta<Button> = {
  title: 'Core/Components/Button',
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
  - 3 style variants (filled, ghost, text)
  - 3 size options (small, base, large)
  - Icon support (pre-icon, post-icon, or icon-only)
  - Loading state with spinner
  - Disabled state
  - Accessible with focus management
  - Smooth hover and pressed states
  - Form support (button, submit, reset types)

  ### Color Options
  - **primary**: Primary color (default)
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
  <org-button color="primary">Click Me</org-button>

  <!-- Button with icon -->
  <org-button color="primary" preIcon="plus">Add Item</org-button>

  <!-- Loading button -->
  <org-button color="primary" [loading]="true">Saving...</org-button>

  <!-- Disabled button -->
  <org-button color="primary" [disabled]="true">Disabled</org-button>

  <!-- Icon-only button -->
  <org-button color="primary" icon="gear"></org-button>

  <!-- Large button with icons -->
  <org-button color="primary" size="lg" preIcon="download-simple" postIcon="arrow-right">
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
    color: 'primary',
    size: 'base',
    variant: 'filled',
    disabled: false,
    loading: false,
    preIcon: null,
    postIcon: null,
    icon: null,
    type: 'button',
    excludeSpacing: false,
    buttonClass: '',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'neutral', 'safe', 'info', 'caution', 'warning', 'danger'],
      description: 'The color variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
      description: 'The size of the button',
    },
    variant: {
      control: 'select',
      options: ['filled', 'ghost', 'text'],
      description: 'The variant style of the button',
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
    excludeSpacing: {
      control: 'boolean',
      description: 'Whether to exclude padding styles from the button',
    },
    buttonClass: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default button with primary color. Use the controls below to interact with the component.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <org-button
        [color]="color"
        [size]="size"
        [variant]="variant"
        [disabled]="disabled"
        [loading]="loading"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [icon]="icon"
        [type]="type"
        [excludeSpacing]="excludeSpacing"
        [buttonClass]="buttonClass"
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
        <org-storybook-example-container-section label="Primary">
          <org-button color="primary">Primary Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Secondary">
          <org-button color="secondary">Secondary Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Neutral">
          <org-button color="neutral">Neutral Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Safe (Success)">
          <org-button color="safe">Safe Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Info">
          <org-button color="info">Info Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Caution">
          <org-button color="caution">Caution Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Warning">
          <org-button color="warning">Warning Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Danger (Destructive)">
          <org-button color="danger">Danger Button</org-button>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Primary</strong>: Primary color for main actions</li>
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
          <org-button color="primary" size="sm">Small Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Base (Default)">
          <org-button color="primary" size="base">Base Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Large">
          <org-button color="primary" size="lg">Large Button</org-button>
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
          <org-button color="primary" preIcon="plus">Add Item</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Post-Icon">
          <org-button color="primary" postIcon="arrow-right">Continue</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Both Icons">
          <org-button color="primary" preIcon="download-simple" postIcon="arrow-right">Download</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Icon-Only">
          <org-button color="primary" icon="gear"></org-button>
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
          <org-button color="primary">Normal Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Disabled">
          <org-button color="primary" [disabled]="true">Disabled Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Loading">
          <org-button color="primary" [loading]="true">Loading Button</org-button>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Loading with Icon">
          <org-button color="primary" [loading]="true" preIcon="upload-simple">Uploading...</org-button>
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

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Comparison of filled, ghost, and text variants across all colors. Ghost variant has transparent background in default state but matches filled styling on hover/focus/active. Text variant always has transparent background and border, using color-specific text tokens.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Button Variants"
        currentState="Comparing filled, ghost, and text variants for all colors"
      >
        <org-storybook-example-container-section label="Primary">
          <div class="flex gap-2">
            <org-button color="primary" variant="filled">Filled</org-button>
            <org-button color="primary" variant="ghost">Ghost</org-button>
            <org-button color="primary" variant="text">Text</org-button>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Secondary">
          <div class="flex gap-2">
            <org-button color="secondary" variant="filled">Filled</org-button>
            <org-button color="secondary" variant="ghost">Ghost</org-button>
            <org-button color="secondary" variant="text">Text</org-button>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Neutral">
          <div class="flex gap-2">
            <org-button color="neutral" variant="filled">Filled</org-button>
            <org-button color="neutral" variant="ghost">Ghost</org-button>
            <org-button color="neutral" variant="text">Text</org-button>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Safe">
          <div class="flex gap-2">
            <org-button color="safe" variant="filled">Filled</org-button>
            <org-button color="safe" variant="ghost">Ghost</org-button>
            <org-button color="safe" variant="text">Text</org-button>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Info">
          <div class="flex gap-2">
            <org-button color="info" variant="filled">Filled</org-button>
            <org-button color="info" variant="ghost">Ghost</org-button>
            <org-button color="info" variant="text">Text</org-button>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Caution">
          <div class="flex gap-2">
            <org-button color="caution" variant="filled">Filled</org-button>
            <org-button color="caution" variant="ghost">Ghost</org-button>
            <org-button color="caution" variant="text">Text</org-button>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Warning">
          <div class="flex gap-2">
            <org-button color="warning" variant="filled">Filled</org-button>
            <org-button color="warning" variant="ghost">Ghost</org-button>
            <org-button color="warning" variant="text">Text</org-button>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Danger">
          <div class="flex gap-2">
            <org-button color="danger" variant="filled">Filled</org-button>
            <org-button color="danger" variant="ghost">Ghost</org-button>
            <org-button color="danger" variant="text">Text</org-button>
          </div>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Filled</strong>: Default variant with colored background and border</li>
          <li><strong>Ghost</strong>: Transparent background and border in default state, colored text</li>
          <li><strong>Hover/Focus/Active</strong>: Ghost variant matches filled variant styling on interaction</li>
          <li><strong>Text</strong>: Always transparent background and border, uses color-specific text tokens (e.g., primary-text, danger-text) in default state, bold variant (e.g., primary-text-bold, danger-text-bold) on hover/focus/active</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Button, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const ExcludeSpacing: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Comparison of buttons with and without spacing (padding). When excludeSpacing is true, the button has no padding applied.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Exclude Spacing"
        currentState="Comparing buttons with and without padding"
      >
        <org-storybook-example-container-section label="With Spacing (Default)">
          <div class="flex gap-2 items-baseline">
            <org-button color="primary" size="sm">Small</org-button>
            <org-button color="primary" size="base">Base</org-button>
            <org-button color="primary" size="lg">Large</org-button>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Without Spacing (excludeSpacing=true)">
          <div class="flex gap-2 items-baseline">
            <org-button color="primary" size="sm" [excludeSpacing]="true">Small</org-button>
            <org-button color="primary" size="base" [excludeSpacing]="true">Base</org-button>
            <org-button color="primary" size="lg" [excludeSpacing]="true">Large</org-button>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Icon-Only With Spacing">
          <div class="flex gap-2 items-baseline">
            <org-button color="primary" size="sm" icon="gear"></org-button>
            <org-button color="primary" size="base" icon="gear"></org-button>
            <org-button color="primary" size="lg" icon="gear"></org-button>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Icon-Only Without Spacing">
          <div class="flex gap-2 items-baseline">
            <org-button color="primary" size="sm" icon="gear" [excludeSpacing]="true"></org-button>
            <org-button color="primary" size="base" icon="gear" [excludeSpacing]="true"></org-button>
            <org-button color="primary" size="lg" icon="gear" [excludeSpacing]="true"></org-button>
          </div>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Default</strong>: Button includes padding based on size</li>
          <li><strong>excludeSpacing=true</strong>: Removes all padding, useful for custom layouts where spacing is controlled externally</li>
          <li><strong>Text Size</strong>: Font size and gap are preserved regardless of excludeSpacing setting</li>
          <li><strong>Icon-Only</strong>: Icon-only buttons also respect the excludeSpacing setting</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Button, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

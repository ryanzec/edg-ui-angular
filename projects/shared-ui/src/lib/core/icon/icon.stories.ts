import type { Meta, StoryObj } from '@storybook/angular';
import { Icon, iconNames } from './icon';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';

const meta: Meta<Icon> = {
  title: 'Core/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Icon Component

  A component for rendering Phosphor Icons with configurable size and weight options.

  ### Features
  - Uses Phosphor Icons library
  - Three size options: small, base (default), large
  - Three weight options: regular (default), bold, fill
  - Inherits text color from parent elements
  - Inline display for easy integration with text
  - Accessible with aria-hidden attribute

  ### Size Options
  - **small**: 0.875rem / 14px (text-sm)
  - **base**: 1.125rem / 18px (text-lg) - default
  - **large**: 1.25rem / 20px (text-xl)

  ### Weight Options
  - **regular**: Standard icon weight - default
  - **bold**: Thicker icon strokes
  - **fill**: Filled/solid icon style

  ### Usage Examples
  \`\`\`html
  <!-- Default icon -->
  <org-icon name="check"></org-icon>

  <!-- Icon with size -->
  <org-icon name="check" size="large"></org-icon>

  <!-- Icon with weight -->
  <org-icon name="check" weight="bold"></org-icon>

  <!-- Icon with custom color (via parent) -->
  <div class="text-blue-500">
    <org-icon name="check"></org-icon>
  </div>

  <!-- Icon with all options -->
  <org-icon name="check" size="large" weight="fill"></org-icon>
</div>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<Icon>;

export const Default: Story = {
  args: {
    name: 'check',
    size: 'base',
    weight: 'regular',
  },
  argTypes: {
    name: {
      control: 'select',
      options: iconNames,
      description: 'The name of the icon to display from the Phosphor Icons library',
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large'],
      description: 'The size of the icon',
    },
    weight: {
      control: 'select',
      options: ['regular', 'bold', 'fill'],
      description: 'The weight/style of the icon',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default icon with base size and regular weight. Use the controls below to interact with the component.',
      },
    },
  },
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all available size variants (small, base, large).',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Size Variants"
        currentState="Comparing small, base, and large sizes"
      >
        <org-storybook-example-container-section label="Small (text-sm / 14px)">
          <org-icon name="check" size="small"></org-icon>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Base (text-lg / 18px) - Default">
          <org-icon name="check" size="base"></org-icon>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Large (text-xl / 20px)">
          <org-icon name="check" size="large"></org-icon>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>small</strong>: 0.875rem / 14px (text-sm)</li>
          <li><strong>base</strong>: 1.125rem / 18px (text-lg) - default</li>
          <li><strong>large</strong>: 1.25rem / 20px (text-xl)</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Icon, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const Weights: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all available weight variants (regular, bold, fill).',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Weight Variants"
        currentState="Comparing regular, bold, and fill weights"
      >
        <org-storybook-example-container-section label="Regular (default)">
          <org-icon name="check" weight="regular"></org-icon>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Bold">
          <org-icon name="check" weight="bold"></org-icon>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Fill">
          <org-icon name="check" weight="fill"></org-icon>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>regular</strong>: Standard icon weight - default</li>
          <li><strong>bold</strong>: Thicker icon strokes</li>
          <li><strong>fill</strong>: Filled/solid icon style</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Icon, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const ColorInheritance: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Icons inherit text color from parent elements for flexible styling.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Color Inheritance"
        currentState="Icons inherit text color from parent"
      >
        <org-storybook-example-container-section label="Default (inherits current text color)">
          <org-icon name="check"></org-icon>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Blue text color">
          <div class="text-blue-500">
            <org-icon name="check"></org-icon>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Red text color">
          <div class="text-red-500">
            <org-icon name="x"></org-icon>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Green text color">
          <div class="text-green-500">
            <org-icon name="plus"></org-icon>
          </div>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>Icons automatically inherit the text color from their parent element</li>
          <li>Use Tailwind text color classes on parent elements to style icons</li>
          <li>This allows icons to adapt to different contexts and themes</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Icon, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const AllIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Complete showcase of all available icons from the Phosphor Icons library.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="All Available Icons"
        currentState="Displaying all Phosphor icons"
      >
        <div class="grid grid-cols-4 gap-4">
          <div class="flex flex-col items-center gap-2 rounded border border-border p-3">
            <org-icon name="caret-right"></org-icon>
            <span class="text-xs text-text-color">caret-right</span>
          </div>
          <div class="flex flex-col items-center gap-2 rounded border border-border p-3">
            <org-icon name="caret-left"></org-icon>
            <span class="text-xs text-text-color">caret-left</span>
          </div>
          <div class="flex flex-col items-center gap-2 rounded border border-border p-3">
            <org-icon name="plus"></org-icon>
            <span class="text-xs text-text-color">plus</span>
          </div>
          <div class="flex flex-col items-center gap-2 rounded border border-border p-3">
            <org-icon name="check"></org-icon>
            <span class="text-xs text-text-color">check</span>
          </div>
          <div class="flex flex-col items-center gap-2 rounded border border-border p-3">
            <org-icon name="x"></org-icon>
            <span class="text-xs text-text-color">x</span>
          </div>
          <div class="flex flex-col items-center gap-2 rounded border border-border p-3">
            <org-icon name="arrow-right"></org-icon>
            <span class="text-xs text-text-color">arrow-right</span>
          </div>
          <div class="flex flex-col items-center gap-2 rounded border border-border p-3">
            <org-icon name="arrow-left"></org-icon>
            <span class="text-xs text-text-color">arrow-left</span>
          </div>
          <div class="flex flex-col items-center gap-2 rounded border border-border p-3">
            <org-icon name="download-simple"></org-icon>
            <span class="text-xs text-text-color">download-simple</span>
          </div>
          <div class="flex flex-col items-center gap-2 rounded border border-border p-3">
            <org-icon name="upload-simple"></org-icon>
            <span class="text-xs text-text-color">upload-simple</span>
          </div>
          <div class="flex flex-col items-center gap-2 rounded border border-border p-3">
            <org-icon name="trash"></org-icon>
            <span class="text-xs text-text-color">trash</span>
          </div>
          <div class="flex flex-col items-center gap-2 rounded border border-border p-3">
            <org-icon name="pencil-simple"></org-icon>
            <span class="text-xs text-text-color">pencil-simple</span>
          </div>
          <div class="flex flex-col items-center gap-2 rounded border border-border p-3">
            <org-icon name="gear"></org-icon>
            <span class="text-xs text-text-color">gear</span>
          </div>
          <div class="flex flex-col items-center gap-2 rounded border border-border p-3">
            <org-icon name="circle-notch"></org-icon>
            <span class="text-xs text-text-color">circle-notch</span>
          </div>
          <div class="flex flex-col items-center gap-2 rounded border border-border p-3">
            <org-icon name="eye"></org-icon>
            <span class="text-xs text-text-color">eye</span>
          </div>
          <div class="flex flex-col items-center gap-2 rounded border border-border p-3">
            <org-icon name="eye-slash"></org-icon>
            <span class="text-xs text-text-color">eye-slash</span>
          </div>
          <div class="flex flex-col items-center gap-2 rounded border border-border p-3">
            <org-icon name="envelope"></org-icon>
            <span class="text-xs text-text-color">envelope</span>
          </div>
          <div class="flex flex-col items-center gap-2 rounded border border-border p-3">
            <org-icon name="lock-key"></org-icon>
            <span class="text-xs text-text-color">lock-key</span>
          </div>
        </div>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>All icons are from the Phosphor Icons library</li>
          <li>Icons are displayed at base size with regular weight</li>
          <li>Each icon can be used with any size and weight combination</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Icon, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

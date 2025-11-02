import type { Meta, StoryObj } from '@storybook/angular';
import { Icon, iconNames, iconColors } from './icon';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';

const meta: Meta<Icon> = {
  title: 'Core/Components/Icon',
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
  - Nine color options: inherit (default), primary, secondary, neutral, safe, info, caution, warning, danger
  - Inline display for easy integration with text
  - Accessible with aria-hidden attribute

  ### Size Options
  - **2xs**: 0.625rem / 10px
  - **xs**: 0.75rem / 12px (text-xs)
  - **small**: 0.875rem / 14px (text-sm)
  - **base**: 1.125rem / 18px (text-lg) - default
  - **large**: 1.25rem / 20px (text-xl)

  ### Weight Options
  - **regular**: Standard icon weight - default
  - **bold**: Thicker icon strokes
  - **fill**: Filled/solid icon style

  ### Color Options
  - **inherit**: Inherits text color from parent elements (default)
  - **primary**: Primary color
  - **secondary**: Secondary accent color
  - **neutral**: Neutral/gray color
  - **safe**: Success/positive state (green)
  - **info**: Informational state (blue)
  - **caution**: Caution state (yellow)
  - **warning**: Warning state (orange)
  - **danger**: Error/danger state (red)

  ### Usage Examples
  \`\`\`html
  <!-- Default icon -->
  <org-icon name="check"></org-icon>

  <!-- Icon with size -->
  <org-icon name="check" size="lg"></org-icon>

  <!-- Icon with weight -->
  <org-icon name="check" weight="bold"></org-icon>

  <!-- Icon with color -->
  <org-icon name="check" color="primary"></org-icon>

  <!-- Icon with custom color (via parent) -->
  <div class="text-blue-500">
    <org-icon name="check"></org-icon>
  </div>

  <!-- Icon with all options -->
  <org-icon name="check" size="lg" weight="fill" color="safe"></org-icon>
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
    color: 'inherit',
  },
  argTypes: {
    name: {
      control: 'select',
      options: iconNames,
      description: 'The name of the icon to display from the Phosphor Icons library',
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'base', 'lg'],
      description: 'The size of the icon',
    },
    weight: {
      control: 'select',
      options: ['regular', 'bold', 'fill'],
      description: 'The weight/style of the icon',
    },
    color: {
      control: 'select',
      options: iconColors,
      description: 'The color of the icon',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default icon with base size, regular weight, and inherit color. Use the controls below to interact with the component.',
      },
    },
  },
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all available size variants (2xs, xs, small, base, large).',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Size Variants"
        currentState="Comparing 2xs, xs, small, base, and large sizes"
      >
        <org-storybook-example-container-section label="Double Extra Small (0.625rem / 10px)">
          <org-icon name="check" size="2xs"></org-icon>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Extra Small (text-xs / 12px)">
          <org-icon name="check" size="xs"></org-icon>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Small (text-sm / 14px)">
          <org-icon name="check" size="sm"></org-icon>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Base (text-lg / 18px) - Default">
          <org-icon name="check" size="base"></org-icon>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Large (text-xl / 20px)">
          <org-icon name="check" size="lg"></org-icon>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>2xs</strong>: 0.625rem / 10px</li>
          <li><strong>xs</strong>: 0.75rem / 12px (text-xs)</li>
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

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
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

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all 9 color variants including inherit (default) and 8 component colors.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Color Variants"
        currentState="Comparing all 9 color options"
      >
        <org-storybook-example-container-section label="Inherit (default)">
          <org-icon name="check" color="inherit"></org-icon>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Primary">
          <org-icon name="check" color="primary"></org-icon>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Secondary">
          <org-icon name="check" color="secondary"></org-icon>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Neutral">
          <org-icon name="check" color="neutral"></org-icon>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Safe">
          <org-icon name="check" color="safe"></org-icon>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Info">
          <org-icon name="check" color="info"></org-icon>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Caution">
          <org-icon name="check" color="caution"></org-icon>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Warning">
          <org-icon name="check" color="warning"></org-icon>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Danger">
          <org-icon name="check" color="danger"></org-icon>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>inherit</strong>: Inherits text color from parent elements (default)</li>
          <li><strong>primary</strong>: Primary color</li>
          <li><strong>secondary</strong>: Secondary accent color</li>
          <li><strong>neutral</strong>: Neutral/gray color</li>
          <li><strong>safe</strong>: Success/positive state (green)</li>
          <li><strong>info</strong>: Informational state (blue)</li>
          <li><strong>caution</strong>: Caution state (yellow)</li>
          <li><strong>warning</strong>: Warning state (orange)</li>
          <li><strong>danger</strong>: Error/danger state (red)</li>
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

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
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
        story:
          'Complete showcase of all available icons from the Phosphor Icons library. Click any icon card to copy its name to the clipboard.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="All Available Icons"
        currentState="Displaying all Phosphor icons - Click to copy icon name"
      >
        <div class="grid grid-cols-12 gap-4">
          @for (iconName of iconNames; track iconName) {
            <button
              type="button"
              class="cursor-pointer flex flex-col items-center gap-2 rounded border border-border p-3 transition-colors hover:bg-background-hover focus-visible:bg-background-hover"
              (click)="copyToClipboard(iconName)"
            >
              <org-icon [name]="iconName"></org-icon>
              <span class="text-xs text-text-color">{{ iconName }}</span>
            </button>
          }
        </div>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li>All icons are from the Phosphor Icons library</li>
          <li>Icons are displayed at base size with regular weight</li>
          <li>Each icon can be used with any size and weight combination</li>
          <li>Click any icon card to copy its name to the clipboard</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Icon, StorybookExampleContainer, StorybookExampleContainerSection],
    },
    applicationConfig: {
      providers: [],
    },
    props: {
      iconNames,
      copyToClipboard: async (iconName: string) => {
        try {
          await navigator.clipboard.writeText(iconName);
        } catch (error) {
          console.error('Failed to copy to clipboard:', error);
        }
      },
    },
  }),
};

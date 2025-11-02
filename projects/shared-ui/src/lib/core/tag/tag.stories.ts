import type { Meta, StoryObj } from '@storybook/angular';
import { Tag, tagVariants, type TagSize } from './tag';
import { iconNames } from '../icon/icon';
import { componentColors } from '../types/component-types';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';

const tagSizes: TagSize[] = ['xs', 'sm', 'base'];

const meta: Meta<Tag> = {
  title: 'Core/Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Tag Component

  A flexible tag/badge component with multiple color schemes, variants, icons, and removable functionality.

  ### Features
  - Three size options: xs, sm (default), and base
  - Two visual variants: weak (default) and strong
  - Eight color options: primary, secondary, neutral, safe, info, caution, warning, danger
  - Optional pre and post icons
  - Removable functionality with X icon
  - Clickable icon support
  - Compact, inline display

  ### Variants
  - **weak**: Subtle background with colored text (default)
  - **strong**: Solid colored background with contrasting text

  ### Color Options
  - **primary**: Primary primary color
  - **secondary**: Secondary accent color
  - **neutral**: Neutral/gray color
  - **safe**: Success/positive state (green)
  - **info**: Informational state (blue)
  - **caution**: Caution state (yellow)
  - **warning**: Warning state (orange)
  - **danger**: Error/danger state (red)

  ### Usage Examples
  \`\`\`html
  <!-- Basic tag -->
  <org-tag color="primary">Tag Content</org-tag>

  <!-- Tag with variant -->
  <org-tag color="primary" variant="strong">Strong Tag</org-tag>

  <!-- Tag with icons -->
  <org-tag color="info" preIcon="gear">Settings</org-tag>
  <org-tag color="safe" postIcon="check">Completed</org-tag>

  <!-- Removable tag -->
  <org-tag color="neutral" [removable]="true" (removed)="onRemove()">
    Removable Tag
  </org-tag>

  <!-- Tag with both icons -->
  <org-tag color="primary" preIcon="gear" postIcon="arrow-right">
    Action Tag
  </org-tag>
</div>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<Tag>;

export const Default: Story = {
  args: {
    color: 'primary',
    size: 'sm',
    variant: 'weak',
    preIcon: null,
    postIcon: null,
    removable: false,
  },
  argTypes: {
    color: {
      control: 'select',
      options: componentColors,
      description: 'The color variant of the tag',
    },
    size: {
      control: 'select',
      options: tagSizes,
      description: 'The size of the tag',
    },
    variant: {
      control: 'select',
      options: tagVariants,
      description: 'The visual variant of the tag',
    },
    preIcon: {
      control: 'select',
      options: [null, ...iconNames],
      description: 'Icon to display before the tag text',
    },
    postIcon: {
      control: 'select',
      options: [null, ...iconNames],
      description: 'Icon to display after the tag text',
    },
    removable: {
      control: 'boolean',
      description: 'Whether the tag can be removed (shows X icon)',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default tag with primary color and weak variant. Use the controls below to interact with the component.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <org-tag
        [color]="color"
        [size]="size"
        [variant]="variant"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [removable]="removable"
      >
        Tag Content
      </org-tag>
    `,
    moduleMetadata: {
      imports: [Tag],
    },
  }),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all three size options: xs, sm (default), and base.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Size Variants"
        currentState="Comparing all three size options"
      >
        <org-storybook-example-container-section label="Extra Small (xs)">
          <org-tag color="primary" size="xs">Extra Small</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Small (sm) - Default">
          <org-tag color="primary" size="sm">Small</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Base">
          <org-tag color="primary" size="base">Base</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Icons - xs">
          <org-tag color="info" size="xs" preIcon="gear" postIcon="arrow-right">Extra Small</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Icons - sm">
          <org-tag color="info" size="sm" preIcon="gear" postIcon="arrow-right">Small</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Icons - base">
          <org-tag color="info" size="base" preIcon="gear" postIcon="arrow-right">Base</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Removable - Different Sizes">
          <div class="flex flex-wrap items-center gap-2">
            <org-tag color="safe" size="xs" [removable]="true">xs</org-tag>
            <org-tag color="safe" size="sm" [removable]="true">sm</org-tag>
            <org-tag color="safe" size="base" [removable]="true">base</org-tag>
          </div>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>xs</strong>: Extra small size with reduced padding and text</li>
          <li><strong>sm</strong>: Small size (default)</li>
          <li><strong>base</strong>: Base size with larger padding and text</li>
          <li>Icon sizes scale proportionally with tag size</li>
          <li>All sizes work with all variants and colors</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Tag, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all 8 color variants with weak variant.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Color Variants (Weak)"
        currentState="Comparing all 8 color options with weak variant"
      >
        <div>
          <org-storybook-example-container-section label="Primary">
            <org-tag color="primary">Primary</org-tag>
          </org-storybook-example-container-section>

          <org-storybook-example-container-section label="Secondary">
            <org-tag color="secondary">Secondary</org-tag>
          </org-storybook-example-container-section>

          <org-storybook-example-container-section label="Neutral">
            <org-tag color="neutral">Neutral</org-tag>
          </org-storybook-example-container-section>

          <org-storybook-example-container-section label="Safe">
            <org-tag color="safe">Safe</org-tag>
          </org-storybook-example-container-section>

          <org-storybook-example-container-section label="Info">
            <org-tag color="info">Info</org-tag>
          </org-storybook-example-container-section>

          <org-storybook-example-container-section label="Caution">
            <org-tag color="caution">Caution</org-tag>
          </org-storybook-example-container-section>

          <org-storybook-example-container-section label="Warning">
            <org-tag color="warning">Warning</org-tag>
          </org-storybook-example-container-section>

          <org-storybook-example-container-section label="Danger">
            <org-tag color="danger">Danger</org-tag>
          </org-storybook-example-container-section>
        </div>

        <div>
          <org-storybook-example-container-section label="Primary">
            <org-tag color="primary" variant="strong">Primary</org-tag>
          </org-storybook-example-container-section>

          <org-storybook-example-container-section label="Secondary">
            <org-tag color="secondary" variant="strong">Secondary</org-tag>
          </org-storybook-example-container-section>

          <org-storybook-example-container-section label="Neutral">
            <org-tag color="neutral" variant="strong">Neutral</org-tag>
          </org-storybook-example-container-section>

          <org-storybook-example-container-section label="Safe">
            <org-tag color="safe" variant="strong">Safe</org-tag>
          </org-storybook-example-container-section>

          <org-storybook-example-container-section label="Info">
            <org-tag color="info" variant="strong">Info</org-tag>
          </org-storybook-example-container-section>

          <org-storybook-example-container-section label="Caution">
            <org-tag color="caution" variant="strong">Caution</org-tag>
          </org-storybook-example-container-section>

          <org-storybook-example-container-section label="Warning">
            <org-tag color="warning" variant="strong">Warning</org-tag>
          </org-storybook-example-container-section>

          <org-storybook-example-container-section label="Danger">
            <org-tag color="danger" variant="strong">Danger</org-tag>
          </org-storybook-example-container-section>
        </div>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>primary</strong>: Primary primary color</li>
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
      imports: [Tag, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of weak and strong variants across different colors.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Variant Comparison"
        currentState="Comparing weak and strong variants"
      >
        <org-storybook-example-container-section label="Primary - Weak (default)">
          <org-tag color="primary" variant="weak">Primary Weak</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Primary - Strong">
          <org-tag color="primary" variant="strong">Primary Strong</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Safe - Weak">
          <org-tag color="safe" variant="weak">Safe Weak</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Safe - Strong">
          <org-tag color="safe" variant="strong">Safe Strong</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Danger - Weak">
          <org-tag color="danger" variant="weak">Danger Weak</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Danger - Strong">
          <org-tag color="danger" variant="strong">Danger Strong</org-tag>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>weak</strong>: Subtle background with colored text (default)</li>
          <li><strong>strong</strong>: Solid colored background with contrasting text</li>
          <li>Both variants work with all color options</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Tag, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tags with pre icons, post icons, or both.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Icon Variations"
        currentState="Comparing tags with different icon configurations"
      >
        <org-storybook-example-container-section label="No icons">
          <org-tag color="primary">No Icons</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Pre icon only">
          <org-tag color="info" preIcon="gear">Settings</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Post icon only">
          <org-tag color="safe" postIcon="check">Completed</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Both icons">
          <org-tag color="primary" preIcon="gear" postIcon="arrow-right">Action</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Strong variant with icons">
          <org-tag color="danger" variant="strong" preIcon="trash" postIcon="x">Delete</org-tag>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>preIcon</strong>: Icon displayed before the tag text</li>
          <li><strong>postIcon</strong>: Icon displayed after the tag text</li>
          <li>Both icons can be used simultaneously</li>
          <li>Icons work with all variants and colors</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Tag, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const Removable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tags with removable functionality that shows an X icon.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Removable Tags"
        currentState="Tags with remove functionality"
      >
        <org-storybook-example-container-section label="Not removable">
          <org-tag color="primary">Fixed Tag</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Removable (weak)">
          <org-tag color="primary" [removable]="true">Removable Tag</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Removable (strong)">
          <org-tag color="safe" variant="strong" [removable]="true">Removable Strong</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Removable with pre icon">
          <org-tag color="info" preIcon="gear" [removable]="true">Settings Tag</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Multiple removable tags">
          <div class="flex flex-wrap gap-2">
            <org-tag color="primary" [removable]="true">React</org-tag>
            <org-tag color="info" [removable]="true">Angular</org-tag>
            <org-tag color="safe" [removable]="true">Vue</org-tag>
            <org-tag color="caution" [removable]="true">Svelte</org-tag>
          </div>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li>When <strong>removable</strong> is true, an X icon appears on the right</li>
          <li>Clicking the X icon emits the <strong>removed</strong> event</li>
          <li>The removable X icon overrides any postIcon setting</li>
          <li>Works with all variants and colors</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Tag, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const StrongVariantColors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all 8 color variants with strong variant.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Color Variants (Strong)"
        currentState="Comparing all 8 color options with strong variant"
      >
        <org-storybook-example-container-section label="Primary">
          <org-tag color="primary" variant="strong">Primary</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Secondary">
          <org-tag color="secondary" variant="strong">Secondary</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Neutral">
          <org-tag color="neutral" variant="strong">Neutral</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Safe">
          <org-tag color="safe" variant="strong">Safe</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Info">
          <org-tag color="info" variant="strong">Info</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Caution">
          <org-tag color="caution" variant="strong">Caution</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Warning">
          <org-tag color="warning" variant="strong">Warning</org-tag>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Danger">
          <org-tag color="danger" variant="strong">Danger</org-tag>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li>Strong variant provides solid colored backgrounds</li>
          <li>Text color automatically adjusts for contrast</li>
          <li>More prominent than weak variant</li>
          <li>Useful for highlighting important tags</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Tag, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

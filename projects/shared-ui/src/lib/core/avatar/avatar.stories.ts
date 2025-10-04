import type { Meta, StoryObj } from '@storybook/angular';
import { Avatar } from './avatar';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';

const meta: Meta<Avatar> = {
  title: 'Core/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Avatar Component

  A flexible avatar component that displays user images, initials, or Gravatar images with optional labels.

  ### Features
  - 3 size variants (sm, base, lg)
  - Automatic initials generation from names
  - Custom image support
  - Gravatar integration via email
  - Optional label and sub-label
  - Automatic fallback to initials on image load error
  - Flexible layout options

  ### Size Options
  - **sm**: Small avatar (24px)
  - **base**: Standard avatar size (32px) - default
  - **lg**: Large avatar (40px)

  ### Image Priority
  1. Custom image URL (via \`src\`)
  2. Gravatar (via \`email\`)
  3. Initials (generated from \`label\`)

  ### Initials Generation
  - Single word: First 2 letters (e.g., "John" → "JO")
  - Multiple words: First letter of first word + first letter of last word (e.g., "John Doe" → "JD")

  ### Usage Examples
  \`\`\`html
  <!-- Avatar with initials -->
  <org-avatar label="John Doe"></org-avatar>

  <!-- Avatar with custom image -->
  <org-avatar label="John Doe" src="path/to/image.jpg"></org-avatar>

  <!-- Avatar with Gravatar -->
  <org-avatar label="John Doe" email="test1@example.com"></org-avatar>

  <!-- Avatar with labels -->
  <org-avatar label="John Doe" subLabel="Software Engineer"></org-avatar>

  <!-- Avatar with image and labels -->
  <org-avatar
    label="John Doe"
    subLabel="Software Engineer"
    src="path/to/image.jpg"
  ></org-avatar>

  <!-- Large avatar without label display -->
  <org-avatar label="John Doe" size="lg" [showLabel]="false"></org-avatar>
</div>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<Avatar>;

export const Default: Story = {
  args: {
    label: 'John Doe',
    subLabel: null,
    size: 'base',
    email: null,
    src: null,
    circleClass: '',
    showLabel: true,
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The name/label for the avatar',
    },
    subLabel: {
      control: 'text',
      description: 'Optional secondary label below the main label',
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
      description: 'The size of the avatar',
    },
    email: {
      control: 'text',
      description: 'Email address for Gravatar lookup',
    },
    src: {
      control: 'text',
      description: 'Custom image URL (overrides Gravatar)',
    },
    circleClass: {
      control: 'text',
      description: 'Additional CSS classes for the avatar circle',
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to display the label text',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default avatar configuration with label and initials. Use the controls below to interact with the component.',
      },
    },
  },
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all available size variants (sm, base, lg).',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Size Variants"
        currentState="Comparing sm, base, and lg sizes"
      >
        <org-storybook-example-container-section label="Small (sm)">
          <org-avatar label="John Doe" size="sm"></org-avatar>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Base (default)">
          <org-avatar label="John Doe" size="base"></org-avatar>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Large (lg)">
          <org-avatar label="John Doe" size="lg"></org-avatar>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>sm</strong>: Small avatar (24px)</li>
          <li><strong>base</strong>: Standard avatar size (32px) - default</li>
          <li><strong>lg</strong>: Large avatar (40px)</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Avatar, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const ImageTypes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different image types: initials, Gravatar, and custom images.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Image Types"
        currentState="Comparing initials, Gravatar, and custom images"
      >
        <org-storybook-example-container-section label="With Initials">
          <org-avatar label="John Doe"></org-avatar>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Gravatar">
          <org-avatar label="John Doe" email="test1@example.com"></org-avatar>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Custom Image">
          <org-avatar label="John Doe" src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"></org-avatar>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Initials</strong>: Automatically generated from label (first and last name)</li>
          <li><strong>Gravatar</strong>: Fetched from Gravatar service using email</li>
          <li><strong>Custom Image</strong>: Uses provided image URL (takes priority)</li>
          <li>Falls back to initials if image fails to load</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Avatar, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const LabelVariations: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different label configurations: with labels, with sub-labels, and without labels.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Label Variations"
        currentState="Comparing different label configurations"
      >
        <org-storybook-example-container-section label="With Label Only">
          <org-avatar label="John Doe"></org-avatar>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Label and Sub-label">
          <org-avatar label="John Doe" subLabel="Software Engineer"></org-avatar>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Without Labels (Avatar Only)">
          <org-avatar label="John Doe" [showLabel]="false"></org-avatar>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Label Only</strong>: Displays name next to avatar</li>
          <li><strong>Label and Sub-label</strong>: Displays name and additional info (e.g., title, email)</li>
          <li><strong>Avatar Only</strong>: Shows only the avatar circle without text</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Avatar, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const InitialsGeneration: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of how initials are generated from different name formats.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Initials Generation"
        currentState="Comparing single name, two names, and multiple names"
      >
        <org-storybook-example-container-section label="Single Name">
          <org-avatar label="John"></org-avatar>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Two Names">
          <org-avatar label="John Doe"></org-avatar>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Multiple Names">
          <org-avatar label="John Michael Doe"></org-avatar>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Single Name</strong>: Shows first 2 letters (e.g., "John" → "JO")</li>
          <li><strong>Two Names</strong>: Shows first letter of each word (e.g., "John Doe" → "JD")</li>
          <li><strong>Multiple Names</strong>: Shows first letter of first and last word (e.g., "John Michael Doe" → "JD")</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Avatar, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const ErrorHandling: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of fallback behavior when images fail to load.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Error Handling & Fallbacks"
        currentState="Testing image load failures"
      >
        <org-storybook-example-container-section label="Invalid Image URL">
          <org-avatar label="John Doe" src="https://invalid-url.com/image.jpg"></org-avatar>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Invalid Gravatar Email">
          <org-avatar label="John Doe" email="nonexistent@example.com"></org-avatar>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Successful Image">
          <org-avatar label="John Doe" src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"></org-avatar>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Invalid Image URL</strong>: Falls back to initials when image fails to load</li>
          <li><strong>Invalid Gravatar</strong>: Falls back to initials when Gravatar not found</li>
          <li><strong>Successful Image</strong>: Displays image when successfully loaded</li>
          <li>Fallback is seamless and automatic</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Avatar, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

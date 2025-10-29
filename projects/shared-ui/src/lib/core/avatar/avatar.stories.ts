import type { Meta, StoryObj } from '@storybook/angular';
import { Avatar } from './avatar';
import { AvatarStack } from './avatar-stack';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';

const meta: Meta<Avatar> = {
  title: 'Core/Components/Avatar',
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

---

  ## Avatar Stack Component

  A component that displays multiple avatars in a horizontal stack with overlapping effect.

  ### Features
  - Stacks child elements (typically avatars) horizontally with overlapping
  - Supports three size variants: sm, base, lg
  - Can be disabled by setting size to \`null\`
  - Defaults to "base" size when no value is provided
  - Uses flexbox with negative spacing for overlap effect
  - Avatars should use \`circleClass="border-2 border-background"\` for proper visual separation

  ### Size Variants
  - **sm**: Small overlap
  - **base**: Base overlap (default)
  - **lg**: Large overlap
  - **null**: Disabled - no overlap styling applied

  ### Usage Examples
  \`\`\`html
  <!-- Default (base size) -->
  <org-avatar-stack>
    <org-avatar label="User 1" [showLabel]="false" circleClass="border-2 border-background" />
    <org-avatar label="User 2" [showLabel]="false" circleClass="border-2 border-background" />
    <org-avatar label="User 3" [showLabel]="false" circleClass="border-2 border-background" />
  </org-avatar-stack>

  <!-- Explicit size -->
  <org-avatar-stack size="sm">
    <org-avatar label="User 1" [showLabel]="false" circleClass="border-2 border-background" />
    <org-avatar label="User 2" [showLabel]="false" circleClass="border-2 border-background" />
  </org-avatar-stack>

  <!-- With images -->
  <org-avatar-stack size="lg">
    <org-avatar label="User 1" src="image1.jpg" [showLabel]="false" circleClass="border-2 border-background" />
    <org-avatar label="User 2" src="image2.jpg" [showLabel]="false" circleClass="border-2 border-background" />
  </org-avatar-stack>

  <!-- Disabled -->
  <org-avatar-stack [size]="null">
    <org-avatar label="User 1" [showLabel]="false" />
    <org-avatar label="User 2" [showLabel]="false" />
  </org-avatar-stack>
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

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
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

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
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

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
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

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
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

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
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

type StackStory = StoryObj<AvatarStack>;

export const StackDefault: StackStory = {
  args: {
    size: 'base',
    class: '',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
      description: 'The size of the avatar stack',
    },
    class: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default avatar stack with base size. Use the controls below to interact with the component. Note: This story uses projected content (avatars), so only the size and class properties are interactive.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <org-avatar-stack [size]="size" [class]="class">
        <org-avatar label="John Doe" [showLabel]="false" circleClass="border-2 border-background" />
        <org-avatar label="Jane Smith" [showLabel]="false" circleClass="border-2 border-background" />
        <org-avatar label="Bob Johnson" [showLabel]="false" circleClass="border-2 border-background" />
        <org-avatar label="Alice Williams" [showLabel]="false" circleClass="border-2 border-background" />
      </org-avatar-stack>
    `,
    moduleMetadata: {
      imports: [AvatarStack, Avatar],
    },
  }),
};

export const StackSizes: StackStory = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all available size variants (sm, base, lg) side by side.',
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
          <org-avatar-stack size="sm">
            <org-avatar label="User 1" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="User 2" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="User 3" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="User 4" [showLabel]="false" circleClass="border-2 border-background" />
          </org-avatar-stack>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Base (default)">
          <org-avatar-stack size="base">
            <org-avatar label="User 1" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="User 2" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="User 3" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="User 4" [showLabel]="false" circleClass="border-2 border-background" />
          </org-avatar-stack>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Large (lg)">
          <org-avatar-stack size="lg">
            <org-avatar label="User 1" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="User 2" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="User 3" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="User 4" [showLabel]="false" circleClass="border-2 border-background" />
          </org-avatar-stack>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>sm</strong>: Minimal overlap for compact display</li>
          <li><strong>base</strong>: Standard overlap for balanced appearance (default)</li>
          <li><strong>lg</strong>: Maximum overlap for space-efficient display</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [AvatarStack, Avatar, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const StackAvatarTypes: StackStory = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of avatar stacks with different avatar types: initials, Gravatar, and custom images.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Avatar Types"
        currentState="Comparing initials, Gravatar, and custom images"
      >
        <org-storybook-example-container-section label="With Initials">
          <org-avatar-stack>
            <org-avatar label="John Doe" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="Jane Smith" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="Bob Johnson" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="Alice Williams" [showLabel]="false" circleClass="border-2 border-background" />
          </org-avatar-stack>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Gravatar">
          <org-avatar-stack>
            <org-avatar label="User 1" email="test1@example.com" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="User 2" email="test2@example.com" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="User 3" email="user3@example.com" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="User 4" email="test3@example.com" [showLabel]="false" circleClass="border-2 border-background" />
          </org-avatar-stack>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Custom Images">
          <org-avatar-stack>
            <org-avatar
              label="John Doe"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
              [showLabel]="false"
              circleClass="border-2 border-background"
            />
            <org-avatar
              label="Jane Smith"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
              [showLabel]="false"
              circleClass="border-2 border-background"
            />
            <org-avatar
              label="Bob Johnson"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bob"
              [showLabel]="false"
              circleClass="border-2 border-background"
            />
            <org-avatar
              label="Alice Williams"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice"
              [showLabel]="false"
              circleClass="border-2 border-background"
            />
          </org-avatar-stack>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Initials</strong>: Avatars display with generated initials from labels</li>
          <li><strong>Gravatar</strong>: Avatars display with Gravatar images based on email</li>
          <li><strong>Custom Images</strong>: Avatars display with provided custom image sources</li>
          <li>Border styling provides visual separation between overlapping avatars</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [AvatarStack, Avatar, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const StackLabelVariations: StackStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Comparison of avatar stacks with different label variations: single name, interactive, and multiple word names.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Label Variations"
        currentState="Comparing single name, interactive, and multiple word names"
      >
        <org-storybook-example-container-section label="Single Name">
          <org-avatar-stack>
            <org-avatar label="John" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="Jane" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="Bob" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="Alice" [showLabel]="false" circleClass="border-2 border-background" />
          </org-avatar-stack>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Interactive (many avatars)">
          <org-avatar-stack>
            <org-avatar label="User 1" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="User 2" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="User 3" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="User 4" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="User 5" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="User 6" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="User 7" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="User 8" [showLabel]="false" circleClass="border-2 border-background" />
          </org-avatar-stack>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Multiple Word Names">
          <org-avatar-stack>
            <org-avatar label="John Doe" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="Jane Smith" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="Bob Johnson" [showLabel]="false" circleClass="border-2 border-background" />
            <org-avatar label="Alice Williams" [showLabel]="false" circleClass="border-2 border-background" />
          </org-avatar-stack>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Single Name</strong>: Avatars display with single initial from one-word labels</li>
          <li><strong>Interactive</strong>: Component scales well with many avatars maintaining consistent spacing</li>
          <li><strong>Multiple Word Names</strong>: Avatars display with initials from multi-word labels</li>
          <li>Overlap effect maintains visual hierarchy regardless of label complexity</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [AvatarStack, Avatar, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

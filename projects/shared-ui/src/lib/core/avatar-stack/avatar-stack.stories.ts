import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarStack } from './avatar-stack';
import { Avatar } from '../avatar/avatar';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';

const meta: Meta<AvatarStack> = {
  title: 'Core/Avatar Stack',
  component: AvatarStack,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
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
</div>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<AvatarStack>;

export const Default: Story = {
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

export const Sizes: Story = {
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

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
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

export const AvatarTypes: Story = {
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

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
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

export const LabelVariations: Story = {
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

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
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

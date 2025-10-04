import type { Meta, StoryObj } from '@storybook/angular';
import { Avatar, avatarSizes } from './avatar';

const meta: Meta<Avatar> = {
  title: 'Core/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: avatarSizes,
    },
    label: {
      control: 'text',
    },
    subLabel: {
      control: 'text',
    },
    email: {
      control: 'text',
    },
    src: {
      control: 'text',
    },
  },
  args: {
    size: 'base',
    label: null,
    subLabel: null,
    email: null,
    src: null,
  },
};

export default meta;
type Story = StoryObj<Avatar>;

// Basic avatar with initials
export const WithInitials: Story = {
  args: {
    label: 'John Doe',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-avatar [label]="label" [subLabel]="subLabel" [size]="size" [email]="email" [src]="src"></org-avatar>',
  }),
};

// Avatar with gravatar
export const WithGravatar: Story = {
  args: {
    label: 'John Doe',
    email: 'test@gravatar.com',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-avatar [label]="label" [subLabel]="subLabel" [size]="size" [email]="email" [src]="src"></org-avatar>',
  }),
};

// Avatar with custom image
export const WithCustomImage: Story = {
  args: {
    label: 'John Doe',
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-avatar [label]="label" [subLabel]="subLabel" [size]="size" [email]="email" [src]="src"></org-avatar>',
  }),
};

// Avatar with label and sublabel
export const WithLabels: Story = {
  args: {
    label: 'John Doe',
    subLabel: 'Software Engineer',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-avatar [label]="label" [subLabel]="subLabel" [size]="size" [email]="email" [src]="src"></org-avatar>',
  }),
};

// Avatar with image and labels
export const WithImageAndLabels: Story = {
  args: {
    label: 'John Doe',
    subLabel: 'Software Engineer',
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-avatar [label]="label" [subLabel]="subLabel" [size]="size" [email]="email" [src]="src"></org-avatar>',
  }),
};

// Size variants
export const SmallSize: Story = {
  args: {
    label: 'John Doe',
    size: 'sm',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-avatar [label]="label" [subLabel]="subLabel" [size]="size" [email]="email" [src]="src"></org-avatar>',
  }),
};

export const BaseSize: Story = {
  args: {
    label: 'John Doe',
    size: 'base',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-avatar [label]="label" [subLabel]="subLabel" [size]="size" [email]="email" [src]="src"></org-avatar>',
  }),
};

export const LargeSize: Story = {
  args: {
    label: 'John Doe',
    size: 'lg',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-avatar [label]="label" [subLabel]="subLabel" [size]="size" [email]="email" [src]="src"></org-avatar>',
  }),
};

// Single letter initials
export const SingleName: Story = {
  args: {
    label: 'John',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-avatar [label]="label" [subLabel]="subLabel" [size]="size" [email]="email" [src]="src"></org-avatar>',
  }),
};

// Multiple word initials
export const MultipleWordName: Story = {
  args: {
    label: 'John Michael Doe',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-avatar [label]="label" [subLabel]="subLabel" [size]="size" [email]="email" [src]="src"></org-avatar>',
  }),
};

// Avatar only (no labels)
export const AvatarOnly: Story = {
  args: {
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-avatar [label]="label" [subLabel]="subLabel" [size]="size" [email]="email" [src]="src"></org-avatar>',
  }),
};

// Fallback behavior (invalid gravatar)
export const GravatarFallback: Story = {
  args: {
    label: 'No Avatar',
    email: 'nonexistent@example.com',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-avatar [label]="label" [subLabel]="subLabel" [size]="size" [email]="email" [src]="src"></org-avatar>',
  }),
};

// Image load error fallback
export const ImageLoadError: Story = {
  args: {
    label: 'John Doe',
    src: 'https://invalid-url-that-will-fail.com/nonexistent-image.jpg',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-avatar [label]="label" [subLabel]="subLabel" [size]="size" [email]="email" [src]="src"></org-avatar>',
  }),
};

// Comprehensive showcase
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-8 p-4">
        <div class="flex flex-col gap-2">
          <h3 class="text-lg font-semibold">Sizes</h3>
          <div class="flex items-center gap-4">
            <org-avatar label="John Doe" size="sm"></org-avatar>
            <org-avatar label="John Doe" size="base"></org-avatar>
            <org-avatar label="John Doe" size="lg"></org-avatar>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="text-lg font-semibold">With Initials</h3>
          <div class="flex items-center gap-4">
            <org-avatar label="John Doe" size="sm"></org-avatar>
            <org-avatar label="Jane Smith" size="base"></org-avatar>
            <org-avatar label="Bob Johnson" size="lg"></org-avatar>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="text-lg font-semibold">With Images</h3>
          <div class="flex items-center gap-4">
            <org-avatar
              label="John Doe"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
              size="sm"
            ></org-avatar>
            <org-avatar
              label="Jane Smith"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
              size="base"
            ></org-avatar>
            <org-avatar
              label="Bob Johnson"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bob"
              size="lg"
            ></org-avatar>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="text-lg font-semibold">With Labels</h3>
          <div class="flex flex-col gap-3">
            <org-avatar
              label="John Doe"
              subLabel="Software Engineer"
              size="sm"
            ></org-avatar>
            <org-avatar
              label="Jane Smith"
              subLabel="Product Manager"
              size="base"
            ></org-avatar>
            <org-avatar
              label="Bob Johnson"
              subLabel="UI/UX Designer"
              size="lg"
            ></org-avatar>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="text-lg font-semibold">With Images and Labels</h3>
          <div class="flex flex-col gap-3">
            <org-avatar
              label="John Doe"
              subLabel="Software Engineer"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
              size="sm"
            ></org-avatar>
            <org-avatar
              label="Jane Smith"
              subLabel="Product Manager"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
              size="base"
            ></org-avatar>
            <org-avatar
              label="Bob Johnson"
              subLabel="UI/UX Designer"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bob"
              size="lg"
            ></org-avatar>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="text-lg font-semibold">Initials Variations</h3>
          <div class="flex items-center gap-4">
            <org-avatar label="John"></org-avatar>
            <org-avatar label="John Doe"></org-avatar>
            <org-avatar label="John Michael Doe"></org-avatar>
            <org-avatar label="A B C D"></org-avatar>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="text-lg font-semibold">User List Example</h3>
          <div class="flex flex-col gap-2">
            <org-avatar
              label="Alice Anderson"
              subLabel="alice@example.com"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice"
            ></org-avatar>
            <org-avatar
              label="Bob Brown"
              subLabel="bob@example.com"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bob"
            ></org-avatar>
            <org-avatar
              label="Carol Clark"
              subLabel="carol@example.com"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Carol"
            ></org-avatar>
            <org-avatar
              label="David Davis"
              subLabel="david@example.com"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=David"
            ></org-avatar>
          </div>
        </div>
      </div>
    `,
  }),
};

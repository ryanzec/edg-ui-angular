import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';
import { iconNames } from '../icon/icon';
import { componentColors } from '../component-color-directive/component-color-directive';

const meta: Meta<Button> = {
  title: 'Core/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orgColor: {
      control: 'select',
      options: componentColors,
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    preIcon: {
      control: 'select',
      options: [null, ...iconNames],
    },
    postIcon: {
      control: 'select',
      options: [null, ...iconNames],
    },
    icon: {
      control: 'select',
      options: [null, ...iconNames],
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
  },
  args: {
    orgColor: 'primary',
    size: 'base',
    type: 'button',
    disabled: false,
    loading: false,
    preIcon: null,
    postIcon: null,
    icon: null,
  },
};

export default meta;
type Story = StoryObj<Button>;

// Basic button variants
export const Primary: Story = {
  args: {
    orgColor: 'primary',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-button [orgColor]="orgColor" [size]="size" [disabled]="disabled" [loading]="loading" [preIcon]="preIcon" [postIcon]="postIcon" [type]="type">Primary Button</org-button>',
  }),
};

export const Secondary: Story = {
  args: {
    orgColor: 'secondary',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-button [orgColor]="orgColor" [size]="size" [disabled]="disabled" [loading]="loading" [preIcon]="preIcon" [postIcon]="postIcon" [type]="type">Secondary Button</org-button>',
  }),
};

export const Neutral: Story = {
  args: {
    orgColor: 'neutral',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-button [orgColor]="orgColor" [size]="size" [disabled]="disabled" [loading]="loading" [preIcon]="preIcon" [postIcon]="postIcon" [type]="type">Neutral Button</org-button>',
  }),
};

export const Safe: Story = {
  args: {
    orgColor: 'safe',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-button [orgColor]="orgColor" [size]="size" [disabled]="disabled" [loading]="loading" [preIcon]="preIcon" [postIcon]="postIcon" [type]="type">Safe Button</org-button>',
  }),
};

export const Info: Story = {
  args: {
    orgColor: 'info',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-button [orgColor]="orgColor" [size]="size" [disabled]="disabled" [loading]="loading" [preIcon]="preIcon" [postIcon]="postIcon" [type]="type">Info Button</org-button>',
  }),
};

export const Caution: Story = {
  args: {
    orgColor: 'caution',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-button [orgColor]="orgColor" [size]="size" [disabled]="disabled" [loading]="loading" [preIcon]="preIcon" [postIcon]="postIcon" [type]="type">Caution Button</org-button>',
  }),
};

export const Warning: Story = {
  args: {
    orgColor: 'warning',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-button [orgColor]="orgColor" [size]="size" [disabled]="disabled" [loading]="loading" [preIcon]="preIcon" [postIcon]="postIcon" [type]="type">Warning Button</org-button>',
  }),
};

export const Danger: Story = {
  args: {
    orgColor: 'danger',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-button [orgColor]="orgColor" [size]="size" [disabled]="disabled" [loading]="loading" [preIcon]="preIcon" [postIcon]="postIcon" [type]="type">Danger Button</org-button>',
  }),
};

// Size variants
export const Small: Story = {
  args: {
    size: 'small',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-button [orgColor]="orgColor" [size]="size" [disabled]="disabled" [loading]="loading" [preIcon]="preIcon" [postIcon]="postIcon" [type]="type">Small Button</org-button>',
  }),
};

export const Base: Story = {
  args: {
    size: 'base',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-button [orgColor]="orgColor" [size]="size" [disabled]="disabled" [loading]="loading" [preIcon]="preIcon" [postIcon]="postIcon" [type]="type">Base Button</org-button>',
  }),
};

export const Large: Story = {
  args: {
    size: 'large',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-button [orgColor]="orgColor" [size]="size" [disabled]="disabled" [loading]="loading" [preIcon]="preIcon" [postIcon]="postIcon" [type]="type">Large Button</org-button>',
  }),
};

// Icon variants
export const WithPreIcon: Story = {
  args: {
    preIcon: 'plus',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-button [orgColor]="orgColor" [size]="size" [disabled]="disabled" [loading]="loading" [preIcon]="preIcon" [postIcon]="postIcon" [type]="type">Add Item</org-button>',
  }),
};

export const WithPostIcon: Story = {
  args: {
    postIcon: 'arrow-right',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-button [orgColor]="orgColor" [size]="size" [disabled]="disabled" [loading]="loading" [preIcon]="preIcon" [postIcon]="postIcon" [type]="type">Continue</org-button>',
  }),
};

export const WithBothIcons: Story = {
  args: {
    preIcon: 'download-simple',
    postIcon: 'arrow-right',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-button [orgColor]="orgColor" [size]="size" [disabled]="disabled" [loading]="loading" [preIcon]="preIcon" [postIcon]="postIcon" [type]="type">Download</org-button>',
  }),
};

export const IconOnly: Story = {
  args: {
    icon: 'gear',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-button [orgColor]="orgColor" [size]="size" [disabled]="disabled" [loading]="loading" [icon]="icon" [type]="type"></org-button>',
  }),
};

// State variants
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template:
      '<org-button [orgColor]="orgColor" [size]="size" [disabled]="disabled" [loading]="loading" [preIcon]="preIcon" [postIcon]="postIcon" [type]="type">Disabled Button</org-button>',
  }),
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  render: (args) => ({
    props: args,
    template:
      '<org-button [orgColor]="orgColor" [size]="size" [disabled]="disabled" [loading]="loading" [preIcon]="preIcon" [postIcon]="postIcon" [type]="type">Loading Button</org-button>',
  }),
};

export const LoadingWithIcon: Story = {
  args: {
    loading: true,
    preIcon: 'upload-simple',
  },
  render: (args) => ({
    props: args,
    template:
      '<org-button [orgColor]="orgColor" [size]="size" [disabled]="disabled" [loading]="loading" [preIcon]="preIcon" [postIcon]="postIcon" [type]="type">Uploading...</org-button>',
  }),
};

// Comprehensive showcase
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Color Variants</h3>
          <div class="flex flex-wrap gap-2">
            <org-button orgColor="primary">Primary</org-button>
            <org-button orgColor="secondary">Secondary</org-button>
            <org-button orgColor="neutral">Neutral</org-button>
            <org-button orgColor="safe">Safe</org-button>
            <org-button orgColor="info">Info</org-button>
            <org-button orgColor="caution">Caution</org-button>
            <org-button orgColor="warning">Warning</org-button>
            <org-button orgColor="danger">Danger</org-button>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Sizes</h3>
          <div class="flex items-center gap-2">
            <org-button orgColor="primary" size="small">Small</org-button>
            <org-button orgColor="primary" size="base">Base</org-button>
            <org-button orgColor="primary" size="large">Large</org-button>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">With Icons</h3>
          <div class="flex flex-wrap gap-2">
            <org-button orgColor="primary" preIcon="plus">Add Item</org-button>
            <org-button orgColor="primary" postIcon="arrow-right">Continue</org-button>
            <org-button orgColor="primary" preIcon="download-simple" postIcon="arrow-right">Download</org-button>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">With Icons and Sizes</h3>
          <div class="flex flex-wrap gap-2 items-center">
            <org-button orgColor="primary" preIcon="plus" size="small">Add Item</org-button>
            <org-button orgColor="primary" postIcon="arrow-right" size="base">Continue</org-button>
            <org-button orgColor="primary" preIcon="download-simple" postIcon="arrow-right" size="large">Download</org-button>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">With Icons</h3>
          <div class="flex flex-wrap gap-2">
            <org-button orgColor="primary" icon="plus">Add Item</org-button>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">With Icons and Sizes</h3>
          <div class="flex flex-wrap gap-2 items-center">
            <org-button orgColor="primary" icon="plus" size="small">Add Item</org-button>
            <org-button orgColor="primary" icon="arrow-right" size="base">Continue</org-button>
            <org-button orgColor="primary" icon="download-simple" postIcon="arrow-right" size="large">Download</org-button>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">States</h3>
          <div class="flex flex-wrap gap-2">
            <org-button orgColor="primary">Normal</org-button>
            <org-button orgColor="primary" [disabled]="true">Disabled</org-button>
            <org-button orgColor="primary" [loading]="true">Loading</org-button>
          </div>
        </div>
      </div>
    `,
  }),
};

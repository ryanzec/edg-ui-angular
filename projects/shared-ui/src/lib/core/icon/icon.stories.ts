import type { Meta, StoryObj } from '@storybook/angular';
import { Icon, iconNames } from './icon';

const meta: Meta<Icon> = {
  title: 'Core/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: iconNames,
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large'],
    },
    weight: {
      control: 'select',
      options: ['regular', 'bold', 'fill'],
    },
  },
  args: {
    name: 'check',
    size: 'base',
    weight: 'regular',
  },
};

export default meta;
type Story = StoryObj<Icon>;

// Basic icon variants by name
export const Default: Story = {
  args: {
    name: 'check',
  },
  render: (args) => ({
    props: args,
    template: '<org-icon [name]="name" [size]="size" [weight]="weight"></org-icon>',
  }),
};

// Size variants
export const Small: Story = {
  args: {
    name: 'check',
    size: 'small',
  },
  render: (args) => ({
    props: args,
    template: '<org-icon [name]="name" [size]="size" [weight]="weight"></org-icon>',
  }),
};

export const Base: Story = {
  args: {
    name: 'check',
    size: 'base',
  },
  render: (args) => ({
    props: args,
    template: '<org-icon [name]="name" [size]="size" [weight]="weight"></org-icon>',
  }),
};

export const Large: Story = {
  args: {
    name: 'check',
    size: 'large',
  },
  render: (args) => ({
    props: args,
    template: '<org-icon [name]="name" [size]="size" [weight]="weight"></org-icon>',
  }),
};

// Weight variants
export const Regular: Story = {
  args: {
    name: 'check',
    weight: 'regular',
  },
  render: (args) => ({
    props: args,
    template: '<org-icon [name]="name" [size]="size" [weight]="weight"></org-icon>',
  }),
};

export const Bold: Story = {
  args: {
    name: 'check',
    weight: 'bold',
  },
  render: (args) => ({
    props: args,
    template: '<org-icon [name]="name" [size]="size" [weight]="weight"></org-icon>',
  }),
};

export const Fill: Story = {
  args: {
    name: 'check',
    weight: 'fill',
  },
  render: (args) => ({
    props: args,
    template: '<org-icon [name]="name" [size]="size" [weight]="weight"></org-icon>',
  }),
};

// Comprehensive showcase
export const AllIcons: Story = {
  render: () => ({
    template: `
      <div class="space-y-6">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold">All Available Icons (Phosphor Icons)</h3>
          <div class="grid grid-cols-6 gap-4 p-4 bg-background rounded-lg">
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="caret-right" size="base" weight="regular"></org-icon>
              <span class="text-xs text-text-color">caret-right</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="caret-left" size="base" weight="regular"></org-icon>
              <span class="text-xs text-text-color">caret-left</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="plus" size="base" weight="regular"></org-icon>
              <span class="text-xs text-text-color">plus</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="check" size="base" weight="regular"></org-icon>
              <span class="text-xs text-text-color">check</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="x" size="base" weight="regular"></org-icon>
              <span class="text-xs text-text-color">x</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="arrow-right" size="base" weight="regular"></org-icon>
              <span class="text-xs text-text-color">arrow-right</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="arrow-left" size="base" weight="regular"></org-icon>
              <span class="text-xs text-text-color">arrow-left</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="download-simple" size="base" weight="regular"></org-icon>
              <span class="text-xs text-text-color">download-simple</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="upload-simple" size="base" weight="regular"></org-icon>
              <span class="text-xs text-text-color">upload-simple</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="trash" size="base" weight="regular"></org-icon>
              <span class="text-xs text-text-color">trash</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="pencil-simple" size="base" weight="regular"></org-icon>
              <span class="text-xs text-text-color">pencil-simple</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="gear" size="base" weight="regular"></org-icon>
              <span class="text-xs text-text-color">gear</span>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Size Comparison</h3>
          <div class="flex items-center gap-6 p-4 bg-background rounded-lg">
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="check" size="small" weight="regular"></org-icon>
              <span class="text-xs text-text-color">Small</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="check" size="base" weight="regular"></org-icon>
              <span class="text-xs text-text-color">Base</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="check" size="large" weight="regular"></org-icon>
              <span class="text-xs text-text-color">Large</span>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Weight Comparison</h3>
          <div class="flex items-center gap-6 p-4 bg-background rounded-lg">
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="check" size="base" weight="regular"></org-icon>
              <span class="text-xs text-text-color">Regular</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="check" size="base" weight="bold"></org-icon>
              <span class="text-xs text-text-color">Bold</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="check" size="base" weight="fill"></org-icon>
              <span class="text-xs text-text-color">Fill</span>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Color Inheritance</h3>
          <div class="flex items-center gap-4 p-4 bg-background rounded-lg">
            <div class="text-blue-500 flex items-center gap-1">
              <org-icon name="check" size="base" weight="regular"></org-icon>
              <span class="text-sm">Blue text color</span>
            </div>
            <div class="text-red-500 flex items-center gap-1">
              <org-icon name="x" size="base" weight="regular"></org-icon>
              <span class="text-sm">Red text color</span>
            </div>
            <div class="text-green-500 flex items-center gap-1">
              <org-icon name="plus" size="base" weight="regular"></org-icon>
              <span class="text-sm">Green text color</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

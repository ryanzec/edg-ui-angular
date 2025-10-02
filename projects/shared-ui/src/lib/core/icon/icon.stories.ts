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

// Debug story to test class generation
export const DebugClasses: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <div class="p-4 bg-gray-100 rounded">
          <h4 class="font-semibold mb-2">Debug: Generated Classes</h4>
          <div class="space-y-2">
            <div class="flex items-center gap-4">
              <org-icon name="check" size="base" weight="regular"></org-icon>
              <span class="text-sm font-mono">Regular check icon</span>
            </div>
            <div class="flex items-center gap-4">
              <i class="ph ph-check text-xl"></i>
              <span class="text-sm font-mono">Manual: ph ph-check text-xl</span>
            </div>
            <div class="flex items-center gap-4">
              <i class="ph-bold ph-check text-xl"></i>
              <span class="text-sm font-mono">Manual: ph-bold ph-check text-xl</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

// Comprehensive showcase
export const AllIcons: Story = {
  render: () => ({
    template: `
      <div class="space-y-6">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold">All Available Icons (Phosphor Icons)</h3>
          <div class="grid grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="caret-right" size="base" weight="regular"></org-icon>
              <span class="text-xs text-gray-600">caret-right</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="caret-left" size="base" weight="regular"></org-icon>
              <span class="text-xs text-gray-600">caret-left</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="plus" size="base" weight="regular"></org-icon>
              <span class="text-xs text-gray-600">plus</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="check" size="base" weight="regular"></org-icon>
              <span class="text-xs text-gray-600">check</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="x" size="base" weight="regular"></org-icon>
              <span class="text-xs text-gray-600">x</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="arrow-right" size="base" weight="regular"></org-icon>
              <span class="text-xs text-gray-600">arrow-right</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="arrow-left" size="base" weight="regular"></org-icon>
              <span class="text-xs text-gray-600">arrow-left</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="download-simple" size="base" weight="regular"></org-icon>
              <span class="text-xs text-gray-600">download-simple</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="upload-simple" size="base" weight="regular"></org-icon>
              <span class="text-xs text-gray-600">upload-simple</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="trash" size="base" weight="regular"></org-icon>
              <span class="text-xs text-gray-600">trash</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="pencil-simple" size="base" weight="regular"></org-icon>
              <span class="text-xs text-gray-600">pencil-simple</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="gear" size="base" weight="regular"></org-icon>
              <span class="text-xs text-gray-600">gear</span>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Size Comparison</h3>
          <div class="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="check" size="small" weight="regular"></org-icon>
              <span class="text-xs text-gray-600">Small</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="check" size="base" weight="regular"></org-icon>
              <span class="text-xs text-gray-600">Base</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="check" size="large" weight="regular"></org-icon>
              <span class="text-xs text-gray-600">Large</span>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Weight Comparison</h3>
          <div class="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="check" size="base" weight="regular"></org-icon>
              <span class="text-xs text-gray-600">Regular</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="check" size="base" weight="bold"></org-icon>
              <span class="text-xs text-gray-600">Bold</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <org-icon name="check" size="base" weight="fill"></org-icon>
              <span class="text-xs text-gray-600">Fill</span>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Color Inheritance</h3>
          <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div class="text-blue-500 flex items-center">
              <org-icon name="check" size="base" weight="regular"></org-icon>
              <span class="text-sm">Blue text color</span>
            </div>
            <div class="text-red-500 flex items-center">
              <org-icon name="x" size="base" weight="regular"></org-icon>
              <span class="text-sm">Red text color</span>
            </div>
            <div class="text-green-500 flex items-center">
              <org-icon name="plus" size="base" weight="regular"></org-icon>
              <span class="text-sm">Green text color</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

import type { Meta, StoryObj } from '@storybook/angular';
import { Tag, tagVariants } from './tag';
import { iconNames } from '../icon/icon';
import { componentColors } from '../component-color-directive/component-color-directive';

const meta: Meta<Tag> = {
  title: 'Core/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orgColor: {
      control: 'select',
      options: componentColors,
    },
    variant: {
      control: 'select',
      options: tagVariants,
    },
    preIcon: {
      control: 'select',
      options: [null, ...iconNames],
    },
    postIcon: {
      control: 'select',
      options: [null, ...iconNames],
    },
    removable: {
      control: 'boolean',
    },
    preIconClicked: {
      action: 'preIconClicked',
      description: 'Emitted when the pre icon is clicked',
    },
    postIconClicked: {
      action: 'postIconClicked',
      description: 'Emitted when the post icon is clicked',
    },
    removed: {
      action: 'removed',
      description: 'Emitted when the remove icon is clicked',
    },
  },
  args: {
    orgColor: 'primary',
    variant: 'weak',
    preIcon: null,
    postIcon: null,
    removable: false,
  },
};

export default meta;
type Story = StoryObj<Tag>;

// Basic color variants - weak
export const PrimaryWeak: Story = {
  args: {
    orgColor: 'primary',
    variant: 'weak',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-tag
        [orgColor]="orgColor"
        [variant]="variant"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [removable]="removable"
        (preIconClicked)="preIconClicked($event)"
        (postIconClicked)="postIconClicked($event)"
        (removed)="removed($event)"
      >
        Primary Tag
      </org-tag>
    `,
  }),
};

export const SecondaryWeak: Story = {
  args: {
    orgColor: 'secondary',
    variant: 'weak',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-tag
        [orgColor]="orgColor"
        [variant]="variant"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [removable]="removable"
        (preIconClicked)="preIconClicked($event)"
        (postIconClicked)="postIconClicked($event)"
        (removed)="removed($event)"
      >
        Secondary Tag
      </org-tag>
    `,
  }),
};

export const NeutralWeak: Story = {
  args: {
    orgColor: 'neutral',
    variant: 'weak',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-tag
        [orgColor]="orgColor"
        [variant]="variant"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [removable]="removable"
        (preIconClicked)="preIconClicked($event)"
        (postIconClicked)="postIconClicked($event)"
        (removed)="removed($event)"
      >
        Neutral Tag
      </org-tag>
    `,
  }),
};

export const SafeWeak: Story = {
  args: {
    orgColor: 'safe',
    variant: 'weak',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-tag
        [orgColor]="orgColor"
        [variant]="variant"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [removable]="removable"
        (preIconClicked)="preIconClicked($event)"
        (postIconClicked)="postIconClicked($event)"
        (removed)="removed($event)"
      >
        Safe Tag
      </org-tag>
    `,
  }),
};

export const InfoWeak: Story = {
  args: {
    orgColor: 'info',
    variant: 'weak',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-tag
        [orgColor]="orgColor"
        [variant]="variant"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [removable]="removable"
        (preIconClicked)="preIconClicked($event)"
        (postIconClicked)="postIconClicked($event)"
        (removed)="removed($event)"
      >
        Info Tag
      </org-tag>
    `,
  }),
};

export const CautionWeak: Story = {
  args: {
    orgColor: 'caution',
    variant: 'weak',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-tag
        [orgColor]="orgColor"
        [variant]="variant"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [removable]="removable"
        (preIconClicked)="preIconClicked($event)"
        (postIconClicked)="postIconClicked($event)"
        (removed)="removed($event)"
      >
        Caution Tag
      </org-tag>
    `,
  }),
};

export const WarningWeak: Story = {
  args: {
    orgColor: 'warning',
    variant: 'weak',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-tag
        [orgColor]="orgColor"
        [variant]="variant"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [removable]="removable"
        (preIconClicked)="preIconClicked($event)"
        (postIconClicked)="postIconClicked($event)"
        (removed)="removed($event)"
      >
        Warning Tag
      </org-tag>
    `,
  }),
};

export const DangerWeak: Story = {
  args: {
    orgColor: 'danger',
    variant: 'weak',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-tag
        [orgColor]="orgColor"
        [variant]="variant"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [removable]="removable"
        (preIconClicked)="preIconClicked($event)"
        (postIconClicked)="postIconClicked($event)"
        (removed)="removed($event)"
      >
        Danger Tag
      </org-tag>
    `,
  }),
};

// Strong variants
export const PrimaryStrong: Story = {
  args: {
    orgColor: 'primary',
    variant: 'strong',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-tag
        [orgColor]="orgColor"
        [variant]="variant"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [removable]="removable"
        (preIconClicked)="preIconClicked($event)"
        (postIconClicked)="postIconClicked($event)"
        (removed)="removed($event)"
      >
        Primary Strong
      </org-tag>
    `,
  }),
};

export const SecondaryStrong: Story = {
  args: {
    orgColor: 'secondary',
    variant: 'strong',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-tag
        [orgColor]="orgColor"
        [variant]="variant"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [removable]="removable"
        (preIconClicked)="preIconClicked($event)"
        (postIconClicked)="postIconClicked($event)"
        (removed)="removed($event)"
      >
        Secondary Strong
      </org-tag>
    `,
  }),
};

// Icon variants
export const WithPreIcon: Story = {
  args: {
    preIcon: 'gear',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-tag
        [orgColor]="orgColor"
        [variant]="variant"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [removable]="removable"
        (preIconClicked)="preIconClicked($event)"
        (postIconClicked)="postIconClicked($event)"
        (removed)="removed($event)"
      >
        With Pre Icon
      </org-tag>
    `,
  }),
};

export const WithPostIcon: Story = {
  args: {
    postIcon: 'arrow-right',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-tag
        [orgColor]="orgColor"
        [variant]="variant"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [removable]="removable"
        (preIconClicked)="preIconClicked($event)"
        (postIconClicked)="postIconClicked($event)"
        (removed)="removed($event)"
      >
        With Post Icon
      </org-tag>
    `,
  }),
};

export const WithBothIcons: Story = {
  args: {
    preIcon: 'gear',
    postIcon: 'arrow-right',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-tag
        [orgColor]="orgColor"
        [variant]="variant"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [removable]="removable"
        (preIconClicked)="preIconClicked($event)"
        (postIconClicked)="postIconClicked($event)"
        (removed)="removed($event)"
      >
        Both Icons
      </org-tag>
    `,
  }),
};

// Removable variants
export const Removable: Story = {
  args: {
    removable: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <org-tag
        [orgColor]="orgColor"
        [variant]="variant"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [removable]="removable"
        (preIconClicked)="preIconClicked($event)"
        (postIconClicked)="postIconClicked($event)"
        (removed)="removed($event)"
      >
        Removable Tag
      </org-tag>
    `,
  }),
};

export const RemovableWithPreIcon: Story = {
  args: {
    preIcon: 'gear',
    removable: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <org-tag
        [orgColor]="orgColor"
        [variant]="variant"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [removable]="removable"
        (preIconClicked)="preIconClicked($event)"
        (postIconClicked)="postIconClicked($event)"
        (removed)="removed($event)"
      >
        Removable with Pre Icon
      </org-tag>
    `,
  }),
};

// Interactive examples
export const WithClickHandlers: Story = {
  args: {
    preIcon: 'gear',
    postIcon: 'arrow-right',
  },
  render: (args) => ({
    props: {
      ...args,
      preIconClicked: () => {
        console.log('Pre icon clicked!');
      },
      postIconClicked: () => {
        console.log('Post icon clicked!');
      },
    },
    template: `
      <org-tag
        [orgColor]="orgColor"
        [variant]="variant"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [removable]="removable"
        (preIconClicked)="preIconClicked()"
        (postIconClicked)="postIconClicked()"
        (removed)="removed($event)"
      >
        Click Icons
      </org-tag>
    `,
  }),
};

export const RemovableWithHandler: Story = {
  args: {
    removable: true,
    orgColor: 'danger',
  },
  render: (args) => ({
    props: {
      ...args,
      removed: () => {
        console.log('Tag removed!');
      },
    },
    template: `
      <org-tag
        [orgColor]="orgColor"
        [variant]="variant"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [removable]="removable"
        (preIconClicked)="preIconClicked($event)"
        (postIconClicked)="postIconClicked($event)"
        (removed)="removed()"
      >
        Click X to Remove
      </org-tag>
    `,
  }),
};

// Comprehensive showcase
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="space-y-6 w-full max-w-4xl">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Weak Variants (Default)</h3>
          <div class="flex flex-wrap gap-2">
            <org-tag orgColor="primary" variant="weak">Primary</org-tag>
            <org-tag orgColor="secondary" variant="weak">Secondary</org-tag>
            <org-tag orgColor="neutral" variant="weak">Neutral</org-tag>
            <org-tag orgColor="safe" variant="weak">Safe</org-tag>
            <org-tag orgColor="info" variant="weak">Info</org-tag>
            <org-tag orgColor="caution" variant="weak">Caution</org-tag>
            <org-tag orgColor="warning" variant="weak">Warning</org-tag>
            <org-tag orgColor="danger" variant="weak">Danger</org-tag>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Strong Variants</h3>
          <div class="flex flex-wrap gap-2">
            <org-tag orgColor="primary" variant="strong">Primary</org-tag>
            <org-tag orgColor="secondary" variant="strong">Secondary</org-tag>
            <org-tag orgColor="neutral" variant="strong">Neutral</org-tag>
            <org-tag orgColor="safe" variant="strong">Safe</org-tag>
            <org-tag orgColor="info" variant="strong">Info</org-tag>
            <org-tag orgColor="caution" variant="strong">Caution</org-tag>
            <org-tag orgColor="warning" variant="strong">Warning</org-tag>
            <org-tag orgColor="danger" variant="strong">Danger</org-tag>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">With Icons</h3>
          <div class="flex flex-wrap gap-2">
            <org-tag orgColor="primary" preIcon="gear">Pre Icon</org-tag>
            <org-tag orgColor="primary" postIcon="arrow-right">Post Icon</org-tag>
            <org-tag orgColor="primary" preIcon="gear" postIcon="arrow-right">Both Icons</org-tag>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Removable Tags</h3>
          <div class="flex flex-wrap gap-2">
            <org-tag orgColor="primary" [removable]="true">Removable</org-tag>
            <org-tag orgColor="primary" [removable]="true" preIcon="gear">Removable with Pre Icon</org-tag>
            <org-tag orgColor="primary" [removable]="true" orgColor="danger">Removable Danger</org-tag>
            <org-tag orgColor="primary" [removable]="true" orgColor="safe" variant="strong">Removable Safe Strong</org-tag>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Mixed Examples</h3>
          <div class="flex flex-wrap gap-2">
            <org-tag orgColor="primary" variant="strong" preIcon="star">Featured</org-tag>
            <org-tag orgColor="safe" [removable]="true">React</org-tag>
            <org-tag orgColor="info" [removable]="true">Angular</org-tag>
            <org-tag orgColor="warning" [removable]="true">Vue</org-tag>
            <org-tag orgColor="neutral" variant="strong" postIcon="external-link">External</org-tag>
          </div>
        </div>
      </div>
    `,
  }),
};

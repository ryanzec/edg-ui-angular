import type { Meta, StoryObj } from '@storybook/angular';
import { Input, inputVariants, inputTypes } from './input';
import { iconNames } from '../icon/icon';

const meta: Meta<Input> = {
  title: 'Core/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: inputVariants,
    },
    type: {
      control: 'select',
      options: inputTypes,
    },
    preIcon: {
      control: 'select',
      options: [null, ...iconNames],
    },
    postIcon: {
      control: 'select',
      options: [null, ...iconNames],
    },
    disabled: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
    selectAllOnFocus: {
      control: 'boolean',
    },
    autoFocus: {
      control: 'boolean',
    },
    showPasswordToggle: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    validationMessage: {
      control: 'text',
    },
    preIconClicked: {
      action: 'preIconClicked',
      description: 'Emitted when the pre icon is clicked',
    },
    postIconClicked: {
      action: 'postIconClicked',
      description: 'Emitted when the post icon is clicked',
    },
  },
  args: {
    variant: 'bordered',
    type: 'text',
    disabled: false,
    readonly: false,
    selectAllOnFocus: false,
    autoFocus: false,
    showPasswordToggle: false,
    preIcon: null,
    postIcon: null,
    placeholder: 'Enter text...',
    value: '',
    validationMessage: '',
    inlineItems: [],
  },
};

export default meta;
type Story = StoryObj<Input>;

// Basic variants
export const Bordered: Story = {
  args: {
    variant: 'bordered',
    placeholder: 'Bordered input',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-input
        [variant]="variant"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [showPasswordToggle]="showPasswordToggle"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
      />
    `,
  }),
};

export const Borderless: Story = {
  args: {
    variant: 'borderless',
    placeholder: 'Borderless input',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-input
        [variant]="variant"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [showPasswordToggle]="showPasswordToggle"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
      />
    `,
  }),
};

// Icon variants
export const WithPreIcon: Story = {
  args: {
    preIcon: 'gear',
    placeholder: 'Input with pre icon',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-input
        [variant]="variant"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [showPasswordToggle]="showPasswordToggle"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
      />
    `,
  }),
};

export const WithPostIcon: Story = {
  args: {
    postIcon: 'arrow-right',
    placeholder: 'Input with post icon',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-input
        [variant]="variant"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [showPasswordToggle]="showPasswordToggle"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
      />
    `,
  }),
};

export const WithIconsClickEvents: Story = {
  args: {
    preIcon: 'gear',
    postIcon: 'arrow-right',
    placeholder: 'Input with both icons',
  },
  render: (args) => ({
    props: {
      ...args,
      preIconClicked: (event: Event) => {
        console.log('Pre icon clicked!', event);
      },
      postIconClicked: (event: Event) => {
        console.log('Post icon clicked!', event);
      },
    },
    template: `
      <org-input
        [variant]="variant"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [showPasswordToggle]="showPasswordToggle"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
        (preIconClicked)="preIconClicked($event)"
        (postIconClicked)="postIconClicked($event)"
      />
    `,
  }),
};

// Password toggle
export const PasswordWithToggle: Story = {
  args: {
    type: 'password',
    showPasswordToggle: true,
    placeholder: 'Enter password',
    value: 'secretpassword',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-input
        [variant]="variant"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [showPasswordToggle]="showPasswordToggle"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
      />
    `,
  }),
};

// Inline items (tagging)
export const WithInlineItems: Story = {
  args: {
    placeholder: 'Add more tags...',
    inlineItems: [
      { id: '1', label: 'React', removable: true },
      { id: '2', label: 'Angular', removable: true },
      { id: '3', label: 'Vue', removable: false },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <org-input
        [variant]="variant"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [showPasswordToggle]="showPasswordToggle"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
      />
    `,
  }),
};

export const WithInlineItemsWrapping: Story = {
  args: {
    placeholder: 'Add more tags...',
    inlineItems: [
      { id: '1', label: 'React', removable: true },
      { id: '2', label: 'Angular', removable: true },
      { id: '3', label: 'Vue', removable: false },
      { id: '4', label: 'Vue', removable: false },
      { id: '5', label: 'Vue', removable: false },
      { id: '6', label: 'Vue', removable: false },
      { id: '7', label: 'Vue', removable: false },
      { id: '8', label: 'Vue', removable: false },
      { id: '9', label: 'Vue', removable: false },
      { id: '10', label: 'Vue', removable: false },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <org-input
        containerClass="w-[400px]"
        [variant]="variant"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [showPasswordToggle]="showPasswordToggle"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
      />
    `,
  }),
};

// State variants
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
    value: 'Cannot edit this',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-input
        [variant]="variant"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [showPasswordToggle]="showPasswordToggle"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
      />
    `,
  }),
};

export const Readonly: Story = {
  args: {
    readonly: true,
    placeholder: 'Readonly input',
    value: 'Read-only value',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-input
        [variant]="variant"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [showPasswordToggle]="showPasswordToggle"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
      />
    `,
  }),
};

export const SelectAllOnFocus: Story = {
  args: {
    selectAllOnFocus: true,
    placeholder: 'Click to select all',
    value: 'This text will be selected on focus',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-input
        [variant]="variant"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [showPasswordToggle]="showPasswordToggle"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
      />
    `,
  }),
};

export const AutoFocus: Story = {
  args: {
    autoFocus: true,
    placeholder: 'This input will be focused automatically',
    value: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <div>
        <p class="text-sm text-text-subtle mb-2">This input will automatically receive focus when rendered</p>
        <org-input
          [variant]="variant"
          [type]="type"
          [placeholder]="placeholder"
          [value]="value"
          [disabled]="disabled"
          [readonly]="readonly"
          [preIcon]="preIcon"
          [postIcon]="postIcon"
          [selectAllOnFocus]="selectAllOnFocus"
          [autoFocus]="autoFocus"
          [showPasswordToggle]="showPasswordToggle"
          [validationMessage]="validationMessage"
          [inlineItems]="inlineItems"
        />
      </div>
    `,
  }),
};

export const AutoFocusWithSelectAll: Story = {
  args: {
    autoFocus: true,
    selectAllOnFocus: true,
    placeholder: 'Auto-focused with select all',
    value: 'This text will be selected automatically',
  },
  render: (args) => ({
    props: args,
    template: `
      <div>
        <p class="text-sm text-text-subtle mb-2">This input will auto-focus and select all text</p>
        <org-input
          [variant]="variant"
          [type]="type"
          [placeholder]="placeholder"
          [value]="value"
          [disabled]="disabled"
          [readonly]="readonly"
          [preIcon]="preIcon"
          [postIcon]="postIcon"
          [selectAllOnFocus]="selectAllOnFocus"
          [autoFocus]="autoFocus"
          [showPasswordToggle]="showPasswordToggle"
          [validationMessage]="validationMessage"
          [inlineItems]="inlineItems"
        />
      </div>
    `,
  }),
};

// Input types
export const EmailInput: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter email address',
    preIcon: 'gear',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-input
        [variant]="variant"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [showPasswordToggle]="showPasswordToggle"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
      />
    `,
  }),
};

export const NumberInput: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter number',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-input
        [variant]="variant"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [showPasswordToggle]="showPasswordToggle"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
      />
    `,
  }),
};

// Validation states
export const WithValidationError: Story = {
  args: {
    placeholder: 'Enter valid email',
    value: 'invalid-email',
    validationMessage: 'Please enter a valid email address',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-input
        [variant]="variant"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [showPasswordToggle]="showPasswordToggle"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
      />
    `,
  }),
};

export const ValidationErrorBorderless: Story = {
  args: {
    variant: 'borderless',
    placeholder: 'Required field',
    validationMessage: 'This field is required',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-input
        [variant]="variant"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [showPasswordToggle]="showPasswordToggle"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
      />
    `,
  }),
};

export const ValidationErrorWithIcon: Story = {
  args: {
    preIcon: 'gear',
    placeholder: 'Enter username',
    value: 'ab',
    validationMessage: 'Username must be at least 3 characters',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-input
        [variant]="variant"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [showPasswordToggle]="showPasswordToggle"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
      />
    `,
  }),
};

// Comprehensive showcase
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="space-y-6 w-96">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Variants</h3>
          <div class="space-y-2">
            <org-input variant="bordered" placeholder="Bordered input" />
            <org-input variant="borderless" placeholder="Borderless input" />
          </div>
        </div>


        <div class="space-y-2">
          <h3 class="text-lg font-semibold">With Icons</h3>
          <div class="space-y-2">
            <org-input preIcon="gear" placeholder="Pre icon" />
            <org-input postIcon="arrow-right" placeholder="Post icon" />
            <org-input preIcon="gear" postIcon="arrow-right" placeholder="Both icons" />
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Password Toggle</h3>
          <div class="space-y-2">
            <org-input type="password" [showPasswordToggle]="true" placeholder="Password" value="secret123" />
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Inline Items (Tags)</h3>
          <div class="space-y-2">
            <org-input
              placeholder="Add more tags..."
              [inlineItems]="[
                { id: '1', label: 'React', removable: true },
                { id: '2', label: 'Angular', removable: true },
                { id: '3', label: 'Vue', removable: false }
              ]"
            />
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">States</h3>
          <div class="space-y-2">
            <org-input placeholder="Normal input" />
            <org-input [disabled]="true" placeholder="Disabled input" value="Disabled" />
            <org-input [readonly]="true" placeholder="Readonly input" value="Read-only" />
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Focus Behavior</h3>
          <div class="space-y-2">
            <org-input [selectAllOnFocus]="true" placeholder="Select all on focus" value="Click to select all" />
            <org-input [autoFocus]="true" placeholder="Auto-focused input" />
            <org-input [autoFocus]="true" [selectAllOnFocus]="true" placeholder="Auto-focus + select all" value="Auto-selected text" />
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Input Types</h3>
          <div class="space-y-2">
            <org-input type="email" placeholder="Email input" />
            <org-input type="number" placeholder="Number input" />
            <org-input type="tel" placeholder="Phone input" />
            <org-input type="url" placeholder="URL input" />
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Validation States</h3>
          <div class="space-y-2">
            <org-input placeholder="Valid input (no error)" />
            <org-input
              placeholder="Invalid input"
              value="invalid@"
              validationMessage="Please enter a valid email address"
            />
            <org-input
              variant="borderless"
              placeholder="Required field"
              validationMessage="This field is required"
            />
          </div>
        </div>
      </div>
    `,
  }),
};

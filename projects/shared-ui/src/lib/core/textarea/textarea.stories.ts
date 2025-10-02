import type { Meta, StoryObj } from '@storybook/angular';
import { Textarea, textareaVariants, iconAlignments } from './textarea';
import { iconNames } from '../icon/icon';

const meta: Meta<Textarea> = {
  title: 'Core/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: textareaVariants,
    },
    preIcon: {
      control: 'select',
      options: [null, ...iconNames],
    },
    postIcon: {
      control: 'select',
      options: [null, ...iconNames],
    },
    preIconAlignment: {
      control: 'select',
      options: iconAlignments,
    },
    postIconAlignment: {
      control: 'select',
      options: iconAlignments,
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
    inverseEnter: {
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
    rows: {
      control: 'number',
    },
    preIconClicked: {
      action: 'preIconClicked',
      description: 'Emitted when the pre icon is clicked',
    },
    postIconClicked: {
      action: 'postIconClicked',
      description: 'Emitted when the post icon is clicked',
    },
    enterPressed: {
      action: 'enterPressed',
      description: 'Emitted when enter is pressed (submit action)',
    },
  },
  args: {
    variant: 'bordered',
    disabled: false,
    readonly: false,
    selectAllOnFocus: false,
    autoFocus: false,
    inverseEnter: false,
    preIcon: null,
    postIcon: null,
    preIconAlignment: 'start',
    postIconAlignment: 'end',
    placeholder: 'Enter text...',
    value: '',
    validationMessage: '',
    inlineItems: [],
    rows: 3,
  },
};

export default meta;
type Story = StoryObj<Textarea>;

// Basic variants
export const Bordered: Story = {
  args: {
    variant: 'bordered',
    placeholder: 'Bordered textarea',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-textarea
        [variant]="variant"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [preIconAlignment]="preIconAlignment"
        [postIconAlignment]="postIconAlignment"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [inverseEnter]="inverseEnter"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
        [rows]="rows"
      />
    `,
  }),
};

export const Borderless: Story = {
  args: {
    variant: 'borderless',
    placeholder: 'Borderless textarea',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-textarea
        [variant]="variant"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [preIconAlignment]="preIconAlignment"
        [postIconAlignment]="postIconAlignment"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [inverseEnter]="inverseEnter"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
        [rows]="rows"
      />
    `,
  }),
};

// Icon variants
export const WithPreIcon: Story = {
  args: {
    preIcon: 'gear',
    placeholder: 'Textarea with pre icon',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-textarea
        [variant]="variant"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [preIconAlignment]="preIconAlignment"
        [postIconAlignment]="postIconAlignment"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [inverseEnter]="inverseEnter"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
        [rows]="rows"
      />
    `,
  }),
};

export const WithPostIcon: Story = {
  args: {
    postIcon: 'arrow-right',
    placeholder: 'Textarea with post icon',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-textarea
        [variant]="variant"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [preIconAlignment]="preIconAlignment"
        [postIconAlignment]="postIconAlignment"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [inverseEnter]="inverseEnter"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
        [rows]="rows"
      />
    `,
  }),
};

export const WithBothIcons: Story = {
  args: {
    preIcon: 'gear',
    postIcon: 'arrow-right',
    placeholder: 'Textarea with both icons',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-textarea
        [variant]="variant"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [preIconAlignment]="preIconAlignment"
        [postIconAlignment]="postIconAlignment"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [inverseEnter]="inverseEnter"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
        [rows]="rows"
      />
    `,
  }),
};

// Icon alignment variants
export const IconAlignmentStart: Story = {
  args: {
    preIcon: 'gear',
    postIcon: 'arrow-right',
    preIconAlignment: 'start',
    postIconAlignment: 'start',
    placeholder: 'Icons aligned to start',
    rows: 5,
    value: 'This is a multi-line\ntextarea example\nto show icon alignment\nat the start position.',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-textarea
        [variant]="variant"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [preIconAlignment]="preIconAlignment"
        [postIconAlignment]="postIconAlignment"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [inverseEnter]="inverseEnter"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
        [rows]="rows"
      />
    `,
  }),
};

export const IconAlignmentCenter: Story = {
  args: {
    preIcon: 'gear',
    postIcon: 'arrow-right',
    preIconAlignment: 'center',
    postIconAlignment: 'center',
    placeholder: 'Icons aligned to center',
    rows: 5,
    value: 'This is a multi-line\ntextarea example\nto show icon alignment\nat the center position.',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-textarea
        [variant]="variant"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [preIconAlignment]="preIconAlignment"
        [postIconAlignment]="postIconAlignment"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [inverseEnter]="inverseEnter"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
        [rows]="rows"
      />
    `,
  }),
};

export const IconAlignmentEnd: Story = {
  args: {
    preIcon: 'gear',
    postIcon: 'arrow-right',
    preIconAlignment: 'end',
    postIconAlignment: 'end',
    placeholder: 'Icons aligned to end',
    rows: 5,
    value: 'This is a multi-line\ntextarea example\nto show icon alignment\nat the end position.',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-textarea
        [variant]="variant"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [preIconAlignment]="preIconAlignment"
        [postIconAlignment]="postIconAlignment"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [inverseEnter]="inverseEnter"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
        [rows]="rows"
      />
    `,
  }),
};

// Enter key behavior
export const NormalEnterBehavior: Story = {
  args: {
    placeholder: 'Shift+Enter submits, Enter adds new line',
    inverseEnter: false,
  },
  render: (args) => ({
    props: {
      ...args,
      enterPressed: (event: Event) => {
        console.log('Enter pressed (submit action)!', event);
      },
    },
    template: `
      <div>
        <p class="text-sm text-text-subtle mb-2">Shift+Enter submits, Enter adds new line</p>
        <org-textarea
          [variant]="variant"
          [placeholder]="placeholder"
          [value]="value"
          [disabled]="disabled"
          [readonly]="readonly"
          [preIcon]="preIcon"
          [postIcon]="postIcon"
          [preIconAlignment]="preIconAlignment"
          [postIconAlignment]="postIconAlignment"
          [selectAllOnFocus]="selectAllOnFocus"
          [autoFocus]="autoFocus"
          [inverseEnter]="inverseEnter"
          [validationMessage]="validationMessage"
          [inlineItems]="inlineItems"
          [rows]="rows"
          (enterPressed)="enterPressed($event)"
        />
      </div>
    `,
  }),
};

export const InverseEnterBehavior: Story = {
  args: {
    placeholder: 'Enter submits, Shift+Enter adds new line',
    inverseEnter: true,
  },
  render: (args) => ({
    props: {
      ...args,
      enterPressed: (event: Event) => {
        console.log('Enter pressed (submit action)!', event);
      },
    },
    template: `
      <div>
        <p class="text-sm text-text-subtle mb-2">Enter submits, Shift+Enter adds new line</p>
        <org-textarea
          [variant]="variant"
          [placeholder]="placeholder"
          [value]="value"
          [disabled]="disabled"
          [readonly]="readonly"
          [preIcon]="preIcon"
          [postIcon]="postIcon"
          [preIconAlignment]="preIconAlignment"
          [postIconAlignment]="postIconAlignment"
          [selectAllOnFocus]="selectAllOnFocus"
          [autoFocus]="autoFocus"
          [inverseEnter]="inverseEnter"
          [validationMessage]="validationMessage"
          [inlineItems]="inlineItems"
          [rows]="rows"
          (enterPressed)="enterPressed($event)"
        />
      </div>
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
      <org-textarea
        [variant]="variant"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [preIconAlignment]="preIconAlignment"
        [postIconAlignment]="postIconAlignment"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [inverseEnter]="inverseEnter"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
        [rows]="rows"
      />
    `,
  }),
};

// State variants
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
    value: 'Cannot edit this\nmulti-line text',
    rows: 3,
  },
  render: (args) => ({
    props: args,
    template: `
      <org-textarea
        [variant]="variant"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [preIconAlignment]="preIconAlignment"
        [postIconAlignment]="postIconAlignment"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [inverseEnter]="inverseEnter"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
        [rows]="rows"
      />
    `,
  }),
};

export const Readonly: Story = {
  args: {
    readonly: true,
    placeholder: 'Readonly textarea',
    value: 'Read-only value\nwith multiple lines\ncannot be edited',
    rows: 3,
  },
  render: (args) => ({
    props: args,
    template: `
      <org-textarea
        [variant]="variant"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [preIconAlignment]="preIconAlignment"
        [postIconAlignment]="postIconAlignment"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [inverseEnter]="inverseEnter"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
        [rows]="rows"
      />
    `,
  }),
};

export const SelectAllOnFocus: Story = {
  args: {
    selectAllOnFocus: true,
    placeholder: 'Click to select all',
    value: 'This text will be\nselected on focus\nacross multiple lines',
    rows: 3,
  },
  render: (args) => ({
    props: args,
    template: `
      <org-textarea
        [variant]="variant"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [preIconAlignment]="preIconAlignment"
        [postIconAlignment]="postIconAlignment"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [inverseEnter]="inverseEnter"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
        [rows]="rows"
      />
    `,
  }),
};

export const AutoFocus: Story = {
  args: {
    autoFocus: true,
    placeholder: 'This textarea will be focused automatically',
    value: '',
    rows: 3,
  },
  render: (args) => ({
    props: args,
    template: `
      <div>
        <p class="text-sm text-text-subtle mb-2">This textarea will automatically receive focus when rendered</p>
        <org-textarea
          [variant]="variant"
          [placeholder]="placeholder"
          [value]="value"
          [disabled]="disabled"
          [readonly]="readonly"
          [preIcon]="preIcon"
          [postIcon]="postIcon"
          [preIconAlignment]="preIconAlignment"
          [postIconAlignment]="postIconAlignment"
          [selectAllOnFocus]="selectAllOnFocus"
          [autoFocus]="autoFocus"
          [inverseEnter]="inverseEnter"
          [validationMessage]="validationMessage"
          [inlineItems]="inlineItems"
          [rows]="rows"
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
    value: 'This text will be\nselected automatically\nacross multiple lines',
    rows: 3,
  },
  render: (args) => ({
    props: args,
    template: `
      <div>
        <p class="text-sm text-text-subtle mb-2">This textarea will auto-focus and select all text</p>
        <org-textarea
          [variant]="variant"
          [placeholder]="placeholder"
          [value]="value"
          [disabled]="disabled"
          [readonly]="readonly"
          [preIcon]="preIcon"
          [postIcon]="postIcon"
          [preIconAlignment]="preIconAlignment"
          [postIconAlignment]="postIconAlignment"
          [selectAllOnFocus]="selectAllOnFocus"
          [autoFocus]="autoFocus"
          [inverseEnter]="inverseEnter"
          [validationMessage]="validationMessage"
          [inlineItems]="inlineItems"
          [rows]="rows"
        />
      </div>
    `,
  }),
};

// Validation states
export const WithValidationError: Story = {
  args: {
    placeholder: 'Enter your message',
    value: 'Too short',
    validationMessage: 'Message must be at least 20 characters long',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-textarea
        [variant]="variant"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [preIconAlignment]="preIconAlignment"
        [postIconAlignment]="postIconAlignment"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [inverseEnter]="inverseEnter"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
        [rows]="rows"
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
      <org-textarea
        [variant]="variant"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [preIconAlignment]="preIconAlignment"
        [postIconAlignment]="postIconAlignment"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [inverseEnter]="inverseEnter"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
        [rows]="rows"
      />
    `,
  }),
};

// Row variants
export const SmallRows: Story = {
  args: {
    rows: 2,
    placeholder: 'Small textarea (2 rows)',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-textarea
        [variant]="variant"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [preIconAlignment]="preIconAlignment"
        [postIconAlignment]="postIconAlignment"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [inverseEnter]="inverseEnter"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
        [rows]="rows"
      />
    `,
  }),
};

export const LargeRows: Story = {
  args: {
    rows: 8,
    placeholder: 'Large textarea (8 rows)',
  },
  render: (args) => ({
    props: args,
    template: `
      <org-textarea
        [variant]="variant"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [preIcon]="preIcon"
        [postIcon]="postIcon"
        [preIconAlignment]="preIconAlignment"
        [postIconAlignment]="postIconAlignment"
        [selectAllOnFocus]="selectAllOnFocus"
        [autoFocus]="autoFocus"
        [inverseEnter]="inverseEnter"
        [validationMessage]="validationMessage"
        [inlineItems]="inlineItems"
        [rows]="rows"
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
            <org-textarea variant="bordered" placeholder="Bordered textarea" />
            <org-textarea variant="borderless" placeholder="Borderless textarea" />
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">With Icons</h3>
          <div class="space-y-2">
            <org-textarea preIcon="gear" placeholder="Pre icon" />
            <org-textarea postIcon="arrow-right" placeholder="Post icon" />
            <org-textarea preIcon="gear" postIcon="arrow-right" placeholder="Both icons" />
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Icon Alignment</h3>
          <div class="space-y-2">
            <org-textarea
              preIcon="gear"
              postIcon="arrow-right"
              preIconAlignment="start"
              postIconAlignment="start"
              placeholder="Icons at start"
              [rows]="4"
              value="Multi-line text&#10;to show icon&#10;alignment&#10;at different positions"
            />
            <org-textarea
              preIcon="gear"
              postIcon="arrow-right"
              preIconAlignment="center"
              postIconAlignment="center"
              placeholder="Icons at center"
              [rows]="4"
              value="Multi-line text&#10;to show icon&#10;alignment&#10;at different positions"
            />
            <org-textarea
              preIcon="gear"
              postIcon="arrow-right"
              preIconAlignment="end"
              postIconAlignment="end"
              placeholder="Icons at end"
              [rows]="4"
              value="Multi-line text&#10;to show icon&#10;alignment&#10;at different positions"
            />
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Enter Key Behavior</h3>
          <div class="space-y-2">
            <div>
              <p class="text-sm text-text-subtle">Normal: Shift+Enter submits, Enter new line</p>
              <org-textarea placeholder="Normal enter behavior" [inverseEnter]="false" />
            </div>
            <div>
              <p class="text-sm text-text-subtle">Inverse: Enter submits, Shift+Enter new line</p>
              <org-textarea placeholder="Inverse enter behavior" [inverseEnter]="true" />
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Inline Items (Tags)</h3>
          <div class="space-y-2">
            <org-textarea
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
            <org-textarea placeholder="Normal textarea" />
            <org-textarea [disabled]="true" placeholder="Disabled textarea" value="Disabled content" />
            <org-textarea [readonly]="true" placeholder="Readonly textarea" value="Read-only content" />
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Focus Behavior</h3>
          <div class="space-y-2">
            <org-textarea [selectAllOnFocus]="true" placeholder="Select all on focus" value="Click to select all&#10;across multiple lines" />
            <org-textarea [autoFocus]="true" placeholder="Auto-focused textarea" />
            <org-textarea [autoFocus]="true" [selectAllOnFocus]="true" placeholder="Auto-focus + select all" value="Auto-selected text&#10;across multiple lines" />
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Row Sizes</h3>
          <div class="space-y-2">
            <org-textarea [rows]="2" placeholder="Small (2 rows)" />
            <org-textarea [rows]="3" placeholder="Default (3 rows)" />
            <org-textarea [rows]="6" placeholder="Large (6 rows)" />
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Validation States</h3>
          <div class="space-y-2">
            <org-textarea placeholder="Valid textarea (no error)" />
            <org-textarea
              placeholder="Invalid textarea"
              value="Too short"
              validationMessage="Message must be at least 20 characters long"
            />
            <org-textarea
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

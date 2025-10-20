import type { Meta, StoryObj } from '@storybook/angular';
import { Input, inputVariants, inputTypes } from './input';
import { iconNames } from '../icon/icon';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';

const meta: Meta<Input> = {
  title: 'Core/Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Input Component

  A flexible input component with support for various types, icons, validation, inline items (tags), and accessibility features.

  ### Features
  - Two visual variants: bordered and borderless
  - Multiple input types: text, password, email, number, tel, url
  - Optional pre and post icons
  - Password visibility toggle
  - Inline items/tags support
  - Validation message display
  - Select all on focus behavior
  - Auto-focus support
  - Disabled and readonly states
  - Full keyboard accessibility

  ### Variants
  - **bordered**: Standard input with visible border
  - **borderless**: Minimal input without border

  ### Input Types
  - **text**: Standard text input (default)
  - **password**: Password input with optional visibility toggle
  - **email**: Email input with browser validation
  - **number**: Numeric input
  - **tel**: Telephone number input
  - **url**: URL input with browser validation

  ### Usage Examples
  \`\`\`html
  <!-- Basic input -->
  <org-input name="basic-input" placeholder="Enter text..." />

  <!-- Input with variant -->
  <org-input name="borderless-input" variant="borderless" placeholder="Borderless input" />

  <!-- Input with icons -->
  <org-input name="pre-icon-input" preIcon="gear" placeholder="Settings" />
  <org-input name="post-icon-input" postIcon="arrow-right" placeholder="Submit" />

  <!-- Password with toggle -->
  <org-input name="password-input" type="password" [showPasswordToggle]="true" placeholder="Password" />

  <!-- Input with validation -->
  <org-input
    name="email-input"
    placeholder="Email"
    validationMessage="Please enter a valid email"
  />

  <!-- Input with inline items (tags) -->
  <org-input
    name="inline-items-input"
    placeholder="Add tags..."
    [inlineItems]="[
      { id: '1', label: 'React', removable: true },
      { id: '2', label: 'Angular', removable: true }
    ]"
  />

  <!-- Input with select all on focus -->
  <org-input
    name="select-all-on-focus-input"
    [selectAllOnFocus]="true"
    value="Select this text"
  />
</div>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<Input>;

export const Default: Story = {
  args: {
    variant: 'bordered',
    type: 'text',
    placeholder: 'Enter text...',
    value: '',
    disabled: false,
    readonly: false,
    preIcon: null,
    postIcon: null,
    selectAllOnFocus: false,
    autoFocus: false,
    showPasswordToggle: false,
    validationMessage: '',
    inlineItems: [],
    containerClass: '',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: inputVariants,
      description: 'The visual variant of the input',
    },
    type: {
      control: 'select',
      options: inputTypes,
      description: 'The HTML input type',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    value: {
      control: 'text',
      description: 'The current value of the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the input is readonly',
    },
    preIcon: {
      control: 'select',
      options: [null, ...iconNames],
      description: 'Icon to display before the input text',
    },
    postIcon: {
      control: 'select',
      options: [null, ...iconNames],
      description: 'Icon to display after the input text',
    },
    selectAllOnFocus: {
      control: 'boolean',
      description: 'Whether to select all text when the input receives focus',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Whether the input should automatically receive focus',
    },
    showPasswordToggle: {
      control: 'boolean',
      description: 'Whether to show password visibility toggle (only for password type)',
    },
    validationMessage: {
      control: 'text',
      description: 'Validation error message to display',
    },
    inlineItems: {
      control: 'object',
      description: 'Array of inline items (tags) to display inside the input',
    },
    containerClass: {
      control: 'text',
      description: 'Additional CSS classes for the container',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default input with bordered variant. Use the controls below to interact with the component.',
      },
    },
  },
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of bordered and borderless variants.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Variant Comparison"
        currentState="Comparing bordered and borderless variants"
      >
        <org-storybook-example-container-section label="Bordered (default)">
          <org-input name="bordered-input" variant="bordered" placeholder="Bordered input" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Borderless">
          <org-input name="borderless-input" variant="borderless" placeholder="Borderless input" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>bordered</strong>: Standard input with visible border (default)</li>
          <li><strong>borderless</strong>: Minimal styling without border</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Input, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const InputTypes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different HTML input types (text, password, email, number, tel, url).',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Input Types"
        currentState="Comparing different HTML input types"
      >
        <org-storybook-example-container-section label="Text (default)">
          <org-input name="text-input" type="text" placeholder="Enter text" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Password">
          <org-input name="password-input" type="password" placeholder="Enter password" value="secretpassword" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Email">
          <org-input name="email-input" type="email" placeholder="Enter email" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Number">
          <org-input name="number-input" type="number" placeholder="Enter number" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Tel">
          <org-input name="tel-input" type="tel" placeholder="Enter phone number" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="URL">
          <org-input name="url-input" type="url" placeholder="Enter URL" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>text</strong>: Standard text input (default)</li>
          <li><strong>password</strong>: Masked password input</li>
          <li><strong>email</strong>: Email input with browser validation</li>
          <li><strong>number</strong>: Numeric input</li>
          <li><strong>tel</strong>: Telephone number input</li>
          <li><strong>url</strong>: URL input with browser validation</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Input, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Inputs with pre icons, post icons, or both.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Icon Variations"
        currentState="Comparing inputs with different icon configurations"
      >
        <org-storybook-example-container-section label="No icons">
          <org-input name="no-icons-input" placeholder="No icons" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Pre icon only">
          <org-input name="pre-icon-input" preIcon="gear" placeholder="Settings" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Post icon only">
          <org-input name="post-icon-input" postIcon="arrow-right" placeholder="Submit" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Both icons">
          <org-input name="both-icons-input" preIcon="gear" postIcon="arrow-right" placeholder="Both icons" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>preIcon</strong>: Icon displayed before the input text</li>
          <li><strong>postIcon</strong>: Icon displayed after the input text</li>
          <li>Both icons can be used simultaneously</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Input, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const PasswordToggle: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Password input with visibility toggle to show/hide the password.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Password Visibility Toggle"
        currentState="Password input with show/hide functionality"
      >
        <org-storybook-example-container-section label="Without toggle">
          <org-input name="without-toggle-input" type="password" placeholder="Enter password" value="secretpassword" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With toggle (click eye icon)">
          <org-input
            name="with-toggle-input"
            type="password"
            [showPasswordToggle]="true"
            placeholder="Enter password"
            value="secretpassword"
          />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>When <strong>showPasswordToggle</strong> is true, an eye icon appears</li>
          <li>Clicking the eye icon toggles password visibility</li>
          <li>Icon changes between eye and eye-slash based on visibility state</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Input, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const InlineItems: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Input with inline items (tags/chips) displayed inside the input field.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Inline Items (Tags)"
        currentState="Input with tags displayed inline"
      >
        <org-storybook-example-container-section label="Without inline items">
          <org-input name="without-inline-items-input" placeholder="Add tags..." />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With inline items (removable)">
          <org-input
            name="with-inline-items-input"
            placeholder="Add more tags..."
            [inlineItems]="[
              { id: '1', label: 'React', removable: true },
              { id: '2', label: 'Angular', removable: true },
              { id: '3', label: 'Vue', removable: true }
            ]"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With non-removable items">
          <org-input
            name="with-non-removable-items-input"
            placeholder="Type here..."
            [inlineItems]="[
              { id: '1', label: 'TypeScript', removable: false },
              { id: '2', label: 'JavaScript', removable: false }
            ]"
          />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>Inline items are displayed as tags inside the input</li>
          <li>Items with <strong>removable: true</strong> show an X button</li>
          <li>Clicking the X button emits <strong>inlineItemRemoved</strong> event</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Input, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of disabled, readonly, and normal states.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Input States"
        currentState="Comparing disabled, readonly, and normal states"
      >
        <org-storybook-example-container-section label="Normal (enabled)">
          <org-input name="normal-input" placeholder="Normal input" value="Editable text" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Disabled">
          <org-input name="disabled-input" [disabled]="true" placeholder="Disabled input" value="Cannot edit" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Readonly">
          <org-input name="readonly-input" [readonly]="true" placeholder="Readonly input" value="Cannot edit but can focus" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Normal</strong>: Fully interactive and editable</li>
          <li><strong>Disabled</strong>: Cannot focus, edit, or interact</li>
          <li><strong>Readonly</strong>: Can focus but cannot edit</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Input, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const Validation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Input with validation error messages.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Validation States"
        currentState="Comparing valid and invalid inputs"
      >
        <org-storybook-example-container-section label="Valid (no error)">
          <org-input name="valid-input" placeholder="Valid input" value="valid@example.com" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Invalid (with error message)">
          <org-input
            name="invalid-input"
            placeholder="Invalid input"
            value="invalid@"
            validationMessage="Please enter a valid email address"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Borderless with error">
          <org-input
            name="borderless-with-error-input"
            variant="borderless"
            placeholder="Required field"
            validationMessage="This field is required"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With icon and error">
          <org-input
            name="with-icon-and-error-input"
            preIcon="envelope"
            placeholder="Email"
            value="invalid"
            validationMessage="Invalid email format"
          />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>When <strong>validationMessage</strong> is provided, input shows error state</li>
          <li>Error message is displayed below the input</li>
          <li>Input border changes to error color (red)</li>
          <li>Works with all variants and icon configurations</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Input, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const SpecialBehaviors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Special input behaviors like select all on focus and auto-focus.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Special Behaviors"
        currentState="Demonstrating select all on focus behavior"
      >
        <org-storybook-example-container-section label="Normal focus behavior">
          <org-input name="normal-focus-input" placeholder="Click to focus" value="Normal focus behavior" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Select all on focus">
          <org-input
            name="select-all-on-focus-input"
            [selectAllOnFocus]="true"
            placeholder="Click to focus"
            value="Text will be selected on focus"
          />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>selectAllOnFocus</strong>: Automatically selects all text when input receives focus</li>
          <li><strong>autoFocus</strong>: Automatically focuses the input when component mounts</li>
          <li>Useful for forms where quick editing is needed</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Input, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

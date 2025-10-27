import type { Meta, StoryObj } from '@storybook/angular';
import { FormFields } from './form-fields';
import { FormField } from '../form-field/form-field';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';
import { Input } from '../input/input';
import { Label } from '../label/label';
import { Textarea } from '../textarea/textarea';
import { Checkbox } from '../checkbox/checkbox';

const meta: Meta<FormFields> = {
  title: 'Core/Components/Form Fields',
  component: FormFields,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Form Fields Component

  A simple container component for grouping form fields with consistent vertical spacing.

  ### Features
  - Consistent vertical spacing between form elements (gap-1)
  - Flexbox column layout for vertical stacking
  - Content projection for flexible form field arrangements
  - Works with any form elements (inputs, textareas, checkboxes, etc.)

  ### Usage Examples
  \`\`\`html
  <!-- Basic usage with inputs -->
  <org-form-fields>
    <org-form-field>
      <org-label label="Name" htmlFor="name-input" />
      <org-input name="name-input" placeholder="Enter your name" />
    </org-form-field>

    <org-form-field>
      <org-label label="Email" htmlFor="email-input" />
      <org-input name="email-input" type="email" placeholder="Enter your email" />
    </org-form-field>
  </org-form-fields>

  <!-- With different form elements -->
  <org-form-fields>
    <org-form-field>
      <org-label label="Description" htmlFor="description-textarea" />
      <org-textarea name="description-textarea" placeholder="Enter description..." />
    </org-form-field>

    <org-form-field>
      <org-checkbox name="accept-terms" value="yes">Accept terms and conditions</org-checkbox>
    </org-form-field>
  </org-form-fields>
  \`\`\`
</div>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<FormFields>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Default form fields container with basic text inputs. Use the controls below to interact with the component.',
      },
    },
  },
  render: () => ({
    template: `
      <org-form-fields>
        <org-form-field>
          <org-label label="First Name" htmlFor="first-name-input" />
          <org-input name="first-name-input" placeholder="Enter your first name" />
        </org-form-field>

        <org-form-field>
          <org-label label="Last Name" htmlFor="last-name-input" />
          <org-input name="last-name-input" placeholder="Enter your last name" />
        </org-form-field>

        <org-form-field>
          <org-label label="Email" htmlFor="email-input" />
          <org-input name="email-input" type="email" placeholder="Enter your email" />
        </org-form-field>
      </org-form-fields>
    `,
    moduleMetadata: {
      imports: [FormFields, FormField, Label, Input],
    },
  }),
};

export const WithMixedFormElements: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Form fields container with different types of form elements (inputs, textareas, checkboxes).',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Mixed Form Elements"
        currentState="Showing various form element types with consistent spacing"
      >
        <org-storybook-example-container-section label="Text Input + Textarea + Checkbox">
          <org-form-fields>
            <org-form-field>
              <org-label label="Name" htmlFor="name-input-mixed" />
              <org-input name="name-input-mixed" placeholder="Enter your name" />
            </org-form-field>

            <org-form-field>
              <org-label label="Email" htmlFor="email-input-mixed" />
              <org-input name="email-input-mixed" type="email" placeholder="Enter your email" />
            </org-form-field>

            <org-form-field>
              <org-label label="Message" htmlFor="message-textarea-mixed" />
              <org-textarea name="message-textarea-mixed" placeholder="Enter your message..." />
            </org-form-field>

            <org-form-field>
              <org-checkbox name="subscribe-checkbox-mixed" value="subscribe">Subscribe to newsletter</org-checkbox>
            </org-form-field>
          </org-form-fields>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>All form elements maintain consistent vertical spacing (gap-1)</li>
          <li>Works seamlessly with inputs, textareas, checkboxes, and labels</li>
          <li>Labels and their corresponding inputs are grouped naturally</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [
        FormFields,
        FormField,
        Label,
        Input,
        Textarea,
        Checkbox,
        StorybookExampleContainer,
        StorybookExampleContainerSection,
      ],
    },
  }),
};

export const WithValidation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Form fields container with validation messages displayed under inputs.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="With Validation Messages"
        currentState="Showing form fields with validation errors"
      >
        <org-storybook-example-container-section label="Valid and Invalid Inputs">
          <org-form-fields>
            <org-form-field>
              <org-label label="Email (Valid)" htmlFor="email-valid-input" />
              <org-input name="email-valid-input" type="email" placeholder="Enter email" value="user@example.com" />
            </org-form-field>

            <org-form-field validationMessage="Please enter a valid email address">
              <org-label label="Email (Invalid)" htmlFor="email-invalid-input" />
              <org-input
                name="email-invalid-input"
                type="email"
                placeholder="Enter email"
                value="invalid@"
              />
            </org-form-field>

            <org-form-field validationMessage="Password must be at least 8 characters">
              <org-label label="Password (Invalid)" htmlFor="password-invalid-input" />
              <org-input
                name="password-invalid-input"
                type="password"
                placeholder="Enter password"
                value="123"
              />
            </org-form-field>
          </org-form-fields>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>Validation messages appear below their respective inputs</li>
          <li>Spacing remains consistent even with validation messages</li>
          <li>Error styling is applied to invalid inputs</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [FormFields, FormField, Label, Input, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const MultipleGroups: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multiple form fields groups can be used to organize related fields into sections.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Multiple Form Field Groups"
        currentState="Showing multiple form field containers for organizing sections"
      >
        <org-storybook-example-container-section label="Personal Information + Account Details">
          <div class="space-y-6">
            <div>
              <h3 class="mb-2 text-base font-semibold">Personal Information</h3>
              <org-form-fields>
                <org-form-field>
                  <org-label label="First Name" htmlFor="first-name-multi" />
                  <org-input name="first-name-multi" placeholder="Enter first name" />
                </org-form-field>

                <org-form-field>
                  <org-label label="Last Name" htmlFor="last-name-multi" />
                  <org-input name="last-name-multi" placeholder="Enter last name" />
                </org-form-field>
              </org-form-fields>
            </div>

            <div>
              <h3 class="mb-2 text-base font-semibold">Account Details</h3>
              <org-form-fields>
                <org-form-field>
                  <org-label label="Username" htmlFor="username-multi" />
                  <org-input name="username-multi" placeholder="Enter username" />
                </org-form-field>

                <org-form-field>
                  <org-label label="Password" htmlFor="password-multi" />
                  <org-input name="password-multi" type="password" placeholder="Enter password" />
                </org-form-field>
              </org-form-fields>
            </div>
          </div>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>Multiple form-fields containers can be used to organize form sections</li>
          <li>Each container maintains its own internal spacing</li>
          <li>Additional spacing between containers should be handled externally</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [FormFields, FormField, Label, Input, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const WithInputIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Form fields container works seamlessly with inputs that have pre and post icons.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="With Input Icons"
        currentState="Form fields with icon-enhanced inputs"
      >
        <org-storybook-example-container-section label="Inputs With Icons">
          <org-form-fields>
            <org-form-field>
              <org-label label="Search" htmlFor="search-icon-input" />
              <org-input name="search-icon-input" preIcon="magnifying-glass" placeholder="Search..." />
            </org-form-field>

            <org-form-field>
              <org-label label="Email" htmlFor="email-icon-input" />
              <org-input name="email-icon-input" preIcon="envelope" type="email" placeholder="Enter email" />
            </org-form-field>

            <org-form-field>
              <org-label label="Password" htmlFor="password-icon-input" />
              <org-input
                name="password-icon-input"
                type="password"
                [showPasswordToggle]="true"
                placeholder="Enter password"
              />
            </org-form-field>
          </org-form-fields>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>Icons in inputs don't affect the consistent spacing</li>
          <li>Works with pre-icons, post-icons, and password toggles</li>
          <li>Labels align properly regardless of input icon configuration</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [FormFields, FormField, Label, Input, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

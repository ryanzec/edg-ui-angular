import type { Meta, StoryObj } from '@storybook/angular';
import { Radio } from './radio';
import { RadioGroup } from './radio-group';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Label } from '../label/label';
import { FormFields } from '../form-fields/form-fields';
import { FormField } from '../form-field/form-field';

const meta: Meta<Radio> = {
  title: 'Core/Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Radio Component

  A radio button component designed for use with the RadioGroup component. Features custom icon-based styling.

  ### Features
  - Custom icon-based visual representation (no default radio button)
  - Two states: unchecked and checked
  - Three size options: small, base, and large
  - Reactive forms integration via RadioGroup component
  - Accessible with proper ARIA attributes
  - Keyboard navigation support (Space and Enter keys)

  ### States
  - **Unchecked**: Shows circle icon
  - **Checked**: Shows check-circle icon

  ### Sizes
  - **Small**: Compact radio for tight spaces
  - **Base**: Standard radio size (default)
  - **Large**: Prominent radio for emphasis

  ### Usage Examples
  \`\`\`html
  <!-- Recommended: With reactive forms using RadioGroup -->
  <form [formGroup]="myForm">
    <org-form-fields>
      <org-form-field>
      <org-label [asLabel]="false" [label]="'Notifications'" />
        <org-radio-group formControlName="preference" name="preference">
          <org-radio value="option1">Option 1</org-radio>
          <org-radio value="option2">Option 2</org-radio>
          <org-radio value="option3">Option 3</org-radio>
        </org-radio-group>
      </org-form-field>
    </org-form-fields>
  </form>

  <!-- Different sizes -->
  <org-form-fields>
    <org-form-field>
      <org-radio-group formControlName="size" name="size">
        <org-radio value="small" size="sm">Small radio</org-radio>
        <org-radio value="base" size="base">Base radio</org-radio>
        <org-radio value="large" size="lg">Large radio</org-radio>
      </org-radio-group>
    </org-form-field>
  </org-form-fields>

  <!-- Standalone usage (for display purposes) -->
  <org-radio value="option1">Standalone radio</org-radio>
  \`\`\`
</div>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<Radio>;

export const Default: Story = {
  args: {
    name: 'radio',
    value: 'value',
    size: 'sm',
    containerClass: '',
  },
  argTypes: {
    name: {
      control: 'text',
      description:
        'The name attribute for the radio input element (optional, but recommended when not using RadioGroup)',
    },
    value: {
      control: 'text',
      description: 'Value attribute for the radio input (required)',
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
      description: 'Size of the radio icon',
    },
    containerClass: {
      control: 'text',
      description: 'Additional CSS classes for the container',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default radio component. Note: For interactive usage with forms, use the RadioGroup component (see ReactiveFormIntegration story).',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <org-radio
        [name]="name"
        [value]="value"
        [size]="size"
        [containerClass]="containerClass"
      >
        Radio Label
      </org-radio>
    `,
    moduleMetadata: {
      imports: [Radio],
    },
  }),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all three size variants: small, base, and large.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Radio Sizes"
        currentState="Comparing small, base, and large sizes"
      >
        <org-storybook-example-container-section label="Small">
          <org-radio name="radio-sizes" value="small" size="sm">
            Small radio
          </org-radio>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Base (Default)">
          <org-radio name="radio-sizes" value="base" size="base">
            Base radio
          </org-radio>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Large">
          <org-radio name="radio-sizes" value="large" size="lg">
            Large radio
          </org-radio>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Small</strong>: Compact radio for tight spaces</li>
          <li><strong>Base</strong>: Standard radio size (default)</li>
          <li><strong>Large</strong>: Prominent radio for emphasis</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Radio, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of radio states: unchecked and checked.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Radio States"
        currentState="Comparing unchecked and checked states"
      >
        <org-storybook-example-container-section label="Unchecked">
          <org-radio name="radio-states" value="unchecked">
            Unchecked radio
          </org-radio>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Note">
          <div class="text-sm text-neutral-text-subtle">
            Radio checked states are managed by the RadioGroup component.
            See the ReactiveFormIntegration story for interactive examples.
          </div>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Unchecked</strong>: Shows circle icon (default state)</li>
          <li><strong>Checked states</strong>: Managed by RadioGroup component in forms</li>
          <li>For interactive radio groups, use org-radio-group with reactive forms</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Radio, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const GroupedRadios: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Radios grouped using the flexbox for consistent spacing.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Grouped Radios"
        currentState="Using flexbox for consistent spacing"
      >
        <org-storybook-example-container-section label="Vertical Group (Column)">
          <div class="flex flex-col gap-1">
            <org-radio name="radio-vertical" value="option1">Option 1</org-radio>
            <org-radio name="radio-vertical" value="option2">Option 2</org-radio>
            <org-radio name="radio-vertical" value="option3">Option 3</org-radio>
            <org-radio name="radio-vertical" value="option4">Option 4</org-radio>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Horizontal Group (Row)">
          <div class="flex flex-row gap-1">
            <org-radio name="radio-horizontal" value="h-option1">Option 1</org-radio>
            <org-radio name="radio-horizontal" value="h-option2">Option 2</org-radio>
            <org-radio name="radio-horizontal" value="h-option3">Option 3</org-radio>
          </div>
        </org-storybook-example-container-section>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Radio, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

@Component({
  selector: 'org-radio-reactive-form-story',
  template: `
    <org-storybook-example-container
      title="Reactive Form Integration"
      [currentState]="'Form Valid: ' + radioForm.valid + ', Selected Value: ' + formValueDisplay()"
    >
      <org-storybook-example-container-section label="Radio Group in Form">
        <form [formGroup]="radioForm">
          <org-form-fields>
            <org-form-field>
              <org-label [asLabel]="false" [label]="'Notifications'" />
              <org-radio-group formControlName="preference" name="preference">
                <org-radio value="email">Email notifications</org-radio>
                <org-radio value="sms">SMS notifications</org-radio>
                <org-radio value="push">Push notifications</org-radio>
                <org-radio value="none">No notifications</org-radio>
              </org-radio-group>
            </org-form-field>
          </org-form-fields>
        </form>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
        <li>Use <strong>org-radio-group</strong> with <strong>formControlName</strong> for reactive forms</li>
        <li>RadioGroup manages the selected value and syncs all child radios</li>
        <li>Form state updates automatically when radios are selected</li>
        <li>Only one radio can be selected at a time within a group</li>
        <li>Much simpler than manually managing checked states</li>
      </ul>
    </org-storybook-example-container>
  `,
  imports: [
    Radio,
    Label,
    FormFields,
    FormField,
    RadioGroup,
    StorybookExampleContainer,
    StorybookExampleContainerSection,
    ReactiveFormsModule,
  ],
})
class RadioReactiveFormStory {
  public radioForm = new FormGroup({
    preference: new FormControl('email', { nonNullable: true }),
  });

  public formValueDisplay = signal<string>(JSON.stringify(this.radioForm.value.preference));

  constructor() {
    this.radioForm.valueChanges.subscribe(() => {
      this.formValueDisplay.set(JSON.stringify(this.radioForm.value.preference));
    });
  }
}

export const ReactiveFormIntegration: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Example of integrating radios with Angular reactive forms using the RadioGroup component. This is the recommended approach for form integration.',
      },
    },
  },
  render: () => ({
    template: `<org-radio-reactive-form-story />`,
    moduleMetadata: {
      imports: [RadioReactiveFormStory],
    },
  }),
};

@Component({
  selector: 'org-radio-multiple-groups-story',
  template: `
    <org-storybook-example-container
      title="Multiple Radio Groups"
      [currentState]="'Shipping: ' + multiForm.value.shipping + ', Payment: ' + multiForm.value.payment"
    >
      <form [formGroup]="multiForm">
        <org-form-fields>
          <org-form-field>
            <org-label [asLabel]="false" [label]="'Shipping Method'" />
            <org-radio-group formControlName="shipping" name="shipping">
              <org-radio value="standard">Standard (5-7 business days)</org-radio>
              <org-radio value="express">Express (2-3 business days)</org-radio>
              <org-radio value="overnight">Overnight (next business day)</org-radio>
            </org-radio-group>
          </org-form-field>
          <org-form-field>
            <org-label [asLabel]="false" [label]="'Payment Method'" />
            <org-radio-group formControlName="payment" name="payment">
              <org-radio value="credit">Credit Card</org-radio>
              <org-radio value="debit">Debit Card</org-radio>
              <org-radio value="paypal">PayPal</org-radio>
            </org-radio-group>
          </org-form-field>
        </org-form-fields>
      </form>

      <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
        <li>Each <strong>org-radio-group</strong> creates a separate radio group</li>
        <li>Each group maintains its own selection state independently</li>
        <li>Selecting a radio in one group does not affect other groups</li>
        <li>Clean separation of concerns with RadioGroup managing each group's state</li>
      </ul>
    </org-storybook-example-container>
  `,
  imports: [
    Radio,
    Label,
    FormFields,
    FormField,
    RadioGroup,
    StorybookExampleContainer,
    StorybookExampleContainerSection,
    ReactiveFormsModule,
  ],
})
class RadioMultipleGroupsStory {
  public multiForm = new FormGroup({
    shipping: new FormControl('standard', { nonNullable: true }),
    payment: new FormControl('credit', { nonNullable: true }),
  });
}

export const MultipleGroups: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example showing multiple independent radio groups on the same page.',
      },
    },
  },
  render: () => ({
    template: `<org-radio-multiple-groups-story />`,
    moduleMetadata: {
      imports: [RadioMultipleGroupsStory],
    },
  }),
};

@Component({
  selector: 'org-radio-validation-story',
  template: `
    <org-storybook-example-container
      title="Radio Group Validation"
      [currentState]="
        'Form Valid: ' + validationForm.valid + ', Selected Value: ' + (validationForm.value.option || 'none')
      "
    >
      <form [formGroup]="validationForm">
        <org-form-fields>
          <org-form-field validationMessage="Please select an option to continue">
            <org-label [asLabel]="false" [label]="'Radio Group with Validation Error'" />
            <org-radio-group formControlName="option" name="option">
              <org-radio value="option1">Option 1</org-radio>
              <org-radio value="option2">Option 2</org-radio>
              <org-radio value="option3">Option 3</org-radio>
            </org-radio-group>
          </org-form-field>
          <org-form-field>
            <org-label [asLabel]="false" [label]="'Radio Group with Validation Error'" />
            <org-radio-group formControlName="valid" name="valid">
              <org-radio value="yes">Yes</org-radio>
              <org-radio value="no">No</org-radio>
            </org-radio-group>
          </org-form-field>
        </org-form-fields>
      </form>

      <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
        <li>Validation message appears below the radio group when provided</li>
        <li>Message uses <strong>text-validation-error-text</strong> color (danger/red)</li>
        <li>Message is visible only when validationMessage input is provided</li>
        <li>Proper ARIA attributes for accessibility (aria-invalid, aria-describedby)</li>
        <li>Message uses role="alert" and aria-live="polite" for screen readers</li>
      </ul>
    </org-storybook-example-container>
  `,
  imports: [
    Radio,
    RadioGroup,
    Label,
    FormFields,
    FormField,
    StorybookExampleContainer,
    StorybookExampleContainerSection,
    ReactiveFormsModule,
  ],
})
class RadioValidationStory {
  public validationForm = new FormGroup({
    option: new FormControl('', { nonNullable: true }),
    valid: new FormControl('yes', { nonNullable: true }),
  });
}

export const Validation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Example showing radio groups with validation messages. The validation message is displayed below the radio group when provided.',
      },
    },
  },
  render: () => ({
    template: `<org-radio-validation-story />`,
    moduleMetadata: {
      imports: [RadioValidationStory],
    },
  }),
};

export const ValidationSpaceReservation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Comparison of validation space reservation behavior. When reserveValidationSpace is true, space is always reserved for validation messages to maintain consistent layout. When false, space is only used when a validation message is present.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Validation Space Reservation"
        currentState="Comparing space reservation behaviors"
      >
        <org-storybook-example-container-section label="Reserve Space = true (default)">
          <org-form-fields>
            <org-form-field [reserveValidationSpace]="true">
              <org-radio-group name="reserve-true-group-1">
                <org-radio value="option1">Option 1 (no error)</org-radio>
                <org-radio value="option2">Option 2 (no error)</org-radio>
              </org-radio-group>
            </org-form-field>
            <org-form-field [reserveValidationSpace]="true" validationMessage="This field has an error">
              <org-radio-group name="reserve-true-group-2">
                <org-radio value="option1">Option 1 (with error)</org-radio>
                <org-radio value="option2">Option 2 (with error)</org-radio>
              </org-radio-group>
            </org-form-field>
            <org-form-field [reserveValidationSpace]="true">
              <org-radio-group name="reserve-true-group-3">
                <org-radio value="option1">Option 1 (no error)</org-radio>
                <org-radio value="option2">Option 2 (no error)</org-radio>
              </org-radio-group>
            </org-form-field>
          </org-form-fields>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Reserve Space = false">
          <org-form-fields>
            <org-form-field [reserveValidationSpace]="false">
              <org-radio-group name="reserve-false-group-1">
                <org-radio value="option1">Option 1 (no error)</org-radio>
                <org-radio value="option2">Option 2 (no error)</org-radio>
              </org-radio-group>
            </org-form-field>
            <org-form-field [reserveValidationSpace]="false" validationMessage="This field has an error">
              <org-radio-group name="reserve-false-group-2">
                <org-radio value="option1">Option 1 (with error)</org-radio>
                <org-radio value="option2">Option 2 (with error)</org-radio>
              </org-radio-group>
            </org-form-field>
            <org-form-field [reserveValidationSpace]="false">
              <org-radio-group name="reserve-false-group-3">
                <org-radio value="option1">Option 1 (no error)</org-radio>
                <org-radio value="option2">Option 2 (no error)</org-radio>
              </org-radio-group>
            </org-form-field>
          </org-form-fields>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>reserveValidationSpace=true</strong>: Space is always reserved for validation messages (maintains consistent spacing between radio groups)</li>
          <li><strong>reserveValidationSpace=false</strong>: Space is only allocated when a validation message is present (radio groups collapse together when no errors)</li>
          <li>Notice how the left column maintains equal spacing between all radio groups</li>
          <li>Notice how the right column's radio groups 1 and 3 are closer together since they have no error messages</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Radio, RadioGroup, FormField, FormFields, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

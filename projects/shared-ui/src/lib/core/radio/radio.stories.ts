import type { Meta, StoryObj } from '@storybook/angular';
import { Radio } from './radio';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';
import { GroupElementsDirective } from '../group-elements-directive/group-elements-directive';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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

  A radio button component designed for use in and out of forms with custom icon-based styling.

  ### Features
  - Custom icon-based visual representation (no default radio button)
  - Two states: unchecked and checked
  - Three size options: small, base, and large
  - Form integration support with reactive forms
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
  <!-- Basic radio -->
  <org-radio name="choice" value="option1">
    Option 1
  </org-radio>

  <!-- Radio with checked state -->
  <org-radio name="choice" value="option2" [checked]="true">
    Option 2
  </org-radio>

  <!-- Different sizes -->
  <org-radio name="size-choice" value="small" size="sm">
    Small radio
  </org-radio>
  <org-radio name="size-choice" value="large" size="lg">
    Large radio
  </org-radio>

  <!-- Radio group -->
  <div orgGroupElements flexDirection="col">
    <org-radio name="group1" value="option1" [checked]="selectedValue === 'option1'">Option 1</org-radio>
    <org-radio name="group1" value="option2" [checked]="selectedValue === 'option2'">Option 2</org-radio>
    <org-radio name="group1" value="option3" [checked]="selectedValue === 'option3'">Option 3</org-radio>
  </div>

  <!-- With reactive forms -->
  <form [formGroup]="myForm">
    <org-radio
      name="selection"
      value="option1"
      [checked]="myForm.value.selection === 'option1'"
      (checkedChange)="myForm.patchValue({ selection: 'option1' })"
    >
      Option 1
    </org-radio>
  </form>
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
    checked: false,
    size: 'base',
    containerClass: '',
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Name attribute for the radio input (required)',
    },
    value: {
      control: 'text',
      description: 'Value attribute for the radio input (required)',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
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
        story: 'Default radio with all controls. Use the controls below to interact with the component.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <org-radio
        [name]="name"
        [value]="value"
        [checked]="checked"
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
          <org-radio name="small" value="small" size="sm" [checked]="true">
            Small radio
          </org-radio>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Base (Default)">
          <org-radio name="base" value="base" size="base" [checked]="true">
            Base radio
          </org-radio>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Large">
          <org-radio name="large" value="large" size="lg" [checked]="true">
            Large radio
          </org-radio>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
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
          <org-radio name="unchecked" value="unchecked">
            Unchecked radio
          </org-radio>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Checked">
          <org-radio name="checked" value="checked" [checked]="true">
            Checked radio
          </org-radio>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Unchecked</strong>: Shows circle icon, clicking will check it</li>
          <li><strong>Checked</strong>: Shows check-circle icon, cannot be unchecked by clicking (radio behavior)</li>
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
        story: 'Radios grouped using the GroupElementsDirective for consistent spacing.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Grouped Radios"
        currentState="Using GroupElementsDirective for consistent spacing"
      >
        <org-storybook-example-container-section label="Vertical Group (Column)">
          <div orgGroupElements flexDirection="col">
            <org-radio name="vertical-group" value="option1">
              Option 1
            </org-radio>
            <org-radio name="vertical-group" value="option2" [checked]="true">
              Option 2 (checked)
            </org-radio>
            <org-radio name="vertical-group" value="option3">
              Option 3
            </org-radio>
            <org-radio name="vertical-group" value="option4">
              Option 4
            </org-radio>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Horizontal Group (Row)">
          <div orgGroupElements flexDirection="row">
            <org-radio name="horizontal-group" value="h-option1">
              Option 1
            </org-radio>
            <org-radio name="horizontal-group" value="h-option2" [checked]="true">
              Option 2
            </org-radio>
            <org-radio name="horizontal-group" value="h-option3">
              Option 3
            </org-radio>
          </div>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>Use <strong>orgGroupElements</strong> directive with <strong>flexDirection="col"</strong> for vertical spacing</li>
          <li>Use <strong>orgGroupElements</strong> directive with <strong>flexDirection="row"</strong> for horizontal spacing</li>
          <li>Provides consistent gap-2 spacing between radios</li>
          <li>Radios with the same name attribute form a radio group (only one can be selected)</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Radio, StorybookExampleContainer, StorybookExampleContainerSection, GroupElementsDirective],
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
        <form [formGroup]="radioForm" orgGroupElements flexDirection="col">
          <org-radio
            name="preference"
            value="email"
            [checked]="radioForm.value.preference === 'email'"
            (checkedChange)="onRadioChange('email')"
          >
            Email notifications
          </org-radio>
          <org-radio
            name="preference"
            value="sms"
            [checked]="radioForm.value.preference === 'sms'"
            (checkedChange)="onRadioChange('sms')"
          >
            SMS notifications
          </org-radio>
          <org-radio
            name="preference"
            value="push"
            [checked]="radioForm.value.preference === 'push'"
            (checkedChange)="onRadioChange('push')"
          >
            Push notifications
          </org-radio>
          <org-radio
            name="preference"
            value="none"
            [checked]="radioForm.value.preference === 'none'"
            (checkedChange)="onRadioChange('none')"
          >
            No notifications
          </org-radio>
        </form>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li>Radios emit <strong>checkedChange</strong> events when selected</li>
        <li>Can be integrated with reactive forms by handling change events</li>
        <li>Form state updates in real-time as radios are selected</li>
        <li>Only one radio can be selected at a time within a group</li>
      </ul>
    </org-storybook-example-container>
  `,
  imports: [
    Radio,
    StorybookExampleContainer,
    StorybookExampleContainerSection,
    GroupElementsDirective,
    ReactiveFormsModule,
  ],
})
class RadioReactiveFormStory {
  public radioForm = new FormGroup({
    preference: new FormControl('email', { nonNullable: true }),
  });

  public formValueDisplay = signal<string>(JSON.stringify(this.radioForm.value.preference));

  public onRadioChange(value: string): void {
    this.radioForm.patchValue({ preference: value });
    this.formValueDisplay.set(JSON.stringify(this.radioForm.value.preference));
  }
}

export const ReactiveFormIntegration: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example of integrating radios with Angular reactive forms.',
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
      [currentState]="'Shipping: ' + shippingMethod() + ', Payment: ' + paymentMethod()"
    >
      <org-storybook-example-container-section label="Shipping Method">
        <div orgGroupElements flexDirection="col">
          <org-radio
            name="shipping"
            value="standard"
            [checked]="shippingMethod() === 'standard'"
            (checkedChange)="onShippingChange('standard')"
          >
            Standard (5-7 business days)
          </org-radio>
          <org-radio
            name="shipping"
            value="express"
            [checked]="shippingMethod() === 'express'"
            (checkedChange)="onShippingChange('express')"
          >
            Express (2-3 business days)
          </org-radio>
          <org-radio
            name="shipping"
            value="overnight"
            [checked]="shippingMethod() === 'overnight'"
            (checkedChange)="onShippingChange('overnight')"
          >
            Overnight (next business day)
          </org-radio>
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Payment Method">
        <div orgGroupElements flexDirection="col">
          <org-radio
            name="payment"
            value="credit"
            [checked]="paymentMethod() === 'credit'"
            (checkedChange)="onPaymentChange('credit')"
          >
            Credit Card
          </org-radio>
          <org-radio
            name="payment"
            value="debit"
            [checked]="paymentMethod() === 'debit'"
            (checkedChange)="onPaymentChange('debit')"
          >
            Debit Card
          </org-radio>
          <org-radio
            name="payment"
            value="paypal"
            [checked]="paymentMethod() === 'paypal'"
            (checkedChange)="onPaymentChange('paypal')"
          >
            PayPal
          </org-radio>
        </div>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li>Different <strong>name</strong> attributes create separate radio groups</li>
        <li>Each group maintains its own selection state independently</li>
        <li>Selecting a radio in one group does not affect other groups</li>
      </ul>
    </org-storybook-example-container>
  `,
  imports: [Radio, StorybookExampleContainer, StorybookExampleContainerSection, GroupElementsDirective],
})
class RadioMultipleGroupsStory {
  public shippingMethod = signal<string>('standard');
  public paymentMethod = signal<string>('credit');

  public onShippingChange(value: string): void {
    this.shippingMethod.set(value);
  }

  public onPaymentChange(value: string): void {
    this.paymentMethod.set(value);
  }
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

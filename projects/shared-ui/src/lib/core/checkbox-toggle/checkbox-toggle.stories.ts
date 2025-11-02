import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxToggle } from './checkbox-toggle';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFields } from '../form-fields/form-fields';
import { FormField } from '../form-field/form-field';

const meta: Meta<CheckboxToggle> = {
  title: 'Core/Components/Checkbox Toggle',
  component: CheckboxToggle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## CheckboxToggle Component

  A modern toggle switch component designed for use in and out of forms with custom styling.

  ### Features
  - Toggle switch visual representation
  - Optional display values: icons
  - Three size options: small, base, and large
  - Form integration support with reactive forms
  - Disabled state
  - Accessible with proper ARIA attributes
  - Keyboard navigation support (Space and Enter keys)

  ### States
  - **Off**: Shows off state with optional off icon
  - **On**: Shows on state with optional on icon

  ### Sizes
  - **Small**: Compact toggle for tight spaces (28x16px track)
  - **Base**: Standard toggle size (36x20px track, default)
  - **Large**: Prominent toggle for emphasis (44x24px track)

  ### Usage Examples
  \`\`\`html
  <!-- Basic toggle -->
  <org-checkbox-toggle name="notifications" value="enabled">
    Enable notifications
  </org-checkbox-toggle>

  <!-- Toggle with checked state -->
  <org-checkbox-toggle name="darkMode" value="dark" [checked]="true">
    Dark mode
  </org-checkbox-toggle>

  <!-- Toggle with icon display values -->
  <org-checkbox-toggle
    name="visibility"
    value="visible"
    onIcon="eye"
    offIcon="eye-slash"
  >
    Visibility
  </org-checkbox-toggle>

  <!-- Disabled toggle -->
  <org-checkbox-toggle name="disabled" value="value" [disabled]="true">
    Disabled option
  </org-checkbox-toggle>

  <!-- Different sizes -->
  <org-checkbox-toggle name="small" value="small" size="sm">
    Small toggle
  </org-checkbox-toggle>
  <org-checkbox-toggle name="large" value="large" size="lg">
    Large toggle
  </org-checkbox-toggle>

  <!-- With reactive forms -->
  <form [formGroup]="myForm">
    <org-form-fields>
      <org-form-field>
        <org-checkbox-toggle
          name="option1"
          value="option1"
          [checked]="myForm.value.option1 ?? false"
          (checkedChange)="myForm.patchValue({ option1: $event })"
        >
          Option 1
        </org-checkbox-toggle>
      </org-form-field>
    </org-form-fields>
  </form>
  \`\`\`
</div>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<CheckboxToggle>;

export const Default: Story = {
  args: {
    name: 'toggle',
    value: 'value',
    checked: false,
    disabled: false,
    size: 'base',
    containerClass: '',
    onIcon: null,
    offIcon: null,
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Name attribute for the toggle input (required)',
    },
    value: {
      control: 'text',
      description: 'Value attribute for the toggle input (required)',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
      description: 'Size of the toggle',
    },
    containerClass: {
      control: 'text',
      description: 'Additional CSS classes for the container',
    },
    onIcon: {
      control: 'text',
      description: 'Icon to display when toggle is on',
    },
    offIcon: {
      control: 'text',
      description: 'Icon to display when toggle is off',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default toggle with all controls. Use the controls below to interact with the component.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <org-checkbox-toggle
        [name]="name"
        [value]="value"
        [checked]="checked"
        [disabled]="disabled"
        [size]="size"
        [containerClass]="containerClass"
        [onIcon]="onIcon"
        [offIcon]="offIcon"
      >
        Toggle Label
      </org-checkbox-toggle>
    `,
    moduleMetadata: {
      imports: [CheckboxToggle],
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
        title="CheckboxToggle Sizes"
        currentState="Comparing small, base, and large sizes"
      >
        <org-storybook-example-container-section label="Small (Default)">
          <org-checkbox-toggle name="small" value="small" size="sm" [checked]="false">
            Small toggle
          </org-checkbox-toggle>
          <org-checkbox-toggle name="small" value="small" size="sm" [checked]="true">
            Small toggle
          </org-checkbox-toggle>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Base">
          <org-checkbox-toggle name="base" value="base" size="base" [checked]="false">
            Base toggle
          </org-checkbox-toggle>
          <org-checkbox-toggle name="base" value="base" size="base" [checked]="true">
            Base toggle
          </org-checkbox-toggle>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Large">
          <org-checkbox-toggle name="large" value="large" size="lg" [checked]="false">
            Large toggle
          </org-checkbox-toggle>
          <org-checkbox-toggle name="large" value="large" size="lg" [checked]="true">
            Large toggle
          </org-checkbox-toggle>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Small</strong>: 28x16px track with 12px thumb - compact toggle for tight spaces (default)</li>
          <li><strong>Base</strong>: 36x20px track with 16px thumb - standard toggle size</li>
          <li><strong>Large</strong>: 44x24px track with 20px thumb - prominent toggle for emphasis</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [CheckboxToggle, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of checked and unchecked states.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="CheckboxToggle States"
        currentState="Comparing off and on states"
      >
        <org-storybook-example-container-section label="Off">
          <org-checkbox-toggle name="unchecked" value="unchecked">
            Toggle off
          </org-checkbox-toggle>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="On">
          <org-checkbox-toggle name="checked" value="checked" [checked]="true">
            Toggle on
          </org-checkbox-toggle>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Off</strong>: Thumb positioned to the left, clicking will turn it on</li>
          <li><strong>On</strong>: Thumb positioned to the right, clicking will turn it off</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [CheckboxToggle, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const DisabledStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of disabled toggles in different states.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Disabled States"
        currentState="Comparing disabled toggles in different states"
      >
        <org-storybook-example-container-section label="Disabled Off">
          <org-checkbox-toggle name="disabled-off" value="disabled-off" [disabled]="true">
            Disabled off
          </org-checkbox-toggle>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Disabled On">
          <org-checkbox-toggle name="disabled-on" value="disabled-on" [disabled]="true" [checked]="true">
            Disabled on
          </org-checkbox-toggle>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li>Disabled toggles have reduced opacity</li>
          <li>Disabled toggles cannot be clicked or interacted with</li>
          <li>Cursor changes to not-allowed when hovering over disabled toggles</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [CheckboxToggle, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const WithIconDisplayValues: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Toggles showing icons inside the thumb (check/x, eye/eye-slash, etc.).',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Toggle with Icon Display Values"
        currentState="Showing icons inside the toggle thumb"
      >
        <org-storybook-example-container-section label="Check/X - Small (not officially supported)">
          <div class="flex flex-col gap-1">
            <org-checkbox-toggle
              name="checkx-off-small"
              value="checkx-off-small"
              onIcon="check"
              offIcon="x"
            >
              Approved (no)
            </org-checkbox-toggle>
            <org-checkbox-toggle
              name="checkx-on-small"
              value="checkx-on-small"
              [checked]="true"
              onIcon="check"
              offIcon="x"
            >
              Approved (yes)
            </org-checkbox-toggle>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Check/X - Base">
          <div class="flex flex-col gap-1">
            <org-checkbox-toggle
              name="checkx-off-base"
              value="checkx-off-base"
              onIcon="check"
              offIcon="x"
              size="base"
            >
              Approved (no)
            </org-checkbox-toggle>
            <org-checkbox-toggle
              name="checkx-on-base"
              value="checkx-on-base"
              [checked]="true"
              onIcon="check"
              offIcon="x"
              size="base"
            >
              Approved (yes)
            </org-checkbox-toggle>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Check/X - Large">
          <div class="flex flex-col gap-1">
            <org-checkbox-toggle
              name="checkx-off-large"
              value="checkx-off-large"
              size="lg"
              onIcon="check"
              offIcon="x"
            >
              Approved (no)
            </org-checkbox-toggle>
            <org-checkbox-toggle
              name="checkx-on-large"
              value="checkx-on-large"
              size="lg"
              [checked]="true"
              onIcon="check"
              offIcon="x"
            >
              Approved (yes)
            </org-checkbox-toggle>
          </div>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li>Icons display inside the toggle thumb</li>
          <li>Different icons can be shown for on and off states</li>
          <li>Icons scale appropriately for different sizes</li>
          <li>Common patterns: check/x, eye/eye-slash, lock icons</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [CheckboxToggle, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const GroupedToggles: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Toggles grouped using the flexbox for consistent spacing.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Grouped Toggles"
        currentState="Using flexbox for consistent spacing"
      >
        <org-storybook-example-container-section label="Vertical Group (Column)">
          <div class="flex flex-col gap-1">
            <org-checkbox-toggle name="option1" value="option1">
              Notifications
            </org-checkbox-toggle>
            <org-checkbox-toggle name="option2" value="option2" [checked]="true">
              Email alerts
            </org-checkbox-toggle>
            <org-checkbox-toggle name="option3" value="option3">
              SMS alerts
            </org-checkbox-toggle>
            <org-checkbox-toggle name="option4" value="option4" [disabled]="true">
              Push notifications (disabled)
            </org-checkbox-toggle>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Horizontal Group (Row)">
          <div class="flex flex-row gap-1">
            <org-checkbox-toggle name="h-option1" value="h-option1">
              WiFi
            </org-checkbox-toggle>
            <org-checkbox-toggle name="h-option2" value="h-option2" [checked]="true">
              Bluetooth
            </org-checkbox-toggle>
            <org-checkbox-toggle name="h-option3" value="h-option3">
              Airplane mode
            </org-checkbox-toggle>
          </div>
        </org-storybook-example-container-section>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [CheckboxToggle, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

@Component({
  selector: 'org-checkbox-toggle-reactive-form-story',
  template: `
    <org-storybook-example-container
      title="Reactive Form Integration"
      [currentState]="'Form Valid: ' + toggleForm.valid + ', Form Value: ' + formValueDisplay()"
    >
      <org-storybook-example-container-section label="Toggle Group in Form">
        <form [formGroup]="toggleForm" class="flex flex-col gap-1">
          <org-form-fields>
            <org-form-field>
              <org-checkbox-toggle
                name="notifications"
                value="notifications"
                [checked]="toggleForm.value.notifications ?? false"
                (checkedChange)="onNotificationsChange($event)"
              >
                Enable notifications
              </org-checkbox-toggle>
            </org-form-field>
            <org-form-field>
              <org-checkbox-toggle
                name="darkMode"
                value="darkMode"
                [checked]="toggleForm.value.darkMode ?? false"
                (checkedChange)="onDarkModeChange($event)"
              >
                Dark mode
              </org-checkbox-toggle>
            </org-form-field>
            <org-form-field>
              <org-checkbox-toggle
                name="autoSave"
                value="autoSave"
                [checked]="toggleForm.value.autoSave ?? false"
                (checkedChange)="onAutoSaveChange($event)"
              >
                Auto-save
              </org-checkbox-toggle>
            </org-form-field>
          </org-form-fields>
        </form>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
        <li>Toggles emit <strong>checkedChange</strong> events when toggled</li>
        <li>Can be integrated with reactive forms by handling change events</li>
        <li>Form state updates in real-time as toggles are changed</li>
      </ul>
    </org-storybook-example-container>
  `,
  imports: [
    CheckboxToggle,
    FormFields,
    FormField,
    StorybookExampleContainer,
    StorybookExampleContainerSection,
    ReactiveFormsModule,
  ],
})
class CheckboxToggleReactiveFormStory {
  public toggleForm = new FormGroup({
    notifications: new FormControl(false, { nonNullable: true }),
    darkMode: new FormControl(false, { nonNullable: true }),
    autoSave: new FormControl(true, { nonNullable: true }),
  });

  public formValueDisplay = signal<string>(JSON.stringify(this.toggleForm.value));

  public onNotificationsChange(checked: boolean): void {
    this.toggleForm.patchValue({ notifications: checked });
    this.formValueDisplay.set(JSON.stringify(this.toggleForm.value));
  }

  public onDarkModeChange(checked: boolean): void {
    this.toggleForm.patchValue({ darkMode: checked });
    this.formValueDisplay.set(JSON.stringify(this.toggleForm.value));
  }

  public onAutoSaveChange(checked: boolean): void {
    this.toggleForm.patchValue({ autoSave: checked });
    this.formValueDisplay.set(JSON.stringify(this.toggleForm.value));
  }
}

export const ReactiveFormIntegration: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example of integrating toggles with Angular reactive forms.',
      },
    },
  },
  render: () => ({
    template: `<org-checkbox-toggle-reactive-form-story />`,
    moduleMetadata: {
      imports: [CheckboxToggleReactiveFormStory],
    },
  }),
};

@Component({
  selector: 'org-checkbox-toggle-validation-story',
  template: `
    <org-storybook-example-container
      title="Checkbox Toggle Validation"
      [currentState]="
        'Form Valid: ' +
        validationForm.valid +
        ', Notifications Enabled: ' +
        (validationForm.value.notifications || false)
      "
    >
      <form [formGroup]="validationForm">
        <org-form-fields>
          <org-form-field validationMessage="You must enable notifications to receive important updates">
            <org-checkbox-toggle formControlName="notifications" name="notifications" value="enabled">
              Enable Notifications *
            </org-checkbox-toggle>
          </org-form-field>
          <org-form-field>
            <org-checkbox-toggle formControlName="marketing" name="marketing" value="enabled">
              Receive Marketing Emails
            </org-checkbox-toggle>
          </org-form-field>
        </org-form-fields>
      </form>

      <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
        <li>Validation message appears below the toggle when provided</li>
        <li>Message uses <strong>text-validation-error-text</strong> color (danger/red)</li>
        <li>Message is visible only when validationMessage input is provided</li>
        <li>Proper ARIA attributes for accessibility (aria-invalid, aria-describedby)</li>
        <li>Message uses role="alert" and aria-live="polite" for screen readers</li>
      </ul>
    </org-storybook-example-container>
  `,
  imports: [
    CheckboxToggle,
    FormFields,
    FormField,
    StorybookExampleContainer,
    StorybookExampleContainerSection,
    ReactiveFormsModule,
  ],
})
class CheckboxToggleValidationStory {
  public validationForm = new FormGroup({
    notifications: new FormControl(false, { nonNullable: true }),
    marketing: new FormControl(true, { nonNullable: true }),
  });
}

export const Validation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Example showing toggles with validation messages. The validation message is displayed below the toggle when provided.',
      },
    },
  },
  render: () => ({
    template: `<org-checkbox-toggle-validation-story />`,
    moduleMetadata: {
      imports: [CheckboxToggleValidationStory],
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
              <org-checkbox-toggle
                name="reserve-true-toggle-1"
                value="1"
              >
                Toggle 1 (no error)
              </org-checkbox-toggle>
            </org-form-field>
            <org-form-field [reserveValidationSpace]="true" validationMessage="This field has an error">
              <org-checkbox-toggle
                name="reserve-true-toggle-2"
                value="2"
              >
                Toggle 2 (with error)
              </org-checkbox-toggle>
            </org-form-field>
            <org-form-field [reserveValidationSpace]="true">
              <org-checkbox-toggle
                name="reserve-true-toggle-3"
                value="3"
              >
                Toggle 3 (no error)
              </org-checkbox-toggle>
            </org-form-field>
          </org-form-fields>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Reserve Space = false">
          <org-form-fields>
            <org-form-field [reserveValidationSpace]="false">
              <org-checkbox-toggle
                name="reserve-false-toggle-1"
                value="1"
              >
                Toggle 1 (no error)
              </org-checkbox-toggle>
            </org-form-field>
            <org-form-field [reserveValidationSpace]="false" validationMessage="This field has an error">
              <org-checkbox-toggle
                name="reserve-false-toggle-2"
                value="2"
              >
                Toggle 2 (with error)
              </org-checkbox-toggle>
            </org-form-field>
            <org-form-field [reserveValidationSpace]="false">
              <org-checkbox-toggle
                name="reserve-false-toggle-3"
                value="3"
              >
                Toggle 3 (no error)
              </org-checkbox-toggle>
            </org-form-field>
          </org-form-fields>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>reserveValidationSpace=true</strong>: Space is always reserved for validation messages (maintains consistent spacing between toggles)</li>
          <li><strong>reserveValidationSpace=false</strong>: Space is only allocated when a validation message is present (toggles collapse together when no errors)</li>
          <li>Notice how the left column maintains equal spacing between all toggles</li>
          <li>Notice how the right column's toggles 1 and 3 are closer together since they have no error messages</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [CheckboxToggle, FormField, FormFields, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

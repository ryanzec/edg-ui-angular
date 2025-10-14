import type { Meta, StoryObj } from '@storybook/angular';
import { Checkbox } from './checkbox';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

const meta: Meta<Checkbox> = {
  title: 'Core/Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Checkbox Component

  A checkbox component designed for use in and out of forms with custom icon-based styling.

  ### Features
  - Custom icon-based visual representation (no default checkbox)
  - Three states: unchecked, checked, and indeterminate
  - Three size options: small, base, and large
  - Form integration support with reactive forms
  - Disabled state
  - Accessible with proper ARIA attributes
  - Keyboard navigation support (Space and Enter keys)

  ### States
  - **Unchecked**: Shows square icon
  - **Checked**: Shows check-square icon
  - **Indeterminate**: Shows minus-square icon (useful for "select all" scenarios)

  ### Sizes
  - **Small**: Compact checkbox for tight spaces
  - **Base**: Standard checkbox size (default)
  - **Large**: Prominent checkbox for emphasis

  ### Usage Examples
  \`\`\`html
  <!-- Basic checkbox -->
  <org-checkbox name="agree" value="yes">
    I agree to the terms
  </org-checkbox>

  <!-- Checkbox with checked state -->
  <org-checkbox name="newsletter" value="subscribe" [checked]="true">
    Subscribe to newsletter
  </org-checkbox>

  <!-- Checkbox with indeterminate state -->
  <org-checkbox name="selectAll" value="all" [indeterminate]="true">
    Select All
  </org-checkbox>

  <!-- Disabled checkbox -->
  <org-checkbox name="disabled" value="value" [disabled]="true">
    Disabled option
  </org-checkbox>

  <!-- Different sizes -->
  <org-checkbox name="small" value="small" size="sm">
    Small checkbox
  </org-checkbox>
  <org-checkbox name="large" value="large" size="lg">
    Large checkbox
  </org-checkbox>

  <!-- With reactive forms -->
  <form [formGroup]="myForm">
    <org-checkbox
      name="option1"
      value="option1"
      [checked]="myForm.value.option1 ?? false"
      (checkedChange)="myForm.patchValue({ option1: $event })"
    >
      Option 1
    </org-checkbox>
  </form>
  \`\`\`
</div>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<Checkbox>;

export const Default: Story = {
  args: {
    name: 'checkbox',
    value: 'value',
    checked: false,
    indeterminate: false,
    disabled: false,
    size: 'base',
    containerClass: '',
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Name attribute for the checkbox input (required)',
    },
    value: {
      control: 'text',
      description: 'Value attribute for the checkbox input (required)',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
      description: 'Size of the checkbox icon',
    },
    containerClass: {
      control: 'text',
      description: 'Additional CSS classes for the container',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default checkbox with all controls. Use the controls below to interact with the component.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <org-checkbox
        [name]="name"
        [value]="value"
        [checked]="checked"
        [indeterminate]="indeterminate"
        [disabled]="disabled"
        [size]="size"
        [containerClass]="containerClass"
      >
        Checkbox Label
      </org-checkbox>
    `,
    moduleMetadata: {
      imports: [Checkbox],
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
        title="Checkbox Sizes"
        currentState="Comparing small, base, and large sizes"
      >
        <org-storybook-example-container-section label="Small">
          <org-checkbox name="small" value="small" size="sm" [checked]="true">
            Small checkbox
          </org-checkbox>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Base (Default)">
          <org-checkbox name="base" value="base" size="base" [checked]="true">
            Base checkbox
          </org-checkbox>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Large">
          <org-checkbox name="large" value="large" size="lg" [checked]="true">
            Large checkbox
          </org-checkbox>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Small</strong>: Compact checkbox for tight spaces</li>
          <li><strong>Base</strong>: Standard checkbox size (default)</li>
          <li><strong>Large</strong>: Prominent checkbox for emphasis</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Checkbox, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all three checkbox states: unchecked, checked, and indeterminate.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Checkbox States"
        currentState="Comparing unchecked, checked, and indeterminate states"
      >
        <org-storybook-example-container-section label="Unchecked">
          <org-checkbox name="unchecked" value="unchecked">
            Unchecked checkbox
          </org-checkbox>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Checked">
          <org-checkbox name="checked" value="checked" [checked]="true">
            Checked checkbox
          </org-checkbox>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Indeterminate">
          <org-checkbox name="indeterminate" value="indeterminate" [indeterminate]="true">
            Indeterminate checkbox
          </org-checkbox>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Unchecked</strong>: Shows square icon, clicking will check it</li>
          <li><strong>Checked</strong>: Shows check-square icon, clicking will uncheck it</li>
          <li><strong>Indeterminate</strong>: Shows minus-square icon, clicking will check it</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Checkbox, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const DisabledStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of disabled checkboxes in different states.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Disabled States"
        currentState="Comparing disabled checkboxes in different states"
      >
        <org-storybook-example-container-section label="Disabled Unchecked">
          <org-checkbox name="disabled-unchecked" value="disabled-unchecked" [disabled]="true">
            Disabled unchecked
          </org-checkbox>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Disabled Checked">
          <org-checkbox name="disabled-checked" value="disabled-checked" [disabled]="true" [checked]="true">
            Disabled checked
          </org-checkbox>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Disabled Indeterminate">
          <org-checkbox name="disabled-indeterminate" value="disabled-indeterminate" [disabled]="true" [indeterminate]="true">
            Disabled indeterminate
          </org-checkbox>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>Disabled checkboxes have reduced opacity</li>
          <li>Disabled checkboxes cannot be clicked or interacted with</li>
          <li>Cursor changes to not-allowed when hovering over disabled checkboxes</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Checkbox, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const GroupedCheckboxes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Checkboxes grouped flex for consistent spacing.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Grouped Checkboxes"
        currentState="Using flexbox for consistent spacing"
      >
        <org-storybook-example-container-section label="Vertical Group (Column)">
          <div class="flex flex-col gap-1">
            <org-checkbox name="option1" value="option1">
              Option 1
            </org-checkbox>
            <org-checkbox name="option2" value="option2" [checked]="true">
              Option 2 (checked)
            </org-checkbox>
            <org-checkbox name="option3" value="option3">
              Option 3
            </org-checkbox>
            <org-checkbox name="option4" value="option4" [disabled]="true">
              Option 4 (disabled)
            </org-checkbox>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Horizontal Group (Row)">
          <div class="flex flex-row gap-1">
            <org-checkbox name="h-option1" value="h-option1">
              Option 1
            </org-checkbox>
            <org-checkbox name="h-option2" value="h-option2" [checked]="true">
              Option 2
            </org-checkbox>
            <org-checkbox name="h-option3" value="h-option3">
              Option 3
            </org-checkbox>
          </div>
        </org-storybook-example-container-section>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Checkbox, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

@Component({
  selector: 'org-checkbox-reactive-form-story',
  template: `
    <org-storybook-example-container
      title="Reactive Form Integration"
      [currentState]="'Form Valid: ' + checkboxForm.valid + ', Form Value: ' + formValueDisplay()"
    >
      <org-storybook-example-container-section label="Checkbox Group in Form">
        <form [formGroup]="checkboxForm" class="flex flex-col gap-1">
          <org-checkbox
            name="terms"
            value="terms"
            [checked]="checkboxForm.value.terms ?? false"
            (checkedChange)="onTermsChange($event)"
          >
            I agree to the terms and conditions
          </org-checkbox>
          <org-checkbox
            name="newsletter"
            value="newsletter"
            [checked]="checkboxForm.value.newsletter ?? false"
            (checkedChange)="onNewsletterChange($event)"
          >
            Subscribe to newsletter
          </org-checkbox>
          <org-checkbox
            name="marketing"
            value="marketing"
            [checked]="checkboxForm.value.marketing ?? false"
            (checkedChange)="onMarketingChange($event)"
          >
            Receive marketing emails
          </org-checkbox>
        </form>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li>Checkboxes emit <strong>checkedChange</strong> events when toggled</li>
        <li>Can be integrated with reactive forms by handling change events</li>
        <li>Form state updates in real-time as checkboxes are toggled</li>
      </ul>
    </org-storybook-example-container>
  `,
  imports: [Checkbox, StorybookExampleContainer, StorybookExampleContainerSection, ReactiveFormsModule],
})
class CheckboxReactiveFormStory {
  public checkboxForm = new FormGroup({
    terms: new FormControl(false, { nonNullable: true }),
    newsletter: new FormControl(false, { nonNullable: true }),
    marketing: new FormControl(false, { nonNullable: true }),
  });

  public formValueDisplay = signal<string>(JSON.stringify(this.checkboxForm.value));

  public onTermsChange(checked: boolean): void {
    this.checkboxForm.patchValue({ terms: checked });
    this.formValueDisplay.set(JSON.stringify(this.checkboxForm.value));
  }

  public onNewsletterChange(checked: boolean): void {
    this.checkboxForm.patchValue({ newsletter: checked });
    this.formValueDisplay.set(JSON.stringify(this.checkboxForm.value));
  }

  public onMarketingChange(checked: boolean): void {
    this.checkboxForm.patchValue({ marketing: checked });
    this.formValueDisplay.set(JSON.stringify(this.checkboxForm.value));
  }
}

export const ReactiveFormIntegration: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example of integrating checkboxes with Angular reactive forms.',
      },
    },
  },
  render: () => ({
    template: `<org-checkbox-reactive-form-story />`,
    moduleMetadata: {
      imports: [CheckboxReactiveFormStory],
    },
  }),
};

@Component({
  selector: 'org-checkbox-select-all-story',
  template: `
    <org-storybook-example-container
      title="Select All Pattern"
      [currentState]="'Selected: ' + selectedCount() + ' of ' + totalCount()"
    >
      <org-storybook-example-container-section label="Select All with Indeterminate State">
        <div class="flex flex-col gap-1">
          <org-checkbox
            name="selectAll"
            value="selectAll"
            [checked]="allSelected()"
            [indeterminate]="someSelected()"
            (checkedChange)="onSelectAllChange($event)"
          >
            <strong>Select All</strong>
          </org-checkbox>
          <div class="flex flex-col gap-1">
            <org-checkbox
              name="item1"
              value="item1"
              [checked]="items()[0].selected"
              (checkedChange)="onItemChange(0, $event)"
            >
              Item 1
            </org-checkbox>
            <org-checkbox
              name="item2"
              value="item2"
              [checked]="items()[1].selected"
              (checkedChange)="onItemChange(1, $event)"
            >
              Item 2
            </org-checkbox>
            <org-checkbox
              name="item3"
              value="item3"
              [checked]="items()[2].selected"
              (checkedChange)="onItemChange(2, $event)"
            >
              Item 3
            </org-checkbox>
            <org-checkbox
              name="item4"
              value="item4"
              [checked]="items()[3].selected"
              (checkedChange)="onItemChange(3, $event)"
            >
              Item 4
            </org-checkbox>
          </div>
        </div>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li><strong>Select All</strong> is checked when all items are selected</li>
        <li><strong>Select All</strong> is indeterminate when some (but not all) items are selected</li>
        <li><strong>Select All</strong> is unchecked when no items are selected</li>
        <li>Clicking <strong>Select All</strong> toggles all items</li>
      </ul>
    </org-storybook-example-container>
  `,
  imports: [Checkbox, StorybookExampleContainer, StorybookExampleContainerSection],
})
class CheckboxSelectAllStory {
  public items = signal<{ selected: boolean }[]>([
    { selected: false },
    { selected: false },
    { selected: false },
    { selected: false },
  ]);

  public selectedCount = signal<number>(0);
  public totalCount = signal<number>(4);

  public allSelected = signal<boolean>(false);
  public someSelected = signal<boolean>(false);

  public onItemChange(index: number, checked: boolean): void {
    const newItems = [...this.items()];
    newItems[index].selected = checked;
    this.items.set(newItems);
    this.updateSelectAllState();
  }

  public onSelectAllChange(checked: boolean): void {
    const newItems = this.items().map(() => ({ selected: checked }));
    this.items.set(newItems);
    this.updateSelectAllState();
  }

  private updateSelectAllState(): void {
    const selected = this.items().filter((item) => item.selected).length;
    this.selectedCount.set(selected);
    this.allSelected.set(selected === this.totalCount());
    this.someSelected.set(selected > 0 && selected < this.totalCount());
  }
}

export const SelectAllPattern: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Common "Select All" pattern using the indeterminate state.',
      },
    },
  },
  render: () => ({
    template: `<org-checkbox-select-all-story />`,
    moduleMetadata: {
      imports: [CheckboxSelectAllStory],
    },
  }),
};

@Component({
  selector: 'org-checkbox-validation-story',
  template: `
    <org-storybook-example-container
      title="Checkbox Validation"
      [currentState]="'Form Valid: ' + validationForm.valid + ', Accepted: ' + (validationForm.value.terms || false)"
    >
      <form [formGroup]="validationForm">
        <org-storybook-example-container-section label="Checkbox with Validation Error">
          <org-checkbox
            formControlName="terms"
            name="terms"
            value="accepted"
            validationMessage="You must accept the terms and conditions to continue"
          >
            I accept the terms and conditions
          </org-checkbox>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Checkbox without Validation Error">
          <org-checkbox formControlName="newsletter" name="newsletter" value="subscribed">
            Subscribe to newsletter
          </org-checkbox>
        </org-storybook-example-container-section>
      </form>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li>Validation message appears below the checkbox when provided</li>
        <li>Message uses <strong>text-validation-error-text</strong> color (danger/red)</li>
        <li>Message is visible only when validationMessage input is provided</li>
        <li>Proper ARIA attributes for accessibility (aria-invalid, aria-describedby)</li>
        <li>Message uses role="alert" and aria-live="polite" for screen readers</li>
      </ul>
    </org-storybook-example-container>
  `,
  imports: [Checkbox, StorybookExampleContainer, StorybookExampleContainerSection, ReactiveFormsModule],
})
class CheckboxValidationStory {
  public validationForm = new FormGroup({
    terms: new FormControl(false, { nonNullable: true }),
    newsletter: new FormControl(true, { nonNullable: true }),
  });
}

export const Validation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Example showing checkboxes with validation messages. The validation message is displayed below the checkbox when provided.',
      },
    },
  },
  render: () => ({
    template: `<org-checkbox-validation-story />`,
    moduleMetadata: {
      imports: [CheckboxValidationStory],
    },
  }),
};

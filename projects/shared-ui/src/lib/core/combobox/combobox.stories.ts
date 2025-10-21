import type { Meta, StoryObj } from '@storybook/angular';
import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Combobox } from './combobox';
import { type ComboboxOptionInput } from '../combobox-store/combobox-store';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';
import { Button } from '../button/button';

const fruitOptions: ComboboxOptionInput[] = [
  { label: 'Apple', value: 'apple', groupLabel: 'Fruits' },
  { label: 'Banana', value: 'banana', groupLabel: 'Fruits', disabled: true },
  { label: 'Cherry', value: 'cherry', groupLabel: 'Fruits' },
  { label: 'Mango', value: 'mango', groupLabel: 'Fruits' },
  { label: 'Orange', value: 'orange', groupLabel: 'Fruits' },
  { label: 'Strawberry', value: 'strawberry', groupLabel: 'Fruits' },
  { label: 'Carrot', value: 'carrot', groupLabel: 'Vegetables' },
  { label: 'Broccoli', value: 'broccoli', groupLabel: 'Vegetables' },
  { label: 'Spinach', value: 'spinach', groupLabel: 'Vegetables' },
  { label: 'Tomato', value: 'tomato', groupLabel: 'Vegetables' },
  { label: 'Chicken', value: 'chicken', groupLabel: 'Proteins' },
  { label: 'Beef', value: 'beef', groupLabel: 'Proteins' },
  { label: 'Tofu', value: 'tofu', groupLabel: 'Proteins' },
  { label: 'Salmon', value: 'salmon', groupLabel: 'Proteins' },
];

const simpleOptions: ComboboxOptionInput[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
];

const meta: Meta<Combobox> = {
  title: 'Core/Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Combobox Component

  A powerful combobox/autocomplete component for single and multi-select scenarios with full keyboard accessibility.

  ### Features
  - Single and multi-select modes
  - Keyboard navigation (Arrow keys, Enter, Home, End, Escape)
  - Auto-filtering with custom filter support
  - Grouping support
  - Allow new options (tags input mode)
  - Reactive forms support (ControlValueAccessor)
  - Simple forms support
  - Auto-show options on focus
  - Accessible overlay positioning with CDK
  - Scrollable options list
  - Tag display for multi-select

  ### Keyboard Navigation
  - **Enter**: Select focused option
  - **ArrowDown**: Navigate to next option (opens menu if closed)
  - **ArrowUp**: Navigate to previous option (opens menu if closed)
  - **Home**: Focus first option
  - **End**: Focus last option
  - **Escape**: Close menu or blur input

  ### Usage Examples
  \`\`\`html
  <!-- Basic single select -->
  <org-combobox
    [options]="options"
    placeholder="Select an option..."
  />

  <!-- Multi-select with grouping -->
  <org-combobox
    [options]="options"
    [isMultiSelect]="true"
    [isGroupingEnabled]="true"
    placeholder="Select multiple options..."
  />

  <!-- With reactive forms -->
  <org-combobox
    [formControl]="myControl"
    [options]="options"
  />

  <!-- Custom filtering -->
  <org-combobox
    [options]="options"
    [optionFilter]="customFilterFn"
  />
  \`\`\`
</div>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<Combobox>;

export const Default: Story = {
  args: {
    name: 'combobox',
    options: simpleOptions,
    placeholder: 'Select...',
    isMultiSelect: false,
    autoShowOption: true,
    allowNewOptions: false,
    isGroupingEnabled: false,
    disabled: false,
    validationMessage: '',
    containerClass: '',
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'The name attribute for the combobox input element',
    },
    options: {
      control: 'object',
      description: 'Array of options to display',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    isMultiSelect: {
      control: 'boolean',
      description: 'Whether multiple options can be selected',
    },
    autoShowOption: {
      control: 'boolean',
      description: 'Whether options should show automatically on focus',
    },
    allowNewOptions: {
      control: 'boolean',
      description: 'Whether new options can be created',
    },
    isGroupingEnabled: {
      control: 'boolean',
      description: 'Whether options should be grouped',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the combobox is disabled',
    },
    validationMessage: {
      control: 'text',
      description: 'Validation error message to display',
    },
    containerClass: {
      control: 'text',
      description: 'Additional CSS classes for the container',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <org-combobox
        [name]="name"
        [options]="options"
        [placeholder]="placeholder"
        [isMultiSelect]="isMultiSelect"
        [autoShowOption]="autoShowOption"
        [allowNewOptions]="allowNewOptions"
        [isGroupingEnabled]="isGroupingEnabled"
        [disabled]="disabled"
        [validationMessage]="validationMessage"
        [containerClass]="containerClass"
      />
    `,
  }),
};

@Component({
  selector: 'org-combobox-single-select-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Combobox, StorybookExampleContainer, StorybookExampleContainerSection, Button, JsonPipe],
  template: `
    <org-storybook-example-container
      title="Single Select"
      [currentState]="'Selected: ' + (selectedValues() ? (selectedValues() | json) : 'None')"
    >
      <org-storybook-example-container-section label="Combobox">
        <div class="max-w-[400px]">
          <org-combobox
            #combobox
            name="single-select"
            [options]="options"
            placeholder="Select a fruit..."
            (selectedValuesChanged)="handleSelectedValuesChange($event)"
            (inputValueChanged)="handleInputValueChange($event)"
          />
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Controls">
        <div class="flex flex-wrap gap-2">
          <org-button color="primary" size="sm" (clicked)="combobox.open()">Open</org-button>
          <org-button color="primary" size="sm" (clicked)="combobox.close()">Close</org-button>
          <org-button color="secondary" size="sm" (clicked)="combobox.setSelectedOptions(['apple'])">
            Select Apple
          </org-button>
          <org-button color="secondary" size="sm" (clicked)="combobox.setSelectedOptions([])">
            Clear Selection
          </org-button>
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="State">
        <div class="text-sm space-y-1">
          <div><strong>Selected Values:</strong> {{ selectedValues() ? (selectedValues() | json) : 'None' }}</div>
          <div><strong>Input Value:</strong> "{{ inputValue() }}"</div>
        </div>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li>Only one option can be selected at a time</li>
        <li>Input displays selected option label when not focused</li>
        <li>Options menu closes after selection</li>
        <li>Arrow keys navigate through options</li>
        <li>Enter selects the focused option</li>
      </ul>
    </org-storybook-example-container>
  `,
})
class ComboboxSingleSelectDemo {
  protected options = fruitOptions;
  protected selectedValues = signal<(string | number)[] | null>(null);
  protected inputValue = signal<string>('');

  protected handleSelectedValuesChange(values: (string | number)[]): void {
    console.log('Selected values changed:', values);
    this.selectedValues.set(values);
  }

  protected handleInputValueChange(value: string): void {
    console.log('Input value changed:', value);
    this.inputValue.set(value);
  }
}

export const SingleSelect: Story = {
  render: () => ({
    template: '<org-combobox-single-select-demo />',
    moduleMetadata: {
      imports: [ComboboxSingleSelectDemo],
    },
  }),
};

@Component({
  selector: 'org-combobox-multi-select-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Combobox, StorybookExampleContainer, StorybookExampleContainerSection, Button, JsonPipe],
  template: `
    <org-storybook-example-container
      title="Multi Select"
      [currentState]="'Selected: ' + selectedValues().length + ' items'"
    >
      <org-storybook-example-container-section label="Combobox">
        <div class="max-w-[400px]">
          <org-combobox
            #combobox
            name="multi-select"
            [options]="options"
            [isMultiSelect]="true"
            placeholder="Select multiple fruits..."
            (selectedValuesChanged)="handleSelectedValuesChange($event)"
            (inputValueChanged)="handleInputValueChange($event)"
          />
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Controls">
        <div class="flex flex-wrap gap-2">
          <org-button color="primary" size="sm" (clicked)="combobox.open()">Open</org-button>
          <org-button color="primary" size="sm" (clicked)="combobox.close()">Close</org-button>
          <org-button
            color="secondary"
            size="sm"
            (clicked)="combobox.setSelectedOptions(['apple', 'banana', 'cherry'])"
          >
            Select Multiple
          </org-button>
          <org-button color="secondary" size="sm" (clicked)="combobox.setSelectedOptions([])"> Clear All </org-button>
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="State">
        <div class="text-sm space-y-1">
          <div>
            <strong>Selected Values:</strong>
            {{ selectedValues().length > 0 ? (selectedValues() | json) : 'None' }}
          </div>
          <div><strong>Input Value:</strong> "{{ inputValue() }}"</div>
        </div>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li>Multiple options can be selected</li>
        <li>Selected items shown as tags in the input</li>
        <li>Tags can be removed by clicking X</li>
        <li>Options menu stays open after selection</li>
        <li>Input clears after each selection</li>
      </ul>
    </org-storybook-example-container>
  `,
})
class ComboboxMultiSelectDemo {
  protected options = fruitOptions;
  protected selectedValues = signal<(string | number)[]>([]);
  protected inputValue = signal<string>('');

  protected handleSelectedValuesChange(values: (string | number)[]): void {
    console.log('Selected values changed:', values);
    this.selectedValues.set(values);
  }

  protected handleInputValueChange(value: string): void {
    console.log('Input value changed:', value);
    this.inputValue.set(value);
  }
}

export const MultiSelect: Story = {
  render: () => ({
    template: '<org-combobox-multi-select-demo />',
    moduleMetadata: {
      imports: [ComboboxMultiSelectDemo],
    },
  }),
};

@Component({
  selector: 'org-combobox-grouped-options-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Combobox, StorybookExampleContainer, StorybookExampleContainerSection, JsonPipe],
  template: `
    <org-storybook-example-container title="Grouped Options" [currentState]="'Grouping enabled'">
      <org-storybook-example-container-section label="Combobox">
        <div class="max-w-[400px]">
          <org-combobox
            name="grouped-options"
            [options]="options"
            [isGroupingEnabled]="true"
            placeholder="Select from grouped options..."
            (selectedValuesChanged)="handleSelectedValuesChange($event)"
          />
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="State">
        <div class="text-sm space-y-1">
          <div><strong>Selected Values:</strong> {{ selectedValues() ? (selectedValues() | json) : 'None' }}</div>
        </div>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li>Options are organized by groups (Fruits, Vegetables, Proteins)</li>
        <li>Each group has a header</li>
        <li>Keyboard navigation respects group boundaries</li>
        <li>Groups are sorted alphabetically</li>
      </ul>
    </org-storybook-example-container>
  `,
})
class ComboboxGroupedOptionsDemo {
  protected options = fruitOptions;
  protected selectedValues = signal<(string | number)[] | null>(null);

  protected handleSelectedValuesChange(values: (string | number)[]): void {
    console.log('Selected values changed:', values);
    this.selectedValues.set(values);
  }
}

export const GroupedOptions: Story = {
  render: () => ({
    template: '<org-combobox-grouped-options-demo />',
    moduleMetadata: {
      imports: [ComboboxGroupedOptionsDemo],
    },
  }),
};

@Component({
  selector: 'org-combobox-custom-filter-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Combobox, StorybookExampleContainer, StorybookExampleContainerSection, JsonPipe],
  template: `
    <org-storybook-example-container title="Custom Filter" [currentState]="'Custom starts-with filter'">
      <org-storybook-example-container-section label="Combobox">
        <div class="max-w-[400px]">
          <org-combobox
            name="custom-filter"
            [options]="options"
            [optionFilter]="customFilter"
            placeholder="Type to filter (starts with)..."
            (selectedValuesChanged)="handleSelectedValuesChange($event)"
          />
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="State">
        <div class="text-sm space-y-1">
          <div><strong>Selected Values:</strong> {{ selectedValues() ? (selectedValues() | json) : 'None' }}</div>
        </div>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li>Custom filter matches options that start with input text</li>
        <li>Case-insensitive matching</li>
        <li>Try typing "a" to see Apple, or "b" to see Banana and Broccoli</li>
      </ul>
    </org-storybook-example-container>
  `,
})
class ComboboxCustomFilterDemo {
  protected options = fruitOptions;
  protected selectedValues = signal<(string | number)[] | null>(null);

  protected customFilter = (inputValue: string, option: { label: string }): boolean => {
    return option.label.toLowerCase().startsWith(inputValue.toLowerCase());
  };

  protected handleSelectedValuesChange(values: (string | number)[]): void {
    console.log('Selected values changed:', values);
    this.selectedValues.set(values);
  }
}

export const CustomFilter: Story = {
  render: () => ({
    template: '<org-combobox-custom-filter-demo />',
    moduleMetadata: {
      imports: [ComboboxCustomFilterDemo],
    },
  }),
};

@Component({
  selector: 'org-combobox-reactive-forms-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Combobox,
    ReactiveFormsModule,
    StorybookExampleContainer,
    StorybookExampleContainerSection,
    Button,
    JsonPipe,
  ],
  template: `
    <org-storybook-example-container
      title="Reactive Forms"
      [currentState]="'Form value: ' + (formControl.value | json)"
    >
      <org-storybook-example-container-section label="Combobox with FormControl">
        <div class="max-w-[400px]">
          <org-combobox
            name="reactive-form"
            [formControl]="formControl"
            [options]="options"
            [isMultiSelect]="true"
            placeholder="Select options..."
          />
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Controls">
        <div class="flex flex-wrap gap-2">
          <org-button color="primary" size="sm" (clicked)="formControl.setValue(['apple', 'banana'])">
            Set to [apple, banana]
          </org-button>
          <org-button color="secondary" size="sm" (clicked)="formControl.setValue([])"> Clear </org-button>
          <org-button color="secondary" size="sm" (clicked)="formControl.disable()"> Disable </org-button>
          <org-button color="secondary" size="sm" (clicked)="formControl.enable()"> Enable </org-button>
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Form State">
        <div class="text-sm space-y-1">
          <div><strong>Form Value:</strong> {{ formControl.value | json }}</div>
          <div><strong>Valid:</strong> {{ formControl.valid }}</div>
          <div><strong>Touched:</strong> {{ formControl.touched }}</div>
          <div><strong>Dirty:</strong> {{ formControl.dirty }}</div>
          <div><strong>Disabled:</strong> {{ formControl.disabled }}</div>
        </div>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li>Implements ControlValueAccessor for reactive forms</li>
        <li>Form control value is always an array</li>
        <li>Supports setValue, disable, enable</li>
        <li>Tracks touched and dirty states</li>
      </ul>
    </org-storybook-example-container>
  `,
})
class ComboboxReactiveFormsDemo {
  protected options = fruitOptions;
  protected formControl = new FormControl<(string | number)[]>([]);
}

@Component({
  selector: 'org-combobox-simple-forms-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Combobox, StorybookExampleContainer, StorybookExampleContainerSection, Button, JsonPipe],
  template: `
    <org-storybook-example-container
      title="Simple Forms"
      [currentState]="'Selected: ' + (selectedValues().length > 0 ? (selectedValues() | json) : 'None')"
    >
      <org-storybook-example-container-section label="Combobox with Two-Way Binding">
        <div class="max-w-[400px]">
          <org-combobox
            #combobox
            name="simple-form"
            [options]="options"
            [isMultiSelect]="true"
            placeholder="Select options..."
            (selectedValuesChanged)="handleSelectedValuesChange($event)"
          />
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Controls">
        <div class="flex flex-wrap gap-2">
          <org-button color="primary" size="sm" (clicked)="combobox.setSelectedOptions(['apple', 'banana'])">
            Set to [apple, banana]
          </org-button>
          <org-button color="secondary" size="sm" (clicked)="combobox.setSelectedOptions([])"> Clear </org-button>
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="State">
        <div class="text-sm space-y-1">
          <div><strong>Selected Values:</strong> {{ selectedValues() | json }}</div>
        </div>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li>Uses event binding instead of form control</li>
        <li>Signal-based state management</li>
        <li>Simpler for basic forms without validation</li>
        <li>Direct access to component API methods</li>
      </ul>
    </org-storybook-example-container>
  `,
})
class ComboboxSimpleFormsDemo {
  protected options = fruitOptions;
  protected selectedValues = signal<(string | number)[]>([]);

  protected handleSelectedValuesChange(values: (string | number)[]): void {
    console.log('Selected values changed:', values);
    this.selectedValues.set(values);
  }
}

export const Forms: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-8">
        <org-combobox-reactive-forms-demo />
        <org-combobox-simple-forms-demo />
      </div>
    `,
    moduleMetadata: {
      imports: [ComboboxReactiveFormsDemo, ComboboxSimpleFormsDemo],
    },
  }),
};

@Component({
  selector: 'org-combobox-states-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Combobox, StorybookExampleContainer, StorybookExampleContainerSection],
  template: `
    <org-storybook-example-container title="States">
      <org-storybook-example-container-section label="Default">
        <div class="max-w-[300px]">
          <org-combobox name="state-default" [options]="options" placeholder="Default state" />
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Disabled">
        <div class="max-w-[300px]">
          <org-combobox name="state-disabled" [options]="options" [disabled]="true" placeholder="Disabled state" />
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="With Auto Show Disabled">
        <div class="max-w-[300px]">
          <org-combobox
            name="state-no-auto"
            [options]="options"
            [autoShowOption]="false"
            placeholder="Auto show disabled"
          />
        </div>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li>Default state is interactive</li>
        <li>Disabled state is non-interactive</li>
        <li>Auto show can be disabled to require manual opening</li>
      </ul>
    </org-storybook-example-container>
  `,
})
class ComboboxStatesDemo {
  protected options = simpleOptions;
}

export const States: Story = {
  render: () => ({
    template: '<org-combobox-states-demo />',
    moduleMetadata: {
      imports: [ComboboxStatesDemo],
    },
  }),
};

@Component({
  selector: 'org-combobox-validation-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Combobox, StorybookExampleContainer, StorybookExampleContainerSection, Button, JsonPipe],
  template: `
    <org-storybook-example-container title="Validation" [currentState]="'Has error: ' + hasError()">
      <org-storybook-example-container-section label="With Validation Message">
        <div class="max-w-[400px]">
          <org-combobox
            #combobox
            name="validation"
            [options]="options"
            [isMultiSelect]="true"
            placeholder="Select at least one option..."
            [validationMessage]="validationMessage()"
            (selectedValuesChanged)="handleSelectedValuesChange($event)"
          />
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Controls">
        <div class="flex flex-wrap gap-2">
          <org-button color="primary" size="sm" (clicked)="validateSelection()"> Trigger Validation </org-button>
          <org-button color="secondary" size="sm" (clicked)="clearValidation()"> Clear Validation </org-button>
          <org-button color="secondary" size="sm" (clicked)="combobox.setSelectedOptions([])">
            Clear Selection
          </org-button>
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="State">
        <div class="text-sm space-y-1">
          <div>
            <strong>Selected Values:</strong>
            {{ selectedValues().length > 0 ? (selectedValues() | json) : 'None' }}
          </div>
          <div><strong>Validation Message:</strong> "{{ validationMessage() }}"</div>
          <div><strong>Has Error:</strong> {{ hasError() }}</div>
        </div>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li>Validation message is displayed when provided</li>
        <li>Combobox shows error state with red border and error icon</li>
        <li>Validation message appears below the combobox</li>
        <li>Validation can be triggered programmatically</li>
      </ul>
    </org-storybook-example-container>
  `,
})
class ComboboxValidationDemo {
  protected options = fruitOptions;
  protected selectedValues = signal<(string | number)[]>([]);
  protected validationMessage = signal<string | null>(null);
  protected hasError = computed<boolean>(() => !!this.validationMessage()?.trim());

  protected handleSelectedValuesChange(values: (string | number)[]): void {
    console.log('Selected values changed:', values);
    this.selectedValues.set(values);

    // Clear validation when user makes a selection
    if (values.length > 0 && this.hasError()) {
      this.clearValidation();
    }
  }

  protected validateSelection(): void {
    if (this.selectedValues().length === 0) {
      this.validationMessage.set('At least one option is required');
    } else {
      this.validationMessage.set('');
    }
  }

  protected clearValidation(): void {
    this.validationMessage.set('');
  }
}

export const Validation: Story = {
  render: () => ({
    template: '<org-combobox-validation-demo />',
    moduleMetadata: {
      imports: [ComboboxValidationDemo],
    },
  }),
};

const largeDatasetOptions: ComboboxOptionInput[] = Array.from({ length: 100 }, (_, index) => ({
  label: `Option ${index + 1}`,
  value: `option-${index + 1}`,
}));

@Component({
  selector: 'org-combobox-scrolling-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Combobox, StorybookExampleContainer, StorybookExampleContainerSection, Button, JsonPipe],
  template: `
    <org-storybook-example-container title="Large Dataset - Scrolling" [currentState]="'100 options available'">
      <org-storybook-example-container-section label="Combobox with 100 Options">
        <div class="max-w-[400px]">
          <org-combobox
            #combobox
            name="scrolling"
            [options]="options"
            [isMultiSelect]="true"
            placeholder="Select options..."
            (selectedValuesChanged)="handleSelectedValuesChange($event)"
          />
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Controls">
        <div class="flex flex-wrap gap-2">
          <org-button color="primary" size="sm" (clicked)="combobox.open()">Open</org-button>
          <org-button color="primary" size="sm" (clicked)="combobox.close()">Close</org-button>
          <org-button
            color="secondary"
            size="sm"
            (clicked)="combobox.setSelectedOptions(['option-1', 'option-50', 'option-100'])"
          >
            Select 1, 50, 100
          </org-button>
          <org-button color="secondary" size="sm" (clicked)="combobox.setSelectedOptions([])"> Clear All </org-button>
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="State">
        <div class="text-sm space-y-1">
          <div>
            <strong>Selected Values:</strong>
            {{ selectedValues().length > 0 ? (selectedValues() | json) : 'None' }}
          </div>
        </div>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li>Options menu is scrollable with max height of 400px</li>
        <li>Keyboard navigation scrolls focused option into view</li>
        <li>Arrow keys, Home, and End keys work correctly with scroll</li>
        <li>Performance remains smooth with large dataset</li>
        <li>Filtering reduces the visible options dynamically</li>
      </ul>
    </org-storybook-example-container>
  `,
})
class ComboboxScrollingDemo {
  protected options = largeDatasetOptions;
  protected selectedValues = signal<(string | number)[]>([]);

  protected handleSelectedValuesChange(values: (string | number)[]): void {
    console.log('Selected values changed:', values);
    this.selectedValues.set(values);
  }
}

export const Scrolling: Story = {
  render: () => ({
    template: '<org-combobox-scrolling-demo />',
    moduleMetadata: {
      imports: [ComboboxScrollingDemo],
    },
  }),
};

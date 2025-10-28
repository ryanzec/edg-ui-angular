import type { Meta, StoryObj } from '@storybook/angular';
import { TimeInput } from './time-input';
import { inputVariants } from '../input/input';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, signal } from '@angular/core';

const meta: Meta<TimeInput> = {
  title: 'Core/Components/TimeInput',
  component: TimeInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## TimeInput Component

  A specialized time input component that provides an intuitive interface for entering times in 12-hour format with keyboard navigation and segment-based editing.

  ### Features
  - 12-hour time format (hh:mm am/pm)
  - Keyboard navigation with arrow keys
  - Smart digit entry with auto-advancement
  - Up/Down arrow keys to increment/decrement values
  - Segment-based selection (hours, minutes, am/pm)
  - Support for both reactive forms and simple binding
  - Two visual variants: bordered and borderless
  - Disabled and readonly states

  ### Time Format
  - Hours: 01-12 with leading zero
  - Minutes: 00-59 with leading zero
  - Period: am or pm (lowercase)
  - Example: "03:45 pm"

  ### Keyboard Interactions
  - **Focus**: Hours segment is automatically selected
  - **Left/Right Arrow**: Navigate between segments (hours ↔ minutes ↔ am/pm)
  - **Up/Down Arrow**: Increment/decrement current segment with looping
  - **Number Keys**: Smart digit entry with auto-advancement
    - Hours: 0-1 waits for second digit, 2-9 auto-adds leading 0
    - Minutes: 0-5 waits for second digit, 6-9 auto-adds leading 0
  - **A/P Keys**: In am/pm segment, set to am or pm respectively
  - **Delete/Backspace**: Ignored (format is always maintained)

  ### Usage Examples
  \`\`\`html
  <!-- Basic time input -->
  <org-time-input name="time-input" />

  <!-- With default value -->
  <org-time-input name="time-input" [defaultValue]="'02:30 pm'" />

  <!-- Borderless variant -->
  <org-time-input name="time-input" variant="borderless" />

  <!-- Disabled state -->
  <org-time-input name="time-input" [disabled]="true" />

  <!-- Readonly state -->
  <org-time-input name="time-input" [readonly]="true" [defaultValue]="'09:15 am'" />

  <!-- Reactive form binding -->
  <org-time-input name="time-input" [formControl]="timeControl" />
  \`\`\`
</div>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<TimeInput>;

export const Default: Story = {
  args: {
    name: 'time-input',
    variant: 'bordered',
    placeholder: 'Enter time',
    disabled: false,
    readonly: false,
    defaultValue: '',
    containerClass: '',
    selectAllOnFocus: false,
    autoFocus: false,
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'The name attribute for the input element',
    },
    variant: {
      control: 'select',
      options: inputVariants,
      description: 'The visual variant of the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the input is readonly',
    },
    defaultValue: {
      control: 'text',
      description: 'Default time value in format "hh:mm am/pm"',
    },
    containerClass: {
      control: 'text',
      description: 'Additional CSS classes for the container',
    },
    selectAllOnFocus: {
      control: 'boolean',
      description: 'Whether to select all text when the input receives focus',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Whether the input should automatically receive focus',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default time input with bordered variant. Use the controls below to interact with the component.',
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
          <org-time-input name="bordered-time-input" variant="bordered" [defaultValue]="'09:30 am'" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Borderless">
          <org-time-input name="borderless-time-input" variant="borderless" [defaultValue]="'02:45 pm'" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>bordered</strong>: Standard input with visible border (default)</li>
          <li><strong>borderless</strong>: Minimal styling without border</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [TimeInput, StorybookExampleContainer, StorybookExampleContainerSection],
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
          <org-time-input name="normal-time-input" [defaultValue]="'10:15 am'" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Disabled">
          <org-time-input name="disabled-time-input" [disabled]="true" [defaultValue]="'03:30 pm'" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Readonly">
          <org-time-input name="readonly-time-input" [readonly]="true" [defaultValue]="'11:45 am'" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Normal</strong>: Fully interactive with keyboard navigation</li>
          <li><strong>Disabled</strong>: Cannot focus, edit, or interact</li>
          <li><strong>Readonly</strong>: Can focus but cannot edit</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [TimeInput, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const KeyboardNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates keyboard navigation features. Click in the input and use arrow keys to navigate between segments (hours, minutes, am/pm).',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Keyboard Navigation"
        currentState="Try using arrow keys to navigate and edit the time"
      >
        <org-storybook-example-container-section label="Interactive time input">
          <org-time-input name="keyboard-nav-time-input" [defaultValue]="'12:00 pm'" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Left/Right Arrow</strong>: Navigate between hours, minutes, and am/pm segments</li>
          <li><strong>Up/Down Arrow</strong>: Increment or decrement the current segment</li>
          <li><strong>Number Keys</strong>: Enter digits with smart auto-advancement</li>
          <li><strong>A/P Keys</strong>: When on am/pm segment, set to am or pm</li>
          <li><strong>Focus</strong>: Hours segment is automatically selected</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [TimeInput, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const DefaultValues: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Time inputs with various default values.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Default Values"
        currentState="Comparing inputs with different default times"
      >
        <org-storybook-example-container-section label="No default (empty)">
          <org-time-input name="no-default-time-input" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Morning time (09:00 am)">
          <org-time-input name="morning-time-input" [defaultValue]="'09:00 am'" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Afternoon time (02:30 pm)">
          <org-time-input name="afternoon-time-input" [defaultValue]="'02:30 pm'" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Evening time (08:45 pm)">
          <org-time-input name="evening-time-input" [defaultValue]="'08:45 pm'" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li>Default values must be in format: "hh:mm am/pm"</li>
          <li>Hours must be 01-12, minutes 00-59</li>
          <li>Invalid values will be ignored and component will start empty</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [TimeInput, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

@Component({
  selector: 'org-time-input-reactive-form-story',
  template: `
    <org-storybook-example-container title="Reactive Form Binding" currentState="Time input bound to FormControl">
      <org-storybook-example-container-section label="Time Input with FormControl">
        <org-time-input name="reactive-form-time-input" [formControl]="timeControl()" />
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Form Value">
        <div class="flex flex-col gap-2">
          <div><strong>Current Value:</strong> {{ timeControl().value || 'empty' }}</div>
          <div><strong>Valid:</strong> {{ timeControl().valid }}</div>
          <div><strong>Touched:</strong> {{ timeControl().touched }}</div>
          <div><strong>Dirty:</strong> {{ timeControl().dirty }}</div>
        </div>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
        <li>Component implements ControlValueAccessor for reactive form integration</li>
        <li>Form value updates as you edit the time</li>
        <li>Supports all standard form control features (validation, dirty, touched, etc.)</li>
      </ul>
    </org-storybook-example-container>
  `,
  imports: [TimeInput, StorybookExampleContainer, StorybookExampleContainerSection, ReactiveFormsModule],
})
class TimeInputReactiveFormStoryComponent {
  public timeControl = signal(new FormControl('03:15 pm'));
}

export const ReactiveFormBinding: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Time input integrated with Angular reactive forms using FormControl.',
      },
    },
  },
  render: () => ({
    moduleMetadata: {
      imports: [TimeInputReactiveFormStoryComponent],
    },
    template: '<org-time-input-reactive-form-story />',
  }),
};

@Component({
  selector: 'org-time-input-value-change-story',
  template: `
    <org-storybook-example-container title="Value Change Event" currentState="Monitoring value changes">
      <org-storybook-example-container-section label="Time Input">
        <org-time-input
          name="value-change-time-input"
          [defaultValue]="'12:00 pm'"
          (valueChange)="onValueChange($event)"
        />
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Change Log">
        <div class="flex flex-col gap-1">
          @if (changeLog().length === 0) {
            <div class="text-sm">No changes yet. Edit the time to see events.</div>
          }
          @for (entry of changeLog(); track entry.timestamp) {
            <div class="text-sm">
              <strong>{{ entry.timestamp }}:</strong> {{ entry.value }}
            </div>
          }
        </div>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
        <li><strong>valueChange</strong> event emits whenever the time value changes</li>
        <li>Emitted value is always in format "hh:mm am/pm"</li>
        <li>Events are emitted during segment editing and auto-advancement</li>
      </ul>
    </org-storybook-example-container>
  `,
  imports: [TimeInput, StorybookExampleContainer, StorybookExampleContainerSection],
})
class TimeInputValueChangeStoryComponent {
  public changeLog = signal<{ timestamp: string; value: string }[]>([]);

  public onValueChange(value: string): void {
    const now = new Date();
    const timestamp = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    this.changeLog.update((log) => [...log, { timestamp, value }]);
  }
}

export const ValueChangeEvent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the valueChange event that emits whenever the time value is modified.',
      },
    },
  },
  render: () => ({
    moduleMetadata: {
      imports: [TimeInputValueChangeStoryComponent],
    },
    template: '<org-time-input-value-change-story />',
  }),
};

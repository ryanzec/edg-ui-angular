import type { Meta, StoryObj } from '@storybook/angular';
import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DateTime } from 'luxon';
import { DatePickerInput } from './date-picker-input';
import { DateFormat, TimeFormat } from '@organization/shared-utils';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';
import { Button } from '../button/button';
import { JsonPipe } from '@angular/common';

const meta: Meta<DatePickerInput> = {
  title: 'Core/Components/Date Picker Input',
  component: DatePickerInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## DatePickerInput Component

  A comprehensive date picker component designed for date selection in forms with support for single date and date range selection.

  ### Features
  - Single date selection mode
  - Date range selection mode
  - Partial range selection support (on or after/before)
  - Customizable date and time formatting
  - Reactive forms integration with ControlValueAccessor
  - Simple forms integration with event handling
  - Validation support
  - Calendar keyboard navigation
  - Date constraints (disable before/after, allowed range)
  - Readonly input with calendar-only interaction

  ### Usage Examples
  \`\`\`html
  <!-- Basic single date -->
  <org-date-picker-input
    placeholder="Select date..."
    [selectedStartDate]="startDate"
    (dateSelected)="handleDateSelected($event)"
  />

  <!-- Date range -->
  <org-date-picker-input
    placeholder="Select date range..."
    [allowRangeSelection]="true"
    [selectedStartDate]="startDate"
    [selectedEndDate]="endDate"
    (dateSelected)="handleDateSelected($event)"
  />

  <!-- With reactive forms -->
  <org-date-picker-input
    [formControl]="dateFormControl"
    [allowRangeSelection]="true"
    placeholder="Select date range..."
  />

  <!-- With validation -->
  <org-date-picker-input
    placeholder="Select date..."
    [validationMessage]="validationMessage"
    (dateSelected)="handleDateSelected($event)"
  />
</div>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<DatePickerInput>;

export const Default: Story = {
  args: {
    dateFormat: DateFormat.STANDARD,
    timeFormat: TimeFormat.STANDARD,
    allowPartialRangeSelection: false,
    placeholder: 'Select date...',
    autoFocus: false,
    validationMessage: '',
    defaultDisplayDate: DateTime.now(),
    startYear: DateTime.now().year - 100,
    endYear: DateTime.now().year + 20,
    selectedStartDate: null,
    selectedEndDate: null,
    allowRangeSelection: false,
    disableBefore: null,
    disableAfter: null,
    allowedDateRange: 0,
    disabled: false,
    containerClass: '',
  },
  argTypes: {
    dateFormat: {
      control: 'select',
      options: Object.values(DateFormat),
      description: 'The date format for display',
    },
    timeFormat: {
      control: 'select',
      options: Object.values(TimeFormat),
      description: 'The time format for display',
    },
    allowPartialRangeSelection: {
      control: 'boolean',
      description: 'Allow partial range selection (on or after/before)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Automatically focus the input on mount',
    },
    validationMessage: {
      control: 'text',
      description: 'Validation error message',
    },
    allowRangeSelection: {
      control: 'boolean',
      description: 'Enable date range selection',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the date picker',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="max-w-[400px]">
        <org-date-picker-input
          [dateFormat]="dateFormat"
          [timeFormat]="timeFormat"
          [allowPartialRangeSelection]="allowPartialRangeSelection"
          [placeholder]="placeholder"
          [autoFocus]="autoFocus"
          [validationMessage]="validationMessage"
          [defaultDisplayDate]="defaultDisplayDate"
          [startYear]="startYear"
          [endYear]="endYear"
          [selectedStartDate]="selectedStartDate"
          [selectedEndDate]="selectedEndDate"
          [allowRangeSelection]="allowRangeSelection"
          [disableBefore]="disableBefore"
          [disableAfter]="disableAfter"
          [allowedDateRange]="allowedDateRange"
          [disabled]="disabled"
          [containerClass]="containerClass"
        />
      </div>
    `,
  }),
};

@Component({
  selector: 'org-date-picker-input-single-select-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePickerInput, StorybookExampleContainer, StorybookExampleContainerSection, Button, JsonPipe],
  template: `
    <org-storybook-example-container
      title="Single Date Selection"
      [currentState]="'Selected: ' + (selectedDate() ? selectedDate()!.toISO() : 'None')"
    >
      <org-storybook-example-container-section label="Date Picker">
        <div class="max-w-[400px]">
          <org-date-picker-input
            #datePicker
            placeholder="Select a date..."
            [selectedStartDate]="selectedDate()"
            (dateSelected)="handleDateSelected($event)"
          />
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Controls">
        <div class="flex flex-wrap gap-2">
          <org-button color="primary" size="sm" (clicked)="setToday()"> Set Today </org-button>
          <org-button color="secondary" size="sm" (clicked)="setYesterday()"> Set Yesterday </org-button>
          <org-button color="secondary" size="sm" (clicked)="clearDate()"> Clear </org-button>
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="State">
        <div class="text-sm space-y-1">
          <div>
            <strong>Selected Date:</strong>
            {{ selectedDate() ? selectedDate()!.toISO() : 'None' }}
          </div>
          <div>
            <strong>Public API Result:</strong>
            {{ datePicker.getSelectedDates() | json }}
          </div>
        </div>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li>Input is readonly - dates can only be selected via calendar</li>
        <li>Calendar opens when clicking input, calendar icon, or dropdown caret</li>
        <li>Calendar closes when input loses focus</li>
        <li>Escape key closes the calendar</li>
        <li>Focus moves to calendar when opened for keyboard navigation</li>
        <li>Selected date is displayed with date and time format</li>
      </ul>
    </org-storybook-example-container>
  `,
})
class DatePickerInputSingleSelectDemo {
  protected selectedDate = signal<DateTime | null>(null);

  protected handleDateSelected(dates: { startDate: DateTime | null; endDate: DateTime | null }): void {
    console.log('Date selected:', dates);
    this.selectedDate.set(dates.startDate);
  }

  protected setToday(): void {
    this.selectedDate.set(DateTime.now().startOf('day'));
  }

  protected setYesterday(): void {
    this.selectedDate.set(DateTime.now().minus({ days: 1 }).startOf('day'));
  }

  protected clearDate(): void {
    this.selectedDate.set(null);
  }
}

export const SingleSelect: Story = {
  render: () => ({
    template: '<org-date-picker-input-single-select-demo />',
    moduleMetadata: {
      imports: [DatePickerInputSingleSelectDemo],
    },
  }),
};

@Component({
  selector: 'org-date-picker-input-range-select-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePickerInput, StorybookExampleContainer, StorybookExampleContainerSection, Button, JsonPipe],
  template: `
    <org-storybook-example-container
      title="Date Range Selection"
      [currentState]="
        'Range: ' + (startDate() ? startDate()!.toISO() : 'None') + ' to ' + (endDate() ? endDate()!.toISO() : 'None')
      "
    >
      <org-storybook-example-container-section label="Date Picker">
        <div class="max-w-[400px]">
          <org-date-picker-input
            placeholder="Select date range..."
            [allowRangeSelection]="true"
            [selectedStartDate]="startDate()"
            [selectedEndDate]="endDate()"
            (dateSelected)="handleDateSelected($event)"
          />
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Controls">
        <div class="flex flex-wrap gap-2">
          <org-button color="primary" size="sm" (clicked)="setThisWeek()"> This Week </org-button>
          <org-button color="secondary" size="sm" (clicked)="setLastWeek()"> Last Week </org-button>
          <org-button color="secondary" size="sm" (clicked)="clearDates()"> Clear </org-button>
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="State">
        <div class="text-sm space-y-1">
          <div>
            <strong>Start Date:</strong>
            {{ startDate() ? startDate()!.toISO() : 'None' }}
          </div>
          <div>
            <strong>End Date:</strong>
            {{ endDate() ? endDate()!.toISO() : 'None' }}
          </div>
        </div>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li>Allows selection of start and end dates</li>
        <li>Input displays both dates with a dash separator</li>
        <li>Calendar highlights dates in range</li>
        <li>Click date to set start, click another to set end</li>
        <li>Click on selected date to deselect it</li>
      </ul>
    </org-storybook-example-container>
  `,
})
class DatePickerInputRangeSelectDemo {
  protected startDate = signal<DateTime | null>(null);
  protected endDate = signal<DateTime | null>(null);

  protected handleDateSelected(dates: { startDate: DateTime | null; endDate: DateTime | null }): void {
    console.log('Dates selected:', dates);
    this.startDate.set(dates.startDate);
    this.endDate.set(dates.endDate);
  }

  protected setThisWeek(): void {
    const now = DateTime.now();
    this.startDate.set(now.startOf('week').startOf('day'));
    this.endDate.set(now.endOf('week').endOf('day').minus({ seconds: 1 }));
  }

  protected setLastWeek(): void {
    const lastWeek = DateTime.now().minus({ weeks: 1 });
    this.startDate.set(lastWeek.startOf('week').startOf('day'));
    this.endDate.set(lastWeek.endOf('week').endOf('day').minus({ seconds: 1 }));
  }

  protected clearDates(): void {
    this.startDate.set(null);
    this.endDate.set(null);
  }
}

export const RangeSelect: Story = {
  render: () => ({
    template: '<org-date-picker-input-range-select-demo />',
    moduleMetadata: {
      imports: [DatePickerInputRangeSelectDemo],
    },
  }),
};

@Component({
  selector: 'org-date-picker-input-partial-range-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePickerInput, StorybookExampleContainer, StorybookExampleContainerSection, Button, JsonPipe],
  template: `
    <org-storybook-example-container
      title="Partial Range Selection"
      [currentState]="
        'Range: ' + (startDate() ? startDate()!.toISO() : 'None') + ' to ' + (endDate() ? endDate()!.toISO() : 'None')
      "
    >
      <org-storybook-example-container-section label="Date Picker">
        <div class="max-w-[400px]">
          <org-date-picker-input
            placeholder="Select date range..."
            [allowRangeSelection]="true"
            [allowPartialRangeSelection]="true"
            [selectedStartDate]="startDate()"
            [selectedEndDate]="endDate()"
            (dateSelected)="handleDateSelected($event)"
          />
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Controls">
        <div class="flex flex-wrap gap-2">
          <org-button color="primary" size="sm" (clicked)="setStartOnly()"> Set Start Only </org-button>
          <org-button color="primary" size="sm" (clicked)="setEndOnly()"> Set End Only </org-button>
          <org-button color="secondary" size="sm" (clicked)="clearDates()"> Clear </org-button>
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="State">
        <div class="text-sm space-y-1">
          <div>
            <strong>Start Date:</strong>
            {{ startDate() ? startDate()!.toISO() : 'None' }}
          </div>
          <div>
            <strong>End Date:</strong>
            {{ endDate() ? endDate()!.toISO() : 'None' }}
          </div>
        </div>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li>With only start date: displays "On or after [DATE]"</li>
        <li>With only end date: displays "On or before [DATE]"</li>
        <li>With both dates: displays "[START] - [END]"</li>
        <li>Useful for open-ended date ranges</li>
      </ul>
    </org-storybook-example-container>
  `,
})
class DatePickerInputPartialRangeDemo {
  protected startDate = signal<DateTime | null>(null);
  protected endDate = signal<DateTime | null>(null);

  protected handleDateSelected(dates: { startDate: DateTime | null; endDate: DateTime | null }): void {
    console.log('Dates selected:', dates);
    this.startDate.set(dates.startDate);
    this.endDate.set(dates.endDate);
  }

  protected setStartOnly(): void {
    this.startDate.set(DateTime.now().startOf('day'));
    this.endDate.set(null);
  }

  protected setEndOnly(): void {
    this.startDate.set(null);
    this.endDate.set(DateTime.now().plus({ days: 7 }).endOf('day').minus({ seconds: 1 }));
  }

  protected clearDates(): void {
    this.startDate.set(null);
    this.endDate.set(null);
  }
}

export const PartialRangeSelect: Story = {
  render: () => ({
    template: '<org-date-picker-input-partial-range-demo />',
    moduleMetadata: {
      imports: [DatePickerInputPartialRangeDemo],
    },
  }),
};

@Component({
  selector: 'org-date-picker-input-reactive-forms-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePickerInput,
    ReactiveFormsModule,
    StorybookExampleContainer,
    StorybookExampleContainerSection,
    Button,
    JsonPipe,
  ],
  template: `
    <org-storybook-example-container
      title="Reactive Forms Integration"
      [currentState]="'Form value: ' + (formControl.value | json)"
    >
      <org-storybook-example-container-section label="Date Picker with FormControl">
        <div class="max-w-[400px]">
          <org-date-picker-input
            [formControl]="formControl"
            [allowRangeSelection]="true"
            placeholder="Select date range..."
          />
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Controls">
        <div class="flex flex-wrap gap-2">
          <org-button color="primary" size="sm" (clicked)="formControl.setValue({ startDate: now, endDate: nowPlus7 })">
            Set This Week
          </org-button>
          <org-button color="secondary" size="sm" (clicked)="formControl.setValue({ startDate: null, endDate: null })">
            Clear
          </org-button>
          <org-button color="secondary" size="sm" (clicked)="formControl.disable()"> Disable </org-button>
          <org-button color="secondary" size="sm" (clicked)="formControl.enable()"> Enable </org-button>
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Form State">
        <div class="text-sm space-y-1">
          <div>
            <strong>Form Value:</strong>
            {{ formControl.value | json }}
          </div>
          <div><strong>Valid:</strong> {{ formControl.valid }}</div>
          <div><strong>Touched:</strong> {{ formControl.touched }}</div>
          <div><strong>Dirty:</strong> {{ formControl.dirty }}</div>
          <div><strong>Disabled:</strong> {{ formControl.disabled }}</div>
        </div>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li>Implements ControlValueAccessor for reactive forms</li>
        <li>Form control value is an object with startDate and endDate</li>
        <li>Supports setValue, disable, enable</li>
        <li>Tracks touched and dirty states</li>
      </ul>
    </org-storybook-example-container>
  `,
})
class DatePickerInputReactiveFormsDemo {
  protected formControl = new FormControl<{ startDate: DateTime | null; endDate: DateTime | null }>({
    startDate: null,
    endDate: null,
  });
  protected now = DateTime.now().startOf('day');
  protected nowPlus7 = DateTime.now().plus({ days: 7 }).endOf('day').minus({ seconds: 1 });
}

export const ReactiveForms: Story = {
  render: () => ({
    template: '<org-date-picker-input-reactive-forms-demo />',
    moduleMetadata: {
      imports: [DatePickerInputReactiveFormsDemo],
    },
  }),
};

@Component({
  selector: 'org-date-picker-input-simple-forms-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePickerInput, StorybookExampleContainer, StorybookExampleContainerSection, Button, JsonPipe],
  template: `
    <org-storybook-example-container
      title="Simple Forms Integration"
      [currentState]="
        'Selected: ' +
        (startDate() ? startDate()!.toISO() : 'None') +
        ' to ' +
        (endDate() ? endDate()!.toISO() : 'None')
      "
    >
      <org-storybook-example-container-section label="Date Picker with Event Binding">
        <div class="max-w-[400px]">
          <org-date-picker-input
            #datePicker
            placeholder="Select date range..."
            [allowRangeSelection]="true"
            [selectedStartDate]="startDate()"
            [selectedEndDate]="endDate()"
            (dateSelected)="handleDateSelected($event)"
          />
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Controls">
        <div class="flex flex-wrap gap-2">
          <org-button color="primary" size="sm" (clicked)="setThisWeek()"> Set This Week </org-button>
          <org-button color="secondary" size="sm" (clicked)="clearDates()"> Clear </org-button>
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="State">
        <div class="text-sm space-y-1">
          <div>
            <strong>Start Date:</strong>
            {{ startDate() ? startDate()!.toISO() : 'None' }}
          </div>
          <div>
            <strong>End Date:</strong>
            {{ endDate() ? endDate()!.toISO() : 'None' }}
          </div>
        </div>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li>Simple event-based integration without forms</li>
        <li>Use dateSelected output event to handle changes</li>
        <li>Pass selectedStartDate and selectedEndDate as inputs</li>
        <li>Perfect for non-form use cases</li>
      </ul>
    </org-storybook-example-container>
  `,
})
class DatePickerInputSimpleFormsDemo {
  protected startDate = signal<DateTime | null>(null);
  protected endDate = signal<DateTime | null>(null);

  protected handleDateSelected(dates: { startDate: DateTime | null; endDate: DateTime | null }): void {
    console.log('Dates selected:', dates);
    this.startDate.set(dates.startDate);
    this.endDate.set(dates.endDate);
  }

  protected setThisWeek(): void {
    const now = DateTime.now();
    this.startDate.set(now.startOf('week').startOf('day'));
    this.endDate.set(now.endOf('week').endOf('day').minus({ seconds: 1 }));
  }

  protected clearDates(): void {
    this.startDate.set(null);
    this.endDate.set(null);
  }
}

export const SimpleForms: Story = {
  render: () => ({
    template: '<org-date-picker-input-simple-forms-demo />',
    moduleMetadata: {
      imports: [DatePickerInputSimpleFormsDemo],
    },
  }),
};

@Component({
  selector: 'org-date-picker-input-validation-single-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePickerInput, StorybookExampleContainer, StorybookExampleContainerSection, Button, JsonPipe],
  template: `
    <org-storybook-example-container
      title="Validation - Single Date Required"
      [currentState]="'Has error: ' + hasError()"
    >
      <org-storybook-example-container-section label="Date Picker with Validation">
        <div class="max-w-[400px]">
          <org-date-picker-input
            placeholder="Select a date..."
            [selectedStartDate]="selectedDate()"
            [validationMessage]="validationMessage()"
            (dateSelected)="handleDateSelected($event)"
          />
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Controls">
        <div class="flex flex-wrap gap-2">
          <org-button color="primary" size="sm" (clicked)="validateSelection()"> Trigger Validation </org-button>
          <org-button color="secondary" size="sm" (clicked)="clearValidation()"> Clear Validation </org-button>
          <org-button color="secondary" size="sm" (clicked)="clearDate()"> Clear Date </org-button>
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="State">
        <div class="text-sm space-y-1">
          <div>
            <strong>Selected Date:</strong>
            {{ selectedDate() ? selectedDate()!.toISO() : 'None' }}
          </div>
          <div><strong>Validation Message:</strong> "{{ validationMessage() }}"</div>
          <div><strong>Has Error:</strong> {{ hasError() }}</div>
        </div>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li>Validation message is displayed when provided</li>
        <li>Date picker shows error state with red border</li>
        <li>Validation message appears below the input</li>
        <li>Validation can be triggered programmatically</li>
      </ul>
    </org-storybook-example-container>
  `,
})
class DatePickerInputValidationSingleDemo {
  protected selectedDate = signal<DateTime | null>(null);
  protected validationMessage = signal<string>('');
  protected hasError = computed<boolean>(() => !!this.validationMessage().trim());

  protected handleDateSelected(dates: { startDate: DateTime | null; endDate: DateTime | null }): void {
    console.log('Date selected:', dates);
    this.selectedDate.set(dates.startDate);

    if (dates.startDate && this.hasError()) {
      this.clearValidation();
    }
  }

  protected validateSelection(): void {
    if (!this.selectedDate()) {
      this.validationMessage.set('Date is required');
    } else {
      this.validationMessage.set('');
    }
  }

  protected clearValidation(): void {
    this.validationMessage.set('');
  }

  protected clearDate(): void {
    this.selectedDate.set(null);
  }
}

export const ValidationSingleRequired: Story = {
  render: () => ({
    template: '<org-date-picker-input-validation-single-demo />',
    moduleMetadata: {
      imports: [DatePickerInputValidationSingleDemo],
    },
  }),
};

@Component({
  selector: 'org-date-picker-input-validation-range-either-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePickerInput, StorybookExampleContainer, StorybookExampleContainerSection, Button, JsonPipe],
  template: `
    <org-storybook-example-container
      title="Validation - Either Date Required (Range)"
      [currentState]="'Has error: ' + hasError()"
    >
      <org-storybook-example-container-section label="Date Picker with Validation">
        <div class="max-w-[400px]">
          <org-date-picker-input
            placeholder="Select at least one date..."
            [allowRangeSelection]="true"
            [allowPartialRangeSelection]="true"
            [selectedStartDate]="startDate()"
            [selectedEndDate]="endDate()"
            [validationMessage]="validationMessage()"
            (dateSelected)="handleDateSelected($event)"
          />
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Controls">
        <div class="flex flex-wrap gap-2">
          <org-button color="primary" size="sm" (clicked)="validateSelection()"> Trigger Validation </org-button>
          <org-button color="secondary" size="sm" (clicked)="clearValidation()"> Clear Validation </org-button>
          <org-button color="secondary" size="sm" (clicked)="clearDates()"> Clear Dates </org-button>
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="State">
        <div class="text-sm space-y-1">
          <div>
            <strong>Start Date:</strong>
            {{ startDate() ? startDate()!.toISO() : 'None' }}
          </div>
          <div>
            <strong>End Date:</strong>
            {{ endDate() ? endDate()!.toISO() : 'None' }}
          </div>
          <div><strong>Validation Message:</strong> "{{ validationMessage() }}"</div>
          <div><strong>Has Error:</strong> {{ hasError() }}</div>
        </div>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li>At least one date (start or end) must be selected</li>
        <li>Validation message shows when no dates are selected</li>
        <li>Useful for partial range selection validation</li>
      </ul>
    </org-storybook-example-container>
  `,
})
class DatePickerInputValidationRangeEitherDemo {
  protected startDate = signal<DateTime | null>(null);
  protected endDate = signal<DateTime | null>(null);
  protected validationMessage = signal<string>('');
  protected hasError = computed<boolean>(() => !!this.validationMessage().trim());

  protected handleDateSelected(dates: { startDate: DateTime | null; endDate: DateTime | null }): void {
    console.log('Dates selected:', dates);
    this.startDate.set(dates.startDate);
    this.endDate.set(dates.endDate);

    if ((dates.startDate || dates.endDate) && this.hasError()) {
      this.clearValidation();
    }
  }

  protected validateSelection(): void {
    if (!this.startDate() && !this.endDate()) {
      this.validationMessage.set('At least one date is required');
    } else {
      this.validationMessage.set('');
    }
  }

  protected clearValidation(): void {
    this.validationMessage.set('');
  }

  protected clearDates(): void {
    this.startDate.set(null);
    this.endDate.set(null);
  }
}

export const ValidationRangeEitherRequired: Story = {
  render: () => ({
    template: '<org-date-picker-input-validation-range-either-demo />',
    moduleMetadata: {
      imports: [DatePickerInputValidationRangeEitherDemo],
    },
  }),
};

@Component({
  selector: 'org-date-picker-input-validation-range-both-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePickerInput, StorybookExampleContainer, StorybookExampleContainerSection, Button, JsonPipe],
  template: `
    <org-storybook-example-container
      title="Validation - Both Dates Required (Range)"
      [currentState]="'Has error: ' + hasError()"
    >
      <org-storybook-example-container-section label="Date Picker with Validation">
        <div class="max-w-[400px]">
          <org-date-picker-input
            placeholder="Select both dates..."
            [allowRangeSelection]="true"
            [selectedStartDate]="startDate()"
            [selectedEndDate]="endDate()"
            [validationMessage]="validationMessage()"
            (dateSelected)="handleDateSelected($event)"
          />
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Controls">
        <div class="flex flex-wrap gap-2">
          <org-button color="primary" size="sm" (clicked)="validateSelection()"> Trigger Validation </org-button>
          <org-button color="secondary" size="sm" (clicked)="clearValidation()"> Clear Validation </org-button>
          <org-button color="secondary" size="sm" (clicked)="clearDates()"> Clear Dates </org-button>
        </div>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="State">
        <div class="text-sm space-y-1">
          <div>
            <strong>Start Date:</strong>
            {{ startDate() ? startDate()!.toISO() : 'None' }}
          </div>
          <div>
            <strong>End Date:</strong>
            {{ endDate() ? endDate()!.toISO() : 'None' }}
          </div>
          <div><strong>Validation Message:</strong> "{{ validationMessage() }}"</div>
          <div><strong>Has Error:</strong> {{ hasError() }}</div>
        </div>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li>Both start and end dates must be selected</li>
        <li>Validation message shows when either date is missing</li>
        <li>Useful for complete date range validation</li>
      </ul>
    </org-storybook-example-container>
  `,
})
class DatePickerInputValidationRangeBothDemo {
  protected startDate = signal<DateTime | null>(null);
  protected endDate = signal<DateTime | null>(null);
  protected validationMessage = signal<string>('');
  protected hasError = computed<boolean>(() => !!this.validationMessage().trim());

  protected handleDateSelected(dates: { startDate: DateTime | null; endDate: DateTime | null }): void {
    console.log('Dates selected:', dates);
    this.startDate.set(dates.startDate);
    this.endDate.set(dates.endDate);

    if (dates.startDate && dates.endDate && this.hasError()) {
      this.clearValidation();
    }
  }

  protected validateSelection(): void {
    if (!this.startDate() || !this.endDate()) {
      this.validationMessage.set('Both start and end dates are required');
    } else {
      this.validationMessage.set('');
    }
  }

  protected clearValidation(): void {
    this.validationMessage.set('');
  }

  protected clearDates(): void {
    this.startDate.set(null);
    this.endDate.set(null);
  }
}

export const ValidationRangeBothRequired: Story = {
  render: () => ({
    template: '<org-date-picker-input-validation-range-both-demo />',
    moduleMetadata: {
      imports: [DatePickerInputValidationRangeBothDemo],
    },
  }),
};

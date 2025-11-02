import type { Meta, StoryObj } from '@storybook/angular';
import { DateTime } from 'luxon';
import { DateDisplay } from './date-display';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';
import { DateFormat, TimeFormat } from '@organization/shared-utils';

const meta: Meta<DateDisplay> = {
  title: 'Core/Components/Date Display',
  component: DateDisplay,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Date Display Component

  A simple component for displaying dates with optional time and timezone information.

  ### Features
  - Displays dates using Luxon DateTime objects
  - Configurable date formats
  - Optional time display with configurable formats
  - Optional timezone display
  - Shows "----" in neutral text for invalid dates
  - Support for inline or block display

  ### Usage Examples
  \`\`\`html
  <!-- Basic date display -->
  <org-date-display [date]="myDate" />

  <!-- Date with time -->
  <org-date-display
    [date]="myDate"
    [timeFormat]="TimeFormat.STANDARD"
  />

  <!-- Date with time and timezone -->
  <org-date-display
    [date]="myDate"
    [timeFormat]="TimeFormat.STANDARD"
    [showTimezone]="true"
  />

  <!-- Custom date format -->
  <org-date-display
    [date]="myDate"
    [dateFormat]="DateFormat.MONTH_YEAR"
  />

  <!-- Block display -->
  <org-date-display
    [date]="myDate"
    [isInline]="false"
  />
  \`\`\`
</div>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<DateDisplay>;

const sampleDate = DateTime.fromISO('2024-03-15T14:30:00', { zone: 'America/New_York' });

export const Default: Story = {
  args: {
    date: sampleDate,
    dateFormat: DateFormat.STANDARD,
    timeFormat: null,
    showTimezone: true,
    isInline: true,
    containerClass: '',
  },
  argTypes: {
    date: {
      control: false,
      description: 'Luxon DateTime object to display (required)',
    },
    dateFormat: {
      control: 'select',
      options: Object.values(DateFormat),
      description: 'Format for the date portion',
    },
    timeFormat: {
      control: 'select',
      options: [null, ...Object.values(TimeFormat)],
      description: 'Format for the time portion (null means no time displayed)',
    },
    showTimezone: {
      control: 'boolean',
      description: 'Whether to display the timezone',
    },
    isInline: {
      control: 'boolean',
      description: 'Whether to display inline or block',
    },
    containerClass: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default date display with standard format. Use the controls below to interact with the component.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <org-date-display
        [date]="date"
        [dateFormat]="dateFormat"
        [timeFormat]="timeFormat"
        [showTimezone]="showTimezone"
        [isInline]="isInline"
        [containerClass]="containerClass"
      />
    `,
    moduleMetadata: {
      imports: [DateDisplay],
    },
  }),
};

export const DateFormats: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different date format options.',
      },
    },
  },
  render: () => ({
    props: {
      sampleDate,
      DateFormat,
    },
    template: `
      <org-storybook-example-container
        title="Date Formats"
        currentState="Comparing different date format options"
      >
        <org-storybook-example-container-section label="Standard (M/d/yy)">
          <org-date-display [date]="sampleDate" [dateFormat]="DateFormat.STANDARD" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Month Year (LLL yyyy)">
          <org-date-display [date]="sampleDate" [dateFormat]="DateFormat.MONTH_YEAR" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="SQL Format (yyyy-MM-dd)">
          <org-date-display [date]="sampleDate" [dateFormat]="DateFormat.SQL" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Day Only (d)">
          <org-date-display [date]="sampleDate" [dateFormat]="DateFormat.DAY" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Standard</strong>: Short date format (M/d/yy)</li>
          <li><strong>Month Year</strong>: Displays month name and year</li>
          <li><strong>SQL</strong>: Database-friendly format</li>
          <li><strong>Day</strong>: Shows only the day number</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [DateDisplay, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const TimeFormats: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of date display with different time format options.',
      },
    },
  },
  render: () => ({
    props: {
      sampleDate,
      TimeFormat,
    },
    template: `
      <org-storybook-example-container
        title="Time Formats"
        currentState="Comparing date display with and without time"
      >
        <org-storybook-example-container-section label="Date Only (no time)">
          <org-date-display [date]="sampleDate" [timeFormat]="null" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Standard Time (h:mm a)">
          <org-date-display [date]="sampleDate" [timeFormat]="TimeFormat.STANDARD" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Time and Seconds (h:mm:ss a)">
          <org-date-display [date]="sampleDate" [timeFormat]="TimeFormat.STANDARD_WITH_SECONDS" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="SQL Time Format (HH:mm:ss)">
          <org-date-display [date]="sampleDate" [timeFormat]="TimeFormat.SQL" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Date Only</strong>: No time information displayed</li>
          <li><strong>Standard Time</strong>: 12-hour format with AM/PM</li>
          <li><strong>With Seconds</strong>: Includes seconds in the time</li>
          <li><strong>SQL Format</strong>: 24-hour format for databases</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [DateDisplay, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const TimezoneDisplay: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of date display with and without timezone information.',
      },
    },
  },
  render: () => ({
    props: {
      sampleDate,
      TimeFormat,
    },
    template: `
      <org-storybook-example-container
        title="Timezone Display"
        currentState="Comparing with and without timezone"
      >
        <org-storybook-example-container-section label="Date Only (timezone not applicable)">
          <org-date-display [date]="sampleDate" [timeFormat]="null" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Time, No Timezone">
          <org-date-display
            [date]="sampleDate"
            [timeFormat]="TimeFormat.STANDARD"
            [showTimezone]="false"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Time and Timezone">
          <org-date-display
            [date]="sampleDate"
            [timeFormat]="TimeFormat.STANDARD"
            [showTimezone]="true"
          />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Date Only</strong>: Timezone is not shown when time is not displayed</li>
          <li><strong>No Timezone</strong>: Time is shown without timezone information</li>
          <li><strong>With Timezone</strong>: Full date, time, and timezone (default)</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [DateDisplay, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const InvalidDate: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Display of invalid dates shows "----" in neutral text color.',
      },
    },
  },
  render: () => ({
    props: {
      validDate: sampleDate,
      invalidDate: DateTime.invalid('test invalid'),
    },
    template: `
      <org-storybook-example-container
        title="Invalid Date Handling"
        currentState="Comparing valid and invalid dates"
      >
        <org-storybook-example-container-section label="Valid Date">
          <org-date-display [date]="validDate" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Invalid Date">
          <org-date-display [date]="invalidDate" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Valid Date</strong>: Displays formatted date normally</li>
          <li><strong>Invalid Date</strong>: Shows "----" in neutral text color</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [DateDisplay, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const DisplayModes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of inline and block display modes.',
      },
    },
  },
  render: () => ({
    props: {
      sampleDate,
      TimeFormat,
    },
    template: `
      <org-storybook-example-container
        title="Display Modes"
        currentState="Comparing inline and block display"
      >
        <org-storybook-example-container-section label="Inline (default)">
          <div class="text-sm">
            Event on <org-date-display
              [date]="sampleDate"
              [timeFormat]="TimeFormat.STANDARD"
              [isInline]="true"
            /> was successful
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Block">
          <div class="text-sm">
            <div>Event Details:</div>
            <org-date-display
              [date]="sampleDate"
              [timeFormat]="TimeFormat.STANDARD"
              [isInline]="false"
            />
          </div>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Inline</strong>: Flows with surrounding text (default)</li>
          <li><strong>Block</strong>: Takes up full width, on its own line</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [DateDisplay, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

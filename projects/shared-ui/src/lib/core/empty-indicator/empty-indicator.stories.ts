import type { Meta, StoryObj } from '@storybook/angular';
import { EmptyIndicator } from './empty-indicator';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';

const meta: Meta<EmptyIndicator> = {
  title: 'Core/Components/Empty Indicator',
  component: EmptyIndicator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Empty Indicator Component

  A component used to display when a section of the page has no data. It features a centered title with an optional action button and conditional border styling.

  ### Features
  - Centered title text for empty state messaging
  - Optional action button below title
  - Conditional border display
  - Flexible container styling
  - Fully accessible
  - Light and dark theme support

  ### Usage Examples
  \`\`\`html
  <!-- Basic empty indicator -->
  <org-empty-indicator title="No data available" />

  <!-- With border disabled -->
  <org-empty-indicator title="No results found" [hasBorder]="false" />

  <!-- With action button -->
  <org-empty-indicator
    title="No items to display"
    actionLabel="Add Item"
    (actionTriggered)="onAddItem()"
  />
  \`\`\`

  ### Notes
  - The action button only displays if both \`actionLabel\` is provided and there is a listener on the \`actionTriggered\` output
  - The border is displayed by default but can be disabled with \`hasBorder\` input
  - The component takes full width of its container with a minimum height of 200px
</div>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<EmptyIndicator>;

export const Default: Story = {
  args: {
    title: 'No data available',
    actionLabel: null,
    hasBorder: true,
    containerClass: '',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The main text displayed in the empty state',
    },
    actionLabel: {
      control: 'text',
      description: 'Optional label for the action button',
    },
    hasBorder: {
      control: 'boolean',
      description: 'Whether to display the border around the indicator',
    },
    containerClass: {
      control: 'text',
      description: 'Additional CSS classes for the container',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default empty indicator with title only. Use the controls below to interact with the component.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      onAction: () => {
        console.log('action triggered');
      },
    },
    template: `
      <org-empty-indicator
        [title]="title"
        [actionLabel]="actionLabel"
        [hasBorder]="hasBorder"
        [containerClass]="containerClass"
        (actionTriggered)="onAction()"
      />
    `,
    moduleMetadata: {
      imports: [EmptyIndicator],
    },
  }),
};

export const WithBorder: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of empty indicators with and without borders.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Border Variants"
        currentState="Comparing with and without border"
      >
        <org-storybook-example-container-section label="With Border (Default)">
          <org-empty-indicator title="No data available" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Without Border">
          <org-empty-indicator title="No data available" [hasBorder]="false" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>With Border</strong>: Displays a rounded border around the content (default behavior)</li>
          <li><strong>Without Border</strong>: No border is displayed, useful for minimal layouts</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [EmptyIndicator, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const WithActionButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Empty indicator with an action button. The button only displays when actionLabel is provided and actionTriggered event has a listener.',
      },
    },
  },
  render: () => ({
    props: {
      onAddItem: () => {
        console.log('add item clicked');
      },
      onCreateNew: () => {
        console.log('create new clicked');
      },
    },
    template: `
      <org-storybook-example-container
        title="With Action Button"
        currentState="Comparing empty indicators with and without action buttons"
      >
        <org-storybook-example-container-section label="No Action Button">
          <org-empty-indicator title="No items found" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Action Button">
          <org-empty-indicator
            title="No items to display"
            actionLabel="Add Item"
            (actionTriggered)="onAddItem()"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Different Action Label">
          <org-empty-indicator
            title="No results found"
            actionLabel="Create New"
            (actionTriggered)="onCreateNew()"
          />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>No Action Button</strong>: Only displays the title text</li>
          <li><strong>With Action Button</strong>: Displays a primary button below the title when actionLabel is provided and actionTriggered has a listener</li>
          <li><strong>Different Labels</strong>: The action button label can be customized for different contexts</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [EmptyIndicator, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const DifferentContexts: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Examples of empty indicators in different use case contexts.',
      },
    },
  },
  render: () => ({
    props: {
      onAddTask: () => {
        console.log('add task clicked');
      },
      onSearch: () => {
        console.log('search clicked');
      },
      onUpload: () => {
        console.log('upload clicked');
      },
    },
    template: `
      <org-storybook-example-container
        title="Different Contexts"
        currentState="Comparing empty indicators in various use cases"
      >
        <org-storybook-example-container-section label="Empty Task List">
          <org-empty-indicator
            title="No tasks yet"
            actionLabel="Add Task"
            (actionTriggered)="onAddTask()"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="No Search Results">
          <org-empty-indicator
            title="No results found for your search"
            actionLabel="Try Different Search"
            (actionTriggered)="onSearch()"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Empty File List">
          <org-empty-indicator
            title="No files uploaded"
            actionLabel="Upload File"
            (actionTriggered)="onUpload()"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="No Data (No Action)">
          <org-empty-indicator title="Data will appear here once available" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Task List</strong>: Empty state for a task management interface</li>
          <li><strong>Search Results</strong>: Empty state when no search results are found</li>
          <li><strong>File List</strong>: Empty state for a file upload interface</li>
          <li><strong>No Action</strong>: Simple informational empty state without actions</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [EmptyIndicator, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const CustomStyling: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Examples showing how to use containerClass for custom styling.',
      },
    },
  },
  render: () => ({
    props: {
      onAction: () => {
        console.log('action clicked');
      },
    },
    template: `
      <org-storybook-example-container
        title="Custom Styling"
        currentState="Comparing empty indicators with custom container classes"
      >
        <org-storybook-example-container-section label="Default Styling">
          <org-empty-indicator title="No data available" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Custom Height">
          <org-empty-indicator
            title="No data available"
            containerClass="min-h-[300px]"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Custom Background">
          <org-empty-indicator
            title="No data available"
            containerClass="bg-background-level1"
          />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Default</strong>: Standard minimum height of 200px</li>
          <li><strong>Custom Height</strong>: Increased minimum height using containerClass</li>
          <li><strong>Custom Background</strong>: Added background color using containerClass</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [EmptyIndicator, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

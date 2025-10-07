import type { Meta, StoryObj } from '@storybook/angular';
import { List } from './list';
import { ListItem } from './list-item';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';
import { Icon } from '../icon/icon';

const meta: Meta<List> = {
  title: 'Core/Components/List',
  component: List,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## List Component

  A flexible list container component that displays list items in a vertical column layout, designed to work with the ListItem component.

  ### Features
  - Vertical flex column layout
  - No gap between items by default
  - Works with ListItem components
  - Customizable with containerClass

  ### ListItem Features
  - Conditionally clickable - only shows cursor and hover when a click listener is attached
  - Hover background color change (neutral subtle) when clickable
  - Selected state with primary subtle background
  - Content centered using flexbox
  - Accessible with focus states

  ### Usage Examples
  \`\`\`html
  <!-- Basic list (non-clickable items) -->
  <org-list>
    <org-list-item>Item 1</org-list-item>
    <org-list-item>Item 2</org-list-item>
    <org-list-item>Item 3</org-list-item>
  </org-list>

  <!-- List with selected items -->
  <org-list>
    <org-list-item [isSelected]="true">Selected Item</org-list-item>
    <org-list-item>Normal Item</org-list-item>
  </org-list>

  <!-- With click handler (clickable items) -->
  <org-list>
    <org-list-item (clicked)="handleClick()">Clickable Item</org-list-item>
  </org-list>

  <!-- Mixed clickable and non-clickable -->
  <org-list>
    <org-list-item (clicked)="handleClick()">Clickable Item</org-list-item>
    <org-list-item>Non-Clickable Label</org-list-item>
  </org-list>
</div>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<List>;

export const Default: Story = {
  args: {
    containerClass: '',
  },
  argTypes: {
    containerClass: {
      control: 'text',
      description: 'Additional CSS classes for the container',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default list with basic items. Use the controls below to interact with the component.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <org-list [containerClass]="containerClass">
        <org-list-item>List Item 1</org-list-item>
        <org-list-item>List Item 2</org-list-item>
        <org-list-item>List Item 3</org-list-item>
      </org-list>
    `,
    moduleMetadata: {
      imports: [List, ListItem],
    },
  }),
};

export const BasicList: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A basic list with multiple items.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Basic List"
        currentState="Simple list with multiple items"
      >
        <org-storybook-example-container-section label="Default">
          <org-list>
            <org-list-item>Dashboard</org-list-item>
            <org-list-item><org-icon name="arrow-down" />Projects</org-list-item>
            <org-list-item>Team Members<org-icon name="arrow-down" class="ml-auto" /></org-list-item>
            <org-list-item>Settings</org-list-item>
          </org-list>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>List items are displayed in a vertical column</li>
          <li>No gap between items by default</li>
          <li>Items are clickable and show hover effects</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [List, ListItem, StorybookExampleContainer, StorybookExampleContainerSection, Icon],
    },
  }),
};

export const ListItemStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different list item states: normal and selected.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="List Item States"
        currentState="Comparing normal and selected states"
      >
        <org-storybook-example-container-section label="Normal">
          <org-list>
            <org-list-item>Normal List Item</org-list-item>
          </org-list>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Selected">
          <org-list>
            <org-list-item [isSelected]="true">Selected List Item</org-list-item>
          </org-list>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Mixed States">
          <org-list>
            <org-list-item>Dashboard</org-list-item>
            <org-list-item [isSelected]="true">Projects</org-list-item>
            <org-list-item>Team Members</org-list-item>
            <org-list-item>Settings</org-list-item>
          </org-list>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Normal</strong>: Shows hover effect on mouse over (neutral subtle background)</li>
          <li><strong>Selected</strong>: Has primary subtle background that overrides hover</li>
          <li>Both states maintain focus-visible styles for keyboard navigation</li>
          <li>Selected state takes priority over hover effects</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [List, ListItem, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const WithLongContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'List items with varying content lengths to demonstrate layout.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="List with Varying Content"
        currentState="List items with different content lengths"
      >
        <org-storybook-example-container-section label="Long Content">
          <org-list>
            <org-list-item>Short item</org-list-item>
            <org-list-item>This is a much longer item with more content to show how text wraps</org-list-item>
            <org-list-item [isSelected]="true">Selected item with a longer description that spans multiple words</org-list-item>
            <org-list-item>Another short item</org-list-item>
          </org-list>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>Items adjust height based on content</li>
          <li>Content is centered vertically using flexbox</li>
          <li>Text wraps naturally within items</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [List, ListItem, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive list items demonstrating click behavior. Items only show clickable styling when they have a click listener attached.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Interactive Behavior"
        currentState="Comparing clickable vs non-clickable items"
      >
        <org-storybook-example-container-section label="With Click Listeners">
          <org-list>
            <org-list-item (clicked)="undefined">Clickable - Item 1</org-list-item>
            <org-list-item (clicked)="undefined">Clickable - Item 2</org-list-item>
            <org-list-item [isSelected]="true" (clicked)="undefined">Clickable - Selected Item</org-list-item>
          </org-list>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Without Click Listeners">
          <org-list>
            <org-list-item>Not Clickable - Item 1</org-list-item>
            <org-list-item>Not Clickable - Item 2</org-list-item>
            <org-list-item [isSelected]="true">Not Clickable - Selected Item</org-list-item>
          </org-list>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Mixed">
          <org-list>
            <org-list-item (clicked)="undefined">Clickable Item</org-list-item>
            <org-list-item>Non-Clickable Item</org-list-item>
            <org-list-item (clicked)="undefined">Another Clickable Item</org-list-item>
          </org-list>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>Items with click listeners show pointer cursor and hover effects</li>
          <li>Items without click listeners have default cursor and no hover effects</li>
          <li>Focus-visible styles only appear on clickable items</li>
          <li>Selected state works independently of clickable state</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [List, ListItem, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const CustomStyling: Story = {
  parameters: {
    docs: {
      description: {
        story: 'List with custom styling using containerClass.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Custom Styling"
        currentState="Lists with custom classes and styling"
      >
        <org-storybook-example-container-section label="With Border">
          <org-list containerClass="border border-border rounded-md">
            <org-list-item>Dashboard</org-list-item>
            <org-list-item [isSelected]="true">Projects</org-list-item>
            <org-list-item>Settings</org-list-item>
          </org-list>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Gap">
          <org-list containerClass="gap-1">
            <org-list-item>Item 1</org-list-item>
            <org-list-item>Item 2</org-list-item>
            <org-list-item>Item 3</org-list-item>
          </org-list>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Custom Item Class">
          <org-list>
            <org-list-item containerClass="rounded-md">Rounded Item 1</org-list-item>
            <org-list-item containerClass="rounded-md">Rounded Item 2</org-list-item>
            <org-list-item containerClass="rounded-md" [isSelected]="true">Rounded Selected</org-list-item>
          </org-list>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>containerClass allows custom styling of the list wrapper</li>
          <li>List items also support containerClass for individual styling</li>
          <li>Can add borders, gaps, and other styling as needed</li>
          <li>Maintains all interactive behaviors</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [List, ListItem, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

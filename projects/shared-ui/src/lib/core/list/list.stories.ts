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
    <org-list-item (clicked)="onClick()">Clickable Item</org-list-item>
  </org-list>

  <!-- Mixed clickable and non-clickable -->
  <org-list>
    <org-list-item (clicked)="onClick()">Clickable Item</org-list-item>
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

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
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

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
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

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
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
            <org-list-item asTag="button" (clicked)="undefined">Clickable - Item 1</org-list-item>
            <org-list-item asTag="button" (clicked)="undefined">Clickable - Item 2</org-list-item>
            <org-list-item asTag="button" [isSelected]="true" (clicked)="undefined">Clickable - Selected Item</org-list-item>
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
            <org-list-item asTag="button" (clicked)="undefined">Clickable Item</org-list-item>
            <org-list-item>Non-Clickable Item</org-list-item>
            <org-list-item asTag="a" href="#">Another Clickable Item as an anchor tag</org-list-item>
          </org-list>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
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

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
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

export const ItemTypes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'List items can be rendered as different HTML elements using the asTag input - button, anchor, or div (default).',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="List Item Types"
        currentState="Demonstrating different element types in the same list"
      >
        <org-storybook-example-container-section label="Mixed Element Types">
          <org-list>
            <org-list-item asTag="button" (clicked)="undefined">Button Item - Clickable with event</org-list-item>
            <org-list-item asTag="a" href="https://example.com" [isExternalHref]="true">Anchor Item - External Link</org-list-item>
            <org-list-item asTag="a" href="/dashboard">Anchor Item - Internal Link</org-list-item>
            <org-list-item>Div Item - Static Content</org-list-item>
            <org-list-item asTag="button" [isSelected]="true" (clicked)="undefined">Button Item - Selected</org-list-item>
          </org-list>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Button (asTag="button")</strong>: Renders as button element, requires clicked event handler</li>
          <li><strong>Anchor (asTag="a")</strong>: Renders as anchor element, requires href input</li>
          <li><strong>Div (default)</strong>: Renders as div element when no asTag is specified</li>
          <li>External links automatically include target="_blank" and rel="noopener noreferrer"</li>
          <li>All types support the same styling and state management (selected, hover, etc.)</li>
          <li>Each type maintains proper accessibility attributes for its element</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [List, ListItem, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const DisabledState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'List items can be disabled to prevent interaction. Disabled items show reduced opacity and cannot be clicked.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Disabled State"
        currentState="Demonstrating disabled list items in different scenarios"
      >
        <org-storybook-example-container-section label="Disabled vs Enabled">
          <org-list>
            <org-list-item asTag="button" (clicked)="console.log('Enabled item clicked')">Enabled Item</org-list-item>
            <org-list-item asTag="button" [disabled]="true" (clicked)="console.log('Disabled item clicked')">Disabled Item</org-list-item>
            <org-list-item asTag="button" (clicked)="console.log('Enabled item clicked')">Enabled Item</org-list-item>
          </org-list>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Disabled with Selection">
          <org-list>
            <org-list-item asTag="button" [isSelected]="true" (clicked)="console.log('Selected enabled clicked')">Selected & Enabled</org-list-item>
            <org-list-item asTag="button" [isSelected]="true" [disabled]="true" (clicked)="console.log('Selected disabled clicked')">Selected & Disabled</org-list-item>
            <org-list-item asTag="button" [disabled]="true" (clicked)="console.log('Disabled clicked')">Disabled Only</org-list-item>
          </org-list>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Disabled Different Element Types">
          <org-list>
            <org-list-item asTag="button" [disabled]="true" (clicked)="console.log('Button clicked')">Disabled Button</org-list-item>
            <org-list-item asTag="a" href="#" [disabled]="true">Disabled Anchor</org-list-item>
            <org-list-item [disabled]="true">Disabled Div</org-list-item>
          </org-list>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Disabled with Icons">
          <org-list>
            <org-list-item asTag="button" preIcon="arrow-down" (clicked)="console.log('Enabled with icon')">Enabled with Icon</org-list-item>
            <org-list-item asTag="button" preIcon="arrow-down" [disabled]="true" (clicked)="console.log('Disabled with icon')">Disabled with Icon</org-list-item>
            <org-list-item asTag="button" postIcon="arrow-right" [disabled]="true" (clicked)="console.log('Disabled with post icon')">Disabled with Post Icon</org-list-item>
          </org-list>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li>Disabled items show cursor-not-allowed cursor</li>
          <li>Disabled items do not respond to clicks or keyboard interactions</li>
          <li>Disabled items have reduced text color and background to indicate their state</li>
          <li>Disabled items do not show hover effects</li>
          <li>Disabled state can be combined with selected state</li>
          <li>Button elements get the disabled attribute set when disabled</li>
          <li>Anchor elements get aria-disabled attribute when disabled</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [List, ListItem, StorybookExampleContainer, StorybookExampleContainerSection, Icon],
    },
  }),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Lists and list items support different sizes. The list component sets the default size for all items, but individual items can override it with the overrideSize input.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="List Sizes"
        currentState="Demonstrating different size configurations"
      >
        <org-storybook-example-container-section label="Default (Base Size)">
          <org-list>
            <org-list-item preIcon="arrow-down">Dashboard</org-list-item>
            <org-list-item preIcon="arrow-down">Projects</org-list-item>
            <org-list-item preIcon="arrow-down">Settings</org-list-item>
          </org-list>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Small Size on List">
          <org-list size="sm">
            <org-list-item preIcon="arrow-down">Dashboard</org-list-item>
            <org-list-item preIcon="arrow-down">Projects</org-list-item>
            <org-list-item preIcon="arrow-down">Settings</org-list-item>
          </org-list>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Default List with One Small Item">
          <org-list>
            <org-list-item preIcon="arrow-down">Dashboard (base)</org-list-item>
            <org-list-item preIcon="arrow-down" overrideSize="sm">Projects (sm)</org-list-item>
            <org-list-item preIcon="arrow-down">Settings (base)</org-list-item>
          </org-list>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Base size (default)</strong>: px-2.5 py-2 text-base with base icon size</li>
          <li><strong>Small size</strong>: px-1.5 py-1 text-sm with sm icon size</li>
          <li>List component sets the default size for all items</li>
          <li>Individual items can override the list size using overrideSize input</li>
          <li>Icons automatically adjust size based on the item size</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [List, ListItem, StorybookExampleContainer, StorybookExampleContainerSection, Icon],
    },
  }),
};

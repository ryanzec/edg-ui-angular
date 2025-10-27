import type { Meta, StoryObj } from '@storybook/angular';
import { Pagination } from './pagination';
import { PaginationStore } from '../pagination-store/pagination-store';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';

const meta: Meta<Pagination> = {
  title: 'Core/Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Pagination Component

  A flexible pagination component for navigating through large datasets with customizable page visibility and items per page options.

  ### Features
  - Configurable visible page numbers
  - Items per page selector
  - First/last page navigation
  - Previous/next page navigation
  - Smart ellipsis for large page ranges
  - Result count display
  - Disabled state support
  - Keyboard accessible

  ### Key Options
  - **visiblePages**: Number of page buttons to display (default: 7, recommended: odd numbers)
  - **itemsPerPageOptions**: Array of options for items per page selector (default: [5, 10, 20, 50])
  - **defaultTotalItems**: Total number of items in the dataset
  - **defaultItemsPerPage**: Initial items per page value
  - **defaultCurrentPage**: Initial active page (default: 1)
  - **disabled**: Disables all pagination interactions

  ### Usage Examples
  \`\`\`html
  <!-- Basic pagination -->
  <org-pagination
    [defaultTotalItems]="100"
    [defaultItemsPerPage]="10"
  />

  <!-- Pagination with custom visible pages -->
  <org-pagination
    [defaultTotalItems]="500"
    [defaultItemsPerPage]="20"
    [visiblePages]="5"
  />

  <!-- Pagination with events -->
  <org-pagination
    [defaultTotalItems]="1000"
    [defaultItemsPerPage]="50"
    (pageChanged)="onPageChange($event)"
    (itemsPerPageChanged)="onItemsPerPageChange($event)"
  />

  <!-- Disabled pagination -->
  <org-pagination
    [defaultTotalItems]="100"
    [disabled]="true"
  />
  \`\`\`

  ### Events
  - **pageChanged**: Emitted when the current page changes (emits page number)
  - **itemsPerPageChanged**: Emitted when items per page selection changes (emits items per page value)
</div>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<Pagination>;

export const Default: Story = {
  args: {
    defaultCurrentPage: 1,
    defaultTotalItems: 100,
    defaultItemsPerPage: 10,
    defaultVisiblePages: 7,
    defaultItemsPerPageOptions: [5, 10, 20, 50],
    disabled: false,
  },
  argTypes: {
    defaultCurrentPage: {
      control: 'number',
      description: 'The initial active page',
    },
    defaultTotalItems: {
      control: 'number',
      description: 'Total number of items in the dataset',
    },
    defaultItemsPerPage: {
      control: 'select',
      options: [5, 10, 20, 50],
      description: 'Initial items per page value',
    },
    defaultVisiblePages: {
      control: 'number',
      description: 'Number of page buttons to display (odd numbers recommended)',
    },
    defaultItemsPerPageOptions: {
      control: 'object',
      description: 'Array of options for items per page selector',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether pagination is disabled',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default pagination with 100 items. Use the controls below to interact with the component.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <org-pagination
        [defaultCurrentPage]="defaultCurrentPage"
        [defaultTotalItems]="defaultTotalItems"
        [defaultItemsPerPage]="defaultItemsPerPage"
        [visiblePages]="visiblePages"
        [itemsPerPageOptions]="itemsPerPageOptions"
        [disabled]="disabled"
      />
    `,
    moduleMetadata: {
      imports: [Pagination],
      providers: [PaginationStore],
    },
  }),
};

export const DatasetSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of pagination behavior with different dataset sizes (small, medium, large).',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Dataset Sizes"
        currentState="Comparing small, medium, and large datasets"
      >
        <org-storybook-example-container-section label="Small Dataset (25 items)">
          <org-pagination
            [defaultTotalItems]="25"
            [defaultItemsPerPage]="10"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Medium Dataset (100 items)">
          <org-pagination
            [defaultTotalItems]="100"
            [defaultItemsPerPage]="10"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Large Dataset (1000 items)">
          <org-pagination
            [defaultTotalItems]="1000"
            [defaultItemsPerPage]="20"
            [defaultCurrentPage]="25"
          />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Small</strong>: Shows all pages when total pages fit within visible limit</li>
          <li><strong>Medium</strong>: Shows ellipsis when pages exceed visible limit</li>
          <li><strong>Large</strong>: Smart ellipsis placement based on current page position</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Pagination, StorybookExampleContainer, StorybookExampleContainerSection],
      providers: [PaginationStore],
    },
  }),
};

export const PagePositions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of pagination appearance at different page positions (first, middle, last).',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Page Positions"
        currentState="Comparing first, middle, and last page positions"
      >
        <org-storybook-example-container-section label="First Page">
          <org-pagination
            [defaultTotalItems]="500"
            [defaultItemsPerPage]="10"
            [defaultCurrentPage]="1"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Middle Page">
          <org-pagination
            [defaultTotalItems]="500"
            [defaultItemsPerPage]="10"
            [defaultCurrentPage]="25"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Last Page">
          <org-pagination
            [defaultTotalItems]="500"
            [defaultItemsPerPage]="10"
            [defaultCurrentPage]="50"
          />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>First Page</strong>: Previous/First buttons disabled, ellipsis after initial pages</li>
          <li><strong>Middle Page</strong>: All navigation enabled, ellipsis on both sides</li>
          <li><strong>Last Page</strong>: Next/Last buttons disabled, ellipsis before final pages</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Pagination, StorybookExampleContainer, StorybookExampleContainerSection],
      providers: [PaginationStore],
    },
  }),
};

export const VisiblePageVariations: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different visible page configurations (5, 7, 11 pages).',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Visible Page Variations"
        currentState="Comparing different numbers of visible pages"
      >
        <org-storybook-example-container-section label="5 Visible Pages (Compact)">
          <org-pagination
            [defaultTotalItems]="500"
            [defaultItemsPerPage]="10"
            [defaultCurrentPage]="25"
            [visiblePages]="5"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="7 Visible Pages (Default)">
          <org-pagination
            [defaultTotalItems]="500"
            [defaultItemsPerPage]="10"
            [defaultCurrentPage]="25"
            [visiblePages]="7"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="11 Visible Pages (Expanded)">
          <org-pagination
            [defaultTotalItems]="500"
            [defaultItemsPerPage]="10"
            [defaultCurrentPage]="25"
            [visiblePages]="11"
          />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>5 Pages</strong>: Compact view with fewer page buttons</li>
          <li><strong>7 Pages</strong>: Balanced default view (recommended)</li>
          <li><strong>11 Pages</strong>: Expanded view showing more page options</li>
          <li>Odd numbers are recommended to maintain symmetry around current page</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Pagination, StorybookExampleContainer, StorybookExampleContainerSection],
      providers: [PaginationStore],
    },
  }),
};

export const ItemsPerPageOptions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different items per page configurations.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Items Per Page Options"
        currentState="Comparing different items per page configurations"
      >
        <org-storybook-example-container-section label="Standard Options (5, 10, 20, 50)">
          <org-pagination
            [defaultTotalItems]="300"
            [defaultItemsPerPage]="10"
            [itemsPerPageOptions]="[5, 10, 20, 50]"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Custom Options (10, 25, 50, 100)">
          <org-pagination
            [defaultTotalItems]="300"
            [defaultItemsPerPage]="25"
            [itemsPerPageOptions]="[10, 25, 50, 100]"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Fewer Options (10, 50)">
          <org-pagination
            [defaultTotalItems]="300"
            [defaultItemsPerPage]="10"
            [itemsPerPageOptions]="[10, 50]"
          />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>Items per page selector shows available options</li>
          <li>Changing items per page adjusts total pages and maintains approximate scroll position</li>
          <li>Default options: [5, 10, 20, 50]</li>
          <li>Custom options can be provided based on use case</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Pagination, StorybookExampleContainer, StorybookExampleContainerSection],
      providers: [PaginationStore],
    },
  }),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of normal and disabled states.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Pagination States"
        currentState="Comparing normal and disabled states"
      >
        <org-storybook-example-container-section label="Normal (Enabled)">
          <org-pagination
            [defaultTotalItems]="100"
            [defaultItemsPerPage]="10"
            [defaultCurrentPage]="5"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Disabled">
          <org-pagination
            [defaultTotalItems]="100"
            [defaultItemsPerPage]="10"
            [defaultCurrentPage]="5"
            [disabled]="true"
          />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Normal</strong>: All navigation buttons and selectors are interactive</li>
          <li><strong>Disabled</strong>: All interactions are disabled, reduced opacity applied</li>
          <li>Disabled state prevents page changes and items per page changes</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Pagination, StorybookExampleContainer, StorybookExampleContainerSection],
      providers: [PaginationStore],
    },
  }),
};

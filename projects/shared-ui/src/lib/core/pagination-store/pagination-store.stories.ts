import type { Meta, StoryObj } from '@storybook/angular';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { PaginationStore } from './pagination-store';
import { Button } from '../button/button';

@Component({
  selector: 'org-pagination-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  providers: [PaginationStore],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <div class="text-sm"><strong>Current Page:</strong> {{ paginationStore.activePage() }}</div>
        <div class="text-sm"><strong>Total Pages:</strong> {{ paginationStore.totalPages() }}</div>
        <div class="text-sm"><strong>Total Items:</strong> {{ paginationStore.totalItems() }}</div>
        <div class="text-sm"><strong>Items Per Page:</strong> {{ paginationStore.activeItemsPerPage() }}</div>
        <div class="text-sm"><strong>Start Index:</strong> {{ paginationStore.startIndex() }}</div>
        <div class="text-sm"><strong>End Index:</strong> {{ paginationStore.endIndex() }}</div>
        <div class="text-sm"><strong>Has Previous:</strong> {{ paginationStore.hasPrevious() }}</div>
        <div class="text-sm"><strong>Has Next:</strong> {{ paginationStore.hasNext() }}</div>
        <div class="text-sm"><strong>Result Text:</strong> {{ paginationStore.resultText() }}</div>
      </div>

      <div class="flex flex-col gap-2">
        <div class="text-sm font-semibold">Visible Pages:</div>
        <div class="flex flex-wrap gap-1">
          @for (page of paginationStore.visiblePageItems(); track $index) {
            @if (page.type === 'page') {
              <span class="px-2 py-1 text-xs border rounded" [class.bg-info-background-subtle]="page.isActive">
                {{ page.value }}
              </span>
            } @else {
              <span class="px-2 py-1 text-xs">...</span>
            }
          }
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <org-button color="primary" size="sm" (click)="paginationStore.firstPage()"> First Page </org-button>
        <org-button color="primary" size="sm" (click)="paginationStore.previousPage()"> Previous Page </org-button>
        <org-button color="primary" size="sm" (click)="paginationStore.nextPage()"> Next Page </org-button>
        <org-button color="primary" size="sm" (click)="paginationStore.lastPage()"> Last Page </org-button>
        <org-button color="secondary" size="sm" (click)="paginationStore.goToPage(5)"> Go to Page 5 </org-button>
        <org-button color="secondary" size="sm" (click)="paginationStore.setItemsPerPage(20)">
          Set Items Per Page: 20
        </org-button>
        <org-button color="secondary" size="sm" (click)="paginationStore.setItemsPerPage(50)">
          Set Items Per Page: 50
        </org-button>
        <org-button color="neutral" size="sm" (click)="paginationStore.setTotalItems(100)">
          Set Total Items: 100
        </org-button>
        <org-button color="neutral" size="sm" (click)="paginationStore.setTotalItems(500)">
          Set Total Items: 500
        </org-button>
      </div>
    </div>
  `,
})
class PaginationDemo {
  public readonly paginationStore = inject(PaginationStore);

  constructor() {
    this.paginationStore.initialize({
      defaultCurrentPage: 1,
      defaultTotalItems: 250,
      defaultItemsPerPage: 10,
      visiblePages: 7,
      itemsPerPageOptions: [5, 10, 20, 50],
      disabled: false,
    });
  }
}

const meta: Meta<PaginationStore> = {
  title: 'Core/Services/Pagination Store',
  component: PaginationStore,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## PaginationStore Service

  A signal-based state management service for handling pagination operations in Angular applications.

  ### Features
  - Signal-based reactive state management
  - Configurable items per page with multiple options
  - Automatic page adjustment when total items change
  - Computed properties for reactive consumption
  - Visible page calculation with ellipsis support
  - Navigation methods (first, previous, next, last)
  - Result text generation for displaying current range

  ### State Properties
  - **activePage**: The current active page number
  - **totalPages**: Total number of pages based on items and items per page
  - **totalItems**: Total number of items across all pages
  - **activeItemsPerPage**: Current items per page setting
  - **startIndex**: Starting index for current page (0-based)
  - **endIndex**: Ending index for current page (0-based)
  - **hasPrevious**: Boolean indicating if previous page exists
  - **hasNext**: Boolean indicating if next page exists
  - **visiblePageItems**: Array of visible page items with ellipsis support
  - **resultText**: Formatted text showing current result range
  - **disabled**: Boolean indicating if pagination is disabled
  - **itemsPerPageOptions**: Available items per page options
  - **visiblePages**: Number of visible page buttons

  ### Methods
  - **initialize(config)**: Initialize pagination with configuration
  - **setTotalItems(total)**: Update total items count
  - **setCurrentPage(page)**: Set specific page number
  - **setItemsPerPage(itemsPerPage)**: Change items per page
  - **goToPage(page)**: Navigate to specific page
  - **previousPage()**: Navigate to previous page
  - **nextPage()**: Navigate to next page
  - **firstPage()**: Navigate to first page
  - **lastPage()**: Navigate to last page
  - **updateConfig(config)**: Update pagination configuration

  ### Usage Examples
  \`\`\`typescript
  // inject the service
  private paginationStore = inject(PaginationStore);

  // initialize with configuration
  this.paginationStore.initialize({
    defaultCurrentPage: 1,
    defaultTotalItems: 100,
    defaultItemsPerPage: 10,
    visiblePages: 7,
    itemsPerPageOptions: [5, 10, 20, 50],
    disabled: false,
  });

  // navigate pages
  this.paginationStore.nextPage();
  this.paginationStore.previousPage();
  this.paginationStore.goToPage(5);

  // update items per page
  this.paginationStore.setItemsPerPage(20);

  // update total items (e.g., after data load)
  this.paginationStore.setTotalItems(250);

  // access current state
  const currentPage = this.paginationStore.activePage();
  const totalPages = this.paginationStore.totalPages();
  const hasNext = this.paginationStore.hasNext();
  const resultText = this.paginationStore.resultText();
  \`\`\`

  ### Integration with Tables
  This service is designed to work seamlessly with table components and data lists. It automatically calculates visible page ranges, handles ellipsis for large page counts, and provides computed properties for displaying current result ranges.
</div>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<PaginationStore>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo of the PaginationStore service. Click buttons to interact with pagination state.',
      },
    },
  },
  render: () => ({
    template: `<org-pagination-demo />`,
    moduleMetadata: {
      imports: [PaginationDemo],
    },
  }),
};

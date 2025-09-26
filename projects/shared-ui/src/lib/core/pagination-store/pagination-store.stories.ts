import type { Meta, StoryObj } from '@storybook/angular';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { PaginationStore } from './pagination-store';
import { ComponentColorDirective } from '../../material/public-api';

@Component({
  selector: 'org-pagination-story',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatCardModule, MatButtonModule, MatChipsModule, ComponentColorDirective],
  providers: [PaginationStore],
  template: `
    <div class="flex flex-col gap-3">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Sample Data (Page {{ paginationStore.currentPage() }})</mat-card-title>
        </mat-card-header>
        <mat-card-content class="pt-4">
          <div *ngFor="let item of getCurrentPageItems()" class="p-2 border rounded bg-gray-50">
            Item #{{ item.id }}: {{ item.name }}
          </div>
          <mat-paginator
            [length]="paginationStore.totalItems()"
            [pageSize]="paginationStore.pageSize()"
            [pageIndex]="paginationStore.currentPage() - 1"
            [pageSizeOptions]="paginationStore.pageSizeOptions()"
            [showFirstLastButtons]="paginationStore.showFirstLast()"
            [hidePageSize]="!paginationStore.showPageSize()"
            (page)="onPageChange($event)"
            aria-label="Select page"
          >
          </mat-paginator>
        </mat-card-content>
      </mat-card>

      <!-- control buttons -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Pagination Controls</mat-card-title>
        </mat-card-header>
        <mat-card-content class="pt-4">
          <div class="flex flex-wrap gap-2">
            <button
              matButton="elevated"
              (click)="paginationStore.firstPage()"
              [disabled]="!paginationStore.hasPrevious()"
            >
              First Page
            </button>
            <button
              matButton="elevated"
              (click)="paginationStore.previousPage()"
              [disabled]="!paginationStore.hasPrevious()"
            >
              Previous
            </button>
            <button matButton="elevated" (click)="paginationStore.nextPage()" [disabled]="!paginationStore.hasNext()">
              Next
            </button>
            <button matButton="elevated" (click)="paginationStore.lastPage()" [disabled]="!paginationStore.hasNext()">
              Last Page
            </button>
            <button matButton="elevated" orgColor="warning" (click)="paginationStore.reset()">Reset</button>
          </div>

          <div class="flex flex-wrap gap-2 mt-4">
            <button matButton (click)="setTotalItems(25)">25 Items</button>
            <button matButton (click)="setTotalItems(100)">100 Items</button>
            <button matButton (click)="setTotalItems(500)">500 Items</button>
            <button matButton orgColor="warning" (click)="setTotalItems(1000)">1000 Items</button>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- state display -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Pagination Store State</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="flex flex-col gap-2">
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div><strong>Current Page:</strong> {{ paginationStore.currentPage() }}</div>
              <div><strong>Page Size:</strong> {{ paginationStore.pageSize() }}</div>
              <div><strong>Total Items:</strong> {{ paginationStore.totalItems() }}</div>
              <div><strong>Total Pages:</strong> {{ paginationStore.totalPages() }}</div>
              <div><strong>Start Index:</strong> {{ paginationStore.startIndex() }}</div>
              <div><strong>End Index:</strong> {{ paginationStore.endIndex() }}</div>
              <div><strong>Has Next:</strong> {{ paginationStore.hasNext() }}</div>
              <div><strong>Has Previous:</strong> {{ paginationStore.hasPrevious() }}</div>
            </div>

            <div>
              <strong>Page Numbers:</strong>
              <div class="flex gap-0.25 mt-2">
                <mat-chip
                  *ngFor="let pageNum of paginationStore.pageNumbers()"
                  [class.bg-blue-500]="pageNum === paginationStore.currentPage()"
                  [class.text-white]="pageNum === paginationStore.currentPage()"
                >
                  {{ pageNum }}
                </mat-chip>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
class PaginationStoryComponent implements OnInit {
  public paginationStore = inject(PaginationStore);
  public sampleData = signal<{ id: number; name: string }[]>([]);

  ngOnInit() {
    this.generateSampleData(100);
  }

  onPageChange(event: PageEvent): void {
    this.paginationStore.setCurrentPage(event.pageIndex + 1);

    if (event.pageSize !== this.paginationStore.pageSize()) {
      this.paginationStore.setPageSize(event.pageSize);
    }
  }

  setTotalItems(total: number): void {
    this.generateSampleData(total);
    this.paginationStore.setTotalItems(total);
  }

  getCurrentPageItems() {
    const start = this.paginationStore.startIndex();
    const end = this.paginationStore.endIndex();
    return this.sampleData().slice(start, end);
  }

  private generateSampleData(count: number): void {
    const data = Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `Sample Item ${i + 1}`,
    }));
    this.sampleData.set(data);
  }
}

const meta: Meta<PaginationStoryComponent> = {
  title: 'Shared UI/Core/Pagination Store',
  component: PaginationStoryComponent,
  parameters: {
    // layout: 'fullscreen',
    docs: {
      description: {
        component: `
The PaginationStore is an Angular service that manages pagination state using signals.
It provides reactive state management for current page, page size, total items, and computed values
like total pages, page numbers, and navigation states.

**Features:**
- Signal-based reactive state management
- Computed values for derived state
- Validation for page boundaries
- Support for page size changes with position preservation
- Integration with Angular Material Paginator
- Configurable display options (first/last buttons, page size selector)

**Usage:**
\`\`\`typescript
constructor(private paginationStore: PaginationStore) {}

// Configure the store
this.paginationStore.configure({
  pageSize: 20,
  pageSizeOptions: [10, 20, 50],
  showFirstLast: true,
  showPageSize: true
});

// Set total items
this.paginationStore.setTotalItems(500);

// React to state changes
effect(() => {
  console.log('Current page:', this.paginationStore.currentPage());
  console.log('Page size:', this.paginationStore.pageSize());
});
\`\`\`
        `,
      },
    },
  },
  // argTypes: {
  //   totalItems: {
  //     control: { type: 'number', min: 0, max: 2000, step: 10 },
  //     description: 'Total number of items to paginate',
  //   },
  //   pageSize: {
  //     control: { type: 'select' },
  //     options: [5, 10, 20, 50],
  //     description: 'Number of items per page',
  //   },
  //   showFirstLast: {
  //     control: 'boolean',
  //     description: 'Show first and last page buttons',
  //   },
  //   showPageSize: {
  //     control: 'boolean',
  //     description: 'Show page size selector',
  //   },
  // },
};

export default meta;
type Story = StoryObj<PaginationStoryComponent>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const component = canvasElement.querySelector('pagination-story') as any;

    if (component) {
      component.paginationStore.setTotalItems(100);
    }
  },
};

export const LargeDataset: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const component = canvasElement.querySelector('pagination-story') as any;

    if (component) {
      component.paginationStore.setTotalItems(1000);
      component.paginationStore.configure({
        pageSize: 50,
        showFirstLast: true,
        showPageSize: true,
      });
    }
  },
};

export const SmallPageSize: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const component = canvasElement.querySelector('pagination-story') as any;

    if (component) {
      component.paginationStore.setTotalItems(100);
      component.paginationStore.configure({
        pageSize: 5,
        pageSizeOptions: [5, 10, 15],
        showFirstLast: false,
        showPageSize: true,
      });
    }
  },
};

export const MinimalConfiguration: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const component = canvasElement.querySelector('pagination-story') as any;

    if (component) {
      component.paginationStore.setTotalItems(50);
      component.paginationStore.configure({
        pageSize: 10,
        showFirstLast: false,
        showPageSize: false,
      });
    }
  },
};

export const SinglePage: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const component = canvasElement.querySelector('pagination-story') as any;

    if (component) {
      component.paginationStore.setTotalItems(5);
      component.paginationStore.configure({
        pageSize: 10,
        showFirstLast: true,
        showPageSize: true,
      });
    }
  },
};

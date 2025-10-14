import type { Meta, StoryObj } from '@storybook/angular';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { SortingStore } from './sorting-store';
import { Button } from '../button/button';

@Component({
  selector: 'org-sorting-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  providers: [SortingStore],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <div class="text-sm"><strong>Current Key:</strong> {{ sortingStore.key() ?? 'null' }}</div>
        <div class="text-sm"><strong>Current Direction:</strong> {{ sortingStore.direction() ?? 'null' }}</div>
        <div class="text-sm"><strong>Is Sorting:</strong> {{ sortingStore.isSorting() }}</div>
      </div>

      <div class="flex flex-wrap gap-2">
        <org-button color="primary" size="sm" (click)="sortingStore.toggleSort('name')"> Toggle Sort: Name </org-button>
        <org-button color="primary" size="sm" (click)="sortingStore.toggleSort('date')"> Toggle Sort: Date </org-button>
        <org-button color="primary" size="sm" (click)="sortingStore.toggleSort('status')">
          Toggle Sort: Status
        </org-button>
        <org-button color="secondary" size="sm" (click)="sortingStore.setSort('name', 'asc')">
          Set: Name ASC
        </org-button>
        <org-button color="secondary" size="sm" (click)="sortingStore.setSort('date', 'desc')">
          Set: Date DESC
        </org-button>
        <org-button color="neutral" size="sm" (click)="sortingStore.clearSort()"> Clear Sort </org-button>
      </div>
    </div>
  `,
})
class SortingDemo {
  public readonly sortingStore = inject(SortingStore);
}

const meta: Meta<SortingStore> = {
  title: 'Core/Services/Sorting Store',
  component: SortingStore,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## SortingStore Service

  A signal-based state management service for handling sorting operations in Angular applications.

  ### Features
  - Signal-based reactive state management
  - Stores sorting key and direction
  - Toggle sorting with automatic state cycling (asc → desc → null)
  - Manual sort state setting
  - Clear sorting state
  - Computed properties for reactive consumption

  ### State Properties
  - **key**: The field/column being sorted (string | null)
  - **direction**: The sort direction ('asc' | 'desc' | null)
  - **isSorting**: Computed boolean indicating if sorting is active

  ### Methods
  - **setSort(key, direction)**: Set specific sort key and direction
  - **toggleSort(key)**: Cycle through sort states for a key (asc → desc → null)
  - **clearSort()**: Reset to no sorting state

  ### Usage Examples
  \`\`\`typescript
  // inject the service
  private sortingStore = inject(SortingStore);

  // toggle sorting (cycles: asc → desc → null)
  onHeaderClick(column: string) {
    this.sortingStore.toggleSort(column);
  }

  // set specific sort
  this.sortingStore.setSort('name', SortingDirection.ASC);

  // clear sorting
  this.sortingStore.clearSort();

  // access current state
  const currentKey = this.sortingStore.key();
  const currentDirection = this.sortingStore.direction();
  const isSorting = this.sortingStore.isSorting();
  \`\`\`

  ### Integration with Tables
  This service is designed to work seamlessly with table components where users can click column headers to sort data. The \`toggleSort\` method provides an intuitive UX pattern that cycles through ascending, descending, and no sorting states.
</div>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<SortingStore>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo of the SortingStore service. Click buttons to interact with sorting state.',
      },
    },
  },
  render: () => ({
    template: `<org-sorting-demo />`,
    moduleMetadata: {
      imports: [SortingDemo],
    },
  }),
};

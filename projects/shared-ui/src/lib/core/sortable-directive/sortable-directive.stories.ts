import type { Meta, StoryObj } from '@storybook/angular';
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { SortableDirective } from './sortable-directive';
import { SortingStore } from '../sorting-store/sorting-store';
import { Button } from '../button/button';

@Component({
  selector: 'org-sortable-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SortableDirective],
  providers: [SortingStore],
  template: `
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-2 p-4 bg-background rounded">
        <div class="text-sm"><strong>Current Sort Key:</strong> {{ sortingStore.key() ?? 'null' }}</div>
        <div class="text-sm"><strong>Current Direction:</strong> {{ sortingStore.direction() ?? 'null' }}</div>
        <div class="text-sm"><strong>Is Sorting:</strong> {{ sortingStore.isSorting() }}</div>
      </div>

      <div class="flex flex-col gap-2">
        <h3 class="text-lg font-semibold">Click to Sort</h3>
        <div class="flex gap-4 p-4 bg-background border border-border rounded">
          <span class="font-medium" [orgSortable]="'name'">Name</span>
          <span class="font-medium" [orgSortable]="'email'">Email</span>
          <span class="font-medium" [orgSortable]="'status'">Status</span>
          <span class="font-medium" [orgSortable]="'date'">Date</span>
        </div>
      </div>
    </div>
  `,
})
class SortableDemo {
  public readonly sortingStore = inject(SortingStore);
}

@Component({
  selector: 'org-sortable-enabled-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SortableDirective, Button],
  providers: [SortingStore],
  template: `
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-2 p-4 bg-background rounded">
        <div class="text-sm"><strong>Current Sort Key:</strong> {{ sortingStore.key() ?? 'null' }}</div>
        <div class="text-sm"><strong>Current Direction:</strong> {{ sortingStore.direction() ?? 'null' }}</div>
        <div class="text-sm"><strong>Is Sorting:</strong> {{ sortingStore.isSorting() }}</div>
        <div class="text-sm"><strong>Sorting Enabled:</strong> {{ enabled() }}</div>
      </div>

      <div class="flex flex-col gap-2">
        <div class="flex gap-2">
          <button orgButton buttonVariant="outline" (click)="toggleEnabled()">
            {{ enabled() ? 'Disable' : 'Enable' }} Sorting
          </button>
          <button orgButton buttonVariant="outline" (click)="sortingStore.clearSort()">Clear Sort</button>
        </div>

        <h3 class="text-lg font-semibold">Sortable Headers ({{ enabled() ? 'Enabled' : 'Disabled' }})</h3>
        <div class="flex gap-4 p-4 bg-background border border-border rounded">
          <span class="font-medium" [orgSortable]="'name'" [sortableEnabled]="enabled()">Name</span>
          <span class="font-medium" [orgSortable]="'email'" [sortableEnabled]="enabled()">Email</span>
          <span class="font-medium" [orgSortable]="'status'" [sortableEnabled]="enabled()">Status</span>
          <span class="font-medium" [orgSortable]="'date'" [sortableEnabled]="enabled()">Date</span>
        </div>
      </div>
    </div>
  `,
})
class SortableEnabledDemo {
  public readonly sortingStore = inject(SortingStore);
  public readonly enabled = signal(true);

  public toggleEnabled(): void {
    this.enabled.update((current) => !current);
  }
}

@Component({
  selector: 'org-sortable-mixed-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SortableDirective],
  providers: [SortingStore],
  template: `
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-2 p-4 bg-background rounded">
        <div class="text-sm"><strong>Current Sort Key:</strong> {{ sortingStore.key() ?? 'null' }}</div>
        <div class="text-sm"><strong>Current Direction:</strong> {{ sortingStore.direction() ?? 'null' }}</div>
        <div class="text-sm"><strong>Is Sorting:</strong> {{ sortingStore.isSorting() }}</div>
      </div>

      <div class="flex flex-col gap-2">
        <h3 class="text-lg font-semibold">Mixed Enabled/Disabled Headers</h3>
        <div class="flex gap-4 p-4 bg-background border border-border rounded">
          <span class="font-medium" [orgSortable]="'name'" [sortableEnabled]="true">Name (Enabled)</span>
          <span class="font-medium" [orgSortable]="'email'" [sortableEnabled]="false">Email (Disabled)</span>
          <span class="font-medium" [orgSortable]="'status'" [sortableEnabled]="true">Status (Enabled)</span>
          <span class="font-medium" [orgSortable]="'date'" [sortableEnabled]="false">Date (Disabled)</span>
        </div>
      </div>
    </div>
  `,
})
class SortableMixedDemo {
  public readonly sortingStore = inject(SortingStore);
}

const meta: Meta<SortableDirective> = {
  title: 'Core/Directives/Sortable',
  component: SortableDirective,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Sortable Directive

  A directive that adds sorting functionality to elements, typically used on table headers. It automatically injects an icon to indicate sorting status and integrates with the SortingStore service.

  ### Features
  - Automatic icon injection showing sort direction
  - Visual feedback for active/inactive sorting states
  - Click handling to toggle sort direction
  - Integrates with SortingStore for state management
  - Cycles through: ascending → descending → no sort
  - Accessible with pointer cursor and text selection disabled
  - **Dynamic enable/disable** support to add/remove sorting functionality at runtime

  ### Visual States
  - **Not Sorting**: Shows arrows-down-up icon in subtle color (text-text-subtle)
  - **Ascending**: Shows arrow-up icon in default color
  - **Descending**: Shows arrow-down icon in default color
  - **Disabled**: No icon shown, no interactive classes applied

  ### Requirements
  - **MUST** be used within a component that provides SortingStore
  - **MUST** have a non-empty \`orgSortable\` value (the sort key)

  ### Inputs
  - \`orgSortable\` (required): The sort key identifier
  - \`sortableEnabled\` (optional, default: true): Controls whether sorting functionality is enabled

  ### Usage Examples
  \`\`\`html
  <!-- Provide SortingStore in parent component -->
  @Component({
    providers: [SortingStore]
  })
  class TableComponent {
    sortingStore = inject(SortingStore);
  }

  <!-- Use directive on sortable headers -->
  <th [orgSortable]="'name'">Name</th>
  <th [orgSortable]="'email'">Email</th>
  <th [orgSortable]="'date'">Date</th>

  <!-- Dynamically enable/disable sorting -->
  <th [orgSortable]="'name'" [sortableEnabled]="canSort()">Name</th>
  <th [orgSortable]="'email'" [sortableEnabled]="false">Email</th>
  \`\`\`

  ### Dynamic Enable/Disable
  The \`sortableEnabled\` input allows you to dynamically add or remove sorting functionality:
  - When **enabled → disabled**: Icon is removed, interactive classes are removed, clicks do nothing, sort state is preserved
  - When **disabled → enabled**: Icon is added back, interactive classes are restored, clicks work again, previous sort state is restored if applicable

  ### Integration with SortingStore
  The directive uses the SortingStore service to:
  - Read current sorting state (key and direction)
  - Toggle sorting when clicked (only when enabled)
  - Update visual indicators based on state changes

  ### Styling
  When enabled, the directive automatically adds:
  - \`cursor-pointer\` class for clickable indication
  - \`select-none\` class to prevent text selection
  - \`flex\`, \`gap-1\`, \`items-center\` classes for layout
  - \`text-text-subtle\` class on icon when not actively sorting

  When disabled, all classes are removed and no icon is shown.
</div>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<SortableDirective>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo of the Sortable directive. Click on any header to toggle sorting.',
      },
    },
  },
  render: () => ({
    template: `<org-sortable-demo />`,
    moduleMetadata: {
      imports: [SortableDemo],
    },
  }),
};

export const DynamicEnableDisable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the ability to dynamically enable or disable sorting functionality. Click the "Enable/Disable Sorting" button to toggle sorting on all headers. Note that the sort state is preserved when toggling - if you sort by a column, then disable sorting, then re-enable it, the previous sort state will be restored.',
      },
    },
  },
  render: () => ({
    template: `<org-sortable-enabled-demo />`,
    moduleMetadata: {
      imports: [SortableEnabledDemo],
    },
  }),
};

export const MixedEnabledDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates a scenario where some headers are sortable and others are disabled. Name and Status can be sorted, while Email and Date cannot be sorted (no icon shown, no cursor change, clicks do nothing).',
      },
    },
  },
  render: () => ({
    template: `<org-sortable-mixed-demo />`,
    moduleMetadata: {
      imports: [SortableMixedDemo],
    },
  }),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows sortable headers with sorting functionality completely disabled. Notice there are no icons, no interactive cursor, and clicks do nothing.',
      },
    },
  },
  render: () => ({
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex gap-4 p-4 bg-background border border-border rounded">
          <span class="font-medium" [orgSortable]="'name'" [sortableEnabled]="false">Name</span>
          <span class="font-medium" [orgSortable]="'email'" [sortableEnabled]="false">Email</span>
          <span class="font-medium" [orgSortable]="'status'" [sortableEnabled]="false">Status</span>
          <span class="font-medium" [orgSortable]="'date'" [sortableEnabled]="false">Date</span>
        </div>
      </div>
    `,
    moduleMetadata: {
      imports: [SortableDirective],
      providers: [SortingStore],
    },
  }),
};

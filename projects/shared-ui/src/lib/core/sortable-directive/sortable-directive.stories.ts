import type { Meta, StoryObj } from '@storybook/angular';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { SortableDirective } from './sortable-directive';
import { SortingStore } from '../sorting-store/sorting-store';

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

  ### Visual States
  - **Not Sorting**: Shows arrows-down-up icon in subtle color (text-text-subtle)
  - **Ascending**: Shows arrow-up icon in default color
  - **Descending**: Shows arrow-down icon in default color

  ### Requirements
  - **MUST** be used within a component that provides SortingStore
  - **MUST** have a non-empty \`orgSortable\` value (the sort key)

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
  \`\`\`

  ### Integration with SortingStore
  The directive uses the SortingStore service to:
  - Read current sorting state (key and direction)
  - Toggle sorting when clicked
  - Update visual indicators based on state changes

  ### Styling
  The directive automatically adds:
  - \`cursor-pointer\` class for clickable indication
  - \`select-none\` class to prevent text selection
  - \`flex\`, \`gap-1\`, \`items-center\` classes for layout
  - \`text-text-subtle\` class on icon when not actively sorting
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

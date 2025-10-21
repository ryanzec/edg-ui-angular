import type { Meta, StoryObj } from '@storybook/angular';
import { Component, ChangeDetectionStrategy, inject, InjectionToken } from '@angular/core';
import { DataSelectionStore } from './data-selection-store';
import { Button } from '../button/button';

type User = {
  id: number;
  name: string;
  email: string;
};

// example: create an InjectionToken for the store
const USER_SELECTION_STORE_TOKEN = new InjectionToken<DataSelectionStore<User>>('UserSelectionStore');

@Component({
  selector: 'org-data-selection-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  providers: [
    // example: provide the store using the InjectionToken
    {
      provide: USER_SELECTION_STORE_TOKEN,
      useClass: DataSelectionStore<User>,
    },
  ],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <div class="text-sm"><strong>Selected Count:</strong> {{ selectionStore.selectedCount() }}</div>
        <div class="text-sm"><strong>Has Selection:</strong> {{ selectionStore.hasSelection() }}</div>
        <div class="text-sm"><strong>Select All Enabled:</strong> {{ selectionStore.selectAllEnabled() }}</div>
      </div>

      <div class="flex flex-col gap-2">
        <div class="text-sm font-semibold">Selected Items:</div>
        @if (selectionStore.hasSelection()) {
          <div class="flex flex-col gap-1">
            @for (user of selectionStore.selectedItemsArray(); track user.id) {
              <div class="px-3 py-2 text-sm border rounded bg-info-background-subtle">
                {{ user.name }} ({{ user.email }})
              </div>
            }
          </div>
        } @else {
          <div class="text-sm text-neutral-text-subtle">No items selected</div>
        }
      </div>

      <div class="flex flex-col gap-2">
        <div class="text-sm font-semibold">Available Users:</div>
        <div class="flex flex-col gap-1">
          @for (user of users; track user.id) {
            <button
              class="px-3 py-2 text-sm border rounded cursor-pointer hover:bg-neutral-background-subtle"
              [class.bg-info-background-subtle]="selectionStore.isSelected(user)"
              (click)="selectionStore.toggle(user)"
            >
              {{ user.name }} ({{ user.email }})
            </button>
          }
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <org-button color="primary" size="sm" (click)="selectionStore.selectAll(users)"> Select All </org-button>
        <org-button color="primary" size="sm" (click)="selectionStore.deselectAll()"> Deselect All </org-button>
        <org-button color="primary" size="sm" (click)="selectionStore.toggleSelectAll(users)">
          Toggle Select All
        </org-button>
        <org-button color="secondary" size="sm" (click)="selectionStore.select(users[0])">
          Select First User
        </org-button>
        <org-button color="secondary" size="sm" (click)="selectionStore.selectMultiple([users[1], users[2]])">
          Select Users 2 & 3
        </org-button>
        <org-button color="neutral" size="sm" (click)="selectionStore.clear()"> Clear Selection </org-button>
      </div>
    </div>
  `,
})
class DataSelectionDemo {
  // example: inject the store using the InjectionToken
  public readonly selectionStore = inject(USER_SELECTION_STORE_TOKEN);

  protected readonly users: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com' },
    { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com' },
    { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com' },
  ];
}

const meta: Meta<DataSelectionStore<unknown>> = {
  title: 'Core/Services/Data Selection Store',
  component: DataSelectionStore,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## DataSelectionStore Service

  A generic signal-based state management service for handling data selection in Angular applications, particularly useful for paginated tables and lists.

  ### Features
  - Generic type support for any data type
  - Signal-based reactive state management
  - Immutable state updates
  - Single and multiple item selection
  - Select all / deselect all functionality
  - Toggle selection support
  - Computed properties for reactive consumption
  - Designed to be used with InjectionToken (not provided in root)

  ### State Properties
  - **selectedItems**: Set of currently selected items
  - **selectedItemsArray**: Array of currently selected items
  - **selectedCount**: Number of selected items
  - **selectAllEnabled**: Boolean indicating if select all is enabled
  - **hasSelection**: Boolean indicating if any items are selected

  ### Methods
  - **isSelected(item)**: Check if an item is selected
  - **select(item)**: Select a single item
  - **deselect(item)**: Deselect a single item
  - **toggle(item)**: Toggle selection of a single item
  - **selectMultiple(items)**: Select multiple items
  - **deselectMultiple(items)**: Deselect multiple items
  - **selectAll(items)**: Select all items
  - **deselectAll()**: Deselect all items
  - **toggleSelectAll(items)**: Toggle select all state
  - **replaceSelection(items)**: Replace current selection with new items
  - **clear()**: Clear all selections

  ### Usage with InjectionToken

  #### Step 1: Create an InjectionToken
  \`\`\`typescript
  import { InjectionToken } from '@angular/core';
  import { DataSelectionStore } from '@org/shared-ui';

  type User = {
    id: number;
    name: string;
  };

  export const USER_SELECTION_STORE_TOKEN = new InjectionToken<DataSelectionStore<User>>(
    'UserSelectionStore'
  );
  \`\`\`

  #### Step 2: Provide the Store in a Component
  \`\`\`typescript
  @Component({
    selector: 'app-user-table',
    providers: [
      {
        provide: USER_SELECTION_STORE_TOKEN,
        useClass: DataSelectionStore<User>,
      },
    ],
  })
  export class UserTableComponent {
    private readonly selectionStore = inject(USER_SELECTION_STORE_TOKEN);

    // use the store
    protected selectUser(user: User): void {
      this.selectionStore.select(user);
    }

    protected get selectedCount(): number {
      return this.selectionStore.selectedCount();
    }
  }
  \`\`\`

  #### Step 3: Use in Child Components
  \`\`\`typescript
  @Component({
    selector: 'app-user-row',
  })
  export class UserRowComponent {
    // inject the same store instance from parent
    private readonly selectionStore = inject(USER_SELECTION_STORE_TOKEN);

    protected toggleSelection(user: User): void {
      this.selectionStore.toggle(user);
    }

    protected isSelected(user: User): boolean {
      return this.selectionStore.isSelected(user);
    }
  }
  \`\`\`

  ### Integration with Paginated Tables
  This service is designed to work seamlessly with paginated tables. When the page changes, you can:
  - Keep selections across pages by maintaining the selected items
  - Clear selections when changing pages using \`clear()\`
  - Use \`selectAll()\` with current page items for page-level selection
  - Use \`replaceSelection()\` to replace selections when needed

  ### Why Use InjectionToken?
  Using InjectionToken instead of \`providedIn: 'root'\` allows:
  - Multiple independent instances of the store in different parts of your application
  - Scoped state management (e.g., per table, per feature)
  - Better testability with isolated instances
  - Clearer dependency injection hierarchy
</div>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<DataSelectionStore<unknown>>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demo of the DataSelectionStore service with User objects. Click users to toggle selection, or use the buttons to manage selections.',
      },
    },
  },
  render: () => ({
    template: `<org-data-selection-demo />`,
    moduleMetadata: {
      imports: [DataSelectionDemo],
    },
  }),
};

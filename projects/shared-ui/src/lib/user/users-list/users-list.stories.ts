import type { Meta, StoryObj } from '@storybook/angular';
import { Component, signal, computed, effect } from '@angular/core';
import { UsersList, type UsersListFilterValues } from './users-list';
import { User } from '@organization/shared-types';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';
import { Label } from '../../core/label/label';
import { FormFields } from '../../core/form-fields/form-fields';
import { FormField } from '../../core/form-field/form-field';
import { Checkbox } from '../../core/checkbox/checkbox';

const sampleUsers: User[] = [
  {
    id: '1',
    organizationId: 'org1',
    name: 'John Administrator',
    email: 'john.admin@company.com',
    roles: ['admin'],
    hasPassword: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  },
  {
    id: '2',
    organizationId: 'org1',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    roles: ['user'],
    hasPassword: true,
    createdAt: '2024-02-01T09:15:00Z',
    updatedAt: '2024-02-05T16:20:00Z',
  },
  {
    id: '3',
    organizationId: 'org1',
    name: 'Bob Wilson',
    email: 'bob.wilson@company.com',
    roles: ['admin', 'user'],
    hasPassword: false,
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-25T11:30:00Z',
  },
  {
    id: '4',
    organizationId: 'org1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    roles: ['user'],
    hasPassword: true,
    createdAt: '2024-03-01T13:45:00Z',
    updatedAt: '2024-03-02T10:15:00Z',
  },
  {
    id: '5',
    organizationId: 'org1',
    name: 'Michael Brown',
    email: 'michael.brown@company.com',
    roles: ['admin'],
    hasPassword: true,
    createdAt: '2024-02-15T07:30:00Z',
    updatedAt: '2024-02-20T12:00:00Z',
  },
];

const meta: Meta<UsersList> = {
  title: 'User/Components/Users List',
  component: UsersList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Users List Component

  A comprehensive table component for displaying and managing user lists with filtering, sorting, role badges, actions, and various states.

  ### Features
  - Tabular display of user information using custom table component
  - **Filtering**: Search by name (debounced) and filter by date range
  - **Sorting**: Sortable columns for name and created date
  - Role badges with color coding (Admin = danger/red, User = info/blue)
  - Edit and delete actions for each user via dropdown menu
  - Loading state with skeleton
  - Empty state message
  - Formatted date display
  - Scrollable table with sticky header
  - Accessible with proper ARIA labels

  ### User Information Displayed
  - **Name**: User's full name (sortable)
  - **Email**: User's email address
  - **Roles**: Color-coded tag badges for user roles (Admin, User)
  - **Created**: Formatted creation date (sortable)
  - **Actions**: Dropdown menu with edit and delete options

  ### Filtering
  - **Name Search**: Text input with 300ms debounce to avoid event thrashing
  - **Date Field**: Combobox to select between Created or Updated date
  - **Date Value**: Date picker for single date or range selection
  - Filtering data is propagated through \`filtersChanged\` output event

  ### Sorting
  - **Name Column**: Click to sort by name
  - **Created Column**: Click to sort by created date
  - Default sort: Created date descending
  - Sorting data is propagated through \`sortingChanged\` output event
  - Sorting implementation must be handled by parent component

  ### States
  - **Default**: Shows list of users with all information in a table
  - **Loading**: Displays skeleton while fetching data
  - **Empty**: Shows message when no users are available
  - **With Filters**: Displays filter UI above the table
  - **With Sorting**: Enables sortable column headers

  ### Usage Examples
  \\\`\\\`\\\`html
  <!-- Basic users list -->
  <org-users-list
    [users]="userList"
    [isInitialLoading]="false"
    (editUser)="onEdit($event)"
    (deleteUser)="onDeleteUser($event)"
  />

  <!-- With filtering and sorting enabled -->
  <org-users-list
    [users]="userList"
    [enableFilters]="true"
    [enableSorting]="true"
    [(sortKey)]="sortKey"
    [(sortDirection)]="sortDirection"
    (filtersChanged)="onFiltersChanged($event)"
    (editUser)="onEdit($event)"
    (deleteUser)="onDeleteUser($event)"
  />

  <!-- With pagination -->
  <org-users-list
    [users]="userList"
    [(currentPage)]="currentPage"
    [totalItems]="totalItems"
    [(itemsPerPage)]="itemsPerPage"
    (editUser)="onEdit($event)"
    (deleteUser)="onDeleteUser($event)"
  />
  \\\`\\\`\\\`

  \\\`\\\`\\\`typescript
  // In your component
  protected sortKey = signal<string | null>('createdAt');
  protected sortDirection = signal<SortingDirection | null>('desc');
  protected currentPage = signal<number>(1);
  protected itemsPerPage = signal<number>(10);

  onFiltersChanged(filters: UsersListFilterValues) {
    console.log('Filters changed:', filters);
    // Apply filters to your data source
  }

  onEdit(user: User) {
    console.log('Editing user:', user);
    // Navigate to edit page or open edit dialog
  }

  onDeleteUser(user: User) {
    console.log('Deleting user:', user);
    // Show confirmation dialog and delete user
  }
  \\\`\\\`\\\`

  ### Pagination
  - **currentPage**: Two-way binding for current page (use \\\`[(currentPage)]\\\`)
  - **totalItems**: Total number of items across all pages
  - **itemsPerPage**: Two-way binding for items per page (use \\\`[(itemsPerPage)]\\\`)
  - **visiblePages**: Number of visible page buttons (default: 7)

  ### Events
  - **filtersChanged**: Emitted when filter values change (emits \`UsersListFilterValues\`)
  - **editUser**: Emitted when the edit action is clicked (emits \`User\` object)
  - **deleteUser**: Emitted when the delete action is clicked (emits \`User\` object)

  ### Inputs
  - **users**: Required array of User objects to display
  - **isInitialLoading**: Optional boolean to show loading state (default: false)
  - **isLoading**: Optional boolean to show loading state overlay (default: false)
  - **enableFilters**: Optional boolean to enable filters (default: false)
  - **enableSorting**: Optional boolean to enable sorting (default: false)
  - **sortKey**: Two-way binding for sort key (use \\\`[(sortKey)]\\\`, default: 'createdAt')
  - **sortDirection**: Two-way binding for sort direction (use \\\`[(sortDirection)]\\\`, default: 'desc')
  - **containerClass**: Optional CSS classes for the container element
  - **tableContainerClass**: Optional CSS classes for the table container

  ### Role Types
  - \`admin\`: Administrator role (danger/red badge)
  - \`user\`: Standard user role (info/blue badge)
</div>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<UsersList>;

export const Default: Story = {
  args: {
    users: sampleUsers,
    isInitialLoading: false,
    enableFilters: false,
    enableSorting: false,
    containerClass: '',
    tableContainerClass: 'h-[400px]',
  },
  argTypes: {
    users: {
      control: 'object',
      description: 'Array of users to display in the table',
    },
    isInitialLoading: {
      control: 'boolean',
      description: 'Whether the component is in loading state',
    },
    enableFilters: {
      control: 'boolean',
      description: 'Whether to enable filtering UI',
    },
    enableSorting: {
      control: 'boolean',
      description: 'Whether to enable sorting on table headers',
    },
    containerClass: {
      control: 'text',
      description: 'Additional CSS classes for the container element',
    },
    tableContainerClass: {
      control: 'text',
      description: 'Additional CSS classes for the table container',
    },
    filtersChanged: {
      action: 'filtersChanged',
      description: 'Emitted when filter values change',
    },
    editUser: {
      action: 'editUser',
      description: 'Emitted when edit action is triggered for a user',
    },
    deleteUser: {
      action: 'deleteUser',
      description: 'Emitted when delete action is triggered for a user',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default users list with multiple users. Use the controls below to interact with the component.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <org-users-list
        [users]="users"
        [isInitialLoading]="isInitialLoading"
        [enableFilters]="enableFilters"
        [enableSorting]="enableSorting"
        [containerClass]="containerClass"
        [tableContainerClass]="tableContainerClass"
        (filtersChanged)="filtersChanged($event)"
        (editUser)="editUser($event)"
        (deleteUser)="deleteUser($event)"
      />
    `,
    moduleMetadata: {
      imports: [UsersList],
    },
  }),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different component states: default with data, loading, and empty.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Users List States"
        currentState="Comparing default, loading, and empty states"
      >
        <org-storybook-example-container-section label="Default (with users)">
          <org-users-list [users]="users" [isInitialLoading]="false" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Loading State">
          <org-users-list [users]="[]" [isInitialLoading]="true" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Empty State">
          <org-users-list [users]="[]" [isInitialLoading]="false" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Default</strong>: Shows full table with user data and actions</li>
          <li><strong>Loading</strong>: Displays loading message while fetching data</li>
          <li><strong>Empty</strong>: Shows "No users found" message when list is empty</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [UsersList, StorybookExampleContainer, StorybookExampleContainerSection],
    },
    props: {
      users: sampleUsers,
    },
  }),
};

export const DataVariations: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different data scenarios: single user, multiple users, and users with multiple roles.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Data Variations"
        currentState="Comparing different user list configurations"
      >
        <org-storybook-example-container-section label="Single User">
          <org-users-list [users]="singleUser" [isInitialLoading]="false" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Multiple Users (5 users)">
          <org-users-list [users]="multipleUsers" [isInitialLoading]="false" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="User with Multiple Roles">
          <org-users-list [users]="multiRoleUser" [isInitialLoading]="false" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Single User</strong>: Table displays correctly with just one row</li>
          <li><strong>Multiple Users</strong>: Full list with scrollable content in table container</li>
          <li><strong>Multiple Roles</strong>: User can have both Admin and User tag badges displayed</li>
          <li>Role badges use tag component: Admin (danger/red), User (info/blue)</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [UsersList, StorybookExampleContainer, StorybookExampleContainerSection],
    },
    props: {
      singleUser: [sampleUsers[0]],
      multipleUsers: sampleUsers,
      multiRoleUser: [sampleUsers[2]], // Bob Wilson has both roles
    },
  }),
};

export const RoleTypes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different user role configurations: Admin only, User only, and both roles.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Role Types"
        currentState="Comparing different user role configurations"
      >
        <org-storybook-example-container-section label="Admin Role Only">
          <org-users-list [users]="adminUsers" [isInitialLoading]="false" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="User Role Only">
          <org-users-list [users]="regularUsers" [isInitialLoading]="false" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Mixed Roles">
          <org-users-list [users]="mixedUsers" [isInitialLoading]="false" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Admin Role</strong>: Danger/red tag badge indicating administrator privileges</li>
          <li><strong>User Role</strong>: Info/blue tag badge indicating standard user</li>
          <li><strong>Mixed</strong>: Some users have one role, others have multiple</li>
          <li>Tag badges are displayed inline with proper spacing using flex gap</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [UsersList, StorybookExampleContainer, StorybookExampleContainerSection],
    },
    props: {
      adminUsers: sampleUsers.filter((u) => u.roles.includes('admin') && u.roles.length === 1),
      regularUsers: sampleUsers.filter((u) => u.roles.includes('user') && u.roles.length === 1),
      mixedUsers: sampleUsers,
    },
  }),
};

export const FilteringAndSorting: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates filtering and sorting features enabled together.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Filtering and Sorting"
        currentState="Filtering and sorting features enabled"
      >
        <org-storybook-example-container-section label="With Filters Only">
          <org-users-list [users]="users" [enableFilters]="true" [enableSorting]="false" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Sorting Only">
          <org-users-list [users]="users" [enableFilters]="false" [enableSorting]="true" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Both Filters and Sorting">
          <org-users-list [users]="users" [enableFilters]="true" [enableSorting]="true" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Filters</strong>: Name search with 300ms debounce, date field selector, date range picker</li>
          <li><strong>Sorting</strong>: Click on Name or Created headers to sort (icons indicate sort state)</li>
          <li><strong>Name Search</strong>: Debounced to avoid excessive event firing</li>
          <li><strong>Date Filters</strong>: Choose between Created/Updated and select date or range</li>
          <li><strong>Sort Direction</strong>: Click toggles between asc → desc → none</li>
          <li><strong>Default Sort</strong>: Created date descending (configurable via inputs)</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [UsersList, StorybookExampleContainer, StorybookExampleContainerSection],
    },
    props: {
      users: sampleUsers,
    },
  }),
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive example with event logging for all features: filters, sorting, and user actions. Try searching, selecting dates, sorting columns, and using the actions menu to see events logged below.',
      },
    },
  },
  render: () => ({
    template: '<org-users-list-interactive-story></org-users-list-interactive-story>',
    moduleMetadata: {
      imports: [UsersListInteractiveStory],
    },
  }),
};

// Interactive story component
@Component({
  selector: 'org-users-list-interactive-story',
  template: `
    <div class="flex flex-col gap-6 p-4">
      <div class="flex flex-col gap-2">
        <h3 class="text-lg font-semibold">Interactive Users List</h3>
        <div class="text-sm text-text-subtle">
          Try searching by name, selecting dates, clicking column headers to sort, and using the actions menu to see all
          events logged below.
        </div>
      </div>

      <org-users-list
        [users]="users"
        [isInitialLoading]="isInitialLoading()"
        [enableFilters]="enableFilters()"
        [enableSorting]="enableSorting()"
        (filtersChanged)="onFiltersChanged($event)"
        (editUser)="onEditUser($event)"
        (deleteUser)="onDeleteUser($event)"
      />

      <!-- Controls -->
      <div class="p-4 bg-secondary-background-subtle rounded-lg">
        <org-form-fields containerClass="flex-row" [reserveValidationSpace]="false">
          <org-form-field>
            <org-checkbox
              type="checkbox"
              id="loading-state-checkbox"
              name="loading-state"
              value="loading-state"
              [checked]="isInitialLoading()"
              (checkedChange)="toggleLoading()"
            >
              <strong>Loading State</strong>
            </org-checkbox>
          </org-form-field>
          <org-form-field>
            <org-checkbox
              type="checkbox"
              id="enable-filters-checkbox"
              name="enable-filters"
              value="enable-filters"
              [checked]="enableFilters()"
              (checkedChange)="toggleFilters()"
            >
              <strong>Enable Filters</strong>
            </org-checkbox>
          </org-form-field>
          <org-form-field>
            <org-checkbox
              type="checkbox"
              id="enable-sorting-checkbox"
              name="enable-sorting"
              value="enable-sorting"
              [checked]="enableSorting()"
              (checkedChange)="toggleSorting()"
            >
              <strong>Enable Sorting</strong>
            </org-checkbox>
          </org-form-field>
        </org-form-fields>
      </div>

      <!-- Event Log -->
      <div class="flex flex-col gap-2">
        <h4 class="font-medium">Event Log:</h4>
        <div class="p-3 bg-secondary-background-subtle rounded text-sm font-mono max-h-64 overflow-y-auto">
          @for (event of events(); track $index) {
            <div class="mb-2 pb-2 border-b border-neutral-border last:border-b-0">
              <div class="font-bold text-primary-text">{{ event.timestamp }} - {{ event.action }}</div>
              <div class="text-text-subtle whitespace-pre-wrap">{{ event.details }}</div>
            </div>
          }
          @if (events().length === 0) {
            <div class="text-text-subtle">
              No events yet. Try searching, sorting, or using the actions menu to see events.
            </div>
          }
        </div>
      </div>
    </div>
  `,
  imports: [UsersList, Label, FormFields, FormField, Checkbox],
})
class UsersListInteractiveStory {
  public users = sampleUsers;
  public isInitialLoading = signal(false);
  public enableFilters = signal(true);
  public enableSorting = signal(true);
  public events = signal<
    {
      timestamp: string;
      action: string;
      details: string;
    }[]
  >([]);

  public toggleLoading(): void {
    this.isInitialLoading.update((loading) => !loading);
  }

  public toggleFilters(): void {
    this.enableFilters.update((enabled) => !enabled);
  }

  public toggleSorting(): void {
    this.enableSorting.update((enabled) => !enabled);
  }

  public onFiltersChanged(filters: UsersListFilterValues): void {
    const timestamp = new Date().toLocaleTimeString();
    const details = `Name Search: "${filters.name}"\nDate type: ${filters.dateType}\nDate Value: ${filters.startDate?.toISO() || 'null'} - ${filters.endDate?.toISO() || 'null'}`;

    this.events.update((events) => [
      {
        timestamp,
        action: 'FILTERS_CHANGED',
        details,
      },
      ...events.slice(0, 9),
    ]);
  }

  public onEditUser(user: User): void {
    const timestamp = new Date().toLocaleTimeString();
    const details = `User: ${user.name} (${user.email})\nID: ${user.id}`;

    this.events.update((events) => [
      {
        timestamp,
        action: 'USER_EDIT',
        details,
      },
      ...events.slice(0, 9),
    ]);
  }

  public onDeleteUser(user: User): void {
    const timestamp = new Date().toLocaleTimeString();
    const details = `User: ${user.name} (${user.email})\nID: ${user.id}`;

    this.events.update((events) => [
      {
        timestamp,
        action: 'USER_DELETE',
        details,
      },
      ...events.slice(0, 9),
    ]);
  }
}

export const WithPagination: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the users list with pagination functionality. Pagination uses two-way binding for currentPage and itemsPerPage. Pagination automatically resets to page 1 when filters or sorting changes.',
      },
    },
  },
  render: () => ({
    template: '<org-users-list-pagination-story></org-users-list-pagination-story>',
    moduleMetadata: {
      imports: [UsersListPaginationStory],
    },
  }),
};

@Component({
  selector: 'org-users-list-pagination-story',
  template: `
    <div class="flex flex-col gap-6 p-4">
      <div class="flex flex-col gap-2">
        <h3 class="text-lg font-semibold">Users List with Pagination</h3>
        <div class="text-sm text-text-subtle">
          Pagination uses two-way binding for currentPage and itemsPerPage. The component automatically resets to page 1
          when filters or sorting changes.
        </div>
      </div>

      <org-users-list
        [users]="displayedUsers"
        [isInitialLoading]="isInitialLoading()"
        [enableFilters]="enableFilters()"
        [enableSorting]="enableSorting()"
        [(currentPage)]="currentPage"
        [totalItems]="totalItems"
        [(itemsPerPage)]="itemsPerPage"
        (filtersChanged)="onFiltersChanged($event)"
        (editUser)="onEditUser($event)"
        (deleteUser)="onDeleteUser($event)"
      />

      <div class="p-4 bg-secondary-background-subtle rounded-lg">
        <org-form-fields containerClass="flex-row" [reserveValidationSpace]="false">
          <org-form-field>
            <org-checkbox
              type="checkbox"
              id="loading-state-checkbox"
              name="loading-state"
              value="loading-state"
              [checked]="isInitialLoading()"
              (checkedChange)="toggleLoading()"
            >
              <strong>Loading State</strong>
            </org-checkbox>
          </org-form-field>
          <org-form-field>
            <org-checkbox
              type="checkbox"
              id="enable-filters-checkbox"
              name="enable-filters"
              value="enable-filters"
              [checked]="enableFilters()"
              (checkedChange)="toggleFilters()"
            >
              <strong>Enable Filters</strong>
            </org-checkbox>
          </org-form-field>
          <org-form-field>
            <org-checkbox
              type="checkbox"
              id="enable-sorting-checkbox"
              name="enable-sorting"
              value="enable-sorting"
              [checked]="enableSorting()"
              (checkedChange)="toggleSorting()"
            >
              <strong>Enable Sorting</strong>
            </org-checkbox>
          </org-form-field>
        </org-form-fields>
      </div>

      <div class="flex flex-col gap-2">
        <h4 class="font-medium">Pagination State:</h4>
        <div class="p-3 bg-secondary-background-subtle rounded text-sm">
          <div class="mb-2"><strong>Current Page:</strong> {{ currentPage() }}</div>
          <div class="mb-2"><strong>Items Per Page:</strong> {{ itemsPerPage() }}</div>
          <div class="mb-2"><strong>Total Items:</strong> {{ totalItems }}</div>
          <div class="mb-2"><strong>Displayed Items:</strong> {{ displayedUsers.length }}</div>
          <div><strong>Showing:</strong> {{ startIndex() + 1 }} - {{ endIndex() }} of {{ totalItems }}</div>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <h4 class="font-medium">Event Log:</h4>
        <div class="p-3 bg-secondary-background-subtle rounded text-sm font-mono max-h-64 overflow-y-auto">
          @for (event of events(); track $index) {
            <div class="mb-2 pb-2 border-b border-neutral-border last:border-b-0">
              <div class="font-bold text-primary-text">{{ event.timestamp }} - {{ event.action }}</div>
              <div class="text-text-subtle whitespace-pre-wrap">{{ event.details }}</div>
            </div>
          }
          @if (events().length === 0) {
            <div class="text-text-subtle">
              No events yet. Try changing pages, items per page, searching, or sorting to see events.
            </div>
          }
        </div>
      </div>
    </div>
  `,
  imports: [UsersList, Label, FormFields, FormField, Checkbox],
})
class UsersListPaginationStory {
  public allUsers: User[] = [];
  public displayedUsers: User[] = [];
  public totalItems = 0;
  public currentPage = signal<number>(1);
  public itemsPerPage = signal<number>(10);
  public isInitialLoading = signal(false);
  public enableFilters = signal(false);
  public enableSorting = signal(false);
  public events = signal<
    {
      timestamp: string;
      action: string;
      details: string;
    }[]
  >([]);

  protected readonly startIndex = computed<number>(() => (this.currentPage() - 1) * this.itemsPerPage());
  protected readonly endIndex = computed<number>(() =>
    Math.min(this.startIndex() + this.itemsPerPage(), this.totalItems)
  );

  constructor() {
    this.allUsers = this._generateManyUsers(100);
    this.totalItems = this.allUsers.length;

    this._updateDisplayedUsers();

    effect(() => {
      const _page = this.currentPage();
      const _perPage = this.itemsPerPage();

      this._updateDisplayedUsers();
      this._logPaginationChange();
    });
  }

  public toggleLoading(): void {
    this.isInitialLoading.update((loading) => !loading);
  }

  public toggleFilters(): void {
    this.enableFilters.update((enabled) => !enabled);
  }

  public toggleSorting(): void {
    this.enableSorting.update((enabled) => !enabled);
  }

  public onFiltersChanged(filters: UsersListFilterValues): void {
    const timestamp = new Date().toLocaleTimeString();
    const details = `Name Search: "${filters.name}"\nDate type: ${filters.dateType}\nDate Value: ${filters.startDate?.toISO() || 'null'} - ${filters.endDate?.toISO() || 'null'}`;

    this.events.update((events) => [
      {
        timestamp,
        action: 'FILTERS_CHANGED',
        details,
      },
      ...events.slice(0, 9),
    ]);
  }

  public onEditUser(user: User): void {
    const timestamp = new Date().toLocaleTimeString();
    const details = `User: ${user.name} (${user.email})\nID: ${user.id}`;

    this.events.update((events) => [
      {
        timestamp,
        action: 'USER_EDIT',
        details,
      },
      ...events.slice(0, 9),
    ]);
  }

  public onDeleteUser(user: User): void {
    const timestamp = new Date().toLocaleTimeString();
    const details = `User: ${user.name} (${user.email})\nID: ${user.id}`;

    this.events.update((events) => [
      {
        timestamp,
        action: 'USER_DELETE',
        details,
      },
      ...events.slice(0, 9),
    ]);
  }

  private _updateDisplayedUsers(): void {
    const startIndex = this.startIndex();
    const endIndex = this.endIndex();

    this.displayedUsers = this.allUsers.slice(startIndex, endIndex);
  }

  private _logPaginationChange(): void {
    const timestamp = new Date().toLocaleTimeString();
    const details = `Current Page: ${this.currentPage()}\nItems Per Page: ${this.itemsPerPage()}\nShowing: ${this.startIndex() + 1} - ${this.endIndex()} of ${this.totalItems}`;

    this.events.update((events) => [
      {
        timestamp,
        action: 'PAGINATION_CHANGED',
        details,
      },
      ...events.slice(0, 9),
    ]);
  }

  private _generateManyUsers(count: number): User[] {
    const users: User[] = [];
    const roles: ('admin' | 'user')[] = ['admin', 'user'];
    const names = [
      'John Administrator',
      'Jane Smith',
      'Bob Wilson',
      'Sarah Johnson',
      'Michael Brown',
      'Emily Davis',
      'David Martinez',
      'Lisa Garcia',
      'James Rodriguez',
      'Mary Lopez',
    ];

    for (let i = 0; i < count; i++) {
      const nameIndex = i % names.length;
      const name = `${names[nameIndex]} ${i + 1}`;
      const email = `${name.toLowerCase().replace(/\s+/g, '.')}@company.com`;
      const role = roles[i % roles.length];
      const hasMultipleRoles = i % 5 === 0;

      users.push({
        id: `user-${i + 1}`,
        organizationId: 'org1',
        name,
        email,
        roles: hasMultipleRoles ? ['admin', 'user'] : [role],
        hasPassword: i % 3 !== 0,
        createdAt: new Date(2024, 0, 1 + (i % 28), 10 + (i % 12), 30).toISOString(),
        updatedAt: new Date(2024, 0, 15 + (i % 28), 14 + (i % 8), 45).toISOString(),
      });
    }

    return users;
  }
}

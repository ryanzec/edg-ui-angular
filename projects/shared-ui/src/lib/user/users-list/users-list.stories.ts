import type { Meta, StoryObj } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { UsersList } from './users-list';
import { User } from '@organization/shared-types';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';

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

  A comprehensive table component for displaying and managing user lists with role badges, actions, and various states.

  ### Features
  - Tabular display of user information using custom table component
  - Role badges with color coding (Admin = danger/red, User = info/blue)
  - Edit and delete actions for each user via dropdown menu
  - Loading state with message
  - Empty state message
  - Formatted date display
  - Scrollable table with sticky header
  - Accessible with proper ARIA labels

  ### User Information Displayed
  - **Name**: User's full name
  - **Email**: User's email address
  - **Roles**: Color-coded tag badges for user roles (Admin, User)
  - **Created At**: Formatted creation date
  - **Actions**: Dropdown menu with edit and delete options

  ### States
  - **Default**: Shows list of users with all information in a table
  - **Loading**: Displays loading message while fetching data
  - **Empty**: Shows message when no users are available
  - **Single User**: Displays table with just one user
  - **Multiple Roles**: Users can have multiple role badges displayed

  ### Usage Examples
  \`\`\`html
  <!-- Basic users list -->
  <org-users-list
    [users]="userList"
    [isLoading]="false"
    (userEdit)="handleEdit($event)"
    (userDelete)="handleDelete($event)"
  />

  <!-- With custom container class -->
  <org-users-list
    [users]="userList"
    [containerClass]="'max-w-6xl mx-auto'"
    [tableContainerClass]="'h-[600px]'"
  />

  <!-- Loading state -->
  <org-users-list
    [users]="[]"
    [isLoading]="true"
  />

  <!-- Empty state -->
  <org-users-list
    [users]="[]"
    [isLoading]="false"
  />
  \`\`\`

  \`\`\`typescript
  // In your component
  handleEdit(user: User) {
    console.log('Editing user:', user);
    // Navigate to edit page or open edit dialog
  }

  handleDelete(user: User) {
    console.log('Deleting user:', user);
    // Show confirmation dialog and delete user
  }
  \`\`\`

  ### Events
  - **userEdit**: Emitted when the edit action is clicked (emits \`User\` object)
  - **userDelete**: Emitted when the delete action is clicked (emits \`User\` object)

  ### Inputs
  - **users**: Required array of User objects to display
  - **isLoading**: Optional boolean to show loading state (default: false)
  - **containerClass**: Optional CSS classes for the container element
  - **tableContainerClass**: Optional CSS classes for the table container (default: 'h-[400px]')

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
    isLoading: false,
    containerClass: '',
    tableContainerClass: 'h-[400px]',
  },
  argTypes: {
    users: {
      control: 'object',
      description: 'Array of users to display in the table',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the component is in loading state',
    },
    containerClass: {
      control: 'text',
      description: 'Additional CSS classes for the container element',
    },
    tableContainerClass: {
      control: 'text',
      description: 'Additional CSS classes for the table container',
    },
    userEdit: {
      action: 'userEdit',
      description: 'Emitted when edit action is triggered for a user',
    },
    userDelete: {
      action: 'userDelete',
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
        [isLoading]="isLoading"
        [containerClass]="containerClass"
        [tableContainerClass]="tableContainerClass"
        (userEdit)="userEdit($event)"
        (userDelete)="userDelete($event)"
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
          <org-users-list [users]="users" [isLoading]="false" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Loading State">
          <org-users-list [users]="[]" [isLoading]="true" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Empty State">
          <org-users-list [users]="[]" [isLoading]="false" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
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
          <org-users-list [users]="singleUser" [isLoading]="false" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Multiple Users (5 users)">
          <org-users-list [users]="multipleUsers" [isLoading]="false" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="User with Multiple Roles">
          <org-users-list [users]="multiRoleUser" [isLoading]="false" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
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
          <org-users-list [users]="adminUsers" [isLoading]="false" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="User Role Only">
          <org-users-list [users]="regularUsers" [isLoading]="false" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Mixed Roles">
          <org-users-list [users]="mixedUsers" [isLoading]="false" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
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

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive example with event logging. Click the actions menu (three dots) and select edit or delete to see events in the log below.',
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
          Click the actions menu (three dots) for a user and select edit or delete to see event logging in action.
        </div>
      </div>

      <org-users-list
        [users]="users"
        [isLoading]="isLoading()"
        (userEdit)="onUserEdit($event)"
        (userDelete)="onUserDelete($event)"
      />

      <!-- Controls -->
      <div class="flex gap-4 p-4 bg-secondary-background-subtle rounded-lg">
        <label class="flex items-center gap-2">
          <span class="text-sm font-medium">Loading State:</span>
          <input type="checkbox" [checked]="isLoading()" (change)="toggleLoading()" class="rounded" />
        </label>
      </div>

      <!-- Event Log -->
      <div class="flex flex-col gap-2">
        <h4 class="font-medium">Event Log:</h4>
        <div class="p-3 bg-secondary-background-subtle rounded text-sm font-mono max-h-48 overflow-y-auto">
          @for (event of events(); track $index) {
            <div class="mb-2">
              <div class="font-bold text-primary-text">{{ event.timestamp }} - {{ event.action }}</div>
              <div class="text-text-subtle">User: {{ event.userName }} ({{ event.userEmail }})</div>
              <div class="text-text-subtle">ID: {{ event.userId }}</div>
            </div>
          }
          @if (events().length === 0) {
            <div class="text-text-subtle">
              No events yet. Click the actions menu and select edit or delete to see events.
            </div>
          }
        </div>
      </div>
    </div>
  `,
  imports: [UsersList],
})
class UsersListInteractiveStory {
  public users = sampleUsers;
  public isLoading = signal(false);
  public events = signal<
    {
      timestamp: string;
      action: string;
      userId: string;
      userName: string;
      userEmail: string;
    }[]
  >([]);

  public toggleLoading(): void {
    this.isLoading.update((loading) => !loading);
  }

  public onUserEdit(user: User): void {
    const timestamp = new Date().toLocaleTimeString();

    this.events.update((events) => [
      {
        timestamp,
        action: 'EDIT',
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
      },
      ...events.slice(0, 4),
    ]);
  }

  public onUserDelete(user: User): void {
    const timestamp = new Date().toLocaleTimeString();

    this.events.update((events) => [
      {
        timestamp,
        action: 'DELETE',
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
      },
      ...events.slice(0, 4),
    ]);
  }
}

import type { Meta, StoryObj } from '@storybook/angular';
import { UsersList } from './users-list';
import { User, UserRoleName } from '@organization/shared-types';

const sampleUsers: User[] = [
  {
    id: '1',
    organizationId: 'org1',
    name: 'John Administrator',
    email: 'john.admin@company.com',
    roles: [UserRoleName.ADMIN],
    hasPassword: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  },
  {
    id: '2',
    organizationId: 'org1',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    roles: [UserRoleName.USER],
    hasPassword: true,
    createdAt: '2024-02-01T09:15:00Z',
    updatedAt: '2024-02-05T16:20:00Z',
  },
  {
    id: '3',
    organizationId: 'org1',
    name: 'Bob Wilson',
    email: 'bob.wilson@company.com',
    roles: [UserRoleName.ADMIN, UserRoleName.USER],
    hasPassword: false,
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-25T11:30:00Z',
  },
  {
    id: '4',
    organizationId: 'org1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    roles: [UserRoleName.USER],
    hasPassword: true,
    createdAt: '2024-03-01T13:45:00Z',
    updatedAt: '2024-03-02T10:15:00Z',
  },
  {
    id: '5',
    organizationId: 'org1',
    name: 'Michael Brown',
    email: 'michael.brown@company.com',
    roles: [UserRoleName.ADMIN],
    hasPassword: true,
    createdAt: '2024-02-15T07:30:00Z',
    updatedAt: '2024-02-20T12:00:00Z',
  },
];

const meta: Meta<UsersList> = {
  title: 'Shared UI/User/Users List',
  component: UsersList,
  parameters: {
    docs: {
      description: {
        component: `
The UsersList component displays a table of users with their details including name, email, roles, and creation date.
It provides actions for editing and deleting users through output events.

**Features:**
- Material Design table with elevation
- Role badges with color coding (admin = red, user = blue)
- Actions menu with edit/delete options
- Loading and empty states
- Responsive design with Tailwind CSS
- Accessible with proper ARIA labels

**Usage:**
\`\`\`typescript
<org-users-list
  [users]="userList"
  [isLoading]="loading"
  (userEdit)="onEditUser($event)"
  (userDelete)="onDeleteUser($event)">
</org-users-list>
\`\`\`
        `,
      },
    },
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
    userEdit: {
      action: 'userEdit',
      description: 'Emitted when edit action is triggered for a user',
    },
    userDelete: {
      action: 'userDelete',
      description: 'Emitted when delete action is triggered for a user',
    },
  },
};

export default meta;
type Story = StoryObj<UsersList>;

export const Default: Story = {
  args: {
    users: sampleUsers,
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    users: [],
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    users: [],
    isLoading: false,
  },
};

export const SingleUser: Story = {
  args: {
    users: [sampleUsers[0]],
    isLoading: false,
  },
};

import type { Meta, StoryObj } from '@storybook/angular';
import { UsersList } from './users-list';

const meta: Meta<UsersList> = {
  title: 'Shared UI/Users List',
  component: UsersList,
};

export default meta;
type Story = StoryObj<UsersList>;

export const Default: Story = {
  args: {},
};

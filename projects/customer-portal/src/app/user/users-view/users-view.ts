import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { UsersList, UsersDataStore, Icon, Button } from '@organization/shared-ui';
import { User } from '@organization/shared-types';

@Component({
  selector: 'cp-users-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UsersList, Icon, Button],
  providers: [UsersDataStore],
  templateUrl: './users-view.html',
})
export class UsersView {
  private readonly usersDataStore = inject(UsersDataStore);

  public readonly users = this.usersDataStore.users;
  public readonly loading = this.usersDataStore.loading;
  public readonly error = this.usersDataStore.error;

  public onUserEdit(user: User): void {
    console.log('Edit user:', user);
  }

  public onUserDelete(user: User): void {
    console.log('Delete user:', user);
  }
}

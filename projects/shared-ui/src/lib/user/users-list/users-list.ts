import { Component, ChangeDetectionStrategy, input, output, computed, signal } from '@angular/core';
import { type User, UserRoleName } from '@organization/shared-types';
import { GroupElementsDirective } from '../../core/group-elements-directive/group-elements-directive';
import { Icon } from '../../core/icon/icon';
import { Button } from '../../core/button/button';

type UsersListState = {
  isLoading: boolean;
  error: string | null;
};

@Component({
  selector: 'org-users-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Button, GroupElementsDirective],
  templateUrl: './users-list.html',
})
export class UsersList {
  public readonly users = input.required<User[]>();
  public readonly isLoading = input<boolean>(false);

  public readonly userEdit = output<User>();
  public readonly userDelete = output<User>();

  private readonly _state = signal<UsersListState>({
    isLoading: false,
    error: null,
  });

  public readonly displayedColumns = ['name', 'email', 'roles', 'createdAt', 'actions'];

  public readonly state = computed(() => this._state());

  public readonly UserRoleName = UserRoleName;

  public onEdit(user: User): void {
    this.userEdit.emit(user);
  }

  public onDelete(user: User): void {
    this.userDelete.emit(user);
  }

  public formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}

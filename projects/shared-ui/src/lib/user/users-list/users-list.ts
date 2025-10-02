import { Component, ChangeDetectionStrategy, input, output, computed, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { type User, UserRoleName } from '@organization/shared-types';
import { GroupedElementsDirective } from '../../core/grouped-elements-directive/grouped-elements-directive';

type UsersListState = {
  isLoading: boolean;
  error: string | null;
};

@Component({
  selector: 'org-users-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTableModule, MatChipsModule, MatIconModule, MatButtonModule, MatMenuModule, GroupedElementsDirective],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
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

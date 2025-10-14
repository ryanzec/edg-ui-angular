import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import { type User, type UserRoleName } from '@organization/shared-types';
import { Button } from '../../core/button/button';
import { Table } from '../../core/table/table';
import { Tag, type TagColor } from '../../core/tag/tag';
import { OverlayMenu, type OverlayMenuItem } from '../../core/overlay-menu/overlay-menu';
import { tailwindUtils } from '@organization/shared-utils';
import { Skeleton } from '../../core/skeleton/skeleton';

@Component({
  selector: 'org-users-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, CdkMenuTrigger, OverlayMenu, Table, Tag, Skeleton],
  templateUrl: './users-list.html',
  host: {
    dataid: 'users-list',
  },
})
export class UsersList {
  public users = input.required<User[]>();
  public isLoading = input<boolean>(false);
  public containerClass = input<string>('');
  public tableContainerClass = input<string>('');

  public userEdit = output<User>();
  public userDelete = output<User>();

  public mergeClasses = tailwindUtils.merge;
  public readonly menuPosition = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: 8,
    },
  ];

  protected getUserActionsMenuItems(_user: User): OverlayMenuItem[] {
    return [
      {
        id: 'edit',
        label: 'Edit',
        icon: 'pencil-simple',
      },
      {
        id: 'delete',
        label: 'Delete',
        icon: 'trash',
      },
    ];
  }

  protected onUserActionMenuItemClick(menuItem: OverlayMenuItem, user: User): void {
    if (menuItem.id === 'edit') {
      this.userEdit.emit(user);
    } else if (menuItem.id === 'delete') {
      this.userDelete.emit(user);
    }
  }

  protected formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  protected getRoleColor(role: UserRoleName): TagColor {
    return role === 'admin' ? 'danger' : 'info';
  }
}

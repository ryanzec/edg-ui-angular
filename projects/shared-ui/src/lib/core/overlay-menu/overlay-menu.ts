import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { tailwindUtils } from '@organization/shared-utils';
import { List } from '../list/list';
import { ListItem } from '../list/list-item';
import { type IconName } from '../icon/icon';

export type OverlayMenuItem = {
  id: string;
  label: string;
  icon: IconName;
};

@Component({
  selector: 'org-overlay-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkMenu, CdkMenuItem, List, ListItem],
  templateUrl: './overlay-menu.html',
  host: {
    dataid: 'overlay-menu',
  },
})
export class OverlayMenu {
  // public properties
  public menuItems = input<OverlayMenuItem[]>([]);
  public containerClass = input<string>('');

  // output events
  public menuItemClicked = output<OverlayMenuItem>();

  public mergeClasses = tailwindUtils.merge;

  public handleMenuItemClick(item: OverlayMenuItem): void {
    this.menuItemClicked.emit(item);
  }
}

import { Component, ChangeDetectionStrategy, input, output, inject, effect, computed } from '@angular/core';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import { type IconName } from '../icon/icon';
import { List } from '../list/list';
import { ListItem } from '../list/list-item';
import { tailwindUtils } from '@organization/shared-utils';
import { Avatar } from '../avatar/avatar';
import { OverlayMenu, type OverlayMenuItem } from '../overlay-menu/overlay-menu';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

export type NavigationItem = {
  id: string;
  label: string;
  icon: IconName;
  routePath: string;
};

export type SettingsMenuItem = OverlayMenuItem;

@Component({
  selector: 'org-application-navigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [List, ListItem, CdkMenuTrigger, Avatar, OverlayMenu, RouterLink],
  templateUrl: './application-navigation.html',
  host: {
    '[class]':
      'mergeClasses("w-[225px] bg-application-navigation-background border-r border-application-navigation-border flex flex-col", containerClass())',
    dataid: 'application-navigation',
  },
})
export class ApplicationNavigation {
  private readonly _router = inject(Router);

  // public properties
  public containerClass = input<string>('');
  public logo = input<string>('');
  public navigationItems = input<NavigationItem[]>([]);
  public settingsMenuItems = input<SettingsMenuItem[]>([]);
  public userName = input<string>('');

  // output events
  public navigationItemClicked = output<NavigationItem>();
  public settingsMenuItemClicked = output<SettingsMenuItem>();
  public logout = output<void>();

  public activeNavigationItemId = computed<NavigationItem['id'] | undefined>(() => {
    const navEvent = this._navigationEndEvent();

    if (!navEvent) {
      return undefined;
    }

    const activeNavigationItemId = this.navigationItems().find((item) =>
      navEvent.urlAfterRedirects.startsWith(item.routePath)
    )?.id;

    return activeNavigationItemId;

    return activeNavigationItemId;
  });

  // private events
  private _navigationEndEvent = toSignal(
    this._router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
  );

  public mergeClasses = tailwindUtils.merge;
  public readonly menuPosition = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetX: 8,
    },
  ];

  constructor() {
    // create an effect that run whent he url changes
    effect(() => {
      const navEvent = this._navigationEndEvent();

      // The effect runs once on init (navEvent is undefined),
      // so we check if it has a value before acting.
      if (navEvent) {
        console.log('🎉 Navigation successful! New URL:', navEvent.urlAfterRedirects);
        // --- Add your logic here ---
        // For example: fetch data for the new route, log analytics, etc.
      }
    });
  }

  public handleNavigationItemClick(item: NavigationItem): void {
    this.navigationItemClicked.emit(item);
  }

  public handleSettingsMenuItemClick(item: SettingsMenuItem): void {
    this.settingsMenuItemClicked.emit(item);
  }

  public handleLogoutClick(): void {
    this.logout.emit();
  }
}

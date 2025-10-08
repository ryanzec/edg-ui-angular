import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
  inject,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Icon, type IconName } from '../icon/icon';
import { Button } from '../button/button';
import { List } from '../list/list';
import { ListItem } from '../list/list-item';
import { tailwindUtils } from '@organization/shared-utils';

export type NavigationItem = {
  id: string;
  label: string;
  icon: IconName;
  routePath: string;
};

export type SettingsMenuItem = {
  id: string;
  label: string;
  icon: IconName;
};

export type ComponentState = {
  settingsMenuIsOpen: boolean;
};

@Component({
  selector: 'org-application-navigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Button, List, ListItem],
  templateUrl: './application-navigation.html',
  host: {
    '[class]':
      'mergeClasses("w-[225px] bg-application-navigation-background border-r border-application-navigation-border flex flex-col", containerClass())',
    '(document:click)': 'handleDocumentClick($event)',
    '(document:keydown)': 'handleDocumentKeydown($event)',
    dataid: 'application-navigation',
  },
})
export class ApplicationNavigation {
  private readonly _elementRef = inject(ElementRef<HTMLElement>);

  @ViewChild('settingsButton', { static: false })
  private readonly _settingsButtonRef?: ElementRef<HTMLElement>;

  @ViewChild('settingsMenu', { static: false })
  private readonly _settingsMenuRef?: ElementRef<HTMLElement>;

  /**
   * @internal Only exposed for testing purposes
   */
  public readonly _state = signal<ComponentState>({
    settingsMenuIsOpen: false,
  });

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

  // computed properties
  public readonly settingsMenuIsOpen = computed<boolean>(() => this._state().settingsMenuIsOpen);

  public mergeClasses = tailwindUtils.merge;

  public handleNavigationItemClick(item: NavigationItem): void {
    this.navigationItemClicked.emit(item);
  }

  public handleSettingsButtonClick(): void {
    this._state.update((state) => ({
      ...state,
      settingsMenuIsOpen: !state.settingsMenuIsOpen,
    }));
  }

  public handleSettingsMenuItemClick(item: SettingsMenuItem): void {
    this._state.update((state) => ({
      ...state,
      settingsMenuIsOpen: false,
    }));
    this.settingsMenuItemClicked.emit(item);
  }

  public handleLogoutClick(): void {
    this.logout.emit();
  }

  public handleDocumentClick(event: MouseEvent): void {
    if (!this.settingsMenuIsOpen()) {
      return;
    }

    const target = event.target as HTMLElement;
    const settingsButton = this._settingsButtonRef?.nativeElement;
    const settingsMenu = this._settingsMenuRef?.nativeElement;

    if (settingsButton?.contains(target) || settingsMenu?.contains(target)) {
      return;
    }

    this._state.update((state) => ({
      ...state,
      settingsMenuIsOpen: false,
    }));
  }

  public handleDocumentKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.settingsMenuIsOpen()) {
      this._state.update((state) => ({
        ...state,
        settingsMenuIsOpen: false,
      }));
    }
  }
}

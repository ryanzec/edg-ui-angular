import { Component, ChangeDetectionStrategy, input, inject, effect, computed, OnDestroy, signal } from '@angular/core';
import { tailwindUtils } from 'projects/shared-utils/src/utils/tailwind';
import { GlobalNotificationManager } from '../global-notification-manager/global-notification-manager';
import { Card } from '../card/card';
import { Button } from '../button/button';
import { CardContent } from '../card/card-content';

export type GlobalNotificationsXPosition = 'left' | 'center' | 'right';

export const globalNotificationsXPositions: GlobalNotificationsXPosition[] = ['left', 'center', 'right'];

export type GlobalNotificationsYPosition = 'top' | 'bottom';

export const globalNotificationsYPositions: GlobalNotificationsYPosition[] = ['top', 'bottom'];

@Component({
  selector: 'org-global-notifications',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, CardContent, Button],
  templateUrl: './global-notifications.html',
  host: {
    ['attr.data-testid']: 'global-notifications',
    '[class]': 'hostClass()',
  },
})
export class GlobalNotifications implements OnDestroy {
  private _globalNotificationManager = inject(GlobalNotificationManager);
  private _autoCloseTimers = new Map<string, number>();

  public xPosition = input<GlobalNotificationsXPosition>('center');
  public yPosition = input<GlobalNotificationsYPosition>('top');
  public containerClass = input<string>('');

  public notifications = computed(() => this._globalNotificationManager.notifications());

  protected removingNotifications = signal<Set<string>>(new Set());

  public mergeClasses = tailwindUtils.merge;

  public hostClass = computed<string>(() => {
    const x = this.xPosition();
    const y = this.yPosition();

    return this.mergeClasses('fixed z-50 pointer-events-none', {
      'left-[16px]': x === 'left',
      'left-1/2 -translate-x-1/2': x === 'center',
      'right-[16px]': x === 'right',
      'top-[16px]': y === 'top',
      'bottom-[16px]': y === 'bottom',
    });
  });

  constructor() {
    // handle auto-close timers for notifications
    effect(() => {
      const notifications = this.notifications();
      const currentTimerIds = new Set(this._autoCloseTimers.keys());
      const currentNotificationIds = new Set(notifications.map((n) => n.id));

      // clear timers for removed notifications
      for (const timerId of currentTimerIds) {
        if (!currentNotificationIds.has(timerId)) {
          const timer = this._autoCloseTimers.get(timerId);

          if (timer !== undefined) {
            clearTimeout(timer);
          }

          this._autoCloseTimers.delete(timerId);
        }
      }

      // set up timers for new notifications with autoCloseIn
      for (const notification of notifications) {
        if (notification.autoCloseIn && !this._autoCloseTimers.has(notification.id)) {
          const timer = setTimeout(() => {
            this.onClose(notification.id);
            this._autoCloseTimers.delete(notification.id);
          }, notification.autoCloseIn);
          this._autoCloseTimers.set(notification.id, timer as unknown as number);
        }
      }
    });
  }

  public ngOnDestroy(): void {
    // clean up all timers when component is destroyed
    for (const timer of this._autoCloseTimers.values()) {
      clearTimeout(timer);
    }

    this._autoCloseTimers.clear();
  }

  /**
   * handles closing a notification with fade-out animation
   */
  protected onClose(id: string): void {
    const notification = this.notifications().find((n) => n.id === id);

    if (!notification || this.isRemoving(id)) {
      return;
    }

    // mark as removing to trigger fade-out animation
    this.removingNotifications.update((set) => {
      const newSet = new Set(set);

      newSet.add(id);

      return newSet;
    });

    const animationDuration = notification.animationDuration;
    const delayMs = animationDuration * 1000;

    setTimeout(() => {
      this.removingNotifications.update((set) => {
        const newSet = new Set(set);

        newSet.delete(id);

        return newSet;
      });

      this._globalNotificationManager.remove(id);
    }, delayMs);
  }

  /**
   * checks if a notification is currently being removed
   */
  protected isRemoving(id: string): boolean {
    return this.removingNotifications().has(id);
  }

  /**
   * gets the animation style for a notification based on its state
   */
  protected getAnimationStyle(id: string, animationDuration: number): string {
    const duration = `${animationDuration}s`;

    // using forwards to keep the animation in the end state
    const animation = this.isRemoving(id)
      ? `fade-out ${duration} ease-in-out normal forwards`
      : `fade-in ${duration} ease-in-out normal forwards`;

    return animation;
  }
}

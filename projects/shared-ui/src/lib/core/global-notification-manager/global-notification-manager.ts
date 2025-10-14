import { Injectable, signal, computed } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ComponentColor } from '../types/component-types';

export type CardColor = ComponentColor;

export type GlobalNotificationData = {
  id: string;
  message: string;
  autoCloseIn?: number;
  color?: CardColor;
  canClose: boolean;
  animationDuration: number;
};

export type AddGlobalNotificationData = Omit<GlobalNotificationData, 'id' | 'animationDuration'> & {
  animationDuration?: number;
};

export type UpdateGlobalNotificationData = Partial<Omit<GlobalNotificationData, 'id'>>;

type GlobalNotificationManagerState = {
  notifications: GlobalNotificationData[];
};

@Injectable({
  providedIn: 'root',
})
export class GlobalNotificationManager {
  private _state = signal<GlobalNotificationManagerState>({
    notifications: [],
  });

  public notifications = computed<GlobalNotificationData[]>(() => this._state().notifications);

  public add(notification: AddGlobalNotificationData): string {
    const id = uuidv4();
    const newNotification: GlobalNotificationData = {
      animationDuration: 0.3,
      ...notification,
      id,
    };

    this._state.update((state) => ({
      ...state,
      notifications: [...state.notifications, newNotification],
    }));

    return id;
  }

  public remove(id: string): void {
    this._state.update((state) => ({
      ...state,
      notifications: state.notifications.filter((notification) => notification.id !== id),
    }));
  }

  public update(id: string, updates: UpdateGlobalNotificationData): void {
    this._state.update((state) => ({
      ...state,
      notifications: state.notifications.map((notification) =>
        notification.id === id ? { ...notification, ...updates } : notification
      ),
    }));
  }

  public clear(): void {
    this._state.update((state) => ({
      ...state,
      notifications: [],
    }));
  }
}

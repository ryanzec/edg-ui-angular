import { Component, ChangeDetectionStrategy, input, signal, computed } from '@angular/core';
import { DateTime } from 'luxon';
import { Indicator } from '../indicator/indicator';
import { Checklist, type ChecklistItemData } from '../checklist/checklist';
import { Button } from '../button/button';
import { tailwindUtils } from '@organization/shared-utils';

export type ChatMessageStatus = 'in-progress' | 'completed' | 'failed';

export type ChatMessageSource = 'user' | 'ai' | 'system';

export type ChatMessageData = {
  id: string;
  message: string;
  status?: ChatMessageStatus;
  steps?: ChecklistItemData[];
  startedAt?: string; // iso formatted date time string
  completedAt?: string; // iso formatted date time string
  source: ChatMessageSource;
};

type ChatMessageState = {
  stepsExpanded: boolean;
};

@Component({
  selector: 'org-chat-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Indicator, Checklist, Button],
  templateUrl: './chat-message.html',
  host: {
    ['attr.data-testid']: 'chat-message',
  },
})
export class ChatMessage {
  private readonly _state = signal<ChatMessageState>({
    stepsExpanded: false,
  });

  public chatMessage = input.required<ChatMessageData>();
  public containerClass = input<string>('');

  public mergeClasses = tailwindUtils.merge;

  public isStepsExpanded = computed<boolean>(() => {
    return this._state().stepsExpanded;
  });

  public hasSteps = computed<boolean>(() => {
    const steps = this.chatMessage().steps;

    return !!steps && steps.length > 0;
  });

  public hasStatus = computed<boolean>(() => {
    return !!this.chatMessage().status;
  });

  public hasDuration = computed<boolean>(() => {
    const message = this.chatMessage();

    return !!message.startedAt && !!message.completedAt;
  });

  public statusDisplay = computed<string>(() => {
    const status = this.chatMessage().status;

    if (!status) {
      return '';
    }

    if (status === 'in-progress') {
      return 'In Progress';
    }

    if (status === 'completed') {
      return 'Completed';
    }

    if (status === 'failed') {
      return 'Failed';
    }

    return '';
  });

  public statusIndicatorColor = computed<'info' | 'safe' | 'danger'>(() => {
    const status = this.chatMessage().status;

    if (status === 'in-progress') {
      return 'info';
    }

    if (status === 'completed') {
      return 'safe';
    }

    return 'danger';
  });

  public durationDisplay = computed<string>(() => {
    const message = this.chatMessage();

    if (!message.startedAt || !message.completedAt) {
      return '';
    }

    const start = DateTime.fromISO(message.startedAt);
    const end = DateTime.fromISO(message.completedAt);
    const diff = end.diff(start, ['minutes', 'seconds']);

    const minutes = Math.floor(diff.minutes);
    const seconds = Math.floor(diff.seconds);

    if (minutes === 0) {
      return `${seconds}s`;
    }

    if (seconds === 0) {
      return `${minutes}m`;
    }

    return `${minutes}m ${seconds}s`;
  });

  public toggleStepsExpanded(): void {
    this._state.update((state) => ({
      ...state,
      stepsExpanded: !state.stepsExpanded,
    }));
  }
}

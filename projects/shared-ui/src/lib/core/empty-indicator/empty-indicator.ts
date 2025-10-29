import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { Subject } from 'rxjs';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { Button } from '../button/button';
import { tailwindUtils } from '@organization/shared-utils';

@Component({
  selector: 'org-empty-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  templateUrl: './empty-indicator.html',
  host: {
    ['attr.data-testid']: 'empty-indicator',
    class: 'flex',
  },
})
export class EmptyIndicator {
  private readonly _actionTriggeredSubject = new Subject<void>();

  public title = input.required<string>();
  public actionLabel = input<string | null>(null);
  public hasBorder = input<boolean>(true);
  public containerClass = input<string>('');

  public actionTriggered = outputFromObservable(this._actionTriggeredSubject.asObservable());

  public readonly hasActionButton = computed<boolean>(() => {
    return !!this.actionLabel() && this._actionTriggeredSubject.observed;
  });

  public mergeClasses = tailwindUtils.merge;

  protected onActionClick(): void {
    this._actionTriggeredSubject.next();
  }
}

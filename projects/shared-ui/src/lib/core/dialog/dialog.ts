import { Component, ChangeDetectionStrategy, input, inject, computed } from '@angular/core';
import { tailwindUtils } from '@organization/shared-utils';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Button } from '../button/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

type DialogData = {
  showCloseIcon?: boolean;
  closeIconEnabled$?: BehaviorSubject<boolean>;
};

@Component({
  selector: 'org-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  templateUrl: './dialog.html',
  host: {
    ['attr.data-testid']: 'dialog',
  },
})
export class Dialog {
  private readonly _dialogRef = inject(DialogRef, { optional: true });
  private readonly _dialogData = inject<DialogData>(DIALOG_DATA, { optional: true });

  public readonly hasRoundedCorners = input<boolean>(true);
  public readonly containerClass = input<string>('');

  protected readonly showCloseIcon = computed<boolean>(() => {
    return this._dialogData?.showCloseIcon ?? false;
  });

  protected readonly closeIconEnabled = toSignal(this._dialogData?.closeIconEnabled$ ?? new BehaviorSubject(false), {
    initialValue: false,
  });

  protected mergeClasses = tailwindUtils.merge;

  protected onCloseClick(): void {
    if (!this.closeIconEnabled()) {
      return;
    }

    this._dialogRef?.close();
  }
}

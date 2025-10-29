/*
 * This primary reason for this wrapper around the Angular CDK's dialog functionality is to support functionality
 * like escape key closing the dialog but clicking outside not
 */
import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
  ViewEncapsulation,
  HostListener,
  output,
} from '@angular/core';
import { Dialog as CdkDialog, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { LogManager } from '../log-manager/log-manager';

export type DialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right';

export const dialogPositions: DialogPosition[] = ['center', 'top', 'bottom', 'left', 'right'];

@Component({
  selector: 'org-dialog-controller',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ``,
  encapsulation: ViewEncapsulation.None,
})
export class DialogController<T> {
  private readonly _logManager = inject(LogManager);

  private readonly _cdkDialog = inject(CdkDialog);

  private _dialogRef: DialogRef<T, T> | undefined = undefined;
  private _escapeKeyEnabled = true;

  // Inputs to make the component generic
  public dialogComponent = input.required<ComponentType<T>>();
  public position = input<DialogPosition>('center');
  public hasRoundedCorners = input<boolean>(true);

  /**
   * This disables the close on click outside of the dialog
   */
  public enableCloseOnClickOutside = input<boolean>(false);

  /**
   * This controls whether the escape key can close the dialog
   */
  public enableEscapeKey = input<boolean>(true);

  public closed = output<void>();

  public openDialog(data?: Record<string, unknown>): DialogRef<T, T> | null {
    // Check if the component to open has been provided
    const component = this.dialogComponent();

    if (!component) {
      console.error('DialogTriggerComponent: dialogComponent input is required.');

      return null;
    }

    this._escapeKeyEnabled = this.enableEscapeKey();

    this._dialogRef = this._cdkDialog.open(component, {
      data: {
        ...data,
        hasRoundedCorners: this.hasRoundedCorners(),
      },
      panelClass: this._getPanelClass(),
      hasBackdrop: true,
      closeOnNavigation: true,
      disableClose: this.enableCloseOnClickOutside() === false,
    });

    this._dialogRef.closed.subscribe(() => {
      this.closed.emit();
    });

    return this._dialogRef;
  }

  public closeDialog(): void {
    if (!this._dialogRef) {
      this._logManager.warn({
        type: 'dialog-close-error',
        message: 'attempted to close a dialog when no reference was available',
      });

      return;
    }

    this._dialogRef.close();
  }

  /**
   * dynamically enables or disables the escape key for closing the dialog
   */
  public setEnableEscapeKey(enabled: boolean): void {
    this._escapeKeyEnabled = enabled;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(_event: Event) {
    if (!this._dialogRef) {
      return;
    }

    if (this.enableCloseOnClickOutside()) {
      return;
    }

    if (!this._escapeKeyEnabled) {
      return;
    }

    // disabling the close for the dialog is meant to only disable the close on click outside as that can happen
    // by mistake much more easily then hitting the escape key, keeping the escape key is also needed from an
    // accessibility standpoint
    this._dialogRef.close();
  }

  private _getPanelClass(): string[] {
    const position = this.position();

    switch (position) {
      case 'top':
        return ['fixed!', 'top-[20px]', 'left-1/2', '-translate-x-1/2'];
      case 'bottom':
        return ['fixed!', 'bottom-[20px]', 'left-1/2', '-translate-x-1/2'];
      case 'left':
        return ['fixed!', 'left-0', 'top-0', 'h-[100vh]', 'bottom-0'];
      case 'right':
        return ['fixed!', 'right-0', 'top-0', 'h-[100vh]', 'bottom-0'];
      default:
        return ['fixed!', 'top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2'];
    }
  }
}

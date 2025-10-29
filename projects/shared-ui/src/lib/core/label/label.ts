import { Component, ChangeDetectionStrategy, input, effect, inject } from '@angular/core';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import { tailwindUtils } from '@organization/shared-utils';
import { NgTemplateOutlet } from '@angular/common';
import { LogManager } from '../log-manager/log-manager';

@Component({
  selector: 'org-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoadingSpinner, NgTemplateOutlet],
  templateUrl: './label.html',
  host: {
    ['attr.data-testid']: 'label',
    class: 'inline-flex',
  },
})
export class Label {
  private readonly _logManager = inject(LogManager);

  public asLabel = input<boolean>(true);
  public label = input.required<string>();
  public isLoading = input<boolean>(false);
  public isRequired = input<boolean>(false);
  public containerClass = input<string>('');
  public htmlFor = input<string>('');

  public mergeClasses = tailwindUtils.merge;

  constructor() {
    // input validation based on the configured tag
    effect(() => {
      if (this.asLabel() && !this.htmlFor()) {
        this._logManager.error({
          type: 'label-missing-html-for',
          message: 'htmlFor input is required when asLabel is set to true',
        });
      }
    });
  }
}

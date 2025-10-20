import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';

@Component({
  selector: 'org-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoadingSpinner],
  templateUrl: './label.html',
  host: {
    dataid: 'label',
    class: 'inline-flex',
  },
})
export class Label {
  public label = input.required<string>();
  public isLoading = input<boolean>(false);
  public containerClass = input<string>('');
  public for = input.required<string>();
}

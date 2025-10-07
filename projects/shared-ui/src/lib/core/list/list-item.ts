import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { tailwindUtils } from '@organization/shared-utils';

@Component({
  selector: 'org-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './list-item.html',
  host: {
    dataid: 'list-item',
  },
})
export class ListItem {
  private readonly _clicked$ = new Subject<void>();

  public isSelected = input<boolean>(false);
  public containerClass = input<string>('');

  public clicked = outputFromObservable(this._clicked$);

  public readonly isClickable = computed<boolean>(() => this._clicked$.observed);

  public mergeClasses = tailwindUtils.merge;

  public handleClick(): void {
    if (this._clicked$.observed) {
      this._clicked$.next();
    }
  }
}

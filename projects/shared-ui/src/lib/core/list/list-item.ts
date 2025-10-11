import { Component, ChangeDetectionStrategy, input, computed, effect } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { tailwindUtils } from '@organization/shared-utils';
import { NgTemplateOutlet } from '@angular/common';
import { Icon, type IconName } from '../icon/icon';

@Component({
  selector: 'org-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, Icon],
  templateUrl: './list-item.html',
  host: {
    dataid: 'list-item',
  },
})
export class ListItem {
  private readonly _clicked$ = new Subject<void>();

  public asTag = input<'a' | 'button' | null>(null);
  public isSelected = input<boolean>(false);
  public containerClass = input<string>('');
  public href = input<string>('');
  public isExternalHref = input<boolean>(false);
  public preIcon = input<IconName | null>(null);
  public postIcon = input<IconName | null>(null);

  // there are cases where the item is clickable but not the item itself so this allows us to force the item to
  // be clickable so it has the correct styles
  public forceClickable = input<boolean>(false);

  public clicked = outputFromObservable(this._clicked$);

  public readonly isValidLink = computed<boolean>(() => this.asTag() === 'a' && !!this.href());
  public readonly isClickable = computed<boolean>(
    () => this.forceClickable() || this.isValidLink() || this._clicked$.observed
  );

  protected finalContainerClass = computed<string>(() =>
    this.mergeClasses(
      'w-full flex items-center gap-2',
      'px-2.5 py-2 text-base',
      'text-list-item-text bg-list-item-background',
      'focus:outline-none',
      this.containerClass(),
      {
        'cursor-pointer': this.isClickable(),
        'cursor-pointer hover:bg-list-item-hover': !this.isSelected() && this.isClickable(),
        'focus-visible:bg-list-item-hover': !this.isSelected() && this.isClickable(),
        'bg-list-item-selected': this.isSelected(),
      }
    )
  );

  public mergeClasses = tailwindUtils.merge;

  constructor() {
    // input validation based on the configured tag
    effect(() => {
      if (this.asTag() === 'a' && !this.href()) {
        throw new Error(`'href' input is required when 'asTag' is set to 'a'.`);
      }
    });
  }

  public handleClick(): void {
    if (this._clicked$.observed) {
      this._clicked$.next();
    }
  }
}

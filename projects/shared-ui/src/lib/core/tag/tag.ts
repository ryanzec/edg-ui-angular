import { Component, ChangeDetectionStrategy, input, output, computed, inject, ElementRef } from '@angular/core';
import { Icon, type IconName } from '../icon/icon';
import { tailwindUtils } from '@organization/shared-utils';
import { Subject } from 'rxjs';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { ComponentColor } from '../types/component-types';

export type TagColor = ComponentColor;

export type TagVariant = 'strong' | 'weak';

export const tagVariants: TagVariant[] = ['strong', 'weak'];

@Component({
  selector: 'org-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './tag.html',
})
export class Tag {
  private readonly _elementRef = inject(ElementRef<HTMLElement>);

  // Input properties
  public color = input.required<ComponentColor>();
  public variant = input<TagVariant>('weak');
  public preIcon = input<IconName | null>(null);
  public postIcon = input<IconName | null>(null);
  public removable = input<boolean>(false);

  // needs in order to determine if the output event is being listened to
  private _preIconClicked$ = new Subject<void>();
  private _postIconClicked$ = new Subject<void>();

  // Output events
  public preIconClicked = outputFromObservable(this._preIconClicked$);
  public postIconClicked = outputFromObservable(this._postIconClicked$);
  public removed = output<void>();

  // Computed properties
  public readonly hasPreIcon = computed(() => !!this.preIcon());
  public readonly hasPostIcon = computed(() => !!this.currentPostIcon());
  public readonly hasContent = computed(() => {
    const textContent = this._elementRef.nativeElement.textContent?.trim();

    return !!textContent;
  });
  public readonly isPreIconClickable = computed(() => this.hasPreIcon() && this._preIconClicked$.observed);
  public readonly isPostIconClickable = computed(
    () => (this.hasPostIcon() && this._postIconClicked$.observed) || this.removable()
  );

  public readonly currentPostIcon = computed((): IconName | null => {
    if (this.removable()) {
      return 'x';
    }

    return this.postIcon();
  });

  public mergeClasses = tailwindUtils.merge;

  public onPreIconClick(): void {
    this._preIconClicked$.next();
  }

  public onPostIconClick(): void {
    if (this.removable()) {
      this.removed.emit();
    } else {
      this._postIconClicked$.next();
    }
  }
}

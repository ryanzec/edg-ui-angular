import { Component, ChangeDetectionStrategy, input, output, computed, inject, ElementRef } from '@angular/core';
import { Icon, type IconName } from '../icon/icon';
import { tailwindUtils } from '@organization/shared-utils';
import { Subject } from 'rxjs';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { type ComponentColor, ComponentColorDirective } from '../component-color-directive/component-color-directive';

export const TagVariant = {
  STRONG: 'strong',
  WEAK: 'weak',
} as const;

export type TagVariant = (typeof TagVariant)[keyof typeof TagVariant];

export const tagVariants = Object.values(TagVariant);

@Component({
  selector: 'org-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './tag.html',
  styleUrl: './tag.css',
  hostDirectives: [
    {
      directive: ComponentColorDirective,
      inputs: ['orgColor'],
    },
  ],
})
export class Tag {
  private readonly _elementRef = inject(ElementRef<HTMLElement>);

  // Input properties
  public orgColor = input.required<ComponentColor>();
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

  public readonly currentPostIcon = computed((): IconName | null => {
    if (this.removable()) {
      return 'x';
    }

    return this.postIcon();
  });

  public readonly tagClasses = computed<string>(() => {
    const baseClasses = [
      'inline-flex',
      'items-center',
      'rounded-md',
      'border',
      'text-sm',
      'font-medium',
      'gap-1.5',
      'px-2',
      'py-1',
    ];

    // Only add variant class, color will be handled by ComponentColorDirective on host
    const variantClass = this.variant();

    return tailwindUtils.merge([...baseClasses, variantClass].join(' '));
  });

  public readonly hostClasses = computed<string>(() => {
    return 'org-tag inline-block';
  });

  public readonly preIconClasses = computed<string>(() => {
    const baseClasses = ['inline-flex', 'flex-shrink-0'];
    const stateClasses = [];

    if (this.hasPreIcon() && this._preIconClicked$.observed) {
      stateClasses.push('cursor-pointer', 'hover:opacity-80');
    }

    return tailwindUtils.merge([...baseClasses, ...stateClasses].join(' '));
  });

  public readonly postIconClasses = computed<string>(() => {
    const baseClasses = ['inline-flex', 'flex-shrink-0'];
    const stateClasses = [];

    if (this.hasPostIcon() && this._postIconClicked$.observed) {
      stateClasses.push('cursor-pointer', 'hover:opacity-80');
    }

    return tailwindUtils.merge([...baseClasses, ...stateClasses].join(' '));
  });

  public handlePreIconClick(): void {
    this._preIconClicked$.next();
  }

  public handlePostIconClick(): void {
    if (this.removable()) {
      this.removed.emit();
    } else {
      this._postIconClicked$.next();
    }
  }
}

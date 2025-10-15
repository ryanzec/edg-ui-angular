import {
  Component,
  ChangeDetectionStrategy,
  input,
  ContentChild,
  TemplateRef,
  computed,
  signal,
  ViewChild,
  ElementRef,
  effect,
  untracked,
  afterNextRender,
  inject,
  Injector,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ScrollAreaDirective } from '../scroll-area-directive/scroll-area-directive';
import { domUtils, tailwindUtils } from '@organization/shared-utils';

/**
 * internal state for the table component
 */
type TableState = {
  isScrollNeeded: boolean;
};

@Component({
  selector: 'org-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, ScrollAreaDirective],
  templateUrl: './table.html',
  styleUrl: './table.css',
  host: {
    dataid: 'table',
  },
})
export class Table<T = unknown> {
  private readonly _injector = inject(Injector);

  @ContentChild('header', { static: false })
  public readonly headerTemplate: TemplateRef<void> | null = null;

  @ContentChild('body', { static: false })
  public readonly bodyTemplate: TemplateRef<{ $implicit: T }> | null = null;

  @ViewChild('scrollContainer')
  public readonly scrollContainer?: ElementRef<HTMLDivElement>;

  /**
   * @internal Only exposed for testing purposes
   */
  public readonly _state = signal<TableState>({
    isScrollNeeded: false,
  });

  public data = input.required<T[]>();
  public ellipsisAt = input<number>(0);
  public containerClass = input<string>('');
  public tableClass = input<string>('');
  public headerClass = input<string>('');
  public bodyClass = input<string>('');

  public hasEllipsis = computed<boolean>(() => this.ellipsisAt() > 0);
  public isScrollNeeded = computed<boolean>(() => this._state().isScrollNeeded);

  public mergeClasses = tailwindUtils.merge;

  constructor() {
    // check if scrolling is needed when data changes
    effect(() => {
      const data = this.data();

      if (data) {
        untracked(() => {
          this._checkScrollNeeded();
        });
      }
    });
  }

  /**
   * checks if the scroll container needs scrolling in either direction
   */
  private _checkScrollNeeded(): void {
    // wait for next render to ensure DOM is updated
    afterNextRender(
      () => {
        if (!this.scrollContainer) {
          this._state.update((state) => ({ ...state, isScrollNeeded: false }));

          return;
        }

        const container = this.scrollContainer.nativeElement;
        const hasVerticalScroll = domUtils.hasScrollableContent(container, 'vertical');
        const hasHorizontalScroll = domUtils.hasScrollableContent(container, 'horizontal');
        const isScrollNeeded = hasVerticalScroll || hasHorizontalScroll;

        this._state.update((state) => ({ ...state, isScrollNeeded }));
      },
      { injector: this._injector }
    );
  }
}

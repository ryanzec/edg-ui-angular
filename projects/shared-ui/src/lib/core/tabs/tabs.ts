import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  ViewChild,
  ElementRef,
  signal,
  AfterViewInit,
  effect,
} from '@angular/core';
import { tailwindUtils } from '@organization/shared-utils';
import { Button } from '../button/button';

export type TabsState = {
  canScrollLeft: boolean;
  canScrollRight: boolean;
};

@Component({
  selector: 'org-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
  host: {
    dataid: 'tabs',
  },
})
export class Tabs implements AfterViewInit {
  private readonly _state = signal<TabsState>({
    canScrollLeft: false,
    canScrollRight: false,
  });

  @ViewChild('tabsContainerRef')
  public readonly tabsContainerRef!: ElementRef<HTMLDivElement>;

  public value = input.required<string>();
  public scrollable = input<boolean>(false);
  public tabsClass = input<string>('');

  public tabSelected = output<string>();

  public readonly canScrollLeft = computed<boolean>(() => this._state().canScrollLeft);
  public readonly canScrollRight = computed<boolean>(() => this._state().canScrollRight);

  public mergeClasses = tailwindUtils.merge;

  constructor() {
    // scroll active tab into view when value changes
    effect(() => {
      const activeValue = this.value();

      // wait for next tick to ensure view is updated
      setTimeout(() => {
        this._scrollActiveTabIntoView(activeValue);
      }, 0);
    });
  }

  public ngAfterViewInit(): void {
    if (this.scrollable()) {
      // initial scroll state check after view is initialized
      setTimeout(() => this._updateScrollState(), 0);
    }
  }

  public handleTabClick(value: string): void {
    this.tabSelected.emit(value);
  }

  public handleScrollLeft(): void {
    if (!this.tabsContainerRef) {
      return;
    }

    const container = this.tabsContainerRef.nativeElement;
    const scrollAmount = container.clientWidth * 0.8;

    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  }

  public handleScrollRight(): void {
    if (!this.tabsContainerRef) {
      return;
    }

    const container = this.tabsContainerRef.nativeElement;
    const scrollAmount = container.clientWidth * 0.8;

    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  }

  public handleScroll(): void {
    this._updateScrollState();
  }

  public handleScrollEnd(): void {
    this._updateScrollState();
  }

  private _updateScrollState(): void {
    if (!this.tabsContainerRef) {
      return;
    }

    const container = this.tabsContainerRef.nativeElement;
    const canScrollLeft = container.scrollLeft > 0;
    const canScrollRight = container.scrollLeft < container.scrollWidth - container.clientWidth - 1;

    this._state.set({
      canScrollLeft,
      canScrollRight,
    });
  }

  private _scrollActiveTabIntoView(activeValue: string): void {
    if (!this.tabsContainerRef || !this.scrollable()) {
      return;
    }

    const container = this.tabsContainerRef.nativeElement;

    // find the active tab button element
    const activeTabButton = container.querySelector(`button[data-tab-value="${activeValue}"]`) as HTMLElement;

    if (activeTabButton) {
      activeTabButton.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }
}

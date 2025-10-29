import {
  Component,
  input,
  inject,
  ElementRef,
  PLATFORM_ID,
  effect,
  signal,
  computed,
  DestroyRef,
  afterNextRender,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CdkObserveContent } from '@angular/cdk/observers';
import scrollparent from 'scrollparent';
import { LogManager } from '../log-manager/log-manager';
import { domUtils } from '@organization/shared-utils';

/**
 * auto scroll state type
 */
export type AutoScrollState = 'enabled' | 'disabled' | 'forced-disabled';

/**
 * options for scrolling to bottom
 */
export type AutoScrollScrollToBottomOptions = {
  onAfterScroll?: () => void;
};

export const AUTO_SCROLL_ENABLED_DEFAULT = true;

/**
 * internal state type
 */
type AutoScrollInternalState = {
  autoScrollState: AutoScrollState;
};

@Component({
  selector: 'org-auto-scroll',
  templateUrl: './auto-scroll.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: CdkObserveContent,
      outputs: ['cdkObserveContent'],
    },
  ],
  host: {
    '[attr.data-testid]': '"auto-scroll"',
  },
})
export class AutoScroll {
  private _elementRef = inject(ElementRef);
  private _platformId = inject(PLATFORM_ID);
  private _destroyRef = inject(DestroyRef);
  private _cdkObserveContent = inject(CdkObserveContent);
  private _logManager = inject(LogManager);

  public autoScrollEnabled = input<boolean>(AUTO_SCROLL_ENABLED_DEFAULT);
  public contentClass = input<string>('');

  @ViewChild('sentinelRef', { static: true })
  private _sentinelRef!: ElementRef<HTMLElement>;

  @ViewChild('contentWrapperRef', { static: true })
  private _contentWrapperRef!: ElementRef<HTMLElement>;

  private _state = signal<AutoScrollInternalState>({
    autoScrollState: 'enabled',
  });

  private _scrollableParent: HTMLElement | null = null;
  private _intersectionObserver: IntersectionObserver | null = null;
  private _resizeObserver: ResizeObserver | null = null;
  private _mutationObserver: MutationObserver | null = null;
  private _targetScrollTop: number | null = null;
  private _scrollEndTimeout: ReturnType<typeof setTimeout> | null = null;
  private _pendingScrollCallback: (() => void) | null = null;

  /**
   * readonly computed state for external access
   */
  private _autoScrollState = computed<AutoScrollState>(() => this._state().autoScrollState);

  constructor() {
    // setup effect in constructor (injection context)
    this._setupEnabledInputEffect();

    if (isPlatformBrowser(this._platformId)) {
      // initialize after content is rendered
      afterNextRender(() => {
        this._detectScrollableParent();

        if (this._scrollableParent) {
          this._initialize();
          this._setupContentObserver();
          this._setupMutationObserver();
        }
      });
    }

    this._destroyRef.onDestroy(() => {
      this._cleanup();
    });
  }

  /**
   * sets the auto scroll state
   */
  public setAutoScrollState(newState: AutoScrollState): void {
    this._state.update((state) => ({
      ...state,
      autoScrollState: newState,
    }));
  }

  /**
   * gets the current auto scroll state
   */
  public getAutoScrollState(): AutoScrollState {
    return this._autoScrollState();
  }

  /**
   * programmatically scrolls to the bottom
   */
  public autoScrollScrollToBottom(options?: AutoScrollScrollToBottomOptions): void {
    if (!isPlatformBrowser(this._platformId) || !this._scrollableParent) {
      return;
    }

    this._targetScrollTop = this._scrollableParent.scrollHeight - this._scrollableParent.clientHeight;

    if (options?.onAfterScroll) {
      this._pendingScrollCallback = options.onAfterScroll;
    }

    this._scrollableParent.scrollTo({
      top: this._targetScrollTop,
      behavior: 'smooth',
    });
  }

  /**
   * sets up the content observer
   */
  private _setupContentObserver(): void {
    this._cdkObserveContent.event.subscribe(() => {
      this._onContentChange();
    });
  }

  /**
   * called when content changes are observed
   */
  private _onContentChange(): void {
    if (this._state().autoScrollState === 'enabled') {
      this._scrollToBottom();
    }
  }

  /**
   * detects the scrollable parent element
   */
  private _detectScrollableParent(): void {
    const element = this._elementRef.nativeElement as HTMLElement;
    const parent = scrollparent(element);

    if (!parent || parent === document.documentElement || parent === document.body) {
      this._logManager.warn(
        'AutoScroll: No scrollable parent found for auto-scroll component. Auto-scroll functionality will not be initialized.'
      );
      this._scrollableParent = null;

      return;
    }

    this._scrollableParent = parent as HTMLElement;
  }

  /**
   * initializes the component
   */
  private _initialize(): void {
    this._setupIntersectionObserver();
    this._setupResizeObserver();
    this._setupScrollListener();
    this._initializeAutoScrollState();
  }

  /**
   * initializes the auto scroll state based on enabled input
   */
  private _initializeAutoScrollState(): void {
    if (this.autoScrollEnabled()) {
      this._state.update((state) => ({
        ...state,
        autoScrollState: 'enabled',
      }));
    } else {
      this._state.update((state) => ({
        ...state,
        autoScrollState: 'forced-disabled',
      }));
    }
  }

  /**
   * sets up the mutation observer to detect content changes and scrollable parent changes
   */
  private _setupMutationObserver(): void {
    const contentWrapperElement = this._contentWrapperRef.nativeElement;
    const element = this._elementRef.nativeElement as HTMLElement;

    this._mutationObserver = new MutationObserver(() => {
      this._onScrollableParentChange();
    });

    // observe the content wrapper for content changes
    this._mutationObserver.observe(contentWrapperElement, {
      childList: true,
      subtree: true,
    });

    // observe the component's parent node for structural changes that might affect scrollable parent
    if (element.parentNode) {
      this._mutationObserver.observe(element.parentNode, {
        childList: true,
        subtree: true,
      });
    }
  }

  /**
   * handles scrollable parent changes
   */
  private _onScrollableParentChange(): void {
    const previousParent = this._scrollableParent;
    this._detectScrollableParent();

    // if the parent changed, reinitialize
    if (previousParent !== this._scrollableParent) {
      this._cleanup();

      if (this._scrollableParent) {
        this._initialize();
      }
    }
  }

  /**
   * sets up the intersection observer for the sentinel
   */
  private _setupIntersectionObserver(): void {
    if (!this._scrollableParent) {
      return;
    }

    const sentinelElement = this._sentinelRef.nativeElement;

    this._intersectionObserver = new IntersectionObserver(
      (entries) => {
        this._onIntersection(entries);
      },
      {
        root: this._scrollableParent,
      }
    );

    this._intersectionObserver.observe(sentinelElement);
  }

  /**
   * sets up the resize observer for the content wrapper element
   */
  private _setupResizeObserver(): void {
    if (!this._scrollableParent) {
      return;
    }

    const contentWrapperElement = this._contentWrapperRef.nativeElement;

    this._resizeObserver = new ResizeObserver(() => {
      if (this._state().autoScrollState === 'enabled') {
        this._scrollToBottom();
      }
    });

    this._resizeObserver.observe(contentWrapperElement);
  }

  /**
   * sets up the scroll listener
   */
  private _setupScrollListener(): void {
    if (!this._scrollableParent) {
      return;
    }

    this._scrollableParent.addEventListener('scroll', () => {
      this._onScroll();
    });
  }

  /**
   * sets up effect for autoScrollEnabled input changes
   */
  private _setupEnabledInputEffect(): void {
    let previousValue = this.autoScrollEnabled();

    effect(() => {
      const currentValue = this.autoScrollEnabled();

      if (previousValue === currentValue) {
        previousValue = currentValue;

        return;
      }

      // true -> false: set to forced-disabled
      if (previousValue && !currentValue) {
        this._state.update((state) => ({
          ...state,
          autoScrollState: 'forced-disabled',
        }));
      }

      // false -> true: check if sentinel is in view
      if (!previousValue && currentValue) {
        this._checkSentinelVisibility();
      }

      previousValue = currentValue;
    });
  }

  /**
   * checks if the sentinel is in view and updates state
   */
  private _checkSentinelVisibility(): void {
    if (!this._scrollableParent) {
      return;
    }

    const sentinelElement = this._sentinelRef.nativeElement;
    const isOutOfView = domUtils.isElementOutOfView(this._scrollableParent, sentinelElement);

    this._state.update((state) => ({
      ...state,
      autoScrollState: !isOutOfView ? 'enabled' : 'disabled',
    }));
  }

  /**
   * handles intersection observer entries
   */
  private _onIntersection(entries: IntersectionObserverEntry[]): void {
    // if forced-disabled or programmatic scroll, don't change state
    if (this._state().autoScrollState === 'forced-disabled' || this._targetScrollTop !== null) {
      return;
    }

    for (const entry of entries) {
      this._state.update((state) => ({
        ...state,
        autoScrollState: entry.isIntersecting ? 'enabled' : 'disabled',
      }));
    }
  }

  /**
   * handles scroll events
   */
  private _onScroll(): void {
    if (!this._scrollableParent) {
      return;
    }

    // clear any pending scroll end timeout
    if (this._scrollEndTimeout) {
      clearTimeout(this._scrollEndTimeout);
    }

    // check if this is our programmatic scroll
    if (this._targetScrollTop !== null) {
      const currentScrollTop = this._scrollableParent.scrollTop;
      const threshold = 2;

      if (Math.abs(currentScrollTop - this._targetScrollTop) < threshold) {
        // programmatic scroll completed
        const callback = this._pendingScrollCallback;
        this._targetScrollTop = null;
        this._pendingScrollCallback = null;

        // call the callback after clearing state
        if (callback) {
          // use timeout to ensure scroll is fully complete
          this._scrollEndTimeout = setTimeout(() => {
            callback();
            this._scrollEndTimeout = null;
          }, 150);
        }
      }
    }
  }

  /**
   * scrolls to the bottom of the scrollable parent
   */
  private _scrollToBottom(): void {
    if (!this._scrollableParent) {
      return;
    }

    this._targetScrollTop = this._scrollableParent.scrollHeight - this._scrollableParent.clientHeight;

    this._scrollableParent.scrollTo({
      top: this._targetScrollTop,
      behavior: 'smooth',
    });
  }

  /**
   * cleans up observers and listeners
   */
  private _cleanup(): void {
    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
      this._intersectionObserver = null;
    }

    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }

    if (this._mutationObserver) {
      this._mutationObserver.disconnect();
      this._mutationObserver = null;
    }

    if (this._scrollEndTimeout) {
      clearTimeout(this._scrollEndTimeout);
      this._scrollEndTimeout = null;
    }

    this._pendingScrollCallback = null;
  }
}

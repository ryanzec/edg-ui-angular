import { Directive, input, effect, ElementRef, inject, Renderer2, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const ScrollAreaDirection = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
  BOTH: 'both',
} as const;

export type ScrollAreaDirection = (typeof ScrollAreaDirection)[keyof typeof ScrollAreaDirection];

export const scrollAreaDirections = Object.values(ScrollAreaDirection);

export const SCROLL_AREA_DIRECTION_DEFAULT: ScrollAreaDirection = ScrollAreaDirection.VERTICAL;
export const SCROLL_AREA_ONLY_SHOW_ON_HOVER_DEFAULT = false;

// unique id for the style element to avoid duplicates
const STYLE_ID = 'org-scroll-area-styles';

@Directive({
  selector: '[orgScrollArea]',
  host: {
    '[class.org-scroll-area]': 'true',
    '[class.org-scroll-area--vertical]': '_getDirection() === "vertical"',
    '[class.org-scroll-area--horizontal]': '_getDirection() === "horizontal"',
    '[class.org-scroll-area--both]': '_getDirection() === "both"',
    '[class.org-scroll-area--hover-only]': 'scrollAreaOnlyShowOnHover()',
  },
})
export class ScrollAreaDirective {
  private _elementRef = inject(ElementRef);
  private _renderer = inject(Renderer2);
  private _platformId = inject(PLATFORM_ID);

  public scrollAreaDirection = input<ScrollAreaDirection | ''>(SCROLL_AREA_DIRECTION_DEFAULT);
  public scrollAreaOnlyShowOnHover = input<boolean>(SCROLL_AREA_ONLY_SHOW_ON_HOVER_DEFAULT);

  // helper method to get the direction, handling empty string
  public _getDirection(): ScrollAreaDirection {
    const value = this.scrollAreaDirection();
    return value === '' ? SCROLL_AREA_DIRECTION_DEFAULT : value;
  }

  constructor() {
    // inject global styles once
    if (isPlatformBrowser(this._platformId)) {
      this._injectGlobalStyles();
    }

    // apply inline styles for scrollbar customization
    effect(() => {
      const element = this._elementRef.nativeElement as HTMLElement;
      const direction = this._getDirection();

      // set overflow based on direction
      if (direction === ScrollAreaDirection.VERTICAL) {
        this._renderer.setStyle(element, 'overflow-y', 'auto');
        this._renderer.setStyle(element, 'overflow-x', 'hidden');
      } else if (direction === ScrollAreaDirection.HORIZONTAL) {
        this._renderer.setStyle(element, 'overflow-x', 'auto');
        this._renderer.setStyle(element, 'overflow-y', 'hidden');
      } else if (direction === ScrollAreaDirection.BOTH) {
        this._renderer.setStyle(element, 'overflow', 'auto');
      }
    });
  }

  private _injectGlobalStyles(): void {
    // check if styles are already injected
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const styleElement = this._renderer.createElement('style');
    this._renderer.setAttribute(styleElement, 'id', STYLE_ID);

    const styles = `
      /* modern scrollbar styling using native css */
      /* light mode (default) - darker scrollbars */
      .org-scroll-area {
        /* firefox scrollbar styling */
        scrollbar-width: thin;
        scrollbar-color: rgb(148 163 184 / 0.7) transparent;
      }

      /* webkit scrollbar styling */
      .org-scroll-area::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      .org-scroll-area::-webkit-scrollbar-track {
        background: transparent;
      }

      .org-scroll-area::-webkit-scrollbar-thumb {
        background-color: rgb(148 163 184 / 0.7);
        border-radius: 4px;
        transition: background-color 0.2s ease;
      }

      .org-scroll-area::-webkit-scrollbar-thumb:hover {
        background-color: rgb(100 116 139 / 0.9);
      }

      /* dark mode - lighter scrollbars */
      .dark-theme .org-scroll-area {
        scrollbar-color: rgb(203 213 225 / 0.3) transparent;
      }

      .dark-theme .org-scroll-area::-webkit-scrollbar-thumb {
        background-color: rgb(203 213 225 / 0.3);
      }

      .dark-theme .org-scroll-area::-webkit-scrollbar-thumb:hover {
        background-color: rgb(203 213 225 / 0.5);
      }

      /* hide scrollbar for hover-only mode by default */
      .org-scroll-area.org-scroll-area--hover-only {
        scrollbar-width: none;
      }

      .org-scroll-area.org-scroll-area--hover-only::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      .org-scroll-area.org-scroll-area--hover-only::-webkit-scrollbar-thumb {
        background-color: transparent;
      }

      /* show scrollbar on hover - light mode */
      .org-scroll-area.org-scroll-area--hover-only:hover {
        scrollbar-width: thin;
        scrollbar-color: rgb(148 163 184 / 0.7) transparent;
      }

      .org-scroll-area.org-scroll-area--hover-only:hover::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      .org-scroll-area.org-scroll-area--hover-only:hover::-webkit-scrollbar-thumb {
        background-color: rgb(148 163 184 / 0.7);
      }

      .org-scroll-area.org-scroll-area--hover-only:hover::-webkit-scrollbar-thumb:hover {
        background-color: rgb(100 116 139 / 0.9);
      }

      /* show scrollbar on hover - dark mode */
      .dark-theme .org-scroll-area.org-scroll-area--hover-only:hover {
        scrollbar-color: rgb(203 213 225 / 0.3) transparent;
      }

      .dark-theme .org-scroll-area.org-scroll-area--hover-only:hover::-webkit-scrollbar-thumb {
        background-color: rgb(203 213 225 / 0.3);
      }

      .dark-theme .org-scroll-area.org-scroll-area--hover-only:hover::-webkit-scrollbar-thumb:hover {
        background-color: rgb(203 213 225 / 0.5);
      }

      /* hide horizontal scrollbar for vertical-only mode */
      .org-scroll-area.org-scroll-area--vertical::-webkit-scrollbar:horizontal {
        display: none;
      }

      /* hide vertical scrollbar for horizontal-only mode */
      .org-scroll-area.org-scroll-area--horizontal::-webkit-scrollbar:vertical {
        display: none;
      }
    `;

    const textNode = this._renderer.createText(styles);
    this._renderer.appendChild(styleElement, textNode);
    this._renderer.appendChild(document.head, styleElement);
  }
}

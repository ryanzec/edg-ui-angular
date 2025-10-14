import { Directive, input, inject, Renderer2, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ScrollAreaDirection = 'vertical' | 'horizontal' | 'both';

export const scrollAreaDirections: ScrollAreaDirection[] = ['vertical', 'horizontal', 'both'];

export const SCROLL_AREA_DIRECTION_DEFAULT: ScrollAreaDirection = 'vertical';
export const SCROLL_AREA_ONLY_SHOW_ON_HOVER_DEFAULT = false;

// unique id for the style element to avoid duplicates
const STYLE_ID = 'org-scroll-area-styles';

@Directive({
  selector: '[orgScrollArea]',
  host: {
    '[class.org-scroll-area]': 'scrollAreaEnabled()',
    '[class.org-scroll-area--vertical]': 'scrollAreaDirection() === "vertical"',
    '[class.org-scroll-area--horizontal]': 'scrollAreaDirection() === "horizontal"',
    '[class.org-scroll-area--both]': 'scrollAreaDirection() === "both"',
    '[class.org-scroll-area--hover-only]': 'scrollAreaOnlyShowOnHover()',
    '[class.org-scroll-area--stable-content]': 'scrollAreaUseStableContent()',
  },
})
export class ScrollAreaDirective {
  private _renderer = inject(Renderer2);
  private _platformId = inject(PLATFORM_ID);

  public scrollAreaDirection = input<ScrollAreaDirection | ''>(SCROLL_AREA_DIRECTION_DEFAULT);
  public scrollAreaOnlyShowOnHover = input<boolean>(SCROLL_AREA_ONLY_SHOW_ON_HOVER_DEFAULT);
  public scrollAreaUseStableContent = input<boolean>(true);
  public scrollAreaEnabled = input<boolean>(true);

  constructor() {
    if (isPlatformBrowser(this._platformId)) {
      this._injectGlobalStyles();
    }
  }

  private _injectGlobalStyles(): void {
    // check if styles are already injected
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const styleElement = this._renderer.createElement('style');
    this._renderer.setAttribute(styleElement, 'id', STYLE_ID);

    const styles = `
      /* this prevent this style from being applied to Safari which cause the default scrollbar to be applied */
      @supports (scrollbar-color: auto) {
        body {
          scrollbar-width: auto;
        }
      }

      @supports selector(::-webkit-scrollbar) {
        .org-scroll-area::-webkit-scrollbar,
        .org-scroll-area::-webkit-scrollbar-corner {
          /*-webkit-appearance: none;
          width: 8px;
          height: 8px;*/
          background: transparent;
        }

        .org-scroll-area::-webkit-scrollbar {
          height: 7px;
          width: 7px;
        }

        /*.org-scroll-area::-webkit-scrollbar-track {
          background: transparent;
        }*/

        .org-scroll-area::-webkit-scrollbar-thumb {
          /*-webkit-appearance: none;*/
          background: transparent;
          border-radius: 4px;
        }

        /*.org-scroll-area::-webkit-scrollbar-corner {
          background: transparent;
        }*/
      }
      .org-scroll-area {
        --scrollbar-thumb-color: rgb(148 163 184 / 0.7);
        --scrollbar-thumb-hover-color: rgb(100 116 139 / 0.9);
      }

      .dark-theme .org-scroll-area {
        --scrollbar-thumb-color: rgb(203 213 225 / 0.3);
        --scrollbar-thumb-hover-color: rgb(203 213 225 / 0.5);
      }

      .org-scroll-area {
        /* Firefox */
        scrollbar-color: var(--scrollbar-thumb-color) transparent;
      }

      /* Overflow Control */
      /* using scroll instead of auto forces non-overlay scrollbars in Safari that can be styled */
      .org-scroll-area.org-scroll-area--vertical {
        overflow-y: scroll;
        overflow-x: hidden;

        @supports (scrollbar-gutter: stable) {
          overflow-y: auto;
          scrollbar-gutter: stable;
        }
      }

      .org-scroll-area.org-scroll-area--horizontal {
        overflow-x: scroll;
        overflow-y: hidden;

        @supports (scrollbar-gutter: stable) {
          overflow-x: auto;
          scrollbar-gutter: stable;
        }
      }

      .org-scroll-area.org-scroll-area--both {
        overflow: scroll;

        @supports (scrollbar-gutter: stable) {
          overflow: auto;
          scrollbar-gutter: stable;
        }
      }

      /* Layout Stability */
      .org-scroll-area.org-scroll-area--stable-content {
        scrollbar-gutter: stable;
        /* contain size calculations to prevent parent subpixel issues which effects chrome */
        contain: paint;
      }

      /*.org-scroll-area:not(.org-scroll-area--stable-content) {
        scrollbar-width: none;
      }*/

      /* Visibility Control */
      .org-scroll-area.org-scroll-area--hover-only {
        /* For Firefox: Make the scrollbar invisible, but keep its space */
        scrollbar-color: transparent transparent;
      }

      .org-scroll-area.org-scroll-area--hover-only:hover {
        /* For Firefox: Restore color on hover */
        scrollbar-color: var(--scrollbar-thumb-color) transparent;
        scrollbar-width: auto;
      }

      .org-scroll-area.org-scroll-area--hover-only::-webkit-scrollbar-thumb {
        /* For WebKit: Make the thumb invisible, but keep its space */
        background-color: transparent;
      }

      .org-scroll-area.org-scroll-area--hover-only:hover::-webkit-scrollbar-thumb {
        /* For WebKit: Restore thumb color on hover */
        background-color: var(--scrollbar-thumb-color);
      }

      .org-scroll-area.org-scroll-area--hover-only:hover::-webkit-scrollbar-thumb:hover {
        /* For WebKit: Handle the thumb's own hover state */
        background-color: var(--scrollbar-thumb-hover-color);
      }
    `;

    const textNode = this._renderer.createText(styles);
    this._renderer.appendChild(styleElement, textNode);
    this._renderer.appendChild(document.head, styleElement);
  }
}

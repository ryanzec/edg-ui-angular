import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
  ElementRef,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  signal,
  effect,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import { outputFromObservable } from '@angular/core/rxjs-interop';

/**
 * trigger type for tooltip
 */
export type TooltipTriggerType = 'hover' | 'click';

/**
 * horizontal position of tooltip relative to trigger
 */
export type TooltipXPosition = 'left' | 'center' | 'right';

export const tooltipXPositionValues: TooltipXPosition[] = ['left', 'center', 'right'];

/**
 * vertical position of tooltip relative to trigger
 */
export type TooltipYPosition = 'top' | 'center' | 'bottom';

export const tooltipYPositionValues: TooltipYPosition[] = ['top', 'center', 'bottom'];

type TooltipState = {
  isOpen: boolean;
  openTimeoutId: number | null;
  closeTimeoutId: number | null;
  isHoveringTooltip: boolean;
};

/**
 * tooltip component for displaying overlay content attached to a trigger element
 */
@Component({
  selector: 'org-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: '<ng-content />',
  host: {
    ['attr.data-testid']: 'tooltip',
    class: 'contents',
    '(mouseenter)': 'onTriggerMouseEnter()',
    '(mouseleave)': 'onTriggerMouseLeave()',
    '(click)': 'onTriggerClick()',
  },
})
export class Tooltip implements OnDestroy {
  private readonly _overlay = inject(Overlay);
  private readonly _elementRef = inject(ElementRef<HTMLElement>);
  private readonly _viewContainerRef = inject(ViewContainerRef);

  private readonly _state = signal<TooltipState>({
    isOpen: false,
    openTimeoutId: null,
    closeTimeoutId: null,
    isHoveringTooltip: false,
  });

  private _overlayRef: OverlayRef | null = null;
  private _portal: TemplatePortal | null = null;

  private _onOpenSubject = new Subject<void>();
  private _onCloseSubject = new Subject<void>();

  /**
   * how the tooltip is triggered
   */
  public triggerType = input<TooltipTriggerType>('hover');

  /**
   * template for the tooltip content
   */
  public templateRef = input.required<TemplateRef<unknown>>();

  /**
   * delay in milliseconds before showing the tooltip
   */
  public openDelay = input<number>(200);

  /**
   * delay in milliseconds before hiding the tooltip
   */
  public closeDelay = input<number>(200);

  /**
   * whether to keep the tooltip open when hovering over it
   */
  public keepOpenOnHover = input<boolean>(false);

  /**
   * horizontal position of tooltip relative to trigger
   */
  public xPosition = input<TooltipXPosition>('center');

  /**
   * vertical position of tooltip relative to trigger
   */
  public yPosition = input<TooltipYPosition>('bottom');

  /**
   * emitted when the tooltip opens
   */
  public onOpen = outputFromObservable(this._onOpenSubject.asObservable());

  /**
   * emitted when the tooltip closes
   */
  public onClose = outputFromObservable(this._onCloseSubject.asObservable());

  constructor() {
    effect(() => {
      const contentTemplate = this.templateRef();

      if (contentTemplate && !this._portal) {
        this._portal = new TemplatePortal(contentTemplate, this._viewContainerRef);
      }
    });
  }

  public ngOnDestroy(): void {
    this._clearTimeouts();
    this._closeTooltip();
    this._onOpenSubject.complete();
    this._onCloseSubject.complete();
  }

  protected onTriggerMouseEnter(): void {
    if (this.triggerType() !== 'hover') {
      return;
    }

    this._scheduleOpen();
  }

  protected onTriggerMouseLeave(): void {
    if (this.triggerType() !== 'hover') {
      return;
    }

    this._scheduleClose();
  }

  protected onTriggerClick(): void {
    if (this.triggerType() !== 'click') {
      return;
    }

    if (this._state().isOpen) {
      this._closeTooltip();
    } else {
      this._openTooltip();
    }
  }

  private _scheduleOpen(): void {
    this._clearCloseTimeout();

    if (this._state().isOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      this._openTooltip();
    }, this.openDelay());

    this._state.update((state) => ({
      ...state,
      openTimeoutId: timeoutId,
    }));
  }

  private _scheduleClose(): void {
    this._clearOpenTimeout();

    if (!this._state().isOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      if (this.keepOpenOnHover() && this._state().isHoveringTooltip) {
        return;
      }

      this._closeTooltip();
    }, this.closeDelay());

    this._state.update((state) => ({
      ...state,
      closeTimeoutId: timeoutId,
    }));
  }

  private _openTooltip(): void {
    if (this._state().isOpen) {
      return;
    }

    this._onOpenSubject.next();

    if (!this._overlayRef) {
      this._createOverlay();
    }

    if (this._portal && this._overlayRef && !this._overlayRef.hasAttached()) {
      this._overlayRef.attach(this._portal);

      if (this.keepOpenOnHover()) {
        this._attachTooltipHoverListeners();
      }
    }

    this._state.update((state) => ({
      ...state,
      isOpen: true,
      openTimeoutId: null,
    }));
  }

  private _closeTooltip(): void {
    if (!this._state().isOpen) {
      return;
    }

    this._onCloseSubject.next();

    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }

    this._state.update((state) => ({
      ...state,
      isOpen: false,
      closeTimeoutId: null,
      isHoveringTooltip: false,
    }));
  }

  private _createOverlay(): void {
    // use the first child element as the trigger since the component uses 'contents' class
    const triggerElement =
      (this._elementRef.nativeElement.firstElementChild as HTMLElement) || this._elementRef.nativeElement;

    const positions = this._getPositionStrategies();

    const positionStrategy = this._overlay.position().flexibleConnectedTo(triggerElement).withPositions(positions);

    this._overlayRef = this._overlay.create({
      positionStrategy,
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
    });
  }

  private _getPositionStrategies() {
    const xPos = this.xPosition();
    const yPos = this.yPosition();

    // map our position values to CDK's origin/overlay positioning
    const xMapping = {
      left: { originX: 'start' as const, overlayX: 'end' as const, offsetX: -8 },
      center: { originX: 'center' as const, overlayX: 'center' as const, offsetX: 0 },
      right: { originX: 'end' as const, overlayX: 'start' as const, offsetX: 8 },
    };

    const yMapping = {
      top: { originY: 'top' as const, overlayY: 'bottom' as const, offsetY: -8 },
      center: { originY: 'center' as const, overlayY: 'center' as const, offsetY: 0 },
      bottom: { originY: 'bottom' as const, overlayY: 'top' as const, offsetY: 8 },
    };

    const primary = {
      ...xMapping[xPos],
      ...yMapping[yPos],
    };

    // create fallback positions based on the primary position
    const fallbacks = [];

    // if not centered vertically, add opposite vertical position
    if (yPos !== 'center') {
      const oppositeY = yPos === 'top' ? 'bottom' : 'top';
      fallbacks.push({
        ...xMapping[xPos],
        ...yMapping[oppositeY],
      });
    }

    // if not centered horizontally, add opposite horizontal position
    if (xPos !== 'center') {
      const oppositeX = xPos === 'left' ? 'right' : 'left';
      fallbacks.push({
        ...xMapping[oppositeX],
        ...yMapping[yPos],
      });
    }

    // add center position as final fallback if not already primary
    if (xPos !== 'center' || yPos !== 'center') {
      fallbacks.push({
        ...xMapping.center,
        ...yMapping.center,
      });
    }

    return [primary, ...fallbacks];
  }

  private _attachTooltipHoverListeners(): void {
    if (!this._overlayRef) {
      return;
    }

    const overlayElement = this._overlayRef.overlayElement;

    overlayElement.addEventListener('mouseenter', this._onTooltipMouseEnter);
    overlayElement.addEventListener('mouseleave', this._onTooltipMouseLeave);
  }

  private _onTooltipMouseEnter = (): void => {
    this._clearCloseTimeout();

    this._state.update((state) => ({
      ...state,
      isHoveringTooltip: true,
    }));
  };

  private _onTooltipMouseLeave = (): void => {
    this._state.update((state) => ({
      ...state,
      isHoveringTooltip: false,
    }));

    this._scheduleClose();
  };

  private _clearOpenTimeout(): void {
    const timeoutId = this._state().openTimeoutId;

    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);

      this._state.update((state) => ({
        ...state,
        openTimeoutId: null,
      }));
    }
  }

  private _clearCloseTimeout(): void {
    const timeoutId = this._state().closeTimeoutId;

    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);

      this._state.update((state) => ({
        ...state,
        closeTimeoutId: null,
      }));
    }
  }

  private _clearTimeouts(): void {
    this._clearOpenTimeout();
    this._clearCloseTimeout();
  }
}

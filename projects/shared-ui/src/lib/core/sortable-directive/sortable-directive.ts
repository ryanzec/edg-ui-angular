import {
  Directive,
  input,
  inject,
  Renderer2,
  ElementRef,
  effect,
  createComponent,
  ComponentRef,
  computed,
  EnvironmentInjector,
  OnDestroy,
} from '@angular/core';
import { Icon, IconName } from '../icon/icon';
import { SortingStore } from '../sorting-store/sorting-store';

export const SORTABLE_SELECTABLE_DEFAULT = '';

/**
 * default value for sortableEnabled input
 */
export const SORTABLE_ENABLED_DEFAULT = true;

@Directive({
  selector: '[orgSortable]',
  host: {
    '(click)': '_onClick()',
    '[class.cursor-pointer]': '_hostClassEnabled()',
    '[class.select-none]': '_hostClassEnabled()',
    '[class.flex]': '_hostClassEnabled()',
    '[class.gap-1]': '_hostClassEnabled()',
    '[class.items-center]': '_hostClassEnabled()',
  },
})
export class SortableDirective implements OnDestroy {
  private readonly _renderer = inject(Renderer2);
  private readonly _elementRef = inject(ElementRef);
  private readonly _environmentInjector = inject(EnvironmentInjector);
  private readonly _sortingStore = inject(SortingStore);

  private _iconComponentRef: ComponentRef<Icon> | null = null;

  public orgSortable = input.required<string>();

  /**
   * controls whether sorting functionality is enabled
   */
  public sortableEnabled = input<boolean>(SORTABLE_ENABLED_DEFAULT);

  protected readonly _hostClassEnabled = computed<boolean>(() => this.sortableEnabled());

  private readonly _isActivelySorting = computed<boolean>(() => {
    const key = this._sortingStore.key();
    const direction = this._sortingStore.direction();
    const selectableValue = this.orgSortable();

    return key === selectableValue && direction !== null;
  });

  private readonly _iconName = computed<IconName>(() => {
    const isActivelySorting = this._isActivelySorting();
    const direction = this._sortingStore.direction();

    if (!isActivelySorting) {
      return 'arrows-down-up';
    }

    return direction === 'asc' ? 'arrow-up' : 'arrow-down';
  });

  constructor() {
    // keep icon up-to-date with state updates
    effect(() => {
      this._updateIcon(this._iconName(), this._isActivelySorting());
    });

    // handle dynamic enable/disable of sorting functionality
    effect(() => {
      const enabled = this.sortableEnabled();

      if (enabled) {
        this._createIcon();
      }

      if (!enabled) {
        this._destroyIcon();
      }
    });
  }

  ngOnDestroy(): void {
    this._iconComponentRef?.destroy();
  }

  public _onClick(): void {
    const enabled = this.sortableEnabled();

    if (!enabled) {
      return;
    }

    const selectableValue = this.orgSortable();

    if (!selectableValue) {
      return;
    }

    this._sortingStore.toggleSort(selectableValue);
  }

  private _updateIcon(iconName: IconName, isActivelySorting: boolean): void {
    if (!this._iconComponentRef) {
      return;
    }

    const iconElement = this._iconComponentRef.location.nativeElement;

    this._iconComponentRef.setInput('name', iconName);

    if (isActivelySorting) {
      this._renderer.removeClass(iconElement, 'text-text-subtle');
    }

    if (!isActivelySorting) {
      this._renderer.addClass(iconElement, 'text-text-subtle');
    }

    this._iconComponentRef.changeDetectorRef.detectChanges();
  }

  private _createIcon(): void {
    // don't create if already exists
    if (this._iconComponentRef) {
      return;
    }

    this._iconComponentRef = createComponent(Icon, {
      environmentInjector: this._environmentInjector,
    });

    const iconElement = this._iconComponentRef.location.nativeElement;
    const hostElement = this._elementRef.nativeElement;

    this._renderer.appendChild(hostElement, iconElement);

    this._updateIcon(this._iconName(), this._isActivelySorting());
  }

  private _destroyIcon(): void {
    if (!this._iconComponentRef) {
      return;
    }

    const iconElement = this._iconComponentRef.location.nativeElement;
    const hostElement = this._elementRef.nativeElement;

    this._renderer.removeChild(hostElement, iconElement);
    this._iconComponentRef.destroy();
    this._iconComponentRef = null;
  }
}

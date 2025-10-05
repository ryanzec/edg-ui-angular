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
  afterNextRender,
  OnDestroy,
} from '@angular/core';
import { Icon, IconName } from '../icon/icon';
import { SortingStore } from '../sorting-store/sorting-store';

export const SORTABLE_SELECTABLE_DEFAULT = '';

@Directive({
  selector: '[orgSortable]',
  host: {
    '(click)': '_handleClick()',
    '[class.cursor-pointer]': 'true',
    '[class.select-none]': 'true',
    '[class.flex]': 'true',
    '[class.gap-1]': 'true',
    '[class.items-center]': 'true',
  },
})
export class SortableDirective implements OnDestroy {
  private readonly _renderer = inject(Renderer2);
  private readonly _elementRef = inject(ElementRef);
  private readonly _environmentInjector = inject(EnvironmentInjector);
  private readonly _sortingStore = inject(SortingStore);

  private _iconComponentRef: ComponentRef<Icon> | null = null;

  public orgSortable = input.required<string>();

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

    afterNextRender(() => {
      // create and inject the icon component
      this._iconComponentRef = createComponent(Icon, {
        environmentInjector: this._environmentInjector,
      });

      const iconElement = this._iconComponentRef.location.nativeElement;
      const hostElement = this._elementRef.nativeElement;

      this._renderer.appendChild(hostElement, iconElement);

      this._updateIcon(this._iconName(), this._isActivelySorting());
    });
  }

  ngOnDestroy(): void {
    this._iconComponentRef?.destroy();
  }

  public _handleClick(): void {
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
    } else {
      this._renderer.addClass(iconElement, 'text-text-subtle');
    }

    this._iconComponentRef.changeDetectorRef.detectChanges();
  }
}

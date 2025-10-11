import { Component, ChangeDetectionStrategy, input, computed, inject, output, ElementRef } from '@angular/core';
import { tailwindUtils } from '@organization/shared-utils';
import { Tabs } from './tabs';

@Component({
  selector: 'org-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './tab.html',
  host: {
    dataid: 'tab',
  },
})
export class Tab {
  private readonly _tabs = inject(Tabs);
  private readonly _elementRef = inject(ElementRef<HTMLElement>);

  public value = input.required<string>();
  public disabled = input<boolean>(false);
  public tabClass = input<string>('');

  public clicked = output<string>();

  public readonly isActive = computed<boolean>(() => {
    return this._tabs.value() === this.value();
  });

  public readonly isDisabled = computed<boolean>(() => this.disabled());

  public mergeClasses = tailwindUtils.merge;

  public handleClick(): void {
    if (this.isDisabled()) {
      return;
    }

    this._tabs.handleTabClick(this.value());
    this.clicked.emit(this.value());
  }

  /**
   * @internal Only exposed for testing purposes
   */
  public get _element(): HTMLElement {
    return this._elementRef.nativeElement;
  }
}

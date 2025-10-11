import { Component, ChangeDetectionStrategy, input, ContentChild, TemplateRef, computed } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ScrollAreaDirective } from '../scroll-area-directive/scroll-area-directive';
import { tailwindUtils } from '@organization/shared-utils';

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
  @ContentChild('header', { static: false })
  public readonly headerTemplate: TemplateRef<void> | null = null;

  @ContentChild('body', { static: false })
  public readonly bodyTemplate: TemplateRef<{ $implicit: T }> | null = null;

  public data = input.required<T[]>();
  public ellipsisAt = input<number>(0);
  public containerClass = input<string>('');
  public tableClass = input<string>('');
  public headerClass = input<string>('');
  public bodyClass = input<string>('');

  public hasEllipsis = computed<boolean>(() => this.ellipsisAt() > 0);

  public mergeClasses = tailwindUtils.merge;
}

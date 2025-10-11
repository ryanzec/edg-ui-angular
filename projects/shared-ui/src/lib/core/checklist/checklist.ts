import { Component, ChangeDetectionStrategy, input, signal, computed } from '@angular/core';
import { Icon } from '../icon/icon';
import { tailwindUtils } from '@organization/shared-utils';

export type ChecklistItemStatus = 'not-started' | 'in-progress' | 'valid' | 'invalid';

type BaseChecklistItemData = {
  id: string;
  label: string;
  status: ChecklistItemStatus;
};

export type ChecklistItemData = BaseChecklistItemData & {
  items?: BaseChecklistItemData[];
};

type ChecklistState = {
  expandedIds: Set<string>;
};

@Component({
  selector: 'org-checklist',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './checklist.html',
  host: {
    dataid: 'checklist',
  },
})
export class Checklist {
  private readonly _state = signal<ChecklistState>({
    expandedIds: new Set<string>(),
  });

  public items = input.required<ChecklistItemData[]>();
  public containerClass = input<string>('');

  public mergeClasses = tailwindUtils.merge;

  public isExpanded = computed<(id: string) => boolean>(() => {
    return (id: string) => this._state().expandedIds.has(id);
  });

  public getTopLevelItemClass = computed(() => {
    return 'flex w-full items-center gap-2 py-1.5 px-1 rounded-sm';
  });

  public hasNestedItems(item: ChecklistItemData): boolean {
    return !!item.items && item.items.length > 0;
  }

  public getNestedItemCount(item: ChecklistItemData): number {
    return item.items?.length ?? 0;
  }

  public toggleExpanded(id: string): void {
    this._state.update((state) => {
      const newExpandedIds = new Set(state.expandedIds);

      if (newExpandedIds.has(id)) {
        newExpandedIds.delete(id);
      } else {
        newExpandedIds.add(id);
      }

      return {
        ...state,
        expandedIds: newExpandedIds,
      };
    });
  }
}

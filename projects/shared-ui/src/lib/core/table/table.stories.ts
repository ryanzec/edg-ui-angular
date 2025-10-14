import type { Meta, StoryObj } from '@storybook/angular';
import { Component, ChangeDetectionStrategy, signal, inject, InjectionToken, computed } from '@angular/core';
import { Table } from './table';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';
import { SortableDirective } from '../sortable-directive/sortable-directive';
import { SortingStore } from '../sorting-store/sorting-store';
import { Pagination } from '../pagination/pagination';
import { PaginationStore } from '../pagination-store/pagination-store';
import { DataSelectionStore } from '../data-selection-store/data-selection-store';
import { Checkbox } from '../checkbox/checkbox';

type User = {
  id: number;
  name: string;
  email: string;
  organizationId: string;
  roles: string;
};

const SAMPLE_USERS: User[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    organizationId: 'ORG-001',
    roles: 'Admin, Editor',
  },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@example.com', organizationId: 'ORG-002', roles: 'Editor' },
  { id: 3, name: 'Charlie Brown', email: 'charlie.brown@example.com', organizationId: 'ORG-001', roles: 'Viewer' },
  { id: 4, name: 'Diana Prince', email: 'diana.prince@example.com', organizationId: 'ORG-003', roles: 'Admin' },
  { id: 5, name: 'Ethan Hunt', email: 'ethan.hunt@example.com', organizationId: 'ORG-002', roles: 'Editor, Viewer' },
  { id: 6, name: 'Fiona Gallagher', email: 'fiona.gallagher@example.com', organizationId: 'ORG-001', roles: 'Viewer' },
  {
    id: 7,
    name: 'George Washington',
    email: 'george.washington@example.com',
    organizationId: 'ORG-004',
    roles: 'Admin',
  },
  { id: 8, name: 'Hannah Montana', email: 'hannah.montana@example.com', organizationId: 'ORG-003', roles: 'Editor' },
  { id: 9, name: 'Isaac Newton', email: 'isaac.newton@example.com', organizationId: 'ORG-002', roles: 'Viewer' },
  {
    id: 10,
    name: 'Julia Roberts',
    email: 'julia.roberts@example.com',
    organizationId: 'ORG-001',
    roles: 'Admin, Editor',
  },
  { id: 11, name: 'Kevin Hart', email: 'kevin.hart@example.com', organizationId: 'ORG-004', roles: 'Editor' },
  { id: 12, name: 'Laura Croft', email: 'laura.croft@example.com', organizationId: 'ORG-003', roles: 'Viewer' },
  { id: 13, name: 'Michael Scott', email: 'michael.scott@example.com', organizationId: 'ORG-002', roles: 'Admin' },
  { id: 14, name: 'Nancy Drew', email: 'nancy.drew@example.com', organizationId: 'ORG-001', roles: 'Editor, Viewer' },
  { id: 15, name: 'Oscar Wilde', email: 'oscar.wilde@example.com', organizationId: 'ORG-004', roles: 'Viewer' },
  { id: 16, name: 'Penny Lane', email: 'penny.lane@example.com', organizationId: 'ORG-003', roles: 'Admin' },
  { id: 17, name: 'Quincy Jones', email: 'quincy.jones@example.com', organizationId: 'ORG-002', roles: 'Editor' },
  { id: 18, name: 'Rachel Green', email: 'rachel.green@example.com', organizationId: 'ORG-001', roles: 'Viewer' },
  {
    id: 19,
    name: 'Steve Rogers',
    email: 'steve.rogers@example.com',
    organizationId: 'ORG-004',
    roles: 'Admin, Editor',
  },
  { id: 20, name: 'Tina Turner', email: 'tina.turner@example.com', organizationId: 'ORG-003', roles: 'Editor' },
];

const USER_SELECTION_STORE_TOKEN = new InjectionToken<DataSelectionStore<User>>('UserSelectionStore');

@Component({
  selector: 'org-basic-table-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Table],
  template: `
    <org-table [data]="users" containerClass="h-[400px]">
      <ng-template #header>
        <tr>
          <th
            class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
          >
            Name
          </th>
          <th
            class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
          >
            Email
          </th>
          <th
            class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
          >
            Organization ID
          </th>
          <th
            class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
          >
            Roles
          </th>
        </tr>
      </ng-template>
      <ng-template #body let-user>
        <tr class="border-b border-table-row-border last:border-b-0 hover:bg-table-row-hover">
          <td class="px-4 py-3 text-sm text-table-text">{{ user.name }}</td>
          <td class="px-4 py-3 text-sm text-table-text">{{ user.email }}</td>
          <td class="px-4 py-3 text-sm text-table-text">{{ user.organizationId }}</td>
          <td class="px-4 py-3 text-sm text-table-text">{{ user.roles }}</td>
        </tr>
      </ng-template>
    </org-table>
  `,
})
class BasicTableDemo {
  protected readonly users = SAMPLE_USERS.slice(0, 10);
}

@Component({
  selector: 'org-sortable-table-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Table, SortableDirective],
  providers: [SortingStore],
  template: `
    <div class="flex flex-col gap-4">
      <div class="text-sm">
        <strong>Sorting:</strong> {{ sortingStore.key() || 'None' }}
        @if (sortingStore.direction()) {
          <span>({{ sortingStore.direction() }})</span>
        }
      </div>
      <org-table [data]="sortedUsers()" containerClass="h-[400px]">
        <ng-template #header>
          <tr>
            <th
              class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              <div [orgSortable]="'name'">Name</div>
            </th>
            <th
              class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              <div [orgSortable]="'email'">Email</div>
            </th>
            <th
              class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              <div [orgSortable]="'organizationId'">Organization ID</div>
            </th>
            <th
              class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Roles
            </th>
          </tr>
        </ng-template>
        <ng-template #body let-user>
          <tr class="border-b border-table-row-border last:border-b-0 hover:bg-table-row-hover">
            <td class="px-4 py-3 text-sm text-table-text">{{ user.name }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.email }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.organizationId }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.roles }}</td>
          </tr>
        </ng-template>
      </org-table>
    </div>
  `,
})
class SortableTableDemo {
  protected readonly sortingStore = inject(SortingStore);
  private readonly _users = signal<User[]>(SAMPLE_USERS.slice(0, 15));

  protected readonly sortedUsers = computed<User[]>(() => {
    const users = [...this._users()];
    const key = this.sortingStore.key();
    const direction = this.sortingStore.direction();

    if (!key || !direction) {
      return users;
    }

    return users.sort((a, b) => {
      const aValue = a[key as keyof User];
      const bValue = b[key as keyof User];

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }

      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }

      return 0;
    });
  });
}

@Component({
  selector: 'org-paginated-table-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Table, Pagination],
  providers: [PaginationStore],
  template: `
    <div class="flex flex-col gap-4">
      <org-table [data]="paginatedUsers()" containerClass="h-[400px]">
        <ng-template #header>
          <tr>
            <th
              class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Name
            </th>
            <th
              class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Email
            </th>
            <th
              class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Organization ID
            </th>
            <th
              class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Roles
            </th>
          </tr>
        </ng-template>
        <ng-template #body let-user>
          <tr class="border-b border-table-row-border last:border-b-0 hover:bg-table-row-hover">
            <td class="px-4 py-3 text-sm text-table-text">{{ user.name }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.email }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.organizationId }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.roles }}</td>
          </tr>
        </ng-template>
      </org-table>
      <org-pagination
        [defaultCurrentPage]="1"
        [defaultTotalItems]="users.length"
        [defaultItemsPerPage]="5"
        [itemsPerPageOptions]="[5, 10, 15]"
        (pageChanged)="handlePageChange($event)"
        (itemsPerPageChanged)="handleItemsPerPageChange($event)"
      />
    </div>
  `,
})
class PaginatedTableDemo {
  private readonly _paginationStore = inject(PaginationStore);

  protected readonly users = SAMPLE_USERS;

  protected readonly paginatedUsers = computed<User[]>(() => {
    const start = this._paginationStore.startIndex();
    const end = this._paginationStore.endIndex();

    return this.users.slice(start, end);
  });

  protected handlePageChange(page: number): void {
    console.log('page changed', page);
  }

  protected handleItemsPerPageChange(itemsPerPage: number): void {
    console.log('items per page changed', itemsPerPage);
  }
}

@Component({
  selector: 'org-selection-table-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Table, Checkbox, Pagination],
  providers: [
    {
      provide: USER_SELECTION_STORE_TOKEN,
      useClass: DataSelectionStore<User>,
    },
    PaginationStore,
  ],
  template: `
    <div class="flex flex-col gap-4">
      <div class="text-sm"><strong>Selected:</strong> {{ selectionStore.selectedCount() }} user(s)</div>
      <org-table [data]="paginatedUsers()" containerClass="h-[400px]">
        <ng-template #header>
          <tr>
            <th
              class="w-[50px] px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              <org-checkbox
                name="select-all"
                value="select-all"
                [checked]="isAllCurrentPageSelected()"
                [indeterminate]="isSomeCurrentPageSelected()"
                (checkedChange)="selectionStore.setMultiple(paginatedUsers(), $event)"
                [useValidation]="false"
              />
            </th>
            <th
              class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Name
            </th>
            <th
              class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Email
            </th>
            <th
              class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Organization ID
            </th>
            <th
              class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Roles
            </th>
          </tr>
        </ng-template>
        <ng-template #body let-user>
          <tr class="border-b border-table-row-border last:border-b-0 hover:bg-table-row-hover">
            <td class="px-4 py-3 text-sm text-table-text">
              <org-checkbox
                [name]="'select-' + user.id"
                [value]="user.id.toString()"
                [checked]="selectionStore.isSelected(user)"
                (checkedChange)="selectionStore.set(user, $event)"
                [useValidation]="false"
              />
            </td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.name }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.email }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.organizationId }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.roles }}</td>
          </tr>
        </ng-template>
      </org-table>
      <org-pagination
        [defaultCurrentPage]="1"
        [defaultTotalItems]="users.length"
        [defaultItemsPerPage]="5"
        [itemsPerPageOptions]="[5, 10, 15]"
        (pageChanged)="handlePageChange($event)"
      />
    </div>
  `,
})
class SelectionTableDemo {
  private readonly _paginationStore = inject(PaginationStore);
  protected readonly selectionStore = inject(USER_SELECTION_STORE_TOKEN);

  protected readonly users = SAMPLE_USERS;

  protected readonly paginatedUsers = computed<User[]>(() => {
    const start = this._paginationStore.startIndex();
    const end = this._paginationStore.endIndex();

    return this.users.slice(start, end);
  });

  protected readonly isAllCurrentPageSelected = computed<boolean>(() => {
    return this.selectionStore.areAllSelected(this.paginatedUsers());
  });

  protected readonly isSomeCurrentPageSelected = computed<boolean>(() => {
    return this.selectionStore.areSomeSelected(this.paginatedUsers());
  });

  protected handlePageChange(page: number): void {
    console.log('page changed', page);
  }
}

@Component({
  selector: 'org-full-featured-table-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Table, Checkbox, SortableDirective, Pagination],
  providers: [
    {
      provide: USER_SELECTION_STORE_TOKEN,
      useClass: DataSelectionStore<User>,
    },
    SortingStore,
    PaginationStore,
  ],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex justify-between items-center text-sm">
        <div><strong>Selected:</strong> {{ selectionStore.selectedCount() }} user(s)</div>
        <div>
          <strong>Sorting:</strong> {{ sortingStore.key() || 'None' }}
          @if (sortingStore.direction()) {
            <span>({{ sortingStore.direction() }})</span>
          }
        </div>
      </div>
      <org-table [data]="displayUsers()" containerClass="h-[400px]">
        <ng-template #header>
          <tr>
            <th
              class="w-[50px] px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              <org-checkbox
                name="select-all"
                value="select-all"
                [checked]="isAllCurrentPageSelected()"
                [indeterminate]="isSomeCurrentPageSelected()"
                (checkedChange)="selectionStore.setMultiple(displayUsers(), $event)"
                [useValidation]="false"
              />
            </th>
            <th
              class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              <div [orgSortable]="'name'">Name</div>
            </th>
            <th
              class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              <div [orgSortable]="'email'">Email</div>
            </th>
            <th
              class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              <div [orgSortable]="'organizationId'">Organization ID</div>
            </th>
            <th
              class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Roles
            </th>
          </tr>
        </ng-template>
        <ng-template #body let-user>
          <tr class="border-b border-table-row-border last:border-b-0 hover:bg-table-row-hover">
            <td class="px-4 py-3 text-sm text-table-text">
              <org-checkbox
                [name]="'select-' + user.id"
                [value]="user.id.toString()"
                [checked]="selectionStore.isSelected(user)"
                (checkedChange)="selectionStore.set(user, $event)"
                [useValidation]="false"
              />
            </td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.name }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.email }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.organizationId }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.roles }}</td>
          </tr>
        </ng-template>
      </org-table>
      <org-pagination
        [defaultCurrentPage]="1"
        [defaultTotalItems]="users.length"
        [defaultItemsPerPage]="5"
        [itemsPerPageOptions]="[5, 10, 15]"
        (pageChanged)="handlePageChange($event)"
      />
    </div>
  `,
})
class FullFeaturedTableDemo {
  private readonly _paginationStore = inject(PaginationStore);
  protected readonly sortingStore = inject(SortingStore);
  protected readonly selectionStore = inject(USER_SELECTION_STORE_TOKEN);

  protected readonly users = SAMPLE_USERS;

  protected readonly sortedUsers = computed<User[]>(() => {
    const users = [...this.users];
    const key = this.sortingStore.key();
    const direction = this.sortingStore.direction();

    if (!key || !direction) {
      return users;
    }

    return users.sort((a, b) => {
      const aValue = a[key as keyof User];
      const bValue = b[key as keyof User];

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }

      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }

      return 0;
    });
  });

  protected readonly displayUsers = computed<User[]>(() => {
    const sorted = this.sortedUsers();
    const start = this._paginationStore.startIndex();
    const end = this._paginationStore.endIndex();

    return sorted.slice(start, end);
  });

  protected readonly isAllCurrentPageSelected = computed<boolean>(() => {
    return this.selectionStore.areAllSelected(this.displayUsers());
  });

  protected readonly isSomeCurrentPageSelected = computed<boolean>(() => {
    return this.selectionStore.areSomeSelected(this.displayUsers());
  });

  protected handlePageChange(page: number): void {
    console.log('page changed', page);
  }
}

@Component({
  selector: 'org-ellipsis-table-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Table],
  template: `
    <div class="flex flex-col gap-4">
      <div class="text-sm">This table shows ellipsis for content that exceeds 2 lines in cells.</div>
      <org-table [data]="users" [ellipsisAt]="2" containerClass="h-[400px]">
        <ng-template #header>
          <tr>
            <th
              class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Name
            </th>
            <th
              class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Email
            </th>
            <th
              class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Long Description
            </th>
          </tr>
        </ng-template>
        <ng-template #body let-user>
          <tr class="border-b border-table-row-border last:border-b-0 hover:bg-table-row-hover">
            <td class="px-4 py-3 text-sm text-table-text org-table-ellipsis">{{ user.name }}</td>
            <td class="px-4 py-3 text-sm text-table-text org-table-ellipsis">{{ user.email }}</td>
            <td class="px-4 py-3 text-sm text-table-text org-table-ellipsis">{{ user.description }}</td>
          </tr>
        </ng-template>
      </org-table>
    </div>
  `,
})
class EllipsisTableDemo {
  protected readonly users = SAMPLE_USERS.slice(0, 10).map((user) => ({
    ...user,
    description: 'This is a very long description that will be truncated with ellipsis after two lines. '.repeat(3),
  }));
}

@Component({
  selector: 'org-dynamic-width-table-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Table],
  template: `
    <div class="flex flex-col gap-4">
      <div class="text-sm">This table demonstrates dynamic column widths with fixed and flexible columns.</div>
      <org-table [data]="users" containerClass="h-[400px]">
        <ng-template #header>
          <tr>
            <th
              class="w-[50px] px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              ID
            </th>
            <th
              class="w-[30%] px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Name
            </th>
            <th
              class="w-[40%] px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Email
            </th>
            <th
              class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Organization ID
            </th>
            <th
              class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Roles
            </th>
          </tr>
        </ng-template>
        <ng-template #body let-user>
          <tr class="border-b border-table-row-border last:border-b-0 hover:bg-table-row-hover">
            <td class="px-4 py-3 text-sm text-table-text">{{ user.id }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.name }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.email }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.organizationId }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.roles }}</td>
          </tr>
        </ng-template>
      </org-table>
    </div>
  `,
})
class DynamicWidthTableDemo {
  protected readonly users = SAMPLE_USERS.slice(0, 10);
}

@Component({
  selector: 'org-scrolling-table-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Table],
  template: `
    <div class="flex flex-col gap-4">
      <div class="text-sm">
        This table demonstrates both vertical and horizontal scrolling with many rows and columns.
      </div>
      <org-table [data]="users" containerClass="h-[400px] max-w-[800px]">
        <ng-template #header>
          <tr>
            <th
              class="min-w-[80px] px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              ID
            </th>
            <th
              class="min-w-[200px] px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Name
            </th>
            <th
              class="min-w-[250px] px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Email
            </th>
            <th
              class="min-w-[180px] px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Organization ID
            </th>
            <th
              class="min-w-[200px] px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Roles
            </th>
            <th
              class="min-w-[150px] px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Department
            </th>
            <th
              class="min-w-[150px] px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Location
            </th>
            <th
              class="min-w-[120px] px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10"
            >
              Status
            </th>
          </tr>
        </ng-template>
        <ng-template #body let-user>
          <tr class="border-b border-table-row-border last:border-b-0 hover:bg-table-row-hover">
            <td class="px-4 py-3 text-sm text-table-text">{{ user.id }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.name }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.email }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.organizationId }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.roles }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.department }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.location }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.status }}</td>
          </tr>
        </ng-template>
      </org-table>
    </div>
  `,
})
class ScrollingTableDemo {
  protected readonly users = SAMPLE_USERS.map((user) => ({
    ...user,
    department: ['Engineering', 'Sales', 'Marketing', 'Support', 'HR'][user.id % 5],
    location: ['New York', 'San Francisco', 'London', 'Tokyo', 'Sydney'][user.id % 5],
    status: ['Active', 'Inactive', 'Pending'][user.id % 3],
  }));
}

const meta: Meta<Table> = {
  title: 'Core/Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Table Component

  A flexible, medium-complexity table component with sorting, pagination, selection, and scrolling support.

  ### Features
  - Template-based header and body rendering
  - Horizontal and vertical scrolling support
  - Dynamic column widths (fixed and percentage-based)
  - Row selection with persistence across pages
  - Sortable columns
  - Pagination support
  - Text ellipsis for long content
  - Sticky header
  - Hover effects on rows
  - Light and dark mode support

  ### Usage Example
  \`\`\`html
  <org-table [data]="users" containerClass="h-[400px]">
    <ng-template #header>
      <tr>
        <th class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10">
          Name
        </th>
        <th class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10">
          Email
        </th>
        <th class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10">
          Organization ID
        </th>
        <th class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10">
          Roles
        </th>
      </tr>
    </ng-template>
    <ng-template #body let-user>
      <tr class="border-b border-table-row-border last:border-b-0 hover:bg-table-row-hover">
        <td class="px-4 py-3 text-sm text-table-text">{{ user.name }}</td>
        <td class="px-4 py-3 text-sm text-table-text">{{ user.email }}</td>
        <td class="px-4 py-3 text-sm text-table-text">{{ user.organizationId }}</td>
        <td class="px-4 py-3 text-sm text-table-text">{{ user.roles }}</td>
      </tr>
    </ng-template>
  </org-table>
  \`\`\`

  ### Advanced Features
  - **Sorting**: Use \`orgSortable\` directive on table headers
  - **Pagination**: Integrate with \`org-pagination\` component
  - **Selection**: Use \`DataSelectionStore\` service for row selection
  - **Ellipsis**: Apply \`org-table-ellipsis\` class and set \`ellipsisAt\` input
  - **Dynamic Widths**: Use CSS classes like \`w-[50px]\` or \`w-[30%]\` on table headers
</div>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<Table>;

export const Default: Story = {
  args: {
    data: SAMPLE_USERS.slice(0, 5),
    ellipsisAt: 0,
    containerClass: '',
    tableClass: '',
    headerClass: '',
    bodyClass: '',
  },
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of data to display in the table',
    },
    ellipsisAt: {
      control: 'number',
      description: 'Number of lines before text is truncated with ellipsis (0 = no ellipsis)',
    },
    containerClass: {
      control: 'text',
      description: 'Additional CSS classes for the container',
    },
    tableClass: {
      control: 'text',
      description: 'Additional CSS classes for the table element',
    },
    headerClass: {
      control: 'text',
      description: 'Additional CSS classes for the header',
    },
    bodyClass: {
      control: 'text',
      description: 'Additional CSS classes for the body',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <org-table
        [data]="data"
        [ellipsisAt]="ellipsisAt"
        [containerClass]="containerClass"
        [tableClass]="tableClass"
        [headerClass]="headerClass"
        [bodyClass]="bodyClass"
        containerClass="h-[400px]"
      >
        <ng-template #header>
          <tr>
            <th class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10">Name</th>
            <th class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10">Email</th>
            <th class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10">Organization ID</th>
            <th class="px-4 py-3 text-left font-semibold text-sm text-table-header-text bg-table-header-background sticky top-0 z-10">Roles</th>
          </tr>
        </ng-template>
        <ng-template #body let-user>
          <tr class="border-b border-table-row-border last:border-b-0 hover:bg-table-row-hover">
            <td class="px-4 py-3 text-sm text-table-text">{{ user.name }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.email }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.organizationId }}</td>
            <td class="px-4 py-3 text-sm text-table-text">{{ user.roles }}</td>
          </tr>
        </ng-template>
      </org-table>
    `,
    moduleMetadata: {
      imports: [Table],
    },
  }),
};

export const BasicTable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic table with scrollable content and sticky header.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Basic Table"
        currentState="Displaying user data with scrolling support"
      >
        <org-storybook-example-container-section label="Basic Implementation">
          <org-basic-table-demo />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>Header remains sticky when scrolling vertically</li>
          <li>Horizontal scrolling is supported for wide content</li>
          <li>Rows have hover effects for better UX</li>
          <li>Table takes full width of container</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [BasicTableDemo, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const WithSorting: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Table with sortable columns using the sortable directive.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Table with Sorting"
        currentState="Click column headers to sort (Name, Email, Organization ID are sortable)"
      >
        <org-storybook-example-container-section label="Sortable Columns">
          <org-sortable-table-demo />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>Click on sortable headers to toggle sort direction (asc → desc → none)</li>
          <li>Visual indicator shows current sort state with icons</li>
          <li>Only one column can be sorted at a time</li>
          <li>Sorting is maintained until changed or cleared</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [SortableTableDemo, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const WithPagination: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Table with pagination controls to navigate through large datasets.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Table with Pagination"
        currentState="Navigate through pages using pagination controls"
      >
        <org-storybook-example-container-section label="Paginated Table">
          <org-paginated-table-demo />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>Pagination controls allow navigation through data</li>
          <li>Items per page can be adjusted dynamically</li>
          <li>Current page and total items are displayed</li>
          <li>Previous/Next buttons are disabled at boundaries</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [PaginatedTableDemo, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const WithSelection: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Table with row selection that persists across pagination.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Table with Selection"
        currentState="Select rows using checkboxes - selections persist when changing pages"
      >
        <org-storybook-example-container-section label="Selectable Rows">
          <org-selection-table-demo />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>Checkboxes allow individual row selection</li>
          <li>Header checkbox selects/deselects all rows on current page</li>
          <li>Header checkbox shows indeterminate state when some rows are selected</li>
          <li>Selections persist when navigating between pages</li>
          <li>Selected count is displayed and updates in real-time</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [SelectionTableDemo, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const FullFeatured: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Table combining all features: sorting, pagination, and selection.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Full-Featured Table"
        currentState="Complete table with sorting, pagination, and selection working together"
      >
        <org-storybook-example-container-section label="All Features Combined">
          <org-full-featured-table-demo />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>All features work together seamlessly</li>
          <li>Sorting applies to entire dataset, not just current page</li>
          <li>Selections persist when sorting or paginating</li>
          <li>Visual feedback for all interactive elements</li>
          <li>Header remains sticky during scrolling</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [FullFeaturedTableDemo, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const WithEllipsis: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Table with text ellipsis for cells with long content.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Table with Ellipsis"
        currentState="Long content is truncated with ellipsis after 2 lines"
      >
        <org-storybook-example-container-section label="Ellipsis Support">
          <org-ellipsis-table-demo />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>Apply <code>org-table-ellipsis</code> class to cells that should truncate</li>
          <li>Set <code>ellipsisAt</code> input to control number of lines before truncation</li>
          <li>Ellipsis preserves layout consistency</li>
          <li>Works with both horizontal and vertical scrolling</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [EllipsisTableDemo, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const DynamicWidths: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Table with dynamic column widths using fixed and percentage-based sizing.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Dynamic Column Widths"
        currentState="Columns use a mix of fixed widths, percentages, and auto-sizing"
      >
        <org-storybook-example-container-section label="Mixed Width Columns">
          <org-dynamic-width-table-demo />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>ID column has fixed width of 50px</li>
          <li>Name column takes 30% of available space</li>
          <li>Email column takes 40% of available space</li>
          <li>Remaining columns share the rest of the space</li>
          <li>Horizontal scrolling activates when content exceeds container</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [DynamicWidthTableDemo, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const VerticalAndHorizontalScrolling: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Table demonstrating both vertical and horizontal scrolling with many rows and columns.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Vertical and Horizontal Scrolling"
        currentState="Table with many rows and wide columns enabling both scroll directions"
      >
        <org-storybook-example-container-section label="Bidirectional Scrolling">
          <org-scrolling-table-demo />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>Container has fixed height (400px) and max width (800px)</li>
          <li>Vertical scrolling enabled with 20 rows of data</li>
          <li>Horizontal scrolling enabled with 8 columns and minimum widths</li>
          <li>Header remains sticky when scrolling vertically</li>
          <li>Smooth scrolling experience in both directions</li>
          <li>Scroll indicators appear when content overflows</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [ScrollingTableDemo, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

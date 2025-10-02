import type { Meta, StoryObj } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { Pagination } from './pagination';
import { PaginationRegistry } from './pagination';

const meta: Meta<Pagination> = {
  title: 'Core/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultCurrentPage: {
      control: 'number',
    },
    defaultTotalItems: {
      control: 'number',
    },
    defaultItemsPerPage: {
      control: 'select',
      options: [5, 10, 20, 50],
    },
    maximumVisiblePages: {
      control: 'number',
    },
    itemsPerPageOptions: {
      control: 'object',
    },
    disabled: {
      control: 'boolean',
    },
    registryKey: {
      control: 'text',
    },
  },
  args: {
    defaultCurrentPage: 1,
    defaultTotalItems: 100,
    defaultItemsPerPage: 10,
    maximumVisiblePages: 7,
    itemsPerPageOptions: [5, 10, 20, 50],
    disabled: false,
    registryKey: null,
  },
};

export default meta;
type Story = StoryObj<Pagination>;

// Basic pagination variants
export const Default: Story = {
  args: {
    defaultTotalItems: 100,
    defaultItemsPerPage: 10,
  },
  render: (args) => ({
    props: args,
    template: `
      <org-pagination
        [defaultCurrentPage]="defaultCurrentPage"
        [defaultTotalItems]="defaultTotalItems"
        [defaultItemsPerPage]="defaultItemsPerPage"
        [maximumVisiblePages]="maximumVisiblePages"
        [itemsPerPageOptions]="itemsPerPageOptions"
        [disabled]="disabled"
        [registryKey]="registryKey"
      />
    `,
  }),
};

export const SmallDataset: Story = {
  args: {
    defaultTotalItems: 25,
    defaultItemsPerPage: 10,
  },
  render: (args) => ({
    props: args,
    template: `
      <org-pagination
        [defaultCurrentPage]="defaultCurrentPage"
        [defaultTotalItems]="defaultTotalItems"
        [defaultItemsPerPage]="defaultItemsPerPage"
        [maximumVisiblePages]="maximumVisiblePages"
        [itemsPerPageOptions]="itemsPerPageOptions"
        [disabled]="disabled"
        [registryKey]="registryKey"
      />
    `,
  }),
};

export const LargeDataset: Story = {
  args: {
    defaultTotalItems: 1000,
    defaultItemsPerPage: 20,
    defaultCurrentPage: 25,
  },
  render: (args) => ({
    props: args,
    template: `
      <org-pagination
        [defaultCurrentPage]="defaultCurrentPage"
        [defaultTotalItems]="defaultTotalItems"
        [defaultItemsPerPage]="defaultItemsPerPage"
        [maximumVisiblePages]="maximumVisiblePages"
        [itemsPerPageOptions]="itemsPerPageOptions"
        [disabled]="disabled"
        [registryKey]="registryKey"
      />
    `,
  }),
};

export const FirstPage: Story = {
  args: {
    defaultTotalItems: 500,
    defaultItemsPerPage: 10,
    defaultCurrentPage: 1,
  },
  render: (args) => ({
    props: args,
    template: `
      <org-pagination
        [defaultCurrentPage]="defaultCurrentPage"
        [defaultTotalItems]="defaultTotalItems"
        [defaultItemsPerPage]="defaultItemsPerPage"
        [maximumVisiblePages]="maximumVisiblePages"
        [itemsPerPageOptions]="itemsPerPageOptions"
        [disabled]="disabled"
        [registryKey]="registryKey"
      />
    `,
  }),
};

export const LastPage: Story = {
  args: {
    defaultTotalItems: 500,
    defaultItemsPerPage: 10,
    defaultCurrentPage: 50,
  },
  render: (args) => ({
    props: args,
    template: `
      <org-pagination
        [defaultCurrentPage]="defaultCurrentPage"
        [defaultTotalItems]="defaultTotalItems"
        [defaultItemsPerPage]="defaultItemsPerPage"
        [maximumVisiblePages]="maximumVisiblePages"
        [itemsPerPageOptions]="itemsPerPageOptions"
        [disabled]="disabled"
        [registryKey]="registryKey"
      />
    `,
  }),
};

export const MiddlePage: Story = {
  args: {
    defaultTotalItems: 500,
    defaultItemsPerPage: 10,
    defaultCurrentPage: 25,
  },
  render: (args) => ({
    props: args,
    template: `
      <org-pagination
        [defaultCurrentPage]="defaultCurrentPage"
        [defaultTotalItems]="defaultTotalItems"
        [defaultItemsPerPage]="defaultItemsPerPage"
        [maximumVisiblePages]="maximumVisiblePages"
        [itemsPerPageOptions]="itemsPerPageOptions"
        [disabled]="disabled"
        [registryKey]="registryKey"
      />
    `,
  }),
};

export const FewVisiblePages: Story = {
  args: {
    defaultTotalItems: 500,
    defaultItemsPerPage: 10,
    defaultCurrentPage: 25,
    maximumVisiblePages: 5,
  },
  render: (args) => ({
    props: args,
    template: `
      <org-pagination
        [defaultCurrentPage]="defaultCurrentPage"
        [defaultTotalItems]="defaultTotalItems"
        [defaultItemsPerPage]="defaultItemsPerPage"
        [maximumVisiblePages]="maximumVisiblePages"
        [itemsPerPageOptions]="itemsPerPageOptions"
        [disabled]="disabled"
        [registryKey]="registryKey"
      />
    `,
  }),
};

export const ManyVisiblePages: Story = {
  args: {
    defaultTotalItems: 500,
    defaultItemsPerPage: 10,
    defaultCurrentPage: 25,
    maximumVisiblePages: 11,
  },
  render: (args) => ({
    props: args,
    template: `
      <org-pagination
        [defaultCurrentPage]="defaultCurrentPage"
        [defaultTotalItems]="defaultTotalItems"
        [defaultItemsPerPage]="defaultItemsPerPage"
        [maximumVisiblePages]="maximumVisiblePages"
        [itemsPerPageOptions]="itemsPerPageOptions"
        [disabled]="disabled"
        [registryKey]="registryKey"
      />
    `,
  }),
};

export const CustomItemsPerPageOptions: Story = {
  args: {
    defaultTotalItems: 300,
    defaultItemsPerPage: 25,
    itemsPerPageOptions: [10, 25, 50, 100],
  },
  render: (args) => ({
    props: args,
    template: `
      <org-pagination
        [defaultCurrentPage]="defaultCurrentPage"
        [defaultTotalItems]="defaultTotalItems"
        [defaultItemsPerPage]="defaultItemsPerPage"
        [maximumVisiblePages]="maximumVisiblePages"
        [itemsPerPageOptions]="itemsPerPageOptions"
        [disabled]="disabled"
        [registryKey]="registryKey"
      />
    `,
  }),
};

export const Disabled: Story = {
  args: {
    defaultTotalItems: 100,
    defaultItemsPerPage: 10,
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <org-pagination
        [defaultCurrentPage]="defaultCurrentPage"
        [defaultTotalItems]="defaultTotalItems"
        [defaultItemsPerPage]="defaultItemsPerPage"
        [maximumVisiblePages]="maximumVisiblePages"
        [itemsPerPageOptions]="itemsPerPageOptions"
        [disabled]="disabled"
        [registryKey]="registryKey"
      />
    `,
  }),
};

export const WithRegistry: Story = {
  args: {
    defaultTotalItems: 100,
    defaultItemsPerPage: 10,
    registryKey: 'example-pagination',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-4">
        <org-pagination
          [defaultCurrentPage]="defaultCurrentPage"
          [defaultTotalItems]="defaultTotalItems"
          [defaultItemsPerPage]="defaultItemsPerPage"
          [maximumVisiblePages]="maximumVisiblePages"
          [itemsPerPageOptions]="itemsPerPageOptions"
          [disabled]="disabled"
          [registryKey]="registryKey"
        />
        <p class="text-sm text-text-subtle">
          This pagination is registered with key: "{{ registryKey }}"
        </p>
      </div>
    `,
    providers: [PaginationRegistry],
  }),
};

// Interactive example showing pagination behavior
@Component({
  selector: 'org-pagination-interactive-story',
  template: `
    <div class="space-y-6 p-4 max-w-4xl">
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Interactive Pagination Example</h3>
        <p class="text-sm text-text-subtle">This example shows how the pagination component works with dynamic data.</p>
      </div>

      <!-- Controls -->
      <div class="flex flex-wrap gap-4 p-4 bg-secondary-background-subtle rounded-lg">
        <label class="flex items-center gap-2">
          <span class="text-sm font-medium">Total Items:</span>
          <input
            type="number"
            [value]="defaultTotalItems()"
            (input)="setTotalItems(+$any($event.target).value)"
            class="w-20 px-2 py-1 text-sm border border-border rounded"
            min="0"
            max="10000"
          />
        </label>

        <label class="flex items-center gap-2">
          <span class="text-sm font-medium">Max Visible Pages:</span>
          <input
            type="number"
            [value]="maximumVisiblePages()"
            (input)="setMaxVisiblePages(+$any($event.target).value)"
            class="w-16 px-2 py-1 text-sm border border-border rounded"
            min="3"
            max="15"
          />
        </label>

        <label class="flex items-center gap-2">
          <span class="text-sm font-medium">Disabled:</span>
          <input
            type="checkbox"
            [checked]="disabled()"
            (change)="setDisabled($any($event.target).checked)"
            class="rounded"
          />
        </label>
      </div>

      <!-- Pagination Component -->
      <org-pagination
        [defaultTotalItems]="defaultTotalItems()"
        [maximumVisiblePages]="maximumVisiblePages()"
        [disabled]="disabled()"
        (pageChanged)="onPageChanged($event)"
        (itemsPerPageChanged)="onItemsPerPageChanged($event)"
      />

      <!-- Event Log -->
      <div class="space-y-2">
        <h4 class="font-medium">Event Log:</h4>
        <div class="p-3 bg-secondary-background-subtle rounded text-sm font-mono max-h-32 overflow-y-auto">
          @for (event of events(); track $index) {
            <div>{{ event }}</div>
          }
          @if (events().length === 0) {
            <div class="text-text-subtle">No events yet...</div>
          }
        </div>
      </div>
    </div>
  `,
  imports: [Pagination],
})
class PaginationInteractiveStory {
  public defaultTotalItems = signal(247);
  public maximumVisiblePages = signal(7);
  public disabled = signal(false);
  public events = signal<string[]>([]);

  public setTotalItems(value: number): void {
    this.defaultTotalItems.set(Math.max(0, value));
    this.addEvent(`Total items changed to: ${value}`);
  }

  public setMaxVisiblePages(value: number): void {
    this.maximumVisiblePages.set(Math.max(3, value));
    this.addEvent(`Max visible pages changed to: ${value}`);
  }

  public setDisabled(value: boolean): void {
    this.disabled.set(value);
    this.addEvent(`Disabled state changed to: ${value}`);
  }

  public onPageChanged(page: number): void {
    this.addEvent(`Page changed to: ${page}`);
  }

  public onItemsPerPageChanged(itemsPerPage: number): void {
    this.addEvent(`Items per page changed to: ${itemsPerPage}`);
  }

  private addEvent(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.events.update((events) => [`[${timestamp}] ${message}`, ...events.slice(0, 9)]);
  }
}

export const Interactive: Story = {
  render: () => ({
    template: '<org-pagination-interactive-story></org-pagination-interactive-story>',
    moduleMetadata: {
      imports: [PaginationInteractiveStory],
    },
  }),
};

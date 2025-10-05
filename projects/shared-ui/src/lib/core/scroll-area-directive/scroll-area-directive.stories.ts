import type { Meta, StoryObj } from '@storybook/angular';
import { ScrollAreaDirective, scrollAreaDirections } from './scroll-area-directive';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';

const meta: Meta<ScrollAreaDirective> = {
  title: 'Core/Directives/Scroll Area',
  component: ScrollAreaDirective,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Scroll Area Directive

  A directive that applies modern, minimalist scrollbar styling using native CSS techniques.

  ### Features
  - Supports vertical, horizontal, or both scroll directions
  - Optional hover-only visibility for scrollbars
  - Clean, modern, minimalist design
  - Uses native CSS scrollbar styling (scrollbar-width, scrollbar-color, ::-webkit-scrollbar)
  - Smooth transitions and hover effects

  ### Direction Options
  - **vertical** (default): Only y-axis scrolling enabled
  - **horizontal**: Only x-axis scrolling enabled
  - **both**: Both x and y-axis scrolling enabled

  ### Visibility Options
  - **Always visible** (default): Scrollbars shown when content is scrollable
  - **Hover only**: Scrollbars only appear when hovering over the element

  ### Usage Examples
  \`\`\`html
  <!-- Vertical scrolling (default) -->
  <div orgScrollArea class="h-[200px]">
    <!-- Long content here -->
  </div>

  <!-- Horizontal scrolling -->
  <div orgScrollArea="horizontal" class="w-[300px]">
    <!-- Wide content here -->
  </div>

  <!-- Both directions -->
  <div orgScrollArea="both" class="h-[200px] w-[300px]">
    <!-- Large content here -->
  </div>

  <!-- Hover-only scrollbars -->
  <div orgScrollArea [scrollAreaOnlyShowOnHover]="true" class="h-[200px]">
    <!-- Content here -->
  </div>
  \`\`\`
</div>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ScrollAreaDirective>;

export const Default: Story = {
  args: {
    scrollAreaDirection: 'vertical',
    scrollAreaOnlyShowOnHover: false,
  },
  argTypes: {
    scrollAreaDirection: {
      control: 'select',
      options: scrollAreaDirections,
      description: 'Controls which scroll directions are enabled',
    },
    scrollAreaOnlyShowOnHover: {
      control: 'boolean',
      description: 'Controls whether scrollbars only show on hover',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default scroll area with vertical scrolling. Use the controls below to interact with the directive.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div
        orgScrollArea
        [scrollAreaDirection]="scrollAreaDirection"
        [scrollAreaOnlyShowOnHover]="scrollAreaOnlyShowOnHover"
        class="h-[200px] rounded-lg border border-border p-4"
      >
        <p>This is a scrollable area with custom scrollbar styling.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
        <p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.</p>
        <p>Eos qui ratione voluptatem sequi nesciunt neque porro quisquam est qui dolorem ipsum quia dolor sit amet.</p>
        <p>Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
        <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.</p>
        <p>Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</p>
        <p>Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus.</p>
        <p>Qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
        <p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
      </div>
    `,
    moduleMetadata: {
      imports: [ScrollAreaDirective],
    },
  }),
};

export const Directions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all scroll direction options.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Scroll Direction Variants"
        currentState="Comparing vertical, horizontal, and both directions"
      >
        <org-storybook-example-container-section label="Vertical (default)">
          <div
            orgScrollArea
            scrollAreaDirection="vertical"
            class="h-[150px] rounded-lg border border-border p-4"
          >
            <p>Vertical scrolling only.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
            <p>Excepteur sint occaecat cupidatat non proident.</p>
            <p>Sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
            <p>Accusantium doloremque laudantium, totam rem aperiam.</p>
            <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto.</p>
            <p>Beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem.</p>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Horizontal">
          <div
            orgScrollArea
            scrollAreaDirection="horizontal"
            class="w-[300px] whitespace-nowrap rounded-lg border border-border p-4"
          >
            <span>Horizontal scrolling only. This is a very long line of text that will require horizontal scrolling to see all of it. Keep reading to see more content that extends beyond the visible area.</span>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Both">
          <div
            orgScrollArea
            scrollAreaDirection="both"
            class="h-[150px] w-[300px] rounded-lg border border-border p-4"
          >
            <p class="whitespace-nowrap">Both vertical and horizontal scrolling enabled. This line is very long and will require horizontal scrolling to see all the content that extends beyond the visible area.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
            <p>Excepteur sint occaecat cupidatat non proident.</p>
            <p>Sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
            <p>Accusantium doloremque laudantium, totam rem aperiam.</p>
            <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto.</p>
            <p>Beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem.</p>
          </div>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>vertical</strong>: Only y-axis scrolling, x-axis hidden</li>
          <li><strong>horizontal</strong>: Only x-axis scrolling, y-axis hidden</li>
          <li><strong>both</strong>: Both axes can scroll independently</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [ScrollAreaDirective, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const VisibilityModes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of always visible vs hover-only scrollbar visibility.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Scrollbar Visibility Modes"
        currentState="Comparing always visible and hover-only modes"
      >
        <org-storybook-example-container-section label="Always Visible (default)">
          <div
            orgScrollArea
            scrollAreaDirection="vertical"
            [scrollAreaOnlyShowOnHover]="false"
            class="h-[150px] rounded-lg border border-border p-4"
          >
            <p>Scrollbar is always visible when content is scrollable.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
            <p>Excepteur sint occaecat cupidatat non proident.</p>
            <p>Sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
            <p>Accusantium doloremque laudantium, totam rem aperiam.</p>
            <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto.</p>
            <p>Beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem.</p>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Hover Only">
          <div
            orgScrollArea
            scrollAreaDirection="vertical"
            [scrollAreaOnlyShowOnHover]="true"
            class="h-[150px] rounded-lg border border-border p-4"
          >
            <p>Scrollbar only appears when hovering over this area.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
            <p>Excepteur sint occaecat cupidatat non proident.</p>
            <p>Sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
            <p>Accusantium doloremque laudantium, totam rem aperiam.</p>
            <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto.</p>
            <p>Beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem.</p>
          </div>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Always visible</strong>: Scrollbar shown whenever content is scrollable</li>
          <li><strong>Hover only</strong>: Scrollbar hidden by default, appears on mouse hover</li>
          <li>Both modes use smooth transitions for a polished experience</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [ScrollAreaDirective, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const PracticalExamples: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples showing common use cases for the scroll area directive.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Practical Use Cases"
        currentState="Real-world scroll area examples"
      >
        <org-storybook-example-container-section label="Sidebar Navigation">
          <div
            orgScrollArea
            scrollAreaDirection="vertical"
            [scrollAreaOnlyShowOnHover]="true"
            class="h-[200px] w-[250px] rounded-lg border border-border bg-background-subtle p-4"
          >
            <div class="flex flex-col gap-2">
              <a href="#" class="rounded bg-background p-2">Dashboard</a>
              <a href="#" class="rounded bg-background p-2">Projects</a>
              <a href="#" class="rounded bg-background p-2">Tasks</a>
              <a href="#" class="rounded bg-background p-2">Calendar</a>
              <a href="#" class="rounded bg-background p-2">Reports</a>
              <a href="#" class="rounded bg-background p-2">Analytics</a>
              <a href="#" class="rounded bg-background p-2">Settings</a>
              <a href="#" class="rounded bg-background p-2">Team</a>
              <a href="#" class="rounded bg-background p-2">Integrations</a>
              <a href="#" class="rounded bg-background p-2">Help</a>
            </div>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Code Block">
          <div
            orgScrollArea
            scrollAreaDirection="both"
            class="h-[150px] rounded-lg border border-border bg-[#1e293b] p-4 font-mono text-sm text-[#e2e8f0]"
          >
            <pre class="m-0 whitespace-pre">function calculateTotal(items) {{ '{' }}
  return items.reduce((sum, item) => {{ '{' }}
    return sum + (item.price * item.quantity);
  {{ '}' }}, 0);
{{ '}' }}

const cart = [
  {{ '{' }} name: 'Product A', price: 29.99, quantity: 2 {{ '}' }},
  {{ '{' }} name: 'Product B', price: 49.99, quantity: 1 {{ '}' }},
  {{ '{' }} name: 'Product C', price: 19.99, quantity: 3 {{ '}' }},
];

const total = calculateTotal(cart);
console.log('Total:', total);</pre>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Data Table">
          <div
            orgScrollArea
            scrollAreaDirection="both"
            class="h-[300px] max-w-[400px] rounded-lg border border-border p-4"
          >
            <table class="w-full min-w-[600px] border-collapse">
              <thead>
                <tr class="border-b-2 border-border">
                  <th class="p-2 text-left">ID</th>
                  <th class="p-2 text-left">Name</th>
                  <th class="p-2 text-left">Email</th>
                  <th class="p-2 text-left">Role</th>
                  <th class="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-border">
                  <td class="p-2">001</td>
                  <td class="p-2">John Doe</td>
                  <td class="p-2">john@example.com</td>
                  <td class="p-2">Admin</td>
                  <td class="p-2">Active</td>
                </tr>
                <tr class="border-b border-border">
                  <td class="p-2">002</td>
                  <td class="p-2">Jane Smith</td>
                  <td class="p-2">jane@example.com</td>
                  <td class="p-2">User</td>
                  <td class="p-2">Active</td>
                </tr>
                <tr class="border-b border-border">
                  <td class="p-2">003</td>
                  <td class="p-2">Bob Johnson</td>
                  <td class="p-2">bob@example.com</td>
                  <td class="p-2">User</td>
                  <td class="p-2">Inactive</td>
                </tr>
                <tr class="border-b border-border">
                  <td class="p-2">004</td>
                  <td class="p-2">John Doe</td>
                  <td class="p-2">john@example.com</td>
                  <td class="p-2">Admin</td>
                  <td class="p-2">Active</td>
                </tr>
                <tr class="border-b border-border">
                  <td class="p-2">005</td>
                  <td class="p-2">Jane Smith</td>
                  <td class="p-2">jane@example.com</td>
                  <td class="p-2">User</td>
                  <td class="p-2">Active</td>
                </tr>
                <tr class="border-b border-border">
                  <td class="p-2">006</td>
                  <td class="p-2">Bob Johnson</td>
                  <td class="p-2">bob@example.com</td>
                  <td class="p-2">User</td>
                  <td class="p-2">Inactive</td>
                </tr>
                <tr class="border-b border-border">
                  <td class="p-2">007</td>
                  <td class="p-2">John Doe</td>
                  <td class="p-2">john@example.com</td>
                  <td class="p-2">Admin</td>
                  <td class="p-2">Active</td>
                </tr>
                <tr class="border-b border-border">
                  <td class="p-2">008</td>
                  <td class="p-2">Jane Smith</td>
                  <td class="p-2">jane@example.com</td>
                  <td class="p-2">User</td>
                  <td class="p-2">Active</td>
                </tr>
                <tr class="border-b border-border">
                  <td class="p-2">009</td>
                  <td class="p-2">Bob Johnson</td>
                  <td class="p-2">bob@example.com</td>
                  <td class="p-2">User</td>
                  <td class="p-2">Inactive</td>
                </tr>
                <tr>
                  <td class="p-2">010</td>
                  <td class="p-2">John Doe</td>
                  <td class="p-2">john@example.com</td>
                  <td class="p-2">Admin</td>
                  <td class="p-2">Active</td>
                </tr>
              </tbody>
            </table>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Chat Messages">
          <div
            orgScrollArea
            scrollAreaDirection="vertical"
            class="h-[200px] rounded-lg border border-border bg-background-subtle p-4"
          >
            <div class="flex flex-col gap-3">
              <div class="rounded-lg bg-background p-3">
                <strong>Alice:</strong> Hey, how's the project going?
              </div>
              <div class="rounded-lg bg-background p-3">
                <strong>Bob:</strong> Pretty good! Just finished the main features.
              </div>
              <div class="rounded-lg bg-background p-3">
                <strong>Alice:</strong> That's great! When can we review it?
              </div>
              <div class="rounded-lg bg-background p-3">
                <strong>Bob:</strong> How about tomorrow morning?
              </div>
              <div class="rounded-lg bg-background p-3">
                <strong>Alice:</strong> Perfect! I'll set up a meeting.
              </div>
              <div class="rounded-lg bg-background p-3">
                <strong>Bob:</strong> Sounds good. See you then!
              </div>
            </div>
          </div>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>Perfect for sidebars and navigation menus with hover-only scrollbars</li>
          <li>Great for code blocks with both horizontal and vertical scrolling</li>
          <li>Ideal for data tables with horizontal overflow</li>
          <li>Useful for chat interfaces and message lists</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [ScrollAreaDirective, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

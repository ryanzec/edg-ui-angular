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

  ### Edge Cases
  - If you have a border and border radius on the element that has \`orgScrollArea\` applied, the border radius
  will not work on the sides of the scrollbar in FireFox, to get that to work, you will need to apply the border /
  radius to the parent element of the scroll area (though leaving it as is in FireFox is probably fine).

  ### Features
  - Supports vertical, horizontal, or both scroll directions
  - Optional hover-only visibility for scrollbars
  - Stable content mode to prevent layout shift when scrollbars appear/disappear
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

  ### Stable Content Mode
  - **Enabled** (default): Reserves space for scrollbar, preventing layout shift
  - **Disabled**: Scrollbar appears on top of content, may cause content to shift

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

  <!-- Hover-only with stable content (default behavior) -->
  <div
    orgScrollArea
    [scrollAreaOnlyShowOnHover]="true"
    [scrollAreaUseStableContent]="true"
    class="h-[200px]"
  >
    <!-- Content here - scrollbar space is reserved -->
  </div>

  <!-- Disable stable content for overlay scrollbar behavior -->
  <div
    orgScrollArea
    [scrollAreaOnlyShowOnHover]="true"
    [scrollAreaUseStableContent]="false"
    class="h-[200px]"
  >
    <!-- Content here - scrollbar overlays content -->
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
        <div>This is a scrollable area with custom scrollbar styling.</div>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
        <div>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
        <div>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
        <div>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        <div>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</div>
        <div>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</div>
        <div>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.</div>
        <div>Eos qui ratione voluptatem sequi nesciunt neque porro quisquam est qui dolorem ipsum quia dolor sit amet.</div>
        <div>Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</div>
        <div>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.</div>
        <div>Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</div>
        <div>Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus.</div>
        <div>Qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</div>
        <div>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</div>
      </div>
    `,
    moduleMetadata: {
      imports: [ScrollAreaDirective],
    },
  }),
};

export const NotEnoughContent: Story = {
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
        <div>This is a scrollable area with custom scrollbar styling.</div>
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
            <div>Vertical scrolling only.</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            <div>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            <div>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</div>
            <div>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</div>
            <div>Excepteur sint occaecat cupidatat non proident.</div>
            <div>Sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            <div>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</div>
            <div>Accusantium doloremque laudantium, totam rem aperiam.</div>
            <div>Eaque ipsa quae ab illo inventore veritatis et quasi architecto.</div>
            <div>Beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem.</div>
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
            <div class="whitespace-nowrap">Both vertical and horizontal scrolling enabled. This line is very long and will require horizontal scrolling to see all the content that extends beyond the visible area.</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            <div>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            <div>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</div>
            <div>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</div>
            <div>Excepteur sint occaecat cupidatat non proident.</div>
            <div>Sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            <div>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</div>
            <div>Accusantium doloremque laudantium, totam rem aperiam.</div>
            <div>Eaque ipsa quae ab illo inventore veritatis et quasi architecto.</div>
            <div>Beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem.</div>
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
            <div>Scrollbar is always visible when content is scrollable.</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            <div>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            <div>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</div>
            <div>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</div>
            <div>Excepteur sint occaecat cupidatat non proident.</div>
            <div>Sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            <div>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</div>
            <div>Accusantium doloremque laudantium, totam rem aperiam.</div>
            <div>Eaque ipsa quae ab illo inventore veritatis et quasi architecto.</div>
            <div>Beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem.</div>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Hover Only">
          <div
            orgScrollArea
            scrollAreaDirection="both"
            [scrollAreaOnlyShowOnHover]="true"
            class="h-[150px] max-w-[300px] rounded-lg border border-border p-4"
          >
            <div>Scrollbar only appears when hovering over this area.</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            <div>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            <div>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</div>
            <div class="w-[400px]">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</div>
            <div>Excepteur sint occaecat cupidatat non proident.</div>
            <div>Sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            <div>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</div>
            <div>Accusantium doloremque laudantium, totam rem aperiam.</div>
            <div>Eaque ipsa quae ab illo inventore veritatis et quasi architecto.</div>
            <div>Beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem.</div>
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

export const StableContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of stable content mode (prevents layout shift when scrollbar appears) vs default behavior.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Stable Content Mode"
        currentState="Comparing with and without stable content enabled"
      >
        <org-storybook-example-container-section label="With Stable Content (default)">
          <div
            orgScrollArea
            scrollAreaDirection="both"
            [scrollAreaOnlyShowOnHover]="true"
            [scrollAreaUseStableContent]="true"
            class="h-[150px] max-w-[300px] rounded-lg border border-border p-4"
          >
            <div class="font-semibold">Hover to reveal scrollbar - content stays stable!</div>
            <div>The scrollbar space is reserved even when hidden, preventing layout shift.</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            <div>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            <div>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</div>
            <div class="w-[400px]">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</div>
            <div>Excepteur sint occaecat cupidatat non proident.</div>
            <div>Sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            <div>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</div>
            <div>Accusantium doloremque laudantium, totam rem aperiam.</div>
            <div>Eaque ipsa quae ab illo inventore veritatis et quasi architecto.</div>
            <div>Beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem.</div>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With Stable Content (default)">
          <div
            orgScrollArea
            scrollAreaDirection="vertical"
            [scrollAreaOnlyShowOnHover]="true"
            [scrollAreaUseStableContent]="true"
            class="h-[150px] max-w-[300px] rounded-lg border border-border p-4"
          >
            <div>Test 1</div>
            <div>Test 2</div>
            <div>Test 3</div>
            <div>Test 4</div>
            <div>Test 5</div>
            <div>Test 6</div>
            <div>Test 7</div>
            <div>Test 8</div>
            <div>Test 9</div>
            <div>Test 10</div>
            <div>Test 11</div>
            <div>Test 12</div>
            <div>Test 13</div>
            <div>Test 14</div>
            <div>Test 15</div>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Without Stable Content">
          <div
            orgScrollArea
            scrollAreaDirection="both"
            [scrollAreaOnlyShowOnHover]="true"
            [scrollAreaUseStableContent]="false"
            class="h-[150px] max-w-[300px] rounded-lg border border-border p-4"
          >
            <div class="font-semibold">Hover to reveal scrollbar - content may shift!</div>
            <div>The scrollbar appears and may cause content to shift horizontally.</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            <div>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            <div>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</div>
            <div class="w-[400px]">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</div>
            <div>Excepteur sint occaecat cupidatat non proident.</div>
            <div>Sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            <div>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</div>
            <div>Accusantium doloremque laudantium, totam rem aperiam.</div>
            <div>Eaque ipsa quae ab illo inventore veritatis et quasi architecto.</div>
            <div>Beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem.</div>
          </div>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Stable content (true)</strong>: Scrollbar space is reserved, preventing layout shift when scrollbar appears/disappears</li>
          <li><strong>Stable content (false)</strong>: Scrollbar appears on top of content, may cause horizontal shift</li>
          <li>Stable content is especially useful with hover-only scrollbars to maintain consistent layout</li>
          <li>Try hovering over both examples to see the difference in behavior</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [ScrollAreaDirective, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

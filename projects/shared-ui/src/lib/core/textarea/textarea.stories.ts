import type { Meta, StoryObj } from '@storybook/angular';
import { Textarea, textareaVariants, textareaIconAlignments } from './textarea';
import { iconNames } from '../icon/icon';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';

const meta: Meta<Textarea> = {
  title: 'Core/Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Textarea Component

  A flexible textarea component with support for icons, validation, inline items (tags), icon alignment, and accessibility features.

  ### Features
  - Two visual variants: bordered and borderless
  - Optional pre and post icons with alignment control
  - Inline items/tags support
  - Validation message display
  - Select all on focus behavior
  - Auto-focus support
  - Disabled and readonly states
  - Configurable rows
  - Inverse enter behavior (Shift+Enter vs Enter for submission)
  - Full keyboard accessibility

  ### Variants
  - **bordered**: Standard textarea with visible border
  - **borderless**: Minimal textarea without border

  ### Icon Alignment
  - **start**: Icon aligned to the top
  - **center**: Icon aligned to the middle (default for postIcon)
  - **end**: Icon aligned to the bottom (default for preIcon)

  ### Usage Examples
  \`\`\`html
  <!-- Basic textarea -->
  <org-textarea name="textarea" placeholder="Enter text..." />

  <!-- Textarea with variant -->
  <org-textarea name="textarea" variant="borderless" placeholder="Borderless textarea" />

  <!-- Textarea with icons -->
  <org-textarea name="textarea" preIcon="gear" placeholder="Settings" />
  <org-textarea name="textarea" postIcon="arrow-right" placeholder="Submit" />

  <!-- Textarea with icon alignment -->
  <org-textarea
    name="textarea"
    postIcon="arrow-right"
    postIconAlignment="end"
    placeholder="Icon at bottom"
  />

  <!-- Textarea with validation -->
  <org-textarea
    name="textarea"
    placeholder="Description"
    validationMessage="This field is required"
  />

  <!-- Textarea with inline items (tags) -->
  <org-textarea
    name="textarea"
    placeholder="Add tags..."
    [inlineItems]="[
      { id: '1', label: 'React', removable: true },
      { id: '2', label: 'Angular', removable: true }
    ]"
  />

  <!-- Textarea with inverse enter behavior -->
  <org-textarea
    name="textarea"
    [inverseEnter]="true"
    placeholder="Press Enter to submit, Shift+Enter for new line"
  />

  <!-- Textarea with custom rows -->
  <org-textarea name="textarea" [rows]="5" placeholder="Larger textarea" />
</div>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<Textarea>;

export const Default: Story = {
  args: {
    name: 'textarea',
    variant: 'bordered',
    placeholder: 'Enter text...',
    value: '',
    disabled: false,
    readonly: false,
    preIcon: null,
    postIcon: null,
    preIconAlignment: 'start',
    postIconAlignment: 'end',
    selectAllOnFocus: false,
    autoFocus: false,
    validationMessage: '',
    inlineItems: [],
    containerClass: '',
    inverseEnter: false,
    rows: 3,
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'The name attribute for the textarea element',
    },
    variant: {
      control: 'select',
      options: textareaVariants,
      description: 'The visual variant of the textarea',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the textarea',
    },
    value: {
      control: 'text',
      description: 'The current value of the textarea',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the textarea is readonly',
    },
    preIcon: {
      control: 'select',
      options: [null, ...iconNames],
      description: 'Icon to display before the textarea text',
    },
    postIcon: {
      control: 'select',
      options: [null, ...iconNames],
      description: 'Icon to display after the textarea text',
    },
    preIconAlignment: {
      control: 'select',
      options: textareaIconAlignments,
      description: 'Vertical alignment of the pre icon',
    },
    postIconAlignment: {
      control: 'select',
      options: textareaIconAlignments,
      description: 'Vertical alignment of the post icon',
    },
    selectAllOnFocus: {
      control: 'boolean',
      description: 'Whether to select all text when the textarea receives focus',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Whether the textarea should automatically receive focus',
    },
    validationMessage: {
      control: 'text',
      description: 'Validation error message to display',
    },
    inlineItems: {
      control: 'object',
      description: 'Array of inline items (tags) to display inside the textarea',
    },
    containerClass: {
      control: 'text',
      description: 'Additional CSS classes for the container',
    },
    inverseEnter: {
      control: 'boolean',
      description: 'When true, Enter submits and Shift+Enter adds new line (inverse of default)',
    },
    rows: {
      control: 'number',
      description: 'Number of visible text rows',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default textarea with bordered variant. Use the controls below to interact with the component.',
      },
    },
  },
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of bordered and borderless variants.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Variant Comparison"
        currentState="Comparing bordered and borderless variants"
      >
        <org-storybook-example-container-section label="Bordered (default)">
          <org-textarea name="textarea" variant="bordered" placeholder="Bordered textarea" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Borderless">
          <org-textarea name="textarea" variant="borderless" placeholder="Borderless textarea" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>bordered</strong>: Standard textarea with visible border (default)</li>
          <li><strong>borderless</strong>: Minimal styling without border</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Textarea, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Textareas with pre icons, post icons, or both.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Icon Variations"
        currentState="Comparing textareas with different icon configurations"
      >
        <org-storybook-example-container-section label="No icons">
          <org-textarea name="textarea" placeholder="No icons" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Pre icon only">
          <org-textarea name="textarea" preIcon="gear" placeholder="Settings" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Post icon only">
          <org-textarea name="textarea" postIcon="arrow-right" placeholder="Submit" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Both icons">
          <org-textarea name="textarea" preIcon="gear" postIcon="arrow-right" placeholder="Both icons" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>preIcon</strong>: Icon displayed before the textarea text</li>
          <li><strong>postIcon</strong>: Icon displayed after the textarea text</li>
          <li>Both icons can be used simultaneously</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Textarea, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const IconAlignment: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Icon alignment options (start, center, end) for vertical positioning.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Icon Alignment"
        currentState="Comparing different icon alignment options"
      >
        <org-storybook-example-container-section label="Post icon - Start (top)">
          <org-textarea
            postIcon="arrow-right"
            postIconAlignment="start"
            placeholder="Icon at top"
            [rows]="5"
            name="textarea"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Post icon - Center (middle)">
          <org-textarea
            postIcon="arrow-right"
            postIconAlignment="center"
            placeholder="Icon at center"
            [rows]="5"
            name="textarea"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Post icon - End (bottom)">
          <org-textarea
            postIcon="arrow-right"
            postIconAlignment="end"
            placeholder="Icon at bottom"
            [rows]="5"
            name="textarea"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Pre icon - Start (top)">
          <org-textarea
            preIcon="gear"
            preIconAlignment="start"
            placeholder="Icon at top"
            [rows]="5"
            name="textarea"
          />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>start</strong>: Icon aligned to the top (default for preIcon)</li>
          <li><strong>center</strong>: Icon aligned to the middle</li>
          <li><strong>end</strong>: Icon aligned to the bottom (default for postIcon)</li>
          <li>Alignment is particularly useful for multi-row textareas</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Textarea, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const EnterBehavior: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Normal vs. inverse enter key behavior for form submission.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Enter Key Behavior"
        currentState="Comparing normal and inverse enter behavior"
      >
        <org-storybook-example-container-section label="Normal (default)">
          <org-textarea
            placeholder="Enter = new line, Shift+Enter = submit"
            [rows]="3"
            name="textarea"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Inverse">
          <org-textarea
            [inverseEnter]="true"
            placeholder="Enter = submit, Shift+Enter = new line"
            [rows]="3"
            name="textarea"
          />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Normal</strong>: Enter adds new line, Shift+Enter emits enterPressed event</li>
          <li><strong>Inverse</strong>: Enter emits enterPressed event, Shift+Enter adds new line</li>
          <li>Useful for chat interfaces or quick-submit forms</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Textarea, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const InlineItems: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Textarea with inline items (tags/chips) displayed inside the field.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Inline Items (Tags)"
        currentState="Textarea with tags displayed inline"
      >
        <org-storybook-example-container-section label="Without inline items">
          <org-textarea name="textarea" placeholder="Add tags..." />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With inline items (removable)">
          <org-textarea
            name="textarea"
            placeholder="Add more tags..."
            [inlineItems]="[
      { id: '1', label: 'React', removable: true },
      { id: '2', label: 'Angular', removable: true },
              { id: '3', label: 'Vue', removable: true }
            ]"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With non-removable items">
          <org-textarea
            name="textarea"
            placeholder="Type here..."
            [inlineItems]="[
              { id: '1', label: 'TypeScript', removable: false },
              { id: '2', label: 'JavaScript', removable: false }
            ]"
          />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>Inline items are displayed as tags inside the textarea</li>
          <li>Items with <strong>removable: true</strong> show an X button</li>
          <li>Clicking the X button emits <strong>inlineItemRemoved</strong> event</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Textarea, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of disabled, readonly, and normal states.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Textarea States"
        currentState="Comparing disabled, readonly, and normal states"
      >
        <org-storybook-example-container-section label="Normal (enabled)">
          <org-textarea name="textarea" placeholder="Normal textarea" value="Editable text" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Disabled">
          <org-textarea name="textarea" [disabled]="true" placeholder="Disabled textarea" value="Cannot edit" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Readonly">
          <org-textarea
            name="textarea"
            [readonly]="true"
            placeholder="Readonly textarea"
            value="Cannot edit but can focus"
          />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>Normal</strong>: Fully interactive and editable</li>
          <li><strong>Disabled</strong>: Cannot focus, edit, or interact</li>
          <li><strong>Readonly</strong>: Can focus but cannot edit</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Textarea, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const Validation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Textarea with validation error messages.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Validation States"
        currentState="Comparing valid and invalid textareas"
      >
        <org-storybook-example-container-section label="Valid (no error)">
          <org-textarea name="textarea" placeholder="Valid textarea" value="This is valid content" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Invalid (with error message)">
          <org-textarea
            name="textarea"
            placeholder="Invalid textarea"
            value="Too short"
            validationMessage="Description must be at least 20 characters"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Borderless with error">
          <org-textarea
            name="textarea"
            variant="borderless"
            placeholder="Required field"
            validationMessage="This field is required"
          />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="With icon and error">
          <org-textarea
            name="textarea"
            preIcon="gear"
            placeholder="Description"
            value="Invalid"
            validationMessage="Description is too short"
          />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>When <strong>validationMessage</strong> is provided, textarea shows error state</li>
          <li>Error message is displayed below the textarea</li>
          <li>Textarea border changes to error color (red)</li>
          <li>Works with all variants and icon configurations</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Textarea, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const RowSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Textareas with different row counts for varying heights.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Row Sizes"
        currentState="Comparing different row counts"
      >
        <org-storybook-example-container-section label="Small (2 rows)">
          <org-textarea name="textarea" [rows]="2" placeholder="Small textarea with 2 rows" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Default (3 rows)">
          <org-textarea name="textarea" [rows]="3" placeholder="Default textarea with 3 rows" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Medium (5 rows)">
          <org-textarea name="textarea" [rows]="5" placeholder="Medium textarea with 5 rows" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Large (8 rows)">
          <org-textarea name="textarea" [rows]="8" placeholder="Large textarea with 8 rows" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>rows</strong>: Controls the visible height of the textarea</li>
          <li>Default is 3 rows</li>
          <li>Textarea is still resizable by the user (browser default)</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Textarea, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const SpecialBehaviors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Special textarea behaviors like select all on focus and auto-focus.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Special Behaviors"
        currentState="Demonstrating select all on focus behavior"
      >
        <org-storybook-example-container-section label="Normal focus behavior">
          <org-textarea name="textarea" placeholder="Click to focus" value="Normal focus behavior" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Select all on focus">
            <org-textarea
            name="textarea"
            [selectAllOnFocus]="true"
            placeholder="Click to focus"
            value="Text will be selected on focus"
          />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>selectAllOnFocus</strong>: Automatically selects all text when textarea receives focus</li>
          <li><strong>autoFocus</strong>: Automatically focuses the textarea when component mounts</li>
          <li>Useful for forms where quick editing is needed</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Textarea, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

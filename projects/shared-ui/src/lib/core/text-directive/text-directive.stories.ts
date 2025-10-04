import type { Meta, StoryObj } from '@storybook/angular';
import { TextDirective, textColors, textSizes } from './text-directive';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';

const meta: Meta<TextDirective> = {
  title: 'Core/Directives/Text',
  component: TextDirective,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Text Directive

  A directive for applying consistent text colors and sizes across the application.

  ### Features
  - Seven semantic color options: brand, secondary, safe, info, caution, warning, danger
  - Six size options: xs, sm, base, lg, xl, 2xl
  - Can be used independently or combined
  - Null values use default styling

  ### Color Options
  - **brand**: Primary brand color
  - **secondary**: Secondary accent color
  - **safe**: Success/positive state (green)
  - **info**: Informational state (blue)
  - **caution**: Caution state (yellow)
  - **warning**: Warning state (orange)
  - **danger**: Error/danger state (red)

  ### Size Options
  - **xs**: Extra small (0.75rem / 12px)
  - **sm**: Small (0.875rem / 14px)
  - **base**: Base (1rem / 16px)
  - **lg**: Large (1.125rem / 18px)
  - **xl**: Extra large (1.25rem / 20px)
  - **2xl**: 2x extra large (1.5rem / 24px)

  ### Usage Examples
  \`\`\`html
  <!-- Text with color only -->
  <p orgText textColor="brand">Brand colored text</p>

  <!-- Text with size only -->
  <p orgText textSize="lg">Large text</p>

  <!-- Text with both color and size -->
  <p orgText textColor="danger" textSize="xl">Danger extra large text</p>

  <!-- Text with no styling (uses defaults) -->
  <p orgText>Default text</p>
</div>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<TextDirective>;

export const Default: Story = {
  args: {
    textColor: null,
    textSize: null,
  },
  argTypes: {
    textColor: {
      control: 'select',
      options: [null, ...textColors],
      description: 'The semantic color to apply to the text',
    },
    textSize: {
      control: 'select',
      options: [null, ...textSizes],
      description: 'The size to apply to the text',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default text directive with no color or size applied. Use the controls below to interact with the directive.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <p orgText [textColor]="textColor" [textSize]="textSize">
        This is sample text with the text directive applied.
      </p>
    `,
    moduleMetadata: {
      imports: [TextDirective],
    },
  }),
};

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all 7 semantic color options.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Color Variants"
        currentState="Comparing all 7 semantic color options"
      >
        <org-storybook-example-container-section label="Brand">
          <p orgText textColor="brand">Brand text color</p>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Secondary">
          <p orgText textColor="secondary">Secondary text color</p>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Safe">
          <p orgText textColor="safe">Safe text color</p>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Info">
          <p orgText textColor="info">Info text color</p>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Caution">
          <p orgText textColor="caution">Caution text color</p>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Warning">
          <p orgText textColor="warning">Warning text color</p>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Danger">
          <p orgText textColor="danger">Danger text color</p>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>brand</strong>: Primary brand color</li>
          <li><strong>secondary</strong>: Secondary accent color</li>
          <li><strong>safe</strong>: Success/positive state (green)</li>
          <li><strong>info</strong>: Informational state (blue)</li>
          <li><strong>caution</strong>: Caution state (yellow)</li>
          <li><strong>warning</strong>: Warning state (orange)</li>
          <li><strong>danger</strong>: Error/danger state (red)</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [TextDirective, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all 6 size options.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Size Variants"
        currentState="Comparing all 6 size options"
      >
        <org-storybook-example-container-section label="Extra Small (xs)">
          <p orgText textSize="xs">Extra small text (0.75rem / 12px)</p>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Small (sm)">
          <p orgText textSize="sm">Small text (0.875rem / 14px)</p>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Base">
          <p orgText textSize="base">Base text (1rem / 16px)</p>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Large (lg)">
          <p orgText textSize="lg">Large text (1.125rem / 18px)</p>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Extra Large (xl)">
          <p orgText textSize="xl">Extra large text (1.25rem / 20px)</p>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="2x Extra Large (2xl)">
          <p orgText textSize="2xl">2xl text (1.5rem / 24px)</p>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li><strong>xs</strong>: 0.75rem / 12px</li>
          <li><strong>sm</strong>: 0.875rem / 14px</li>
          <li><strong>base</strong>: 1rem / 16px</li>
          <li><strong>lg</strong>: 1.125rem / 18px</li>
          <li><strong>xl</strong>: 1.25rem / 20px</li>
          <li><strong>2xl</strong>: 1.5rem / 24px</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [TextDirective, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const Combined: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Examples of combining color and size options.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Combined Color and Size"
        currentState="Demonstrating color and size combinations"
      >
        <org-storybook-example-container-section label="Brand + Large">
          <p orgText textColor="brand" textSize="lg">Brand large text</p>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Danger + Extra Large">
          <p orgText textColor="danger" textSize="xl">Danger extra large text</p>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Safe + Small">
          <p orgText textColor="safe" textSize="sm">Safe small text</p>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Info + 2xl">
          <p orgText textColor="info" textSize="2xl">Info 2xl text</p>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Warning + Extra Small">
          <p orgText textColor="warning" textSize="xs">Warning extra small text</p>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Secondary + Base">
          <p orgText textColor="secondary" textSize="base">Secondary base text</p>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
          <li>Color and size can be used independently or together</li>
          <li>Both properties are optional and default to null</li>
          <li>When null, the element uses its inherited or default styling</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [TextDirective, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

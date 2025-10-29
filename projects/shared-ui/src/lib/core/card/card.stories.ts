import type { Meta, StoryObj } from '@storybook/angular';
import { Card } from './card';
import { CardHeader } from './card-header';
import { CardContent } from './card-content';
import { CardImage } from './card-image';
import { CardFooter } from './card-footer';
import { Button } from '../button/button';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';

const meta: Meta<Card> = {
  title: 'Core/Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Card Component

  A flexible card component system with multiple sub-components for building rich content layouts.

  ### Components
  - **Card**: Main container with optional colored border
  - **CardHeader**: Header section with title and subtitle
  - **CardImage**: Full-width image section with optimized loading
  - **CardContent**: Main content area
  - **CardFooter**: Footer section with configurable button alignment

  ### Features
  - Compositional design with sub-components
  - Optional colored borders (8 color variants)
  - Flexible content layout
  - Responsive image support
  - Footer alignment options (start, center, end)
  - Clean, modern design

  ### Color Options
  - **null/default**: No colored border (default)
  - **primary**: Primary color border
  - **secondary**: Secondary accent color border
  - **safe**: Success/safe state border (green)
  - **info**: Informational state border (blue)
  - **caution**: Caution state border (yellow)
  - **warning**: Warning state border (orange)
  - **danger**: Danger/error state border (red)

  ### Usage Examples
  \`\`\`html
  <!-- Basic card -->
  <org-card>
    <org-card-content>
      <div>Simple card content</div>
    </org-card-content>
  </org-card>

  <!-- Card with header -->
  <org-card>
    <org-card-header title="Card Title" subtitle="Optional subtitle" />
    <org-card-content>
      <div>Card content</div>
    </org-card-content>
  </org-card>

  <!-- Card with image -->
  <org-card>
    <org-card-header title="Image Card" />
    <org-card-image
      src="image.jpg"
      alt="Description"
      [width]="400"
      [height]="200"
    />
    <org-card-content>
      <div>Card with image</div>
    </org-card-content>
  </org-card>

  <!-- Complete card with footer -->
  <org-card color="primary">
    <org-card-header title="Complete Card" subtitle="All sections" />
    <org-card-image src="image.jpg" alt="Description" [width]="400" [height]="200" />
    <org-card-content>
      <div>Card content with all sections</div>
    </org-card-content>
    <org-card-footer alignment="end">
      <org-button color="secondary">Cancel</org-button>
      <org-button color="primary">Save</org-button>
    </org-card-footer>
  </org-card>
</div>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<Card>;

export const Default: Story = {
  args: {
    color: null,
  },
  argTypes: {
    color: {
      control: 'select',
      options: [null, 'primary', 'secondary', 'safe', 'info', 'caution', 'warning', 'danger'],
      description: 'The color variant of the card border (null for default)',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default card with header and content. Use the controls below to interact with the component. Note: This story uses projected content (header and content), so only the color property is interactive.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="max-w-sm">
        <org-card [color]="color">
          <org-card-header title="Card Title" subtitle="Optional subtitle" />
          <org-card-content>
            <div>This is a card with header and content.</div>
          </org-card-content>
        </org-card>
      </div>
    `,
    moduleMetadata: {
      imports: [Card, CardHeader, CardContent],
    },
  }),
};

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all color variants for card borders (default and 8 color options).',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Color Variants"
        currentState="Comparing default and all 8 color border options"
      >
        <org-storybook-example-container-section label="Default (No Border Color)">
          <div class="max-w-sm">
            <org-card>
              <org-card-header title="Default Card" />
              <org-card-content>
                <div>Card with no colored border.</div>
              </org-card-content>
            </org-card>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Primary">
          <div class="max-w-sm">
            <org-card color="primary">
              <org-card-header title="Primary Card" />
              <org-card-content>
                <div>Card with primary color border.</div>
              </org-card-content>
            </org-card>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Secondary">
          <div class="max-w-sm">
            <org-card color="secondary">
              <org-card-header title="Secondary Card" />
              <org-card-content>
                <div>Card with secondary color border.</div>
              </org-card-content>
            </org-card>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Neutral">
          <div class="max-w-sm">
            <org-card color="neutral">
              <org-card-header title="Neutral Card" />
              <org-card-content>
                <div>Card with neutral color border.</div>
              </org-card-content>
            </org-card>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Safe (Success)">
          <div class="max-w-sm">
            <org-card color="safe">
              <org-card-header title="Safe Card" />
              <org-card-content>
                <div>Card with safe (success) color border.</div>
              </org-card-content>
            </org-card>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Info">
          <div class="max-w-sm">
            <org-card color="info">
              <org-card-header title="Info Card" />
              <org-card-content>
                <div>Card with info color border.</div>
              </org-card-content>
            </org-card>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Caution">
          <div class="max-w-sm">
            <org-card color="caution">
              <org-card-header title="Caution Card" />
              <org-card-content>
                <div>Card with caution color border.</div>
              </org-card-content>
            </org-card>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Warning">
          <div class="max-w-sm">
            <org-card color="warning">
              <org-card-header title="Warning Card" />
              <org-card-content>
                <div>Card with warning color border.</div>
              </org-card-content>
            </org-card>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Danger (Error)">
          <div class="max-w-sm">
            <org-card color="danger">
              <org-card-header title="Danger Card" />
              <org-card-content>
                <div>Card with danger (error) color border.</div>
              </org-card-content>
            </org-card>
          </div>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Default</strong>: No colored border, standard card appearance</li>
          <li><strong>Primary</strong>: Primary color for main content cards</li>
          <li><strong>Secondary</strong>: Secondary accent color for supporting content</li>
          <li><strong>Neutral</strong>: Neutral gray for low-emphasis cards</li>
          <li><strong>Safe</strong>: Green for success/positive status cards</li>
          <li><strong>Info</strong>: Blue for informational cards</li>
          <li><strong>Caution</strong>: Yellow for caution/warning cards</li>
          <li><strong>Warning</strong>: Orange for important warnings</li>
          <li><strong>Danger</strong>: Red for error/critical status cards</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [Card, CardHeader, CardContent, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const Compositions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Comparison of different card compositions using various combinations of sub-components (header, image, content, footer).',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Card Compositions"
        currentState="Comparing different combinations of card sub-components"
      >
        <org-storybook-example-container-section label="Content Only">
          <div class="max-w-sm">
            <org-card>
              <org-card-content>
                <div>Minimal card with just content.</div>
              </org-card-content>
            </org-card>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Header + Content">
          <div class="max-w-sm">
            <org-card>
              <org-card-header title="Card Title" subtitle="Optional subtitle" />
              <org-card-content>
                <div>Card with header and content.</div>
              </org-card-content>
            </org-card>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Header + Image + Content">
          <div class="max-w-sm">
            <org-card>
              <org-card-header title="Image Card" />
              <org-card-image
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=200&fit=crop"
                alt="Example image"
                [width]="400"
                [height]="200"
              />
              <org-card-content>
                <div>Card with header, image, and content.</div>
              </org-card-content>
            </org-card>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Image + Content (No Header)">
          <div class="max-w-sm">
            <org-card>
              <org-card-image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
                alt="Example image"
                [width]="400"
                [height]="200"
              />
              <org-card-content>
                <div>Card with image at top, no header.</div>
              </org-card-content>
            </org-card>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Header + Content + Footer">
          <div class="max-w-sm">
            <org-card>
              <org-card-header title="Action Card" />
              <org-card-content>
                <div>Card with header, content, and footer actions.</div>
              </org-card-content>
              <org-card-footer alignment="end">
                <org-button color="primary">Action</org-button>
              </org-card-footer>
            </org-card>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Complete (All Sections)">
          <div class="max-w-sm">
            <org-card>
              <org-card-header title="Complete Card" subtitle="All sections" />
              <org-card-image
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=200&fit=crop"
                alt="Example image"
                [width]="400"
                [height]="200"
              />
              <org-card-content>
                <div>Card with all available sections.</div>
              </org-card-content>
              <org-card-footer alignment="end">
                <org-button color="secondary">Cancel</org-button>
                <org-button color="primary">Save</org-button>
              </org-card-footer>
            </org-card>
          </div>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Content Only</strong>: Minimal card structure with just content</li>
          <li><strong>Header + Content</strong>: Standard card with title/subtitle and content</li>
          <li><strong>Header + Image + Content</strong>: Card with full-width image below header</li>
          <li><strong>Image + Content</strong>: Image-first card without header</li>
          <li><strong>Header + Content + Footer</strong>: Card with action buttons in footer</li>
          <li><strong>Complete</strong>: All sections combined for maximum flexibility</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [
        Card,
        CardHeader,
        CardImage,
        CardContent,
        CardFooter,
        Button,
        StorybookExampleContainer,
        StorybookExampleContainerSection,
      ],
    },
  }),
};

export const FooterAlignments: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different footer alignment options (start, center, end).',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Footer Alignments"
        currentState="Comparing start, center, and end alignments"
      >
        <org-storybook-example-container-section label="Start Aligned (Left)">
          <div class="max-w-sm">
            <org-card>
              <org-card-header title="Start Aligned" />
              <org-card-content>
                <div>Footer buttons aligned to the start (left).</div>
              </org-card-content>
              <org-card-footer alignment="start">
                <org-button color="primary">Action</org-button>
              </org-card-footer>
            </org-card>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Center Aligned">
          <div class="max-w-sm">
            <org-card>
              <org-card-header title="Center Aligned" />
              <org-card-content>
                <div>Footer buttons aligned to the center.</div>
              </org-card-content>
              <org-card-footer alignment="center">
                <org-button color="primary">Action</org-button>
              </org-card-footer>
            </org-card>
          </div>
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="End Aligned (Right)">
          <div class="max-w-sm">
            <org-card>
              <org-card-header title="End Aligned" />
              <org-card-content>
                <div>Footer buttons aligned to the end (right).</div>
              </org-card-content>
              <org-card-footer alignment="end">
                <org-button color="primary">Action</org-button>
              </org-card-footer>
            </org-card>
          </div>
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Start</strong>: Buttons aligned to the left side of the footer</li>
          <li><strong>Center</strong>: Buttons centered in the footer</li>
          <li><strong>End</strong>: Buttons aligned to the right side of the footer (default for action buttons)</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [
        Card,
        CardHeader,
        CardContent,
        CardFooter,
        Button,
        StorybookExampleContainer,
        StorybookExampleContainerSection,
      ],
    },
  }),
};

import type { Meta, StoryObj } from '@storybook/angular';
import { Card } from './card';
import { CardHeader } from './card-header';
import { CardContent } from './card-content';
import { CardImage } from './card-image';
import { CardFooter } from './card-footer';
import { Button } from '../button/button';
import { componentColors } from '../component-color-directive/component-color-directive';

const meta: Meta<Card> = {
  title: 'Core/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orgColor: {
      control: 'select',
      options: [null, ...componentColors],
    },
  },
  args: {
    orgColor: null,
  },
};

export default meta;
type Story = StoryObj<Card>;

// Basic card variants
export const Basic: Story = {
  render: (args) => ({
    props: args,
    template: `
      <org-card [orgColor]="orgColor">
        <org-card-content>
          <p>This is a basic card with just content.</p>
        </org-card-content>
      </org-card>
    `,
    moduleMetadata: {
      imports: [Card, CardContent],
    },
  }),
};

export const WithHeader: Story = {
  render: (args) => ({
    props: args,
    template: `
      <org-card [orgColor]="orgColor">
        <org-card-header title="Card Title" subtitle="Optional subtitle" />
        <org-card-content>
          <p>This card has a header with title and subtitle.</p>
        </org-card-content>
      </org-card>
    `,
    moduleMetadata: {
      imports: [Card, CardHeader, CardContent],
    },
  }),
};

export const WithImage: Story = {
  render: (args) => ({
    props: args,
    template: `
      <org-card [orgColor]="orgColor">
        <org-card-header title="Beautiful Landscape" />
        <org-card-image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
          alt="Mountain landscape"
          [width]="400"
          [height]="200"
        />
        <org-card-content>
          <p>This card includes an image that takes the full width of the card.</p>
        </org-card-content>
      </org-card>
    `,
    moduleMetadata: {
      imports: [Card, CardHeader, CardImage, CardContent],
    },
  }),
};

export const WithImageNoHeader: Story = {
  render: (args) => ({
    props: args,
    template: `
      <org-card [orgColor]="orgColor">
        <org-card-image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
          alt="Mountain landscape"
          [width]="400"
          [height]="200"
        />
        <org-card-content>
          <p>This card includes an image that takes the full width of the card.</p>
        </org-card-content>
      </org-card>
    `,
    moduleMetadata: {
      imports: [Card, CardHeader, CardImage, CardContent],
    },
  }),
};

export const WithFooter: Story = {
  render: (args) => ({
    props: args,
    template: `
      <org-card [orgColor]="orgColor">
        <org-card-header title="Action Card" />
        <org-card-content>
          <p>This card has footer actions.</p>
        </org-card-content>
        <org-card-footer alignment="end">
          <org-button orgColor="secondary">Cancel</org-button>
          <org-button orgColor="brand">Save</org-button>
        </org-card-footer>
      </org-card>
    `,
    moduleMetadata: {
      imports: [Card, CardHeader, CardContent, CardFooter, Button],
    },
  }),
};

export const Complete: Story = {
  render: (args) => ({
    props: args,
    template: `
      <org-card [orgColor]="orgColor">
        <org-card-header title="Complete Card" subtitle="All sections included" />
        <org-card-image
          src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=200&fit=crop"
          alt="Breakfast food"
          [width]="400"
          [height]="200"
        />
        <org-card-content>
          <p>This card demonstrates all available sections: header, image, content, and footer.</p>
          <p>The image takes the full width and the footer has action buttons.</p>
        </org-card-content>
        <org-card-footer alignment="end">
          <org-button orgColor="secondary">Learn More</org-button>
          <org-button orgColor="brand">Order Now</org-button>
        </org-card-footer>
      </org-card>
    `,
    moduleMetadata: {
      imports: [Card, CardHeader, CardImage, CardContent, CardFooter, Button],
    },
  }),
};

// Color variants
export const Variants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col gap-2">
        <org-card [orgColor]="'brand'">
          <org-card-header title="Brand Card" />
          <org-card-content>
            <p>This card uses the brand color variant for its border.</p>
          </org-card-content>
        </org-card>
        <org-card [orgColor]="'secondary'">
          <org-card-header title="Secondary Card" />
          <org-card-content>
            <p>This card uses the secondary color variant for its border.</p>
          </org-card-content>
        </org-card>
        <org-card [orgColor]="'neutral'">
          <org-card-header title="Neutral Card" />
          <org-card-content>
            <p>This card uses the neutral color variant for its border.</p>
          </org-card-content>
        </org-card>
        <org-card [orgColor]="'safe'">
          <org-card-header title="Safe Card" />
          <org-card-content>
            <p>This card uses the safe color variant for its border.</p>
          </org-card-content>
        </org-card>
        <org-card [orgColor]="'info'">
            <org-card-header title="Info Card" />
          <org-card-content>
            <p>This card uses the info color variant for its border.</p>
          </org-card-content>
        </org-card>
        <org-card [orgColor]="'caution'">
          <org-card-header title="Caution Card" />
          <org-card-content>
            <p>This card uses the caution color variant for its border.</p>
          </org-card-content>
        </org-card>
        <org-card [orgColor]="'warning'">
          <org-card-header title="Warning Card" />
          <org-card-content>
            <p>This card uses the warning color variant for its border.</p>
          </org-card-content>
        </org-card>
        <org-card [orgColor]="'danger'">
          <org-card-header title="Danger Card" />
          <org-card-content>
            <p>This card uses the danger color variant for its border.</p>
          </org-card-content>
        </org-card>
      </div>
    `,
    moduleMetadata: {
      imports: [Card, CardHeader, CardContent],
    },
  }),
};

// Footer alignment variants
export const FooterAlignments: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-4">
        <org-card>
          <org-card-header title="Start Aligned Footer" />
          <org-card-content>
            <p>Footer actions aligned to the start (left).</p>
          </org-card-content>
          <org-card-footer alignment="start">
            <org-button orgColor="brand">Action</org-button>
          </org-card-footer>
        </org-card>

        <org-card>
          <org-card-header title="Center Aligned Footer" />
          <org-card-content>
            <p>Footer actions aligned to the center.</p>
          </org-card-content>
          <org-card-footer alignment="center">
            <org-button orgColor="brand">Action</org-button>
          </org-card-footer>
        </org-card>

        <org-card>
          <org-card-header title="End Aligned Footer" />
          <org-card-content>
            <p>Footer actions aligned to the end (right).</p>
          </org-card-content>
          <org-card-footer alignment="end">
            <org-button orgColor="brand">Action</org-button>
          </org-card-footer>
        </org-card>
      </div>
    `,
    moduleMetadata: {
      imports: [Card, CardHeader, CardContent, CardFooter, Button],
    },
  }),
};

// Comprehensive showcase
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <h3 class="text-lg font-semibold">Color Variants</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <org-card>
              <org-card-header title="Default" />
              <org-card-content>
                <p>Default variant</p>
              </org-card-content>
            </org-card>
            <org-card orgColor="brand">
              <org-card-header title="Brand" />
              <org-card-content>
                <p>Brand variant</p>
              </org-card-content>
            </org-card>
            <org-card orgColor="secondary">
              <org-card-header title="Secondary" />
              <org-card-content>
                <p>Secondary variant</p>
              </org-card-content>
            </org-card>
            <org-card orgColor="neutral">
              <org-card-header title="Neutral" />
              <org-card-content>
                <p>Neutral variant</p>
              </org-card-content>
            </org-card>
            <org-card orgColor="safe">
              <org-card-header title="Safe" />
              <org-card-content>
                <p>Safe variant</p>
              </org-card-content>
            </org-card>
            <org-card orgColor="info">
              <org-card-header title="Info" />
              <org-card-content>
                <p>Info variant</p>
              </org-card-content>
            </org-card>
            <org-card orgColor="caution">
              <org-card-header title="Caution" />
              <org-card-content>
                <p>Caution variant</p>
              </org-card-content>
            </org-card>
            <org-card orgColor="warning">
              <org-card-header title="Warning" />
              <org-card-content>
                <p>Warning variant</p>
              </org-card-content>
            </org-card>
            <org-card orgColor="danger">
              <org-card-header title="Danger" />
              <org-card-content>
                <p>Danger variant</p>
              </org-card-content>
            </org-card>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Complex Examples</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <org-card>
              <org-card-header title="Product Card" subtitle="Featured item" />
              <org-card-image
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=200&fit=crop"
                alt="Product image"
                [width]="400"
                [height]="200"
              />
              <org-card-content>
                <p>Premium running shoes with advanced cushioning technology.</p>
                <p class="font-semibold text-lg">$129.99</p>
              </org-card-content>
              <org-card-footer alignment="end">
                <org-button orgColor="secondary">Add to Cart</org-button>
                <org-button orgColor="brand">Buy Now</org-button>
              </org-card-footer>
            </org-card>

            <org-card orgColor="info">
              <org-card-header title="Notification" />
              <org-card-content>
                <p>Your account has been successfully updated with the new security settings.</p>
              </org-card-content>
              <org-card-footer alignment="end">
                <org-button orgColor="brand">Dismiss</org-button>
              </org-card-footer>
            </org-card>
          </div>
        </div>
      </div>
    `,
    moduleMetadata: {
      imports: [Card, CardHeader, CardImage, CardContent, CardFooter, Button],
    },
  }),
};

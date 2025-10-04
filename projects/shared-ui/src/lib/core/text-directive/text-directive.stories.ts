import type { Meta, StoryObj } from '@storybook/angular';
import { Component, input } from '@angular/core';
import { TextDirective, textColors, textSizes, type TextColor, type TextSize } from './text-directive';

@Component({
  selector: 'org-story-wrapper',
  template: `
    <div class="p-4 space-y-4">
      <h3 class="text-lg font-semibold mb-2">Text Directive Demo</h3>

      <div class="border-2 border-dashed border-border p-4 rounded-lg">
        <p class="text-sm text-text-color mb-2">
          Text Color: <strong>{{ getTextColorDisplay() }}</strong> | Text Size:
          <strong>{{ getTextSizeDisplay() }}</strong>
        </p>
        <p orgText [textColor]="getTextColorValue()" [textSize]="getTextSizeValue()">
          This is sample text with the applied directive styles.
        </p>
      </div>

      <div class="text-sm text-text-color">
        <p><strong>Expected behavior:</strong></p>
        <ul class="list-disc list-inside mt-1 space-y-1">
          <li>
            When <strong>textColor</strong> is set: Applies the corresponding <code>text-text-[COLOR]</code> class
          </li>
          <li>When <strong>textSize</strong> is set: Applies the corresponding <code>text-[SIZE]</code> class</li>
          <li>When values are <strong>null</strong>: No classes are applied (uses default styling)</li>
        </ul>
      </div>
    </div>
  `,
  imports: [TextDirective],
})
class StoryWrapperComponent {
  public readonly textColor = input<TextColor | 'null'>('null');
  public readonly textSize = input<TextSize | 'null'>('null');

  public getTextColorValue(): TextColor | null {
    const value = this.textColor();
    return value === 'null' ? null : value;
  }

  public getTextSizeValue(): TextSize | null {
    const value = this.textSize();
    return value === 'null' ? null : value;
  }

  public getTextColorDisplay(): string {
    return this.getTextColorValue() ?? 'null';
  }

  public getTextSizeDisplay(): string {
    return this.getTextSizeValue() ?? 'null';
  }
}

type StoryArgs = {
  textColor: TextColor | 'null';
  textSize: TextSize | 'null';
};

const meta: Meta<StoryArgs> = {
  title: 'Shared UI/Core/Directives/Text',
  component: StoryWrapperComponent,
  tags: ['autodocs'],
  argTypes: {
    textColor: {
      control: {
        type: 'select',
      },
      options: ['null', ...textColors],
      description: 'Controls the text color class applied to the element',
      table: {
        type: { summary: 'TextColor | null' },
        defaultValue: { summary: 'null' },
      },
    },
    textSize: {
      control: {
        type: 'select',
      },
      options: ['null', ...textSizes],
      description: 'Controls the text size class applied to the element',
      table: {
        type: { summary: 'TextSize | null' },
        defaultValue: { summary: 'null' },
      },
    },
  },
  render: (args) => ({
    props: args,
  }),
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Interactive: Story = {
  args: {
    textColor: 'null',
    textSize: 'null',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive controls to test different combinations of text color and size.',
      },
    },
  },
};

// color variants
export const BrandColor: Story = {
  args: {
    textColor: 'brand',
    textSize: 'null',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text with brand color applied.',
      },
    },
  },
};

export const SecondaryColor: Story = {
  args: {
    textColor: 'secondary',
    textSize: 'null',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text with secondary color applied.',
      },
    },
  },
};

export const SafeColor: Story = {
  args: {
    textColor: 'safe',
    textSize: 'null',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text with safe color applied.',
      },
    },
  },
};

export const InfoColor: Story = {
  args: {
    textColor: 'info',
    textSize: 'null',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text with info color applied.',
      },
    },
  },
};

export const CautionColor: Story = {
  args: {
    textColor: 'caution',
    textSize: 'null',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text with caution color applied.',
      },
    },
  },
};

export const WarningColor: Story = {
  args: {
    textColor: 'warning',
    textSize: 'null',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text with warning color applied.',
      },
    },
  },
};

export const DangerColor: Story = {
  args: {
    textColor: 'danger',
    textSize: 'null',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text with danger color applied.',
      },
    },
  },
};

// size variants
export const ExtraSmallSize: Story = {
  args: {
    textColor: 'null',
    textSize: 'xs',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text with extra small size applied.',
      },
    },
  },
};

export const SmallSize: Story = {
  args: {
    textColor: 'null',
    textSize: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text with small size applied.',
      },
    },
  },
};

export const BaseSize: Story = {
  args: {
    textColor: 'null',
    textSize: 'base',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text with base size applied.',
      },
    },
  },
};

export const LargeSize: Story = {
  args: {
    textColor: 'null',
    textSize: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text with large size applied.',
      },
    },
  },
};

export const ExtraLargeSize: Story = {
  args: {
    textColor: 'null',
    textSize: 'xl',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text with extra large size applied.',
      },
    },
  },
};

export const TwoExtraLargeSize: Story = {
  args: {
    textColor: 'null',
    textSize: '2xl',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text with 2xl size applied.',
      },
    },
  },
};

// combined variants
export const BrandLarge: Story = {
  args: {
    textColor: 'brand',
    textSize: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text with brand color and large size.',
      },
    },
  },
};

export const DangerExtraLarge: Story = {
  args: {
    textColor: 'danger',
    textSize: 'xl',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text with danger color and extra large size.',
      },
    },
  },
};

export const SafeSmall: Story = {
  args: {
    textColor: 'safe',
    textSize: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text with safe color and small size.',
      },
    },
  },
};

// showcase all variants
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="space-y-6 p-4">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Color Variants</h3>
          <div class="space-y-1">
            <p orgText textColor="brand">Brand text color</p>
            <p orgText textColor="secondary">Secondary text color</p>
            <p orgText textColor="safe">Safe text color</p>
            <p orgText textColor="info">Info text color</p>
            <p orgText textColor="caution">Caution text color</p>
            <p orgText textColor="warning">Warning text color</p>
            <p orgText textColor="danger">Danger text color</p>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Size Variants</h3>
          <div class="space-y-1">
            <p orgText textSize="xs">Extra small text (xs)</p>
            <p orgText textSize="sm">Small text (sm)</p>
            <p orgText textSize="base">Base text (base)</p>
            <p orgText textSize="lg">Large text (lg)</p>
            <p orgText textSize="xl">Extra large text (xl)</p>
            <p orgText textSize="2xl">2xl text (2xl)</p>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Combined Variants</h3>
          <div class="space-y-1">
            <p orgText textColor="brand" textSize="lg">Brand large text</p>
            <p orgText textColor="danger" textSize="xl">Danger extra large text</p>
            <p orgText textColor="safe" textSize="sm">Safe small text</p>
            <p orgText textColor="info" textSize="2xl">Info 2xl text</p>
            <p orgText textColor="warning" textSize="xs">Warning extra small text</p>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">Default (No Styling)</h3>
          <p orgText>Text with no color or size specified</p>
        </div>
      </div>
    `,
    moduleMetadata: {
      imports: [TextDirective],
    },
  }),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive showcase of all text directive variants including colors, sizes, and combinations.',
      },
    },
  },
};

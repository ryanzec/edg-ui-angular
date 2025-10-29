import type { Meta, StoryObj } from '@storybook/angular';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';

import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import { Button } from '../../core/button/button';
import { OverlayMenu } from '../../core/overlay-menu/overlay-menu';

export type OverlayMenuPosition = 'below' | 'above' | 'before' | 'after';

@Component({
  selector: 'org-example-overlay-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkMenuTrigger, Button, OverlayMenu],
  template: `<div [class]="containerClass()">
    <org-button
      [cdkMenuTriggerFor]="menu"
      [cdkMenuPosition]="[
        {
          originX: 'start',
          originY: position() === 'below' ? 'bottom' : 'top',
          overlayX: 'start',
          overlayY: position() === 'below' ? 'top' : 'bottom',
        },
      ]"
      color="primary"
    >
      Open Menu
    </org-button>

    <ng-template #menu>
      <org-overlay-menu
        [menuItems]="[
          { id: '1', label: 'Menu Item 1', icon: 'circle' },
          { id: '2', label: 'Menu Item 2', icon: 'circle' },
          { id: '3', label: 'Menu Item 3', icon: 'circle' },
          { id: '4', label: 'Menu Item 4', icon: 'circle' },
        ]"
      />
    </ng-template>
  </div> `,
  host: {
    ['attr.data-testid']: 'example-overlay-menu',
  },
})
export class EXAMPLEOverlayMenu {
  public position = input<OverlayMenuPosition>('below');
  public containerClass = input<string>('');
}

const meta: Meta<EXAMPLEOverlayMenu> = {
  title: 'Core/Components/Overlay Menu',
  component: EXAMPLEOverlayMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Angular CDK Menu with Position Example

  A minimalistic example demonstrating Angular CDK's Menu functionality with automatic positioning using the \`cdkMenuPosition\` input. This example shows how to create accessible dropdown menus with configurable positioning.

  ### Features
  - Uses Angular CDK Menu module for accessible menus
  - Demonstrates \`cdkMenuPosition\` for automatic positioning
  - Keyboard navigation support (Arrow keys, Enter, Escape)
  - Automatic focus management
  - Click-outside to close

  ### Usage Example
  \`\`\`html
  <org-example-overlay-menu position="below" />
  \`\`\`

  ### CDK Menu Concepts
  - **cdkMenuTriggerFor**: Connects a trigger element to a menu template
  - **cdkMenu**: Marks the container as a menu with keyboard navigation
  - **cdkMenuItem**: Marks individual menu items for proper ARIA attributes
  - **cdkMenuPosition**: Configures fallback positions for the overlay
</div>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<EXAMPLEOverlayMenu>;

export const Default: Story = {
  args: {
    position: 'below',
    containerClass: '',
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['below', 'above', 'before', 'after'],
      description: 'Position of the menu relative to the trigger button',
    },
    containerClass: {
      control: 'text',
      description: 'Additional CSS classes for the container',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Default menu example with controls to adjust positioning. Click the button to open the menu.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `<org-example-overlay-menu [position]="position" [containerClass]="containerClass" />`,
    moduleMetadata: {
      imports: [EXAMPLEOverlayMenu],
    },
  }),
};

export const Positions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of different menu positions using cdkMenuPosition.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Menu Positions"
        currentState="Comparing different cdkMenuPosition configurations"
      >
        <org-storybook-example-container-section label="Below (Default)">
          <org-example-overlay-menu position="below" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Above">
          <org-example-overlay-menu position="above" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Below</strong>: Menu opens below the trigger button</li>
          <li><strong>Above</strong>: Menu opens above the trigger button</li>
          <li>Angular CDK automatically adjusts if there isn't enough space</li>
          <li>Use arrow keys to navigate, Enter to select, Escape to close</li>
          <li>Click outside the menu to close it</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [EXAMPLEOverlayMenu, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const KeyboardNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example demonstrating the built-in keyboard navigation features of CDK Menu.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Keyboard Navigation"
        currentState="Demonstrating accessible keyboard controls"
      >
        <org-storybook-example-container-section label="Try Keyboard Controls">
          <org-example-overlay-menu position="below" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="mt-1 list-inside list-disc flex flex-col gap-1">
          <li><strong>Enter/Space</strong>: Open menu when trigger is focused</li>
          <li><strong>Arrow Down/Up</strong>: Navigate between menu items</li>
          <li><strong>Enter</strong>: Activate the focused menu item</li>
          <li><strong>Escape</strong>: Close the menu</li>
          <li><strong>Tab</strong>: Close menu and move focus to next element</li>
          <li>All keyboard navigation is provided by Angular CDK</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [EXAMPLEOverlayMenu, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

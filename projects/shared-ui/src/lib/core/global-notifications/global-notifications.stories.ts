import type { Meta, StoryObj } from '@storybook/angular';
import { Component, inject, signal } from '@angular/core';
import { GlobalNotifications } from './global-notifications';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';
import { GlobalNotificationManager } from '../global-notification-manager/global-notification-manager';
import { Button } from '../button/button';

@Component({
  selector: 'org-global-notifications-default-story',
  standalone: true,
  imports: [GlobalNotifications, Button],
  template: `
    <div>
      <org-button color="primary" (click)="addNotification()"> Add Notification </org-button>
      <org-global-notifications [xPosition]="xPosition" [yPosition]="yPosition" [containerClass]="containerClass" />
    </div>
  `,
})
class GlobalNotificationsDefaultStory {
  private _globalNotificationManager = inject(GlobalNotificationManager);

  public xPosition: 'left' | 'center' | 'right' = 'center';
  public yPosition: 'top' | 'bottom' = 'top';
  public containerClass = '';

  public addNotification(): void {
    this._globalNotificationManager.add({
      message: 'This is a notification message',
      color: 'info',
      canClose: true,
      autoCloseIn: 5000,
    });
  }
}

@Component({
  selector: 'org-global-notifications-positions-story',
  standalone: true,
  imports: [GlobalNotifications, Button, StorybookExampleContainer, StorybookExampleContainerSection],
  template: `
    <org-storybook-example-container
      title="Position Variants"
      currentState="Demonstrating different position configurations"
    >
      <org-storybook-example-container-section label="Top-Left">
        <org-button color="info" (click)="showTopLeft()"> Show Top-Left Notification </org-button>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Top-Center (Default)">
        <org-button color="safe" (click)="showTopCenter()"> Show Top-Center Notification </org-button>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Top-Right">
        <org-button color="warning" (click)="showTopRight()"> Show Top-Right Notification </org-button>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Bottom-Left">
        <org-button color="danger" (click)="showBottomLeft()"> Show Bottom-Left Notification </org-button>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Bottom-Center">
        <org-button color="neutral" (click)="showBottomCenter()"> Show Bottom-Center Notification </org-button>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Bottom-Right">
        <org-button color="primary" (click)="showBottomRight()"> Show Bottom-Right Notification </org-button>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li><strong>X Position</strong>: Controls horizontal placement (left, center, right)</li>
        <li><strong>Y Position</strong>: Controls vertical placement (top, bottom)</li>
        <li><strong>Default</strong>: Positioned at top-center</li>
        <li><strong>Click buttons</strong>: Each button demonstrates a different position</li>
        <li><strong>Auto-close</strong>: All notifications auto-dismiss after 3 seconds</li>
      </ul>

      <org-global-notifications [xPosition]="xPosition()" [yPosition]="yPosition()" />
    </org-storybook-example-container>
  `,
})
class GlobalNotificationsPositionsStory {
  private _globalNotificationManager = inject(GlobalNotificationManager);

  public xPosition = signal<'left' | 'center' | 'right'>('center');
  public yPosition = signal<'top' | 'bottom'>('top');

  public showTopLeft(): void {
    this._globalNotificationManager.clear();
    this.xPosition.set('left');
    this.yPosition.set('top');
    this._globalNotificationManager.add({
      message: 'Top-Left notification',
      color: 'info',
      canClose: true,
      autoCloseIn: 3000,
    });
  }

  public showTopCenter(): void {
    this._globalNotificationManager.clear();
    this.xPosition.set('center');
    this.yPosition.set('top');
    this._globalNotificationManager.add({
      message: 'Top-Center notification',
      color: 'safe',
      canClose: true,
      autoCloseIn: 3000,
    });
  }

  public showTopRight(): void {
    this._globalNotificationManager.clear();
    this.xPosition.set('right');
    this.yPosition.set('top');
    this._globalNotificationManager.add({
      message: 'Top-Right notification',
      color: 'warning',
      canClose: true,
      autoCloseIn: 3000,
    });
  }

  public showBottomLeft(): void {
    this._globalNotificationManager.clear();
    this.xPosition.set('left');
    this.yPosition.set('bottom');
    this._globalNotificationManager.add({
      message: 'Bottom-Left notification',
      color: 'danger',
      canClose: true,
      autoCloseIn: 3000,
    });
  }

  public showBottomCenter(): void {
    this._globalNotificationManager.clear();
    this.xPosition.set('center');
    this.yPosition.set('bottom');
    this._globalNotificationManager.add({
      message: 'Bottom-Center notification',
      color: 'neutral',
      canClose: true,
      autoCloseIn: 3000,
    });
  }

  public showBottomRight(): void {
    this._globalNotificationManager.clear();
    this.xPosition.set('right');
    this.yPosition.set('bottom');
    this._globalNotificationManager.add({
      message: 'Bottom-Right notification',
      color: 'primary',
      canClose: true,
      autoCloseIn: 3000,
    });
  }
}

@Component({
  selector: 'org-global-notifications-colors-story',
  standalone: true,
  imports: [GlobalNotifications, Button, StorybookExampleContainer, StorybookExampleContainerSection],
  template: `
    <org-storybook-example-container title="Color Variants" currentState="Comparing all color options">
      <org-storybook-example-container-section label="Primary">
        <org-button color="primary" (click)="addPrimary()"> Show Primary Notification </org-button>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Secondary">
        <org-button color="secondary" (click)="addSecondary()"> Show Secondary Notification </org-button>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Neutral">
        <org-button color="neutral" (click)="addNeutral()"> Show Neutral Notification </org-button>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Safe (Success)">
        <org-button color="safe" (click)="addSafe()"> Show Safe Notification </org-button>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Info">
        <org-button color="info" (click)="addInfo()"> Show Info Notification </org-button>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Caution">
        <org-button color="caution" (click)="addCaution()"> Show Caution Notification </org-button>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Warning">
        <org-button color="warning" (click)="addWarning()"> Show Warning Notification </org-button>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Danger">
        <org-button color="danger" (click)="addDanger()"> Show Danger Notification </org-button>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li><strong>Colors</strong>: Inherited from card component color variants</li>
        <li><strong>Auto-close</strong>: All notifications auto-dismiss after 5 seconds</li>
        <li><strong>Closeable</strong>: All notifications can be manually closed</li>
      </ul>

      <org-global-notifications />
    </org-storybook-example-container>
  `,
})
class GlobalNotificationsColorsStory {
  private _globalNotificationManager = inject(GlobalNotificationManager);

  public addPrimary(): void {
    this._globalNotificationManager.add({
      message: 'This is a primary notification message',
      color: 'primary',
      canClose: true,
      autoCloseIn: 5000,
    });
  }

  public addSecondary(): void {
    this._globalNotificationManager.add({
      message: 'This is a secondary notification message',
      color: 'secondary',
      canClose: true,
      autoCloseIn: 5000,
    });
  }

  public addNeutral(): void {
    this._globalNotificationManager.add({
      message: 'This is a neutral notification message',
      color: 'neutral',
      canClose: true,
      autoCloseIn: 5000,
    });
  }

  public addSafe(): void {
    this._globalNotificationManager.add({
      message: 'This is a safe notification message',
      color: 'safe',
      canClose: true,
      autoCloseIn: 5000,
    });
  }

  public addInfo(): void {
    this._globalNotificationManager.add({
      message: 'This is an info notification message',
      color: 'info',
      canClose: true,
      autoCloseIn: 5000,
    });
  }

  public addCaution(): void {
    this._globalNotificationManager.add({
      message: 'This is a caution notification message',
      color: 'caution',
      canClose: true,
      autoCloseIn: 5000,
    });
  }

  public addWarning(): void {
    this._globalNotificationManager.add({
      message: 'This is a warning notification message',
      color: 'warning',
      canClose: true,
      autoCloseIn: 5000,
    });
  }

  public addDanger(): void {
    this._globalNotificationManager.add({
      message: 'This is a danger notification message',
      color: 'danger',
      canClose: true,
      autoCloseIn: 5000,
    });
  }
}

@Component({
  selector: 'org-global-notifications-auto-close-story',
  standalone: true,
  imports: [GlobalNotifications, Button, StorybookExampleContainer, StorybookExampleContainerSection],
  template: `
    <org-storybook-example-container
      title="Auto-close Behavior"
      currentState="Demonstrating different auto-close and manual close options"
    >
      <org-storybook-example-container-section label="Auto-close 2 seconds">
        <org-button color="info" (click)="addAutoClose2s()"> Show 2s Auto-close </org-button>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Auto-close 5 seconds">
        <org-button color="safe" (click)="addAutoClose5s()"> Show 5s Auto-close </org-button>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Auto-close 10 seconds">
        <org-button color="warning" (click)="addAutoClose10s()"> Show 10s Auto-close </org-button>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="Manual Close Only">
        <org-button color="danger" (click)="addManualClose()"> Show Manual Close Only </org-button>
      </org-storybook-example-container-section>

      <org-storybook-example-container-section label="No Close Button">
        <org-button color="neutral" (click)="addNoClose()"> Show No Close Button </org-button>
      </org-storybook-example-container-section>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li><strong>Auto-close</strong>: Configurable duration via autoCloseIn (in milliseconds)</li>
        <li><strong>Manual close</strong>: Close button appears when canClose is true</li>
        <li><strong>No auto-close</strong>: When autoCloseIn is not set, only manual close is available</li>
        <li><strong>No close</strong>: When canClose is false, notification persists without close button</li>
      </ul>

      <org-global-notifications />
    </org-storybook-example-container>
  `,
})
class GlobalNotificationsAutoCloseStory {
  private _globalNotificationManager = inject(GlobalNotificationManager);

  public addAutoClose2s(): void {
    this._globalNotificationManager.add({
      message: 'This notification will auto-close in 2 seconds',
      color: 'info',
      canClose: true,
      autoCloseIn: 2000,
    });
  }

  public addAutoClose5s(): void {
    this._globalNotificationManager.add({
      message: 'This notification will auto-close in 5 seconds',
      color: 'safe',
      canClose: true,
      autoCloseIn: 5000,
    });
  }

  public addAutoClose10s(): void {
    this._globalNotificationManager.add({
      message: 'This notification will auto-close in 10 seconds',
      color: 'warning',
      canClose: true,
      autoCloseIn: 10000,
    });
  }

  public addManualClose(): void {
    this._globalNotificationManager.add({
      message: 'This notification can only be closed manually',
      color: 'danger',
      canClose: true,
    });
  }

  public addNoClose(): void {
    this._globalNotificationManager.add({
      message: 'This notification cannot be closed',
      color: 'neutral',
      canClose: false,
    });
  }
}

const meta: Meta<GlobalNotifications> = {
  title: 'Core/Components/Global Notifications',
  component: GlobalNotifications,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Global Notifications Component

  A component for displaying global notifications that appear on top of the main interface. Notifications can be positioned at various locations and automatically dismissed after a specified duration.

  ### Features
  - Displays notifications from GlobalNotificationManager
  - Configurable horizontal position (left, center, right)
  - Configurable vertical position (top, bottom)
  - Auto-close support with configurable duration
  - Manual close button (when enabled)
  - Fade-in animations
  - Color variants through card component
  - Fixed positioning on top of UI

  ### Position Options
  - **X Position**: left, center, right (default: center)
  - **Y Position**: top, bottom (default: top)

  ### Usage Examples
  \`\`\`html
  <!-- Basic usage -->
  <org-global-notifications />

  <!-- Positioned at bottom-right -->
  <org-global-notifications xPosition="right" yPosition="bottom" />

  <!-- Add notification through manager -->
  globalNotificationManager.add({
    color: 'info',
    canClose: true,
    autoCloseIn: 5000
  });
  \`\`\`
</div>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<GlobalNotifications>;

export const Default: Story = {
  args: {
    xPosition: 'center',
    yPosition: 'top',
    containerClass: '',
  },
  argTypes: {
    xPosition: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Horizontal position of the notification container',
    },
    yPosition: {
      control: 'select',
      options: ['top', 'bottom'],
      description: 'Vertical position of the notification container',
    },
    containerClass: {
      control: 'text',
      description: 'Additional CSS classes for the notification container',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default global notifications positioned at top-center. Use the controls below to interact with the component.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `<org-global-notifications-default-story />`,
    moduleMetadata: {
      imports: [GlobalNotificationsDefaultStory],
    },
  }),
};

export const Positions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different position combinations for the notification container.',
      },
    },
  },
  render: () => ({
    template: `<org-global-notifications-positions-story />`,
    moduleMetadata: {
      imports: [GlobalNotificationsPositionsStory],
    },
  }),
};

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different color variants for notifications through the card component.',
      },
    },
  },
  render: () => ({
    template: `<org-global-notifications-colors-story />`,
    moduleMetadata: {
      imports: [GlobalNotificationsColorsStory],
    },
  }),
};

export const AutoClose: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of notifications with different auto-close durations and manual close options.',
      },
    },
  },
  render: () => ({
    template: `<org-global-notifications-auto-close-story />`,
    moduleMetadata: {
      imports: [GlobalNotificationsAutoCloseStory],
    },
  }),
};

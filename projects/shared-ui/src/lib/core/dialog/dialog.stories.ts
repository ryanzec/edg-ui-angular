import type { Meta, StoryObj } from '@storybook/angular';
import { DialogController, DialogPosition, dialogPositions } from '../../core/dialog/dialog-controller';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';
import { Button } from '../../core/button/button';
import { ChangeDetectionStrategy, Component, inject, input, ViewChild, signal } from '@angular/core';
import { DialogHeader } from '../../core/dialog/dialog-header';
import { DialogContent } from '../../core/dialog/dialog-content';
import { DialogFooter } from '../../core/dialog/dialog-footer';
import { Dialog } from '../../core/dialog/dialog';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { CheckboxToggle } from '../../core/checkbox-toggle/checkbox-toggle';

export type EXAMPLEDialogData = {
  title: string;
  message: string;
  hasRoundedCorners: boolean;
  onEscapeKeyToggle?: (enabled: boolean) => void;
};

@Component({
  standalone: true,
  selector: 'org-example-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, DialogHeader, DialogContent, DialogFooter, Dialog],
  template: `
    <org-dialog [hasRoundedCorners]="data.hasRoundedCorners">
      <org-dialog-header [title]="data.title" />
      <org-dialog-content>{{ data.message }}</org-dialog-content>
      <org-dialog-footer>
        <org-button color="neutral" (clicked)="onCancel()">Cancel</org-button>
        <org-button color="primary" (clicked)="onConfirm()">Confirm</org-button>
      </org-dialog-footer>
    </org-dialog>
  `,
  host: {
    ['attr.data-testid']: 'example-dialog-content',
  },
})
class EXAMPLEDialog {
  private readonly _dialogRef = inject(DialogRef<DialogContent>);

  protected readonly data = inject<EXAMPLEDialogData>(DIALOG_DATA);

  protected onCancel(): void {
    console.log('cancel button clicked');
    this._dialogRef.close();
  }

  protected onConfirm(): void {
    console.log('confirm button clicked');
    this._dialogRef.close();
  }
}

@Component({
  selector: 'org-example-story-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DialogController, Button],
  template: `
    <org-button (click)="openDialog()">Open Dialog</org-button>
    <org-dialog-controller
      [dialogComponent]="EXAMPLEDialogComponent"
      [position]="position()"
      [hasRoundedCorners]="hasRoundedCorners()"
      [enableCloseOnClickOutside]="enableCloseOnClickOutside()"
      [showCloseIcon]="showCloseIcon()"
      #dialogControllerComponent
    />
  `,
  host: {
    ['attr.data-testid']: 'example-story-dialog',
  },
})
export class EXAMPLEStoryDialog {
  protected readonly EXAMPLEDialogComponent = EXAMPLEDialog;

  public position = input<DialogPosition>('center');
  public enableCloseOnClickOutside = input<boolean>(false);
  public hasRoundedCorners = input<boolean>(true);
  public showCloseIcon = input<boolean>(true);

  @ViewChild('dialogControllerComponent')
  public readonly dialogControllerComponent!: DialogController<EXAMPLEDialog>;

  protected openDialog(): void {
    this.dialogControllerComponent.openDialog({
      title: 'Example Dialog',
      message: 'This is a minimalistic example of Angular CDK Dialog.',
    });
  }
}

const meta: Meta<DialogController<EXAMPLEDialog>> = {
  title: 'Core/Components/Dialog',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Angular CDK Dialog Example

  A minimalistic example demonstrating Angular CDK's Dialog functionality. This example shows how to create accessible modal dialogs with configurable positioning and backdrop.

  ### Features
  - Uses Angular CDK Dialog module for accessible modals
  - Demonstrates dialog positioning (center, top, bottom)
  - Backdrop click to close (disabled by default, can be enabled via enableCloseOnClickOutside input)
  - Keyboard support (Escape to close, controlled via enableEscapeKey input and dialogRef.disableClose for processing states)
  - Automatic focus management
  - Programmatic dialog opening and closing

  ### Usage Example
  \`\`\`html
  <org-example-dialog position="center" />
  \`\`\`

  ### CDK Dialog Concepts
  - **Dialog Service**: Programmatically opens dialogs using the inject pattern
  - **Dialog Config**: Configure backdrop, position, close behavior
  - **Dialog Reference**: Control and interact with opened dialogs
  - **Component-based Content**: Pass components as dialog content
  - **Data Passing**: Send data to dialog content via config
</div>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<DialogController<EXAMPLEDialog>>;

export const Default: Story = {
  args: {
    position: 'center',
  },
  argTypes: {
    position: {
      control: 'select',
      options: dialogPositions,
      description: 'Position of the dialog on the screen',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default dialog example with controls to adjust positioning. Click the button to open the dialog. Note: backdrop click to close is disabled by default, use Escape key to close.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `<org-example-story-dialog />`,
    moduleMetadata: {
      imports: [EXAMPLEStoryDialog],
    },
  }),
};

export const Positions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of different dialog positions using custom panel classes.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Dialog Positions"
        currentState="Comparing different dialog positioning configurations"
      >
        <org-storybook-example-container-section label="Center (Default)">
          <org-example-story-dialog position="center" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Top">
          <org-example-story-dialog position="top" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Bottom">
          <org-example-story-dialog position="bottom" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Left">
          <org-example-story-dialog position="left" [hasRoundedCorners]="false" />
        </org-storybook-example-container-section>

        <org-storybook-example-container-section label="Right">
          <org-example-story-dialog position="right" [hasRoundedCorners]="false" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="flex flex-col gap-1 mt-1 list-inside list-disc">
          <li><strong>Center</strong>: Dialog appears in the center of the screen</li>
          <li><strong>Top</strong>: Dialog appears at the top of the screen</li>
          <li><strong>Bottom</strong>: Dialog appears at the bottom of the screen</li>
          <li><strong>Left</strong>: Dialog appears at the left like a peek panel</li>
          <li><strong>Right</strong>: Dialog appears at the right like a peek panel</li>
          <li>Click the backdrop or press Escape to close the dialog</li>
          <li>Focus is automatically managed when dialog opens/closes</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [EXAMPLEStoryDialog, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

export const CloseOnClickOutsideEnabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Example demonstrating dialog with enableCloseOnClickOutside set to true. This allows users to close the dialog by clicking the backdrop, in addition to using the Escape key or action buttons.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Dialog with Close on Click Outside Enabled"
        currentState="Demonstrating backdrop click to close functionality"
      >
        <org-storybook-example-container-section label="Try Interactions">
          <org-example-story-dialog position="center" [enableCloseOnClickOutside]="true" />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="flex flex-col gap-1 mt-1 list-inside list-disc">
          <li><strong>Backdrop Click</strong>: Click outside dialog to close it (enabled in this story)</li>
          <li><strong>Escape Key</strong>: Press Escape to close the dialog</li>
          <li><strong>Confirm Button</strong>: Logs confirmation and closes dialog</li>
          <li><strong>Cancel Button</strong>: Logs cancellation and closes dialog</li>
          <li><strong>Focus Management</strong>: Focus is trapped within dialog when open</li>
          <li><strong>Navigation</strong>: Dialog closes automatically on navigation</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [EXAMPLEStoryDialog, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

@Component({
  selector: 'org-example-story-dialog-with-closed-event',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DialogController, Button],
  template: `
    <div class="flex flex-col gap-4">
      <org-button (click)="openDialog()">Open Dialog</org-button>

      @if (closeCount() > 0) {
        <div class="p-4 bg-secondary-background-subtle rounded-lg">
          <p class="text-sm font-medium">Dialog Closed Events: {{ closeCount() }}</p>
          <p class="text-xs text-text-subtle mt-1">Open and close the dialog to see the count increase</p>
        </div>
      }

      <org-dialog-controller
        [dialogComponent]="EXAMPLEDialogComponent"
        position="center"
        (closed)="onDialogClosed()"
        #dialogControllerComponent
      />
    </div>
  `,
  host: {
    ['attr.data-testid']: 'example-story-dialog-with-closed-event',
  },
})
export class EXAMPLEStoryDialogWithClosedEvent {
  protected readonly EXAMPLEDialogComponent = EXAMPLEDialog;
  protected readonly closeCount = signal(0);

  @ViewChild('dialogControllerComponent')
  public readonly dialogControllerComponent!: DialogController<EXAMPLEDialog>;

  protected openDialog(): void {
    this.dialogControllerComponent.openDialog({
      title: 'Dialog with Closed Event',
      message: 'Close this dialog to see the closed event being triggered.',
    });
  }

  protected onDialogClosed(): void {
    this.closeCount.update((count) => count + 1);
    console.log('Dialog closed event triggered. Total closes:', this.closeCount());
  }
}

export const ClosedEvent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Example demonstrating the closed output event. The dialog controller emits a closed event whenever the dialog is closed by any means (backdrop click, escape key, or programmatic close).',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Dialog with Closed Event"
        currentState="Demonstrating dialog closed event handling"
      >
        <org-storybook-example-container-section label="Try Opening and Closing">
          <org-example-story-dialog-with-closed-event />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="flex flex-col gap-1 mt-1 list-inside list-disc">
          <li><strong>Closed Event</strong>: Emitted whenever dialog closes by any means</li>
          <li><strong>Event Counter</strong>: Tracks how many times the dialog has been closed</li>
          <li><strong>Console Logging</strong>: Check console for logged close events</li>
          <li><strong>State Management</strong>: Useful for clearing selected data when dialog closes</li>
          <li><strong>Multiple Close Methods</strong>: Works with backdrop click, Escape key, and button clicks</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [EXAMPLEStoryDialogWithClosedEvent, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

@Component({
  selector: 'org-example-story-dialog-with-backdrop-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DialogController, Button, CheckboxToggle],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <org-checkbox-toggle
          name="hasBackdrop"
          value="hasBackdrop"
          [checked]="hasBackdrop()"
          (checkedChange)="onBackdropToggle($event)"
        >
          Has Backdrop
        </org-checkbox-toggle>
      </div>

      <org-button (click)="openDialog()">Open Dialog</org-button>

      <org-dialog-controller
        [dialogComponent]="EXAMPLEDialogComponent"
        [position]="hasBackdrop() ? 'center' : 'right'"
        [hasBackdrop]="hasBackdrop()"
        #dialogControllerComponent
      />
    </div>
  `,
  host: {
    ['attr.data-testid']: 'example-story-dialog-with-backdrop-toggle',
  },
})
export class EXAMPLEStoryDialogWithBackdropToggle {
  protected readonly EXAMPLEDialogComponent = EXAMPLEDialog;
  protected readonly hasBackdrop = signal(true);

  @ViewChild('dialogControllerComponent')
  public readonly dialogControllerComponent!: DialogController<EXAMPLEDialog>;

  protected openDialog(): void {
    this.dialogControllerComponent.openDialog({
      title: 'Dialog with Backdrop Toggle',
      message: 'Try toggling the backdrop setting and opening the dialog to see the difference.',
    });
  }

  protected onBackdropToggle(value: boolean): void {
    this.hasBackdrop.set(value);
  }
}

export const Backdrop: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Example demonstrating dialog with and without backdrop. Toggle the backdrop setting before opening the dialog to see how it affects the visual presentation and interaction behavior.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Dialog Backdrop Toggle"
        currentState="Demonstrating dialog with backdrop enabled/disabled"
      >
        <org-storybook-example-container-section label="Try Backdrop Toggle">
          <org-example-story-dialog-with-backdrop-toggle />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="flex flex-col gap-1 mt-1 list-inside list-disc">
          <li><strong>Backdrop Enabled</strong>: Dialog appears with a semi-transparent overlay covering the page content</li>
          <li><strong>Backdrop Disabled</strong>: Dialog appears without overlay, allowing interaction with page content behind it</li>
          <li><strong>Escape Key</strong>: Works to close dialog regardless of backdrop setting</li>
          <li><strong>Page Interaction</strong>: When backdrop is disabled, you can interact with elements behind the dialog</li>
          <li><strong>Visual Contrast</strong>: Backdrop provides visual separation and focus on the dialog content</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [EXAMPLEStoryDialogWithBackdropToggle, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

@Component({
  selector: 'org-example-story-dialog-with-close-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DialogController, Button, CheckboxToggle],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <org-checkbox-toggle
          name="showCloseIcon"
          value="showCloseIcon"
          [checked]="showCloseIcon()"
          (checkedChange)="onShowCloseIconToggle($event)"
        >
          Show Close Icon
        </org-checkbox-toggle>
      </div>

      <org-button (click)="openDialog()">Open Dialog</org-button>

      <org-dialog-controller
        [dialogComponent]="EXAMPLEDialogComponent"
        position="center"
        [showCloseIcon]="showCloseIcon()"
        #dialogControllerComponent
      />
    </div>
  `,
  host: {
    ['attr.data-testid']: 'example-story-dialog-with-close-icon',
  },
})
export class EXAMPLEStoryDialogWithCloseIcon {
  protected readonly EXAMPLEDialogComponent = EXAMPLEDialog;
  protected readonly showCloseIcon = signal(true);

  @ViewChild('dialogControllerComponent')
  public readonly dialogControllerComponent!: DialogController<EXAMPLEDialog>;

  protected openDialog(): void {
    this.dialogControllerComponent.openDialog({
      title: 'Dialog with Close Icon',
      message: 'Try toggling the close icon setting and opening the dialog to see the X button appear/disappear.',
    });
  }

  protected onShowCloseIconToggle(value: boolean): void {
    this.showCloseIcon.set(value);
  }
}

export const CloseIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Example demonstrating the close icon (X button) in the dialog. The close icon appears in the top-right corner and allows users to close the dialog. Toggle the setting before opening to control its visibility.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Dialog Close Icon"
        currentState="Demonstrating dialog close icon (X button)"
      >
        <org-storybook-example-container-section label="Try Close Icon Toggle">
          <org-example-story-dialog-with-close-icon />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="flex flex-col gap-1 mt-1 list-inside list-disc">
          <li><strong>Close Icon</strong>: X button appears in the top-right corner when enabled (default: enabled)</li>
          <li><strong>Click to Close</strong>: Clicking the X button closes the dialog</li>
          <li><strong>Toggle Setting</strong>: Use the checkbox to enable/disable the close icon before opening the dialog</li>
          <li><strong>Accessibility</strong>: Close icon has proper aria-label for screen readers</li>
          <li><strong>Styling</strong>: Matches the global-notifications pattern (text variant, neutral color)</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [EXAMPLEStoryDialogWithCloseIcon, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

@Component({
  standalone: true,
  selector: 'org-example-dialog-with-escape-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, DialogHeader, DialogContent, DialogFooter, Dialog, CheckboxToggle],
  template: `
    <org-dialog [hasRoundedCorners]="data.hasRoundedCorners">
      <org-dialog-header [title]="data.title" />
      <org-dialog-content>
        <div class="flex flex-col gap-4">
          <p>{{ data.message }}</p>

          <div class="p-4 bg-secondary-background-subtle rounded-lg">
            <p class="text-sm font-medium mb-2">Dynamic Close Control</p>
            <org-checkbox-toggle
              name="enableEscapeKey"
              value="enableEscapeKey"
              [checked]="enableEscapeKey()"
              (checkedChange)="onEnableEscapeKeyToggle($event)"
            >
              Enable Escape Key & Close Icon
            </org-checkbox-toggle>
            <p class="text-xs text-text-subtle mt-2">
              Toggle this checkbox to see the close icon (X button) become enabled/disabled in real-time. When disabled,
              it appears with reduced opacity and doesn't respond to clicks.
            </p>
          </div>
        </div>
      </org-dialog-content>
      <org-dialog-footer>
        <org-button color="neutral" (clicked)="onCancel()">Cancel</org-button>
        <org-button color="primary" (clicked)="onConfirm()">Confirm</org-button>
      </org-dialog-footer>
    </org-dialog>
  `,
  host: {
    ['attr.data-testid']: 'example-dialog-with-escape-toggle',
  },
})
class EXAMPLEDialogWithEscapeToggle {
  private readonly _dialogRef = inject(DialogRef<DialogContent>);

  protected readonly data = inject<EXAMPLEDialogData>(DIALOG_DATA);
  protected readonly enableEscapeKey = signal(true);

  protected onCancel(): void {
    console.log('cancel button clicked');
    this._dialogRef.close();
  }

  protected onConfirm(): void {
    console.log('confirm button clicked');
    this._dialogRef.close();
  }

  protected onEnableEscapeKeyToggle(value: boolean): void {
    this.enableEscapeKey.set(value);
    this.data.onEscapeKeyToggle?.(value);
  }
}

@Component({
  selector: 'org-example-story-dialog-dynamic-escape-key',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DialogController, Button],
  template: `
    <div class="flex flex-col gap-4">
      <org-button (click)="openDialog()">Open Dialog</org-button>

      <org-dialog-controller
        [dialogComponent]="EXAMPLEDialogWithEscapeToggleComponent"
        position="center"
        #dialogControllerComponent
      />
    </div>
  `,
  host: {
    ['attr.data-testid']: 'example-story-dialog-dynamic-escape-key',
  },
})
export class EXAMPLEStoryDialogDynamicEscapeKey {
  protected readonly EXAMPLEDialogWithEscapeToggleComponent = EXAMPLEDialogWithEscapeToggle;

  @ViewChild('dialogControllerComponent')
  public readonly dialogControllerComponent!: DialogController<EXAMPLEDialogWithEscapeToggle>;

  protected openDialog(): void {
    this.dialogControllerComponent.openDialog({
      title: 'Dialog with Dynamic Close Control',
      message: 'Use the toggle inside this dialog to enable/disable the escape key and close icon.',
      onEscapeKeyToggle: (enabled: boolean) => {
        this.dialogControllerComponent.setEnableEscapeKey(enabled);
      },
    });
  }
}

export const DynamicCloseControl: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Example demonstrating dynamic control of the close icon and escape key. The toggle is inside the dialog itself - use it to see the close icon (X button) become enabled/disabled in real-time. When disabled, the icon appears with reduced opacity and does not respond to clicks. The close icon state is synced with the escape key setting.',
      },
    },
  },
  render: () => ({
    template: `
      <org-storybook-example-container
        title="Dialog Dynamic Close Control"
        currentState="Demonstrating dynamic close icon and escape key control"
      >
        <org-storybook-example-container-section label="Try Dynamic Toggle">
          <org-example-story-dialog-dynamic-escape-key />
        </org-storybook-example-container-section>

        <ul expected-behaviour class="flex flex-col gap-1 mt-1 list-inside list-disc">
          <li><strong>Open Dialog</strong>: Click the button to open the dialog</li>
          <li><strong>Inside Dialog Toggle</strong>: Use the checkbox INSIDE the dialog to enable/disable escape key and close icon</li>
          <li><strong>Synchronized State</strong>: Close icon (X button) and escape key are always in sync</li>
          <li><strong>Real-time Update</strong>: Close icon becomes enabled/disabled immediately when toggled while dialog is open</li>
          <li><strong>Disabled State</strong>: When disabled, the X button appears with reduced opacity (40%) and does not respond to clicks</li>
          <li><strong>Use Case</strong>: Useful for preventing accidental closes during critical operations (like form submission)</li>
          <li><strong>Button Close</strong>: Cancel and Confirm buttons still work regardless of escape key setting</li>
        </ul>
      </org-storybook-example-container>
    `,
    moduleMetadata: {
      imports: [EXAMPLEStoryDialogDynamicEscapeKey, StorybookExampleContainer, StorybookExampleContainerSection],
    },
  }),
};

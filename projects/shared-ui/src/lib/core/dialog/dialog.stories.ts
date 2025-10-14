import type { Meta, StoryObj } from '@storybook/angular';
import { DialogController, DialogPosition, dialogPositions } from '../../core/dialog/dialog-controller';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';
import { Button } from '../../core/button/button';
import { ChangeDetectionStrategy, Component, inject, input, ViewChild } from '@angular/core';
import { DialogHeader } from '../../core/dialog/dialog-header';
import { DialogContent } from '../../core/dialog/dialog-content';
import { DialogFooter } from '../../core/dialog/dialog-footer';
import { Dialog } from '../../core/dialog/dialog';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

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
        <org-button color="neutral" (clicked)="handleCancel()">Cancel</org-button>
        <org-button color="primary" (clicked)="handleConfirm()">Confirm</org-button>
      </org-dialog-footer>
    </org-dialog>
  `,
  host: {
    dataid: 'example-dialog-content',
  },
})
class EXAMPLEDialog {
  private readonly _dialogRef = inject(DialogRef<DialogContent>);

  protected readonly data = inject<EXAMPLEDialog>(DIALOG_DATA);

  protected handleCancel(): void {
    console.log('cancel button clicked');
    this._dialogRef.close();
  }

  protected handleConfirm(): void {
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
      [dialogData]="{
        title: 'Example Dialog',
        message: 'This is a minimalistic example of Angular CDK Dialog.',
      }"
      [position]="position()"
      [hasRoundedCorners]="hasRoundedCorners()"
      [enableCloseOnClickOutside]="enableCloseOnClickOutside()"
      #dialogControllerComponent
    />
  `,
  host: {
    dataid: 'example-story-dialog',
  },
})
export class EXAMPLEStoryDialog {
  protected readonly EXAMPLEDialogComponent = EXAMPLEDialog;

  public position = input<DialogPosition>('center');
  public enableCloseOnClickOutside = input<boolean>(false);
  public hasRoundedCorners = input<boolean>(true);

  @ViewChild('dialogControllerComponent')
  public readonly dialogControllerComponent!: DialogController<EXAMPLEDialog>;

  protected openDialog(): void {
    this.dialogControllerComponent.openDialog();
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
  - Keyboard support (Escape to close, always enabled for accessibility)
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

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
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

        <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
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

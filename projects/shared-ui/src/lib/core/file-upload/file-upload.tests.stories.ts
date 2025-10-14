import type { Meta, StoryObj } from '@storybook/angular';
import { FileUploadComponent } from './file-upload';
import { expect, fn, fireEvent } from 'storybook/test';

const meta: Meta<FileUploadComponent> = {
  title: 'Core/Components/File Upload/Tests',
  component: FileUploadComponent,
  argTypes: {
    fileTypes: {
      control: 'object',
      description: 'Array of accepted file types (e.g., ["image/", "application/pdf"])',
    },
    fileUpload: {
      action: 'fileUploaded',
      description: 'Emits the selected file',
    },
  },
};

export default meta;
type Story = StoryObj<FileUploadComponent>;

export const SimulatedUpload: Story = {
  args: {
    fileTypes: [],
    fileUpload: fn(),
  },
  play: async ({ canvas, args }) => {
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const fileInput = canvas.getByTestId('file-upload-input');

    await fireEvent.change(fileInput, {
      target: { files: [file] },
    });

    await expect(args.fileUpload).toHaveBeenCalledWith(file);
  },
};

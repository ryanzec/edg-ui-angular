import type { Meta, StoryObj } from '@storybook/angular';
import { FileUploadComponent } from './file-upload';

const meta: Meta<FileUploadComponent> = {
  title: 'Shared UI/File Upload',
  component: FileUploadComponent,
  parameters: {
    layout: 'centered',
  },
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

export const AllFileTypes: Story = {
  args: {
    fileTypes: [],
  },
};

export const PrefixFileTypes: Story = {
  args: {
    fileTypes: ['image/'],
  },
};

export const SpecificFileType: Story = {
  args: {
    fileTypes: ['image/png'],
  },
};

import type { Meta, StoryObj } from '@storybook/angular';
import { FileUploadComponent } from './file-upload';

const meta: Meta<FileUploadComponent> = {
  title: 'Core/File Upload',
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
  render: (args) => ({
    props: args,
    template: `
    <div class="w-[400px]">
      <org-file-upload [fileTypes]="fileTypes" (fileUpload)="fileUpload($event)"></org-file-upload>
    </div>`,
  }),
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

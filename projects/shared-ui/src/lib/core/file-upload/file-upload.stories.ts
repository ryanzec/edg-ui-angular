import type { Meta, StoryObj } from '@storybook/angular';
import { Component, input } from '@angular/core';
import { FileUploadComponent } from './file-upload';

@Component({
  selector: 'org-story-wrapper',
  template: `
    <div class="p-4 flex flex-col gap-4">
      <h3 class="text-lg font-semibold mb-2">File Upload Component Demo</h3>

      <div class="border-2 border-dashed border-border p-4 rounded-lg">
        <div class="text-sm text-text-color mb-2">
          Accepted file types: <strong>{{ getFileTypesDisplay() }}</strong>
        </div>
        <div class="max-w-md">
          <org-file-upload [fileTypes]="fileTypes()" (fileUpload)="onFileUpload($event)"></org-file-upload>
        </div>
      </div>

      <div class="text-sm text-text-color">
        <div><strong>Expected behavior:</strong></div>
        <ul class="list-disc list-inside mt-1 flex flex-col gap-1">
          <li>When <strong>no file types specified</strong>: All file types are accepted</li>
          <li>When <strong>prefix file types</strong> (e.g., "image/"): All files matching the prefix are accepted</li>
          <li>When <strong>specific file types</strong> (e.g., "image/png"): Only exact matches are accepted</li>
          <li>Drag and drop or click to select a file</li>
          <li>Invalid file types will show an error message</li>
        </ul>
      </div>
    </div>
  `,
  imports: [FileUploadComponent],
})
class StoryWrapperComponent {
  public readonly fileTypes = input<string[]>([]);

  public getFileTypesDisplay(): string {
    const types = this.fileTypes();
    if (types.length === 0) return 'All types';

    return types.join(', ');
  }

  public onFileUpload(file: File): void {
    console.log('File uploaded:', file);
  }
}

type StoryArgs = {
  fileTypes: string[];
};

const meta: Meta<StoryArgs> = {
  title: 'Core/Components/File Upload',
  component: StoryWrapperComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## File Upload Component

  A component that provides drag-and-drop and click-to-select file upload functionality with file type validation.

  ### Features
  - Drag and drop file upload
  - Click to open file selector
  - File type validation with prefix or exact match support
  - Visual feedback for hover, uploading, success, and error states
  - Keyboard accessible (Enter key to open file selector)
  - Emits selected file through \`fileUpload\` output

  ### File Type Validation
  - **Empty array**: Accepts all file types
  - **Prefix matching**: Use "image/" to accept all image types
  - **Exact matching**: Use "image/png" to accept only PNG images
  - **Multiple types**: Provide multiple entries in the array

  ### Usage Examples
  \`\`\`html
  <!-- Accept all file types -->
  <org-file-upload [fileTypes]="[]" (fileUpload)="onUpload($event)"></org-file-upload>

  <!-- Accept all images -->
  <org-file-upload [fileTypes]="['image/']" (fileUpload)="onUpload($event)"></org-file-upload>

  <!-- Accept only PNG images -->
  <org-file-upload [fileTypes]="['image/png']" (fileUpload)="onUpload($event)"></org-file-upload>

  <!-- Accept multiple specific types -->
  <org-file-upload [fileTypes]="['image/png', 'image/jpeg', 'application/pdf']" (fileUpload)="onUpload($event)"></org-file-upload>
</div>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    fileTypes: {
      control: {
        type: 'object',
      },
      description:
        'Array of accepted file types. Supports prefix matching (e.g., "image/") or exact matching (e.g., "image/png")',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
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
    fileTypes: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive controls to test different file type configurations.',
      },
    },
  },
};

export const AllFileTypes: Story = {
  args: {
    fileTypes: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Accepts all file types when fileTypes array is empty.',
      },
    },
  },
};

export const PrefixFileTypes: Story = {
  args: {
    fileTypes: ['image/'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Accepts all files matching the "image/" prefix (all image types).',
      },
    },
  },
};

export const SpecificFileType: Story = {
  args: {
    fileTypes: ['image/png'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Accepts only PNG image files with exact type matching.',
      },
    },
  },
};

export const MultipleFileTypes: Story = {
  args: {
    fileTypes: ['image/png', 'image/jpeg', 'application/pdf'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Accepts multiple specific file types: PNG, JPEG images, and PDF documents.',
      },
    },
  },
};

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  computed,
  signal,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../icon/icon';
import { tailwindUtils } from 'projects/shared-utils/src/utils/tailwind';

@Component({
  selector: 'org-file-upload',
  standalone: true,
  imports: [CommonModule, Icon],
  templateUrl: './file-upload.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(dragover)': 'onDragOver($event)',
    '(dragleave)': 'onDragLeave($event)',
    '(drop)': 'onDrop($event)',
    '(keydown)': 'keyPress($event)',
  },
})
export class FileUploadComponent {
  public readonly fileUpload = output<File>();

  public fileTypes = input<string[]>([] as string[]);

  public mergeClasses = tailwindUtils.merge;

  protected fileName = signal<string | undefined>(undefined);
  protected isHovering = signal(false);
  protected progress = signal(0);
  protected error = signal<string | undefined>(undefined);

  protected isUploading = computed(() => this.progress() > 0 && this.progress() < 100);

  @ViewChild('fileInput')
  private readonly _inputRef!: ElementRef<HTMLInputElement>;

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.isHovering.set(true);
  }

  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.isHovering.set(false);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.isHovering.set(false);

    const file = event.dataTransfer?.files[0];

    this._onFile(file);
  }

  protected keyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.openFileSelector();
    }
  }

  protected onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this._onFile(file);
  }

  protected openFileSelector(): void {
    if (this.isUploading()) return;

    this._inputRef.nativeElement.click();
  }

  private _isFileValid(file: File): boolean {
    return this.fileTypes().length === 0 || this.fileTypes().some((type) => file.type.startsWith(type));
  }

  private _onFile(file: File | undefined): void {
    if (!file) {
      this.error.set('No file was selected.');

      return;
    }

    if (!this._isFileValid(file)) {
      this.error.set(`Invalid file type. Please select a ${this.fileTypes()} file.`);

      return;
    }

    this.fileName.set(file.name);
    this.error.set(undefined);
    this.fileUpload.emit(file);
  }

  // private simulateUpload(): void {
  //   this.progress.set(1);
  //   const interval = setInterval(() => {
  //     this.progress.update((p) => {
  //       const newProgress = p + 10;
  //       if (newProgress >= 100) {
  //         clearInterval(interval);
  //         return 100;
  //       }
  //       return newProgress;
  //     });
  //   }, 2000);
  // }
}

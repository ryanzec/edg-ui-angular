import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  computed,
  effect,
  signal,
  input,
} from '@angular/core';
import { output } from '@angular/core'; // Use the new output function
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'org-file-upload',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatIconModule],
  templateUrl: './file-upload.html',
  styleUrls: ['./file-upload.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  public readonly fileUpload = output<File>();

  public fileTypes = input<string[]>([] as string[]);

  protected fileName = signal<string | undefined>(undefined);
  protected isHovering = signal(false);
  protected progress = signal(0);
  protected error = signal<string | undefined>(undefined);

  protected isUploading = computed(() => this.progress() > 0 && this.progress() < 100);

  @ViewChild('fileInput')
  private readonly input!: ElementRef<HTMLInputElement>;

  constructor() {
    // Example of an effect to react to signal changes
    effect(() => {
      console.log(`File name changed to: ${this.fileName()}`);
    });
  }

  @HostListener('dragover', ['$event'])
  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.isHovering.set(true);
  }

  @HostListener('dragleave', ['$event'])
  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.isHovering.set(false);
  }

  @HostListener('drop', ['$event'])
  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.isHovering.set(false);

    const file = event.dataTransfer?.files[0];

    this.handleFile(file);
  }

  @HostListener('keydown', ['$event'])
  protected keyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.openFileSelector();
    }
  }

  protected onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.handleFile(file);
  }

  protected openFileSelector(): void {
    if (this.isUploading()) return;

    this.input.nativeElement.click();
  }

  private isFileValid(file: File): boolean {
    return this.fileTypes().length === 0 || this.fileTypes().some((type) => file.type.startsWith(type));
  }

  private handleFile(file: File | undefined): void {
    if (!file) {
      this.error.set('No file was selected.');
      return;
    }

    if (!this.isFileValid(file)) {
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

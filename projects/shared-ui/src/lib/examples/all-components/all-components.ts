import { Component, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

// Angular Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { CommonModule } from '@angular/common';
import { CdkTreeModule } from '@angular/cdk/tree';

type DemoDialogData = {
  title: string;
  message: string;
};

@Component({
  selector: 'org-demo-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p>{{ data.message }}</p>
      <mat-form-field class="w-full">
        <mat-label>Your feedback</mat-label>
        <textarea matInput placeholder="Enter your feedback here..."></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions [align]="'end'">
      <button matButton="outlined" mat-dialog-close>Cancel</button>
      <button matButton="filled" [mat-dialog-close]="true" color="primary">Submit</button>
    </mat-dialog-actions>
  `,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule],
})
export class DemoDialogComponent {
  data = inject<DemoDialogData>(MAT_DIALOG_DATA);
}

@Component({
  selector: 'org-material-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    MatStepperModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatTreeModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatBadgeModule,
    MatBottomSheetModule,
    CdkTreeModule,
    DemoDialogComponent,
  ],
  templateUrl: './all-components.html',
})
export class MaterialShowcaseComponent {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  public value = '';

  // Signals for reactive state
  selectedValue = signal('option1');
  sliderValue = signal(50);
  toggleValue = signal(false);
  stepperIndex = signal(0);
  progressValue = signal(40);
  isLoading = signal(false);
  sidenavOpened = signal(false);

  // Form controls
  demoForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    category: new FormControl(''),
    autocomplete: new FormControl(''),
    agreement: new FormControl(false),
    gender: new FormControl(''),
    birthDate: new FormControl(''),
    description: new FormControl(''),
  });

  // Data for components
  options = [
    { value: 'option1', label: 'First Option' },
    { value: 'option2', label: 'Second Option' },
    { value: 'option3', label: 'Third Option' },
  ];

  autocompleteOptions = ['Angular', 'React', 'Vue', 'Svelte', 'Next.js', 'Nuxt.js'];

  filteredOptions = computed(() => {
    const filterValue = this.demoForm.get('autocomplete')?.value?.toLowerCase() || '';
    return this.autocompleteOptions.filter((option) => option.toLowerCase().includes(filterValue));
  });

  chips = signal(['Angular', 'Material', 'TypeScript']);

  tableData = new MatTableDataSource([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Analyst' },
  ]);

  displayedColumns = ['id', 'name', 'email', 'role'];

  // Tree data and control
  treeControl = new NestedTreeControl<{ name: string; children?: { name: string }[] }>(
    (node) => node.children
  );
  treeDataSource = new MatTreeNestedDataSource<{ name: string; children?: { name: string }[] }>();

  treeData = [
    {
      name: 'Frontend',
      children: [{ name: 'Angular' }, { name: 'React' }, { name: 'Vue' }],
    },
    {
      name: 'Backend',
      children: [{ name: 'Node.js' }, { name: 'Python' }, { name: 'Java' }],
    },
  ];

  constructor() {
    this.treeDataSource.data = this.treeData;
  }

  // Event handlers
  openDialog() {
    const dialogRef = this.dialog.open(DemoDialogComponent, {
      width: '500px',
      data: {
        title: 'Demo Dialog',
        message: 'This is a demonstration of Angular Material Dialog component.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.showSnackBar('Dialog result: Submitted');
      }
    });
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  simulateLoading() {
    this.isLoading.set(true);
    this.progressValue.set(0);

    const interval = setInterval(() => {
      const current = this.progressValue();
      if (current >= 100) {
        clearInterval(interval);
        this.isLoading.set(false);
        this.showSnackBar('Loading completed!');
      } else {
        this.progressValue.set(current + 10);
      }
    }, 200);
  }

  addChip(event: Event & { target: EventTarget | null }) {
    const targetElement = event.target as HTMLInputElement;

    if (!targetElement) {
      // @todo(logging)

      return;
    }

    const value = (targetElement.value || '').trim();

    if (value) {
      this.chips.update((chips) => [...chips, value]);

      targetElement.value = '';
    }
  }

  removeChip(chip: string) {
    this.chips.update((chips) => chips.filter((c) => c !== chip));
  }

  onSliderChange(value: number) {
    this.sliderValue.set(value);
  }

  onToggleChange(event: { checked: boolean }) {
    this.toggleValue.set(event.checked);
  }

  hasChild(index: number, node: { children?: unknown[] }) {
    return !!node.children && node.children.length > 0;
  }

  toggleSidenav() {
    this.sidenavOpened.update((opened) => !opened);
  }
}

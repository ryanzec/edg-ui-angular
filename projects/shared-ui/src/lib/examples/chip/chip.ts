import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipInputEvent } from '@angular/material/chips';
import { isEqual } from 'es-toolkit';
import { ComponentColorDirective } from '../../core/component-color-directive/component-color-directive';

@Component({
  selector: 'org-example-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    ComponentColorDirective,
  ],
  templateUrl: './chip.html',
  styleUrl: './chip.scss',
})
export class EXAMPLEChip {
  // Static chips data
  public staticChips = ['Angular', 'TypeScript', 'Material Design', 'RxJS'];

  // Selection chips data
  public selectionChips = signal(
    [
      { name: 'Angular', selected: false },
      { name: 'React', selected: true },
      { name: 'Vue', selected: false },
      { name: 'Svelte', selected: false },
    ],
    {
      equal: isEqual,
    }
  );
  protected readonly selectedSelectionChips = computed(() =>
    this.selectionChips()
      .filter((chip) => chip.selected)
      .map((chip) => chip.name)
  );

  // Multi-selection chips data
  public multiSelectionChips = signal(
    [
      { name: 'Frontend', selected: true },
      { name: 'Backend', selected: false },
      { name: 'DevOps', selected: true },
      { name: 'Mobile', selected: false },
    ],
    {
      equal: isEqual,
    }
  );

  // Dynamic chips data (for input)
  public dynamicChips = signal(['TypeScript', 'Angular', 'Material'], {
    equal: isEqual,
  });

  // Chips with icons data
  public iconChips = [
    { name: 'John Doe', icon: 'person', removable: true },
    { name: 'Jane Smith', icon: 'person', removable: true },
    { name: 'Bob Johnson', icon: 'person', removable: false },
  ];

  public onSingleSelectionChange(event: MatChipListboxChange): void {
    this.selectionChips.update((chips) => {
      return chips.map((chip) => ({
        ...chip,
        selected: event.value === chip.name,
      }));
    });
  }

  public onMultiSelectionChange(event: MatChipListboxChange): void {
    this.multiSelectionChips.update((chips) => {
      return chips.map((chip) => ({
        ...chip,
        selected: event.value.includes(chip.name),
      }));
    });
  }

  public addChip(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.dynamicChips.update((chips) => [...chips, value]);
    }

    event.chipInput!.clear();
  }

  public removeChip(indexToRemove: number): void {
    this.dynamicChips.update((chips) => chips.filter((_, index) => index !== indexToRemove));
  }

  public removeIconChip(index: number): void {
    this.iconChips.splice(index, 1);
  }
}

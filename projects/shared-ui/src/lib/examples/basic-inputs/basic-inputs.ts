import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTimepickerModule } from '@angular/material/timepicker';

@Component({
  selector: 'org-example-basic-inputs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
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
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTimepickerModule,
  ],
  templateUrl: './basic-inputs.html',
})
export class BasicInputsComponent {
  public categoryOptions = [
    { value: 'option1', label: 'First Option' },
    { value: 'option2', label: 'Second Option' },
    { value: 'option3', label: 'Third Option' },
  ];

  public sliderValue = signal(50);
  public sliderStartValue = signal(40);
  public sliderEndValue = signal(60);

  public toggleValue = signal(false);

  private autocompleteOptions = ['Angular', 'React', 'Vue', 'Svelte', 'Next.js', 'Nuxt.js'];

  demoForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    category: new FormControl(''),
    autocomplete: new FormControl(''),
    agreement: new FormControl(false),
    gender: new FormControl(''),
    birthDate: new FormControl(''),
    description: new FormControl(''),
    time: new FormControl(''),
  });

  private autoCompleteValue = toSignal(this.demoForm.get('autocomplete')!.valueChanges, {
    initialValue: '',
  });

  public filteredOptions = computed(() => {
    const filterValue = this.autoCompleteValue()?.toLowerCase() || '';

    return this.autocompleteOptions.filter((option) => option.toLowerCase().includes(filterValue));
  });

  public updateSliderValue(value: number) {
    this.sliderValue.set(value);
  }

  public updateSliderStartValue(value: number) {
    this.sliderStartValue.set(value);
  }

  public updateSliderEndValue(value: number) {
    this.sliderEndValue.set(value);
  }

  public updateToggleValue(event: { checked: boolean }) {
    this.toggleValue.set(event.checked);
  }
}

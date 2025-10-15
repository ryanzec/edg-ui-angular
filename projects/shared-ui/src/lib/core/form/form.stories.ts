import type { Meta, StoryObj } from '@storybook/angular';
import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { DateTime } from 'luxon';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';
import { Input } from '../input/input';
import { Textarea } from '../textarea/textarea';
import { Checkbox } from '../checkbox/checkbox';
import { CheckboxToggle } from '../checkbox-toggle/checkbox-toggle';
import { Radio } from '../radio/radio';
import { RadioGroup } from '../radio/radio-group';
import { Button } from '../button/button';
import { Combobox } from '../combobox/combobox';
import { type ComboboxOptionInput } from '../combobox-store/combobox-store';
import { DatePickerInput } from '../date-picker-input/date-picker-input';

const skillOptions: ComboboxOptionInput[] = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Angular', value: 'angular' },
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Node.js', value: 'nodejs' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
];

@Component({
  selector: 'org-reactive-form-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    StorybookExampleContainer,
    StorybookExampleContainerSection,
    Input,
    Textarea,
    Checkbox,
    CheckboxToggle,
    Radio,
    RadioGroup,
    Button,
    Combobox,
    DatePickerInput,
  ],
  template: `
    <org-storybook-example-container
      title="Reactive Forms Integration"
      currentState="All form controls work with Angular reactive forms"
    >
      <org-storybook-example-container-section label="Complete Form Example">
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-1 max-w-[500px]">
          <!-- input field -->
          <div class="flex flex-col gap-1">
            <label for="username" class="text-sm font-medium">Username *</label>
            <org-input
              formControlName="username"
              name="username"
              placeholder="Enter your username"
              [validationMessage]="getFieldError('username')"
            />
          </div>

          <!-- email input field -->
          <div class="flex flex-col gap-1">
            <label for="email" class="text-sm font-medium">Email *</label>
            <org-input
              type="email"
              formControlName="email"
              name="email"
              placeholder="Enter your email"
              preIcon="envelope"
              [validationMessage]="getFieldError('email')"
            />
          </div>

          <!-- textarea field -->
          <div class="flex flex-col gap-1">
            <label for="bio" class="text-sm font-medium">Bio (max 200 chars)</label>
            <org-textarea
              formControlName="bio"
              name="bio"
              placeholder="Tell us about yourself..."
              [rows]="4"
              [validationMessage]="getFieldError('bio')"
            />
          </div>

          <!-- checkbox field -->
          <div class="flex flex-col gap-1">
            <org-checkbox
              formControlName="agreeToTerms"
              name="terms"
              value="agree"
              [validationMessage]="getFieldError('agreeToTerms')"
            >
              I agree to the terms and conditions *
            </org-checkbox>
          </div>

          <!-- checkbox toggle field -->
          <div class="flex flex-col gap-1">
            <org-checkbox-toggle
              formControlName="notifications"
              name="notifications"
              value="on"
              onIcon="bell"
              offIcon="bell-slash"
              onText="On"
              offText="Off"
            >
              Enable notifications
            </org-checkbox-toggle>
          </div>

          <!-- radio group -->
          <div class="flex flex-col gap-2">
            <label for="contactMethod" class="text-sm font-medium">Preferred Contact Method *</label>
            <org-radio-group
              formControlName="contactMethod"
              name="contactMethod"
              [validationMessage]="getFieldError('contactMethod')"
            >
              <org-radio value="email">Email</org-radio>
              <org-radio value="phone">Phone</org-radio>
              <org-radio value="sms">SMS</org-radio>
            </org-radio-group>
          </div>

          <!-- combobox field -->
          <div class="flex flex-col gap-1">
            <label for="skills" class="text-sm font-medium">Skills *</label>
            <org-combobox
              formControlName="skills"
              [options]="skillOptions"
              [isMultiSelect]="true"
              placeholder="Select your skills..."
              [validationMessage]="getFieldError('skills')"
            />
          </div>

          <!-- date range field -->
          <div class="flex flex-col gap-1">
            <label for="dateRange" class="text-sm font-medium">Date Range *</label>
            <org-date-picker-input
              formControlName="dateRange"
              [allowRangeSelection]="true"
              placeholder="Select date range..."
              [validationMessage]="getFieldError('dateRange')"
            />
          </div>

          <!-- submit button -->
          <org-button type="submit" color="primary" buttonClass="w-full"> Submit Form </org-button>
        </form>
      </org-storybook-example-container-section>

      <div class="flex gap-1">
        <!-- form state display -->
        <div class="rounded-md bg-neutral-background-subtle p-3 text-sm">
          <div class="font-medium mb-2">Form State:</div>
          <div class="flex flex-col gap-1 text-xs font-mono">
            <div>Valid: {{ form.valid }}</div>
            <div>Dirty: {{ form.dirty }}</div>
            <div>Touched: {{ form.touched }}</div>
            <div>Pristine: {{ form.pristine }}</div>
          </div>
        </div>

        <!-- current form values display -->
        <div class="rounded-md bg-info-background-subtle p-3 text-sm">
          <div class="font-medium mb-2">Current Form Values:</div>
          <div class="flex flex-col gap-1 text-xs font-mono">
            <div>username: "{{ formValues().username }}"</div>
            <div>email: "{{ formValues().email }}"</div>
            <div>bio: "{{ formValues().bio }}"</div>
            <div>agreeToTerms: {{ formValues().agreeToTerms }}</div>
            <div>notifications: {{ formValues().notifications }}</div>
            <div>contactMethod: "{{ formValues().contactMethod }}"</div>
            <div>skills: {{ formValues().skills.length }} selected</div>
            <div>dateRange: {{ formatDateRange(formValues().dateRange) }}</div>
          </div>
        </div>
      </div>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li><strong>Input</strong>: Binds to form control with 'formControlName', displays validation messages</li>
        <li><strong>Textarea</strong>: Multi-line text input with character limit validation</li>
        <li><strong>Checkbox</strong>: Boolean form control with required validation support</li>
        <li><strong>Checkbox Toggle</strong>: Alternative checkbox style with icon/text support</li>
        <li><strong>Radio Group</strong>: Radio button group with single selection validation</li>
        <li><strong>Combobox</strong>: Multi-select autocomplete with array value support</li>
        <li><strong>Date Picker</strong>: Date range selection with validation and reactive forms integration</li>
        <li><strong>Validation</strong>: All controls show errors when dirty or touched</li>
        <li><strong>Form State</strong>: Track valid, dirty, touched, and pristine states</li>
        <li><strong>Form Values</strong>: Live display of current form values updates as you type/interact</li>
        <li><strong>Submission</strong>: Form submission prevented until all validations pass</li>
      </ul>
    </org-storybook-example-container>
  `,
})
class ReactiveFormDemoComponent {
  public readonly skillOptions = skillOptions;

  public readonly form = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    bio: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(200)],
    }),
    agreeToTerms: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),
    notifications: new FormControl(true, {
      nonNullable: true,
    }),
    contactMethod: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    skills: new FormControl<(string | number)[]>([], {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(1)],
    }),
    dateRange: new FormControl<{ startDate: DateTime | null; endDate: DateTime | null }>(
      { startDate: null, endDate: null },
      {
        nonNullable: true,
        validators: [this.dateRangeValidator],
      }
    ),
  });

  public readonly formValues = signal(this.form.getRawValue());

  constructor() {
    // subscribe to form value changes and update signal
    this.form.valueChanges.subscribe(() => {
      this.formValues.set(this.form.getRawValue());
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.getRawValue());
    } else {
      this.form.markAllAsTouched();
      console.log('Form is invalid:', this.form.errors);
    }
  }

  public getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);

    console.log('field', fieldName, field?.dirty, field?.touched);

    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName} is required`;
      }

      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }

      if (field.errors['minlength']) {
        return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }

      if (field.errors['maxlength']) {
        return `${fieldName} must be less than ${field.errors['maxlength'].requiredLength} characters`;
      }

      if (field.errors['dateRangeRequired']) {
        return 'Both start and end dates are required';
      }
    }

    return '';
  }

  public formatDateRange(dateRange: { startDate: DateTime | null; endDate: DateTime | null }): string {
    if (!dateRange.startDate && !dateRange.endDate) {
      return 'None';
    }

    const start = dateRange.startDate ? dateRange.startDate.toISO() : 'None';
    const end = dateRange.endDate ? dateRange.endDate.toISO() : 'None';

    return `${start} - ${end}`;
  }

  private dateRangeValidator(control: AbstractControl): Record<string, boolean> | null {
    const value = control.value as { startDate: DateTime | null; endDate: DateTime | null };

    if (!value.startDate || !value.endDate) {
      return { dateRangeRequired: true };
    }

    return null;
  }
}

@Component({
  selector: 'org-simple-binding-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    StorybookExampleContainer,
    StorybookExampleContainerSection,
    Input,
    Textarea,
    Checkbox,
    CheckboxToggle,
    Radio,
    RadioGroup,
    Button,
    Combobox,
    DatePickerInput,
  ],
  template: `
    <org-storybook-example-container
      title="Simple Data Binding"
      currentState="All form controls work with simple two-way binding"
    >
      <org-storybook-example-container-section label="Complete Form Example">
        <form (submit)="onSubmit($event)" class="flex flex-col gap-1 max-w-[500px]">
          <!-- input field -->
          <div class="flex flex-col gap-1">
            <label for="username" class="text-sm font-medium">Username *</label>
            <org-input
              [(value)]="username"
              name="username"
              placeholder="Enter your username"
              [validationMessage]="usernameError()"
            />
          </div>

          <!-- email input field -->
          <div class="flex flex-col gap-1">
            <label for="email" class="text-sm font-medium">Email *</label>
            <org-input
              type="email"
              [(value)]="email"
              name="email"
              placeholder="Enter your email"
              preIcon="envelope"
              [validationMessage]="emailError()"
            />
          </div>

          <!-- textarea field -->
          <div class="flex flex-col gap-1">
            <label for="bio" class="text-sm font-medium">Bio *</label>
            <org-textarea
              [(value)]="bio"
              name="bio"
              placeholder="Tell us about yourself..."
              [rows]="4"
              [validationMessage]="bioError()"
            />
          </div>

          <!-- checkbox field -->
          <div class="flex flex-col gap-1">
            <org-checkbox
              [(checked)]="agreeToTerms"
              name="agreeToTerms"
              value="agree"
              [validationMessage]="agreeToTermsError()"
            >
              I agree to the terms and conditions *
            </org-checkbox>
          </div>

          <!-- checkbox toggle field -->
          <div class="flex flex-col gap-1">
            <org-checkbox-toggle
              [(checked)]="notifications"
              name="notifications"
              value="on"
              onIcon="bell"
              offIcon="bell-slash"
              onText="On"
              offText="Off"
              [validationMessage]="notificationsError()"
            >
              Enable notifications *
            </org-checkbox-toggle>
          </div>

          <!-- radio group -->
          <div class="flex flex-col gap-2">
            <label for="contactMethod" class="text-sm font-medium">Preferred Contact Method *</label>
            <org-radio-group
              [(value)]="contactMethod"
              name="contactMethod"
              class="flex flex-col gap-2"
              [validationMessage]="contactMethodError()"
            >
              <org-radio value="email">Email</org-radio>
              <org-radio value="phone">Phone</org-radio>
              <org-radio value="sms">SMS</org-radio>
            </org-radio-group>
          </div>

          <!-- combobox field -->
          <div class="flex flex-col gap-1">
            <label for="skills" class="text-sm font-medium">Skills *</label>
            <org-combobox
              [options]="skillOptions"
              [isMultiSelect]="true"
              placeholder="Select your skills..."
              [validationMessage]="skillsError()"
              (selectedValuesChanged)="skills.set($event)"
            />
          </div>

          <!-- date range field -->
          <div class="flex flex-col gap-1">
            <label for="dateRange" class="text-sm font-medium">Date Range *</label>
            <org-date-picker-input
              [allowRangeSelection]="true"
              [selectedStartDate]="startDate()"
              [selectedEndDate]="endDate()"
              placeholder="Select date range..."
              [validationMessage]="dateRangeError()"
              (dateSelected)="handleDateSelected($event)"
            />
          </div>

          <!-- submit button -->
          <org-button type="submit" color="primary" buttonClass="w-full"> Submit Form </org-button>
        </form>
      </org-storybook-example-container-section>

      <div class="flex gap-1">
        <!-- form state display -->
        <div class="rounded-md bg-neutral-background-subtle p-3 text-sm">
          <div class="font-medium mb-2">Form State:</div>
          <div class="flex flex-col gap-1 text-xs font-mono">
            <div>Valid: {{ isFormValid() }}</div>
            <div>Submitted: {{ submitted() }}</div>
          </div>
        </div>

        <!-- current form values display -->
        <div class="rounded-md bg-info-background-subtle p-3 text-sm">
          <div class="font-medium mb-2">Current Form Values:</div>
          <div class="flex flex-col gap-1 text-xs font-mono">
            <div>username: "{{ username() }}"</div>
            <div>email: "{{ email() }}"</div>
            <div>bio: "{{ bio() }}"</div>
            <div>agreeToTerms: {{ agreeToTerms() }}</div>
            <div>notifications: {{ notifications() }}</div>
            <div>contactMethod: "{{ contactMethod() }}"</div>
            <div>skills: {{ skills().length }} selected</div>
            <div>dateRange: {{ formatDateRange() }}</div>
          </div>
        </div>
      </div>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li><strong>Input</strong>: Two-way binding with [(value)], displays validation on submit</li>
        <li><strong>Textarea</strong>: Multi-line text input with required validation</li>
        <li><strong>Checkbox</strong>: Boolean control with [(checked)] two-way binding and required validation</li>
        <li>
          <strong>Checkbox Toggle</strong>: Alternative checkbox style with icon/text support and required validation
        </li>
        <li><strong>Radio Group</strong>: Radio button group with [(value)] two-way binding and required validation</li>
        <li><strong>Combobox</strong>: Multi-select autocomplete with event binding and required validation</li>
        <li><strong>Date Picker</strong>: Date range selection with event binding and required validation</li>
        <li><strong>Validation</strong>: All fields show errors after form submission attempt</li>
        <li><strong>Form Submission</strong>: Prevented when form has validation errors</li>
        <li><strong>Form Values</strong>: Live display updates as you type/interact using signals</li>
        <li><strong>No FormControl needed</strong>: Uses signals and two-way binding instead</li>
      </ul>
    </org-storybook-example-container>
  `,
})
class SimpleBindingDemoComponent {
  public readonly skillOptions = skillOptions;

  // form values as signals
  public username = signal('');
  public email = signal('');
  public bio = signal('');
  public agreeToTerms = signal(false);
  public notifications = signal(false);
  public contactMethod = signal('');
  public skills = signal<(string | number)[]>([]);
  public startDate = signal<DateTime | null>(null);
  public endDate = signal<DateTime | null>(null);
  public submitted = signal(false);

  // computed validation helpers
  public isValidEmail = computed<boolean>(() => {
    const emailValue = this.email();

    if (!emailValue.trim()) {
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(emailValue);
  });

  // computed validation errors
  public usernameError = computed<string>(() => {
    if (!this.submitted()) {
      return '';
    }

    if (!this.username().trim()) {
      return 'Username is required';
    }

    if (this.username().trim().length < 3) {
      return 'Username must be at least 3 characters';
    }

    return '';
  });

  public emailError = computed<string>(() => {
    if (!this.submitted()) {
      return '';
    }

    if (!this.email().trim()) {
      return 'Email is required';
    }

    if (!this.isValidEmail()) {
      return 'Please enter a valid email address';
    }

    return '';
  });

  public bioError = computed<string>(() => {
    if (!this.submitted()) {
      return '';
    }

    if (!this.bio().trim()) {
      return 'Bio is required';
    }

    return '';
  });

  public agreeToTermsError = computed<string>(() => {
    if (this.submitted() && !this.agreeToTerms()) {
      return 'You must agree to the terms and conditions';
    }

    return '';
  });

  public notificationsError = computed<string>(() => {
    if (this.submitted() && !this.notifications()) {
      return 'You must enable notifications';
    }

    return '';
  });

  public contactMethodError = computed<string>(() => {
    if (this.submitted() && !this.contactMethod().trim()) {
      return 'Please select a contact method';
    }

    return '';
  });

  public skillsError = computed<string>(() => {
    if (this.submitted() && this.skills().length === 0) {
      return 'At least one skill is required';
    }

    return '';
  });

  public dateRangeError = computed<string>(() => {
    if (!this.submitted()) {
      return '';
    }

    if (!this.startDate() || !this.endDate()) {
      return 'Both start and end dates are required';
    }

    return '';
  });

  public isFormValid = computed<boolean>(() => {
    return (
      this.username().trim().length >= 3 &&
      this.isValidEmail() &&
      this.bio().trim().length > 0 &&
      this.agreeToTerms() &&
      this.notifications() &&
      this.contactMethod().trim().length > 0 &&
      this.skills().length > 0 &&
      this.startDate() !== null &&
      this.endDate() !== null
    );
  });

  public onSubmit(event: Event): void {
    event.preventDefault();
    this.submitted.set(true);

    console.log('Form validation state:', {
      username: this.username(),
      usernameValid: this.username().trim().length >= 3,
      email: this.email(),
      emailValid: this.isValidEmail(),
      bio: this.bio(),
      bioValid: this.bio().trim().length > 0,
      agreeToTerms: this.agreeToTerms(),
      notifications: this.notifications(),
      contactMethod: this.contactMethod(),
      contactMethodValid: this.contactMethod().trim().length > 0,
      skills: this.skills(),
      skillsValid: this.skills().length > 0,
      startDate: this.startDate(),
      endDate: this.endDate(),
      isFormValid: this.isFormValid(),
    });

    if (!this.isFormValid()) {
      console.log('Form is invalid - submission prevented');

      return;
    }

    console.log('Form submitted successfully:', {
      username: this.username(),
      email: this.email(),
      bio: this.bio(),
      agreeToTerms: this.agreeToTerms(),
      notifications: this.notifications(),
      contactMethod: this.contactMethod(),
      skills: this.skills(),
      startDate: this.startDate()?.toISO(),
      endDate: this.endDate()?.toISO(),
    });
  }

  public handleDateSelected(dates: { startDate: DateTime | null; endDate: DateTime | null }): void {
    console.log('Date selected:', dates);
    this.startDate.set(dates.startDate);
    this.endDate.set(dates.endDate);
  }

  public formatDateRange(): string {
    if (!this.startDate() && !this.endDate()) {
      return 'None';
    }

    const start = this.startDate() ? this.startDate()!.toISO() : 'None';
    const end = this.endDate() ? this.endDate()!.toISO() : 'None';

    return `${start} - ${end}`;
  }
}

const meta: Meta = {
  title: 'Core/Form',
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Reactive Forms Example

  This example demonstrates how all form controls work with Angular's reactive forms system.

  ### Features
  - Full reactive forms integration with \`formControlName\`
  - Validation support across all form controls
  - Form state management (dirty, touched, valid)
  - Error message display
  - Form submission handling

  ### Included Form Controls
  - **Input**: Text input fields with validation
  - **Textarea**: Multi-line text input
  - **Checkbox**: Standard checkbox controls
  - **Checkbox Toggle**: Toggle-style checkbox
  - **Radio Group**: Radio button groups for single selection

  ### Usage Pattern
  \`\`\`typescript
  public form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    agreeToTerms: new FormControl(false, [Validators.requiredTrue]),
    notifications: new FormControl(true),
    contactMethod: new FormControl('', [Validators.required]),
  });
  \`\`\`

  \`\`\`html
  <form [formGroup]="form" (ngSubmit)="submit()">
    <org-input formControlName="username" placeholder="Username" />
    <org-textarea formControlName="description" placeholder="Description" />
    <org-checkbox formControlName="agreeToTerms" name="terms" value="agree">
      I agree to terms
    </org-checkbox>
    <org-checkbox-toggle formControlName="notifications" name="notifications" value="on">
      Enable notifications
    </org-checkbox-toggle>
    <org-radio-group formControlName="contactMethod" name="contact">
      <org-radio value="email">Email</org-radio>
      <org-radio value="phone">Phone</org-radio>
      <org-radio value="sms">SMS</org-radio>
    </org-radio-group>
  </form>
  \`\`\`
</div>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const ReactiveForms: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive form demonstrating all form controls working with Angular reactive forms. Try submitting the form to see validation in action.',
      },
    },
  },
  render: () => ({
    template: `<org-reactive-form-demo />`,
    moduleMetadata: {
      imports: [ReactiveFormDemoComponent],
    },
  }),
};

export const SimpleBinding: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A comprehensive form demonstrating all form controls working with simple two-way data binding using signals. This approach is simpler for basic forms that don't need the full power of reactive forms.",
      },
    },
  },
  render: () => ({
    template: `<org-simple-binding-demo />`,
    moduleMetadata: {
      imports: [SimpleBindingDemoComponent],
    },
  }),
};

import type { Meta, StoryObj } from '@storybook/angular';
import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';
import { Input } from '../input/input';
import { Textarea } from '../textarea/textarea';
import { Checkbox } from '../checkbox/checkbox';
import { CheckboxToggle } from '../checkbox-toggle/checkbox-toggle';
import { Radio } from '../radio/radio';
import { RadioGroup } from '../radio/radio-group';
import { Button } from '../button/button';
import { GroupElementsDirective } from '../group-elements-directive/group-elements-directive';

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
    GroupElementsDirective,
  ],
  template: `
    <org-storybook-example-container
      title="Reactive Forms Integration"
      currentState="All form controls work with Angular reactive forms"
    >
      <org-storybook-example-container-section label="Complete Form Example">
        <form [formGroup]="form" (ngSubmit)="onSubmit()" orgGroupElements flexDirection="col" class="max-w-[500px]">
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
            <org-checkbox formControlName="agreeToTerms" name="terms" value="agree">
              I agree to the terms and conditions *
            </org-checkbox>
            @if (getFieldError('agreeToTerms')) {
              <div class="text-sm text-danger-text">
                {{ getFieldError('agreeToTerms') }}
              </div>
            }
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
            <org-radio-group formControlName="contactMethod" name="contactMethod">
              <org-radio value="email">Email</org-radio>
              <org-radio value="phone">Phone</org-radio>
              <org-radio value="sms">SMS</org-radio>
            </org-radio-group>
            @if (getFieldError('contactMethod')) {
              <div class="text-sm text-danger-text">
                {{ getFieldError('contactMethod') }}
              </div>
            }
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
          </div>
        </div>
      </div>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li><strong>Input</strong>: Binds to form control with \`formControlName\`, displays validation messages</li>
        <li><strong>Textarea</strong>: Multi-line text input with character limit validation</li>
        <li><strong>Checkbox</strong>: Boolean form control with required validation support</li>
        <li><strong>Checkbox Toggle</strong>: Alternative checkbox style with icon/text support</li>
        <li><strong>Radio Group</strong>: Radio button group with single selection validation</li>
        <li><strong>Validation</strong>: All controls show errors when dirty or touched</li>
        <li><strong>Form State</strong>: Track valid, dirty, touched, and pristine states</li>
        <li><strong>Form Values</strong>: Live display of current form values updates as you type/interact</li>
        <li><strong>Submission</strong>: Form submission prevented until all validations pass</li>
      </ul>
    </org-storybook-example-container>
  `,
})
class ReactiveFormDemoComponent {
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
      alert('Form is valid! Check console for values.');
    } else {
      this.form.markAllAsTouched();
      console.log('Form is invalid:', this.form.errors);
      alert('Form has validation errors. Please fix them and try again.');
    }
  }

  public getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);

    if (field?.errors && (field.dirty || field.touched)) {
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
    }

    return '';
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
    GroupElementsDirective,
  ],
  template: `
    <org-storybook-example-container
      title="Simple Data Binding"
      currentState="All form controls work with simple two-way binding"
    >
      <org-storybook-example-container-section label="Complete Form Example">
        <form (ngSubmit)="onSubmit()" orgGroupElements flexDirection="col" class="max-w-[500px]">
          <!-- input field -->
          <div class="flex flex-col gap-1">
            <label for="username" class="text-sm font-medium">Username *</label>
            <org-input [(value)]="username" name="username" placeholder="Enter your username" />
            @if (submitted() && !username().trim()) {
              <div class="text-sm text-danger-text">Username is required</div>
            }
          </div>

          <!-- email input field -->
          <div class="flex flex-col gap-1">
            <label for="email" class="text-sm font-medium">Email *</label>
            <org-input type="email" [(value)]="email" name="email" placeholder="Enter your email" preIcon="envelope" />
            @if (submitted() && !isValidEmail()) {
              <div class="text-sm text-danger-text">Please enter a valid email address</div>
            }
          </div>

          <!-- textarea field -->
          <div class="flex flex-col gap-1">
            <label for="bio" class="text-sm font-medium">Bio (max 200 chars)</label>
            <org-textarea [(value)]="bio" name="bio" placeholder="Tell us about yourself..." [rows]="4" />
            @if (submitted() && bio().length > 200) {
              <div class="text-sm text-danger-text">Bio must be less than 200 characters</div>
            }
          </div>

          <!-- checkbox field -->
          <div class="flex flex-col gap-1">
            <org-checkbox [(checked)]="agreeToTerms" name="agreeToTerms" value="agree">
              I agree to the terms and conditions *
            </org-checkbox>
            @if (submitted() && !agreeToTerms()) {
              <div class="text-sm text-danger-text">You must agree to the terms</div>
            }
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
            >
              Enable notifications
            </org-checkbox-toggle>
          </div>

          <!-- radio group -->
          <div class="flex flex-col gap-2">
            <label for="contactMethod" class="text-sm font-medium">Preferred Contact Method *</label>
            <org-radio-group [(value)]="contactMethod" name="contactMethod" class="flex flex-col gap-2">
              <org-radio value="email">Email</org-radio>
              <org-radio value="phone">Phone</org-radio>
              <org-radio value="sms">SMS</org-radio>
            </org-radio-group>
            @if (submitted() && !contactMethod().trim()) {
              <div class="text-sm text-danger-text">Contact method is required</div>
            }
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
          </div>
        </div>
      </div>

      <ul expected-behaviour class="mt-1 list-inside list-disc space-y-1">
        <li><strong>Input</strong>: Two-way binding with [(value)], displays validation on submit</li>
        <li><strong>Textarea</strong>: Multi-line text input with character limit validation</li>
        <li><strong>Checkbox</strong>: Boolean control with [(checked)] two-way binding</li>
        <li><strong>Checkbox Toggle</strong>: Alternative checkbox style with icon/text support</li>
        <li><strong>Radio Group</strong>: Radio button group with [(value)] two-way binding</li>
        <li><strong>Validation</strong>: Simple validation logic on form submission</li>
        <li><strong>Form Values</strong>: Live display updates as you type/interact using signals</li>
        <li><strong>No FormControl needed</strong>: Uses signals and two-way binding instead</li>
      </ul>
    </org-storybook-example-container>
  `,
})
class SimpleBindingDemoComponent {
  // Form values as signals
  public username = signal('');
  public email = signal('');
  public bio = signal('');
  public agreeToTerms = signal(false);
  public notifications = signal(true);
  public contactMethod = signal('');
  public submitted = signal(false);

  // Computed validation
  public isValidEmail = computed(() => {
    const emailValue = this.email();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(emailValue);
  });

  public isFormValid = computed(() => {
    return (
      this.username().trim().length >= 3 &&
      this.isValidEmail() &&
      this.bio().length <= 200 &&
      this.agreeToTerms() &&
      this.contactMethod().trim().length > 0
    );
  });

  public onSubmit(): void {
    this.submitted.set(true);

    if (this.isFormValid()) {
      console.log('Form submitted:', {
        username: this.username(),
        email: this.email(),
        bio: this.bio(),
        agreeToTerms: this.agreeToTerms(),
        notifications: this.notifications(),
        contactMethod: this.contactMethod(),
      });
      alert('Form is valid! Check console for values.');
    } else {
      console.log('Form is invalid');
      alert('Form has validation errors. Please fix them and try again.');
    }
  }
}

const meta: Meta = {
  title: 'Core/Form/Reactive Forms Example',
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

export const ReactiveFormsDemo: Story = {
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

export const SimpleBindingDemo: Story = {
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

import { Component, computed, inject, InjectionToken, input } from '@angular/core';
import { tailwindUtils } from '@organization/shared-utils';
import { FORM_FIELDS_COMPONENT } from '../form-fields/form-fields';

export const FORM_FIELD_COMPONENT = new InjectionToken<FormField>('FormField');

@Component({
  selector: 'org-form-field',
  imports: [],
  templateUrl: './form-field.html',
  providers: [{ provide: FORM_FIELD_COMPONENT, useExisting: FormField }],
  host: {
    class: 'contents',
  },
})
export class FormField {
  private readonly _formFields = inject(FORM_FIELDS_COMPONENT, { optional: true, host: true });

  public readonly containerClass = input<string>('');
  public validationMessage = input<string | null>(null);
  public reserveValidationSpace = input<boolean | null>(null);

  public readonly hasValidationMessage = computed(() => !!this.validationMessage()?.trim());
  public readonly finalReserveValidationSpace = computed(() => {
    // when set, this must always override whatever is in the form fields component
    if (this.reserveValidationSpace() !== null) {
      return this.reserveValidationSpace();
    }

    return !!this._formFields?.reserveValidationSpace();
  });

  protected mergeClasses = tailwindUtils.merge;
}

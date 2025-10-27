import { Component, InjectionToken, input } from '@angular/core';
import { tailwindUtils } from '@organization/shared-utils';

export const FORM_FIELDS_COMPONENT = new InjectionToken<FormFields>('FormFields');
@Component({
  selector: 'org-form-fields',
  imports: [],
  templateUrl: './form-fields.html',
  providers: [{ provide: FORM_FIELDS_COMPONENT, useExisting: FormFields }],
  host: {
    class: 'contents',
  },
})
export class FormFields {
  public readonly containerClass = input<string>('');
  public reserveValidationSpace = input<boolean>(true);

  protected mergeClasses = tailwindUtils.merge;
}

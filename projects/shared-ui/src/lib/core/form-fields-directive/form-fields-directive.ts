import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[orgFormFields]',
  standalone: true, // Modern directives should be standalone
})
export class FormFieldsDirective {
  @HostBinding('class')
  readonly classes = 'flex flex-col gap-2';
}

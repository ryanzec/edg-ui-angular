import { Component, ChangeDetectionStrategy, output, input, computed, afterNextRender } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { userSchema, type User, assignableUserRoles, type UserRoleName } from '@organization/shared-types';
import { Input } from '../../core/input/input';
import { Button } from '../../core/button/button';
import { Checkbox } from '../../core/checkbox/checkbox';
import { Label } from '../../core/label/label';
import { validationUtils } from '../../utils/validation';
import { userUtils } from '@organization/shared-utils';
import { FormFields } from '../../core/form-fields/form-fields';
import { FormField } from '../../core/form-field/form-field';

export type UserFormData = {
  id?: string;
  name: string;
  email: string;
  roles: UserRoleName[];
};

@Component({
  selector: 'org-user-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Input, ReactiveFormsModule, Button, Checkbox, Label, FormFields, FormField],
  templateUrl: './user-form.html',
  host: {
    ['attr.data-testid']: 'user-form',
  },
})
export class UserForm {
  // inputs
  public readonly existingUser = input<User | null>(null);
  public readonly isProcessing = input<boolean>(false);

  // outputs
  public readonly formSubmitted = output<UserFormData>();

  public userForm!: FormGroup;
  public readonly assignableRoles = assignableUserRoles;
  public readonly submitButtonText = computed<string>(() => {
    return this.existingUser() ? 'Update User' : 'Create User';
  });

  private _formInitialized = false;

  constructor() {
    const rolesGroup = new FormGroup({});

    for (const roleName of this.assignableRoles) {
      rolesGroup.addControl(
        roleName,
        new FormControl(roleName === 'user' ? true : false, { nonNullable: true, updateOn: 'change' })
      );
    }

    console.log('rolesGroup', rolesGroup);

    this.userForm = new FormGroup({
      name: new FormControl('', {
        nonNullable: true,
        validators: [validationUtils.zodValidator(userSchema.shape.name)],
        updateOn: 'change',
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [validationUtils.zodValidator(userSchema.shape.email)],
        updateOn: 'change',
      }),
      roles: rolesGroup,
    });

    afterNextRender(() => {
      const user = this.existingUser();

      if (!user || this._formInitialized) {
        return;
      }

      this._formInitialized = true;

      this.userForm.patchValue({
        name: user.name,
        email: user.email,
        roles: {
          user: user.roles.includes('user'),
          admin: user.roles.includes('admin'),
        },
      });
    });
  }

  public submit(): void {
    if (this.isProcessing()) {
      return;
    }

    if (!this._isFormValid()) {
      this.userForm.markAllAsTouched();

      return;
    }

    const formValue = this.userForm.getRawValue();
    const selectedroles: UserRoleName[] = [];

    // collect selected assignable roles
    for (const roleName of this.assignableRoles) {
      if (formValue.roles[roleName]) {
        selectedroles.push(roleName);
      }
    }

    const existingUserValue = this.existingUser();

    const submissionData: UserFormData = {
      name: formValue.name,
      email: formValue.email,
      roles: [],
    };

    if (existingUserValue) {
      const existingUnassignableroles = userUtils.getUnassignableRoles(existingUserValue);

      selectedroles.push(...existingUnassignableroles);
      submissionData.id = existingUserValue.id;
    }

    submissionData.roles = selectedroles;

    this.formSubmitted.emit(submissionData);
  }

  public getFieldError(fieldName: 'name' | 'email'): string | null {
    const field = this.userForm.get(fieldName);

    if (!field?.errors || !field.touched) {
      return null;
    }

    return validationUtils.getFormErrorMessage(field.errors, this.getFieldLabel(fieldName));
  }

  public getRoleError(): string | null {
    const rolesGroup = this.userForm.get('roles');

    if (!rolesGroup?.touched) {
      return null;
    }

    if (!this._hasAtleastOneRole()) {
      return 'At least one role must be selected';
    }

    return null;
  }

  public getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      name: 'Name',
      email: 'Email',
    };

    return labels[fieldName] || fieldName;
  }

  public getRoleLabel(roleName: UserRoleName): string {
    const labels: Record<UserRoleName, string> = {
      user: 'User',
      admin: 'Admin',
    };

    return labels[roleName];
  }

  private _hasAtleastOneRole(): boolean {
    const rolesGroup = this.userForm.get('roles');

    return rolesGroup ? Object.values(rolesGroup.value).some((value) => value === true) : false;
  }

  private _isFormValid(): boolean {
    const isFormValid = this.userForm.valid;

    return isFormValid && this._hasAtleastOneRole();
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Input, type InlineItem } from './input';
import { Icon } from '../icon/icon';
import { describe, it, expect, beforeEach, vi } from 'vitest';

@Component({
  template: `
    <org-input
      [variant]="variant"
      [type]="type"
      [placeholder]="placeholder"
      [value]="value"
      [disabled]="disabled"
      [readonly]="readonly"
      [preIcon]="preIcon"
      [postIcon]="postIcon"
      [inlineItems]="inlineItems"
      [selectAllOnFocus]="selectAllOnFocus"
      [autoFocus]="autoFocus"
      [showPasswordToggle]="showPasswordToggle"
      [validationMessage]="validationMessage"
      (valueChange)="onValueChange($event)"
      (preIconClicked)="onPreIconClicked()"
      (postIconClicked)="onPostIconClicked()"
      (inlineItemRemoved)="onInlineItemRemoved($event)"
      (focused)="onFocused()"
      (blurred)="onBlurred()"
      [name]="name"
    />
  `,
})
class TestHostComponent {
  public variant = 'bordered';
  public type = 'text';
  public placeholder = 'Test placeholder';
  public value = '';
  public disabled = false;
  public readonly = false;
  public preIcon: string | null = null;
  public postIcon: string | null = null;
  public inlineItems: InlineItem[] = [];
  public selectAllOnFocus = false;
  public autoFocus = false;
  public showPasswordToggle = false;
  public validationMessage = '';
  public name = 'test-input';
  public onValueChange = vi.fn();
  public onPreIconClicked = vi.fn();
  public onPostIconClicked = vi.fn();
  public onInlineItemRemoved = vi.fn();
  public onFocused = vi.fn();
  public onBlurred = vi.fn();
}

describe('Input', () => {
  let component: Input;
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Input, Icon],
      declarations: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(Input)).componentInstance;
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render input element', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));
      expect(inputElement).toBeTruthy();
    });
  });

  describe('Input Properties', () => {
    it('should set placeholder', () => {
      hostComponent.placeholder = 'Custom placeholder';
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(By.css('input'));
      expect(inputElement.nativeElement.placeholder).toBe('Custom placeholder');
    });

    it('should set value', () => {
      hostComponent.value = 'Test value';
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(By.css('input'));
      expect(inputElement.nativeElement.value).toBe('Test value');
    });

    it('should set input type', () => {
      hostComponent.type = 'email';
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(By.css('input'));
      expect(inputElement.nativeElement.type).toBe('email');
    });

    it('should disable input when disabled is true', () => {
      hostComponent.disabled = true;
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(By.css('input'));
      expect(inputElement.nativeElement.disabled).toBe(true);
    });

    it('should make input readonly when readonly is true', () => {
      hostComponent.readonly = true;
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(By.css('input'));
      expect(inputElement.nativeElement.readOnly).toBe(true);
    });
  });

  describe('Variants and Sizes', () => {
    it('should apply bordered variant classes', () => {
      hostComponent.variant = 'bordered';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('div'));
      expect(container.nativeElement.className).toContain('border');
    });

    it('should apply borderless variant classes', () => {
      hostComponent.variant = 'borderless';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('div'));
      expect(container.nativeElement.className).toContain('border-0');
    });
  });

  describe('Icons', () => {
    it('should render pre icon when provided', () => {
      hostComponent.preIcon = 'gear';
      fixture.detectChanges();

      const preIconButton = fixture.debugElement.query(By.css('button[aria-label="Pre icon"]'));
      expect(preIconButton).toBeTruthy();
    });

    it('should render post icon when provided', () => {
      hostComponent.postIcon = 'arrow-right';
      fixture.detectChanges();

      const postIconButton = fixture.debugElement.query(By.css('button[aria-label="Post icon"]'));
      expect(postIconButton).toBeTruthy();
    });

    it('should emit preIconClicked when pre icon is clicked', () => {
      hostComponent.preIcon = 'gear';
      fixture.detectChanges();

      const preIconButton = fixture.debugElement.query(By.css('button[aria-label="Pre icon"]'));
      preIconButton.nativeElement.click();

      expect(hostComponent.onPreIconClicked).toHaveBeenCalled();
    });

    it('should emit postIconClicked when post icon is clicked', () => {
      hostComponent.postIcon = 'arrow-right';
      fixture.detectChanges();

      const postIconButton = fixture.debugElement.query(By.css('button[aria-label="Post icon"]'));
      postIconButton.nativeElement.click();

      expect(hostComponent.onPostIconClicked).toHaveBeenCalled();
    });

    it('should not emit icon clicks when disabled', () => {
      hostComponent.preIcon = 'gear';
      hostComponent.disabled = true;
      fixture.detectChanges();

      const preIconButton = fixture.debugElement.query(By.css('button[aria-label="Pre icon"]'));
      preIconButton.nativeElement.click();

      expect(hostComponent.onPreIconClicked).not.toHaveBeenCalled();
    });
  });

  describe('Password Toggle', () => {
    it('should show eye icon when password toggle is enabled', () => {
      hostComponent.type = 'password';
      hostComponent.showPasswordToggle = true;
      fixture.detectChanges();

      const passwordToggleButton = fixture.debugElement.query(By.css('button[aria-label="Show password"]'));
      expect(passwordToggleButton).toBeTruthy();
    });

    it('should toggle password visibility when eye icon is clicked', () => {
      hostComponent.type = 'password';
      hostComponent.showPasswordToggle = true;
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(By.css('input'));
      expect(inputElement.nativeElement.type).toBe('password');

      const passwordToggleButton = fixture.debugElement.query(By.css('button[aria-label="Show password"]'));
      passwordToggleButton.nativeElement.click();
      fixture.detectChanges();

      expect(inputElement.nativeElement.type).toBe('text');
    });

    it('should change icon from eye to eye-slash when password is shown', () => {
      hostComponent.type = 'password';
      hostComponent.showPasswordToggle = true;
      fixture.detectChanges();

      const passwordToggleButton = fixture.debugElement.query(By.css('button[aria-label="Show password"]'));
      passwordToggleButton.nativeElement.click();
      fixture.detectChanges();

      const hidePasswordButton = fixture.debugElement.query(By.css('button[aria-label="Hide password"]'));
      expect(hidePasswordButton).toBeTruthy();
    });
  });

  describe('Inline Items', () => {
    it('should render inline items', () => {
      hostComponent.inlineItems = [
        { id: '1', label: 'Tag 1', removable: true },
        { id: '2', label: 'Tag 2', removable: false },
      ];
      fixture.detectChanges();

      const inlineItems = fixture.debugElement.queryAll(By.css('span'));
      expect(inlineItems.length).toBe(2);
      expect(inlineItems[0].nativeElement.textContent.trim()).toContain('Tag 1');
      expect(inlineItems[1].nativeElement.textContent.trim()).toContain('Tag 2');
    });

    it('should show remove button for removable items', () => {
      hostComponent.inlineItems = [{ id: '1', label: 'Tag 1', removable: true }];
      fixture.detectChanges();

      const removeButton = fixture.debugElement.query(By.css('button[aria-label="Remove Tag 1"]'));
      expect(removeButton).toBeTruthy();
    });

    it('should not show remove button for non-removable items', () => {
      hostComponent.inlineItems = [{ id: '1', label: 'Tag 1', removable: false }];
      fixture.detectChanges();

      const removeButton = fixture.debugElement.query(By.css('button[aria-label="Remove Tag 1"]'));
      expect(removeButton).toBeFalsy();
    });

    it('should emit inlineItemRemoved when remove button is clicked', () => {
      const item = { id: '1', label: 'Tag 1', removable: true };
      hostComponent.inlineItems = [item];
      fixture.detectChanges();

      const removeButton = fixture.debugElement.query(By.css('button[aria-label="Remove Tag 1"]'));
      removeButton.nativeElement.click();

      expect(hostComponent.onInlineItemRemoved).toHaveBeenCalledWith(item);
    });

    it('should not show remove buttons when disabled', () => {
      hostComponent.inlineItems = [{ id: '1', label: 'Tag 1', removable: true }];
      hostComponent.disabled = true;
      fixture.detectChanges();

      const removeButton = fixture.debugElement.query(By.css('button[aria-label="Remove Tag 1"]'));
      expect(removeButton).toBeFalsy();
    });
  });

  describe('Events', () => {
    it('should emit valueChange when input value changes', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));
      inputElement.nativeElement.value = 'New value';
      inputElement.nativeElement.dispatchEvent(new Event('input'));

      expect(hostComponent.onValueChange).toHaveBeenCalledWith('New value');
    });

    it('should emit focused when input gains focus', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));
      inputElement.nativeElement.focus();

      expect(hostComponent.onFocused).toHaveBeenCalled();
    });

    it('should emit blurred when input loses focus', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));
      inputElement.nativeElement.focus();
      inputElement.nativeElement.blur();

      expect(hostComponent.onBlurred).toHaveBeenCalled();
    });
  });

  describe('Select All on Focus', () => {
    it('should select all text when selectAllOnFocus is true and input gains focus', () => {
      hostComponent.value = 'Test value';
      hostComponent.selectAllOnFocus = true;
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(By.css('input'));
      const selectSpy = vi.spyOn(inputElement.nativeElement, 'select');

      inputElement.nativeElement.focus();

      expect(selectSpy).toHaveBeenCalled();
    });

    it('should not select all text when selectAllOnFocus is false', () => {
      hostComponent.value = 'Test value';
      hostComponent.selectAllOnFocus = false;
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(By.css('input'));
      const selectSpy = vi.spyOn(inputElement.nativeElement, 'select');

      inputElement.nativeElement.focus();

      expect(selectSpy).not.toHaveBeenCalled();
    });
  });

  describe('Auto Focus', () => {
    it('should focus input when autoFocus is true', async () => {
      hostComponent.autoFocus = true;
      fixture.detectChanges();
      await fixture.whenStable();

      const inputElement = fixture.debugElement.query(By.css('input'));
      expect(document.activeElement).toBe(inputElement.nativeElement);
    });
  });

  describe('Public Methods', () => {
    it('should focus input when focusInput is called', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));
      const focusSpy = vi.spyOn(inputElement.nativeElement, 'focus');
      component.focusInput();
      expect(focusSpy).toHaveBeenCalled();
    });
  });

  describe('Computed Properties', () => {
    it('should compute isDisabled correctly', () => {
      expect(component.isDisabled()).toBe(false);

      hostComponent.disabled = true;
      fixture.detectChanges();

      expect(component.isDisabled()).toBe(true);
    });

    it('should compute isReadonly correctly', () => {
      expect(component.isReadonly()).toBe(false);

      hostComponent.readonly = true;
      fixture.detectChanges();

      expect(component.isReadonly()).toBe(true);
    });

    it('should compute hasPreIcon correctly', () => {
      expect(component.hasPreIcon()).toBe(false);

      hostComponent.preIcon = 'gear';
      fixture.detectChanges();

      expect(component.hasPreIcon()).toBe(true);
    });

    it('should compute hasPostIcon correctly', () => {
      expect(component.hasPostIcon()).toBe(false);

      hostComponent.postIcon = 'arrow-right';
      fixture.detectChanges();

      expect(component.hasPostIcon()).toBe(true);
    });

    it('should compute hasInlineItems correctly', () => {
      expect(component.hasInlineItems()).toBe(false);

      hostComponent.inlineItems = [{ id: '1', label: 'Tag 1' }];
      fixture.detectChanges();

      expect(component.hasInlineItems()).toBe(true);
    });
  });

  describe('Validation Messages', () => {
    it('should render validation message element', () => {
      const validationElement = fixture.debugElement.query(By.css('#validation-message'));
      expect(validationElement).toBeTruthy();
    });

    it('should show validation message when provided', () => {
      hostComponent.validationMessage = 'This field is required';
      fixture.detectChanges();

      const validationElement = fixture.debugElement.query(By.css('#validation-message'));
      expect(validationElement.nativeElement.textContent.trim()).toBe('This field is required');
    });

    it('should hide validation message with invisible class when no message', () => {
      hostComponent.validationMessage = '';
      fixture.detectChanges();

      const validationElement = fixture.debugElement.query(By.css('#validation-message'));
      expect(validationElement.nativeElement.className).toContain('invisible');
    });

    it('should show validation message with visible class when message exists', () => {
      hostComponent.validationMessage = 'Error message';
      fixture.detectChanges();

      const validationElement = fixture.debugElement.query(By.css('#validation-message'));
      expect(validationElement.nativeElement.className).toContain('visible');
      expect(validationElement.nativeElement.className).not.toContain('invisible');
    });

    it('should apply error styling to input when validation message exists', () => {
      hostComponent.validationMessage = 'Error message';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('div'));
      expect(container.nativeElement.className).toContain('border-input-border-error');
    });

    it('should set aria-invalid attribute when validation message exists', () => {
      hostComponent.validationMessage = 'Error message';
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(By.css('input'));
      expect(inputElement.nativeElement.getAttribute('aria-invalid')).toBe('true');
    });

    it('should set aria-describedby attribute when validation message exists', () => {
      hostComponent.validationMessage = 'Error message';
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(By.css('input'));
      expect(inputElement.nativeElement.getAttribute('aria-describedby')).toBe('validation-message');
    });

    it('should not set aria-describedby when no validation message', () => {
      hostComponent.validationMessage = '';
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(By.css('input'));
      expect(inputElement.nativeElement.getAttribute('aria-describedby')).toBeNull();
    });

    it('should maintain space for validation message even when empty', () => {
      // Test that the validation message element is always present
      hostComponent.validationMessage = '';
      fixture.detectChanges();

      const validationElement = fixture.debugElement.query(By.css('#validation-message'));
      expect(validationElement).toBeTruthy();
      expect(validationElement.nativeElement.textContent.trim()).toBe('No validation message');
    });

    it('should compute hasValidationMessage correctly', () => {
      expect(component.hasValidationMessage()).toBe(false);

      hostComponent.validationMessage = 'Error message';
      fixture.detectChanges();

      expect(component.hasValidationMessage()).toBe(true);

      hostComponent.validationMessage = '   '; // whitespace only
      fixture.detectChanges();

      expect(component.hasValidationMessage()).toBe(false);
    });

    it('should compute isInvalid correctly', () => {
      expect(component.isInvalid()).toBe(false);

      hostComponent.validationMessage = 'Error message';
      fixture.detectChanges();

      expect(component.isInvalid()).toBe(true);
    });

    it('should apply different error styling for borderless variant', () => {
      hostComponent.variant = 'borderless';
      hostComponent.validationMessage = 'Error message';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('div'));
      expect(container.nativeElement.className).toContain('bg-input-background-error');
    });

    it('should show red ring on focus when invalid', () => {
      hostComponent.validationMessage = 'Error message';
      fixture.detectChanges();

      const inputElement = fixture.debugElement.query(By.css('input'));
      inputElement.nativeElement.focus();
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('div'));
      expect(container.nativeElement.className).toContain('ring-input-ring-error');
    });
  });
});

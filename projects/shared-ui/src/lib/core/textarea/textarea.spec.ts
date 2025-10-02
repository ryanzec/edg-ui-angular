import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, beforeEach, it, expect, vitest } from 'vitest';
import { userEvent } from 'storybook/test';

import { Textarea, type InlineItem } from './textarea';

describe('Textarea', () => {
  let component: Textarea;
  let fixture: ComponentFixture<Textarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Textarea],
    }).compileComponents();

    fixture = TestBed.createComponent(Textarea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('basic properties', () => {
    it('should have default values', () => {
      expect(component.variant()).toBe('bordered');
      expect(component.placeholder()).toBe('');
      expect(component.value()).toBe('');
      expect(component.disabled()).toBe(false);
      expect(component.readonly()).toBe(false);
      expect(component.preIcon()).toBeNull();
      expect(component.postIcon()).toBeNull();
      expect(component.preIconAlignment()).toBe('start');
      expect(component.postIconAlignment()).toBe('end');
      expect(component.inlineItems()).toEqual([]);
      expect(component.selectAllOnFocus()).toBe(false);
      expect(component.autoFocus()).toBe(false);
      expect(component.validationMessage()).toBe('');
      expect(component.containerClass()).toBe('');
      expect(component.inverseEnter()).toBe(false);
      expect(component.rows()).toBe(3);
    });

    it('should accept input values', () => {
      fixture.componentRef.setInput('variant', 'borderless');
      fixture.componentRef.setInput('placeholder', 'Test placeholder');
      fixture.componentRef.setInput('value', 'Test value');
      fixture.componentRef.setInput('disabled', true);
      fixture.componentRef.setInput('readonly', true);
      fixture.componentRef.setInput('preIcon', 'gear');
      fixture.componentRef.setInput('postIcon', 'arrow-right');
      fixture.componentRef.setInput('preIconAlignment', 'center');
      fixture.componentRef.setInput('postIconAlignment', 'start');
      fixture.componentRef.setInput('selectAllOnFocus', true);
      fixture.componentRef.setInput('autoFocus', true);
      fixture.componentRef.setInput('validationMessage', 'Error message');
      fixture.componentRef.setInput('containerClass', 'custom-class');
      fixture.componentRef.setInput('inverseEnter', true);
      fixture.componentRef.setInput('rows', 5);

      expect(component.variant()).toBe('borderless');
      expect(component.placeholder()).toBe('Test placeholder');
      expect(component.value()).toBe('Test value');
      expect(component.disabled()).toBe(true);
      expect(component.readonly()).toBe(true);
      expect(component.preIcon()).toBe('gear');
      expect(component.postIcon()).toBe('arrow-right');
      expect(component.preIconAlignment()).toBe('center');
      expect(component.postIconAlignment()).toBe('start');
      expect(component.selectAllOnFocus()).toBe(true);
      expect(component.autoFocus()).toBe(true);
      expect(component.validationMessage()).toBe('Error message');
      expect(component.containerClass()).toBe('custom-class');
      expect(component.inverseEnter()).toBe(true);
      expect(component.rows()).toBe(5);
    });
  });

  describe('computed properties', () => {
    it('should compute hasPreIcon correctly', () => {
      expect(component.hasPreIcon()).toBe(false);

      fixture.componentRef.setInput('preIcon', 'gear');
      expect(component.hasPreIcon()).toBe(true);
    });

    it('should compute hasPostIcon correctly', () => {
      expect(component.hasPostIcon()).toBe(false);

      fixture.componentRef.setInput('postIcon', 'arrow-right');
      expect(component.hasPostIcon()).toBe(true);
    });

    it('should compute hasInlineItems correctly', () => {
      expect(component.hasInlineItems()).toBe(false);

      const inlineItems: InlineItem[] = [{ id: '1', label: 'Test', removable: true }];
      fixture.componentRef.setInput('inlineItems', inlineItems);
      expect(component.hasInlineItems()).toBe(true);
    });

    it('should compute hasValidationMessage correctly', () => {
      expect(component.hasValidationMessage()).toBe(false);

      fixture.componentRef.setInput('validationMessage', 'Error');
      expect(component.hasValidationMessage()).toBe(true);

      fixture.componentRef.setInput('validationMessage', '   ');
      expect(component.hasValidationMessage()).toBe(false);
    });

    it('should compute isInvalid correctly', () => {
      expect(component.isInvalid()).toBe(false);

      fixture.componentRef.setInput('validationMessage', 'Error');
      expect(component.isInvalid()).toBe(true);
    });
  });

  describe('container classes', () => {
    it('should apply bordered variant classes by default', () => {
      const classes = component.containerClasses();
      expect(classes).toContain('border');
      expect(classes).toContain('rounded-md');
      expect(classes).toContain('bg-white');
      expect(classes).toContain('border-textarea-border-default');
    });

    it('should apply borderless variant classes', () => {
      fixture.componentRef.setInput('variant', 'borderless');
      const classes = component.containerClasses();
      expect(classes).toContain('border-0');
      expect(classes).toContain('bg-white');
    });

    it('should apply focus classes when focused', () => {
      component._state.update((state) => ({ ...state, isFocused: true }));
      const classes = component.containerClasses();
      expect(classes).toContain('border-textarea-border-focused');
      expect(classes).toContain('ring-1');
      expect(classes).toContain('ring-textarea-ring-focused');
    });

    it('should apply error classes when invalid', () => {
      fixture.componentRef.setInput('validationMessage', 'Error');
      const classes = component.containerClasses();
      expect(classes).toContain('border-textarea-border-error');
    });

    it('should apply disabled classes when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      const classes = component.containerClasses();
      expect(classes).toContain('bg-textarea-background-disabled');
      expect(classes).toContain('border-textarea-border-default');
      expect(classes).toContain('cursor-not-allowed');
      expect(classes).toContain('opacity-50');
    });
  });

  describe('icon classes', () => {
    it('should apply correct alignment classes for pre icon', () => {
      fixture.componentRef.setInput('preIconAlignment', 'start');
      let classes = component.preIconClasses();
      expect(classes).toContain('self-start');

      fixture.componentRef.setInput('preIconAlignment', 'center');
      classes = component.preIconClasses();
      expect(classes).toContain('self-center');

      fixture.componentRef.setInput('preIconAlignment', 'end');
      classes = component.preIconClasses();
      expect(classes).toContain('self-end');
    });

    it('should apply correct alignment classes for post icon', () => {
      fixture.componentRef.setInput('postIconAlignment', 'start');
      let classes = component.postIconClasses();
      expect(classes).toContain('self-start');

      fixture.componentRef.setInput('postIconAlignment', 'center');
      classes = component.postIconClasses();
      expect(classes).toContain('self-center');

      fixture.componentRef.setInput('postIconAlignment', 'end');
      classes = component.postIconClasses();
      expect(classes).toContain('self-end');
    });
  });

  describe('textarea element', () => {
    it('should render textarea with correct attributes', () => {
      fixture.componentRef.setInput('placeholder', 'Test placeholder');
      fixture.componentRef.setInput('value', 'Test value');
      fixture.componentRef.setInput('rows', 5);
      fixture.componentRef.setInput('disabled', true);
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();

      const textarea = fixture.debugElement.query(By.css('textarea'));
      expect(textarea.nativeElement.placeholder).toBe('Test placeholder');
      expect(textarea.nativeElement.value).toBe('Test value');
      expect(textarea.nativeElement.rows).toBe(5);
      expect(textarea.nativeElement.disabled).toBe(true);
      expect(textarea.nativeElement.readOnly).toBe(true);
    });

    it('should emit valueChange when textarea value changes', async () => {
      const user = userEvent.setup();
      const valueChangeSpy = vitest.fn();
      component.valueChange.subscribe(valueChangeSpy);
      fixture.detectChanges();

      const textarea = fixture.debugElement.query(By.css('textarea'));
      await user.type(textarea.nativeElement, 'test input');

      expect(valueChangeSpy).toHaveBeenCalledWith('test input');
    });
  });

  describe('enter key behavior', () => {
    it('should emit enterPressed on Shift+Enter key when inverseEnter is false', async () => {
      const user = userEvent.setup();
      const enterPressedSpy = vitest.fn();
      component.enterPressed.subscribe(enterPressedSpy);
      fixture.componentRef.setInput('inverseEnter', false);
      fixture.detectChanges();

      const textarea = fixture.debugElement.query(By.css('textarea'));
      await user.type(textarea.nativeElement, 'test{Shift>}{Enter}{/Shift}');

      expect(enterPressedSpy).toHaveBeenCalled();
    });

    it('should not emit enterPressed on Enter when inverseEnter is false', async () => {
      const user = userEvent.setup();
      const enterPressedSpy = vitest.fn();
      component.enterPressed.subscribe(enterPressedSpy);
      fixture.componentRef.setInput('inverseEnter', false);
      fixture.detectChanges();

      const textarea = fixture.debugElement.query(By.css('textarea'));
      await user.type(textarea.nativeElement, 'test{Enter}');

      expect(enterPressedSpy).not.toHaveBeenCalled();
    });

    it('should emit enterPressed on Enter when inverseEnter is true', async () => {
      const user = userEvent.setup();
      const enterPressedSpy = vitest.fn();
      component.enterPressed.subscribe(enterPressedSpy);
      fixture.componentRef.setInput('inverseEnter', true);
      fixture.detectChanges();

      const textarea = fixture.debugElement.query(By.css('textarea'));
      await user.type(textarea.nativeElement, 'test{Enter}');

      expect(enterPressedSpy).toHaveBeenCalled();
    });

    it('should not emit enterPressed on Shift+Enter when inverseEnter is true', async () => {
      const user = userEvent.setup();
      const enterPressedSpy = vitest.fn();
      component.enterPressed.subscribe(enterPressedSpy);
      fixture.componentRef.setInput('inverseEnter', true);
      fixture.detectChanges();

      const textarea = fixture.debugElement.query(By.css('textarea'));
      await user.type(textarea.nativeElement, 'test{Shift>}{Enter}{/Shift}');

      expect(enterPressedSpy).not.toHaveBeenCalled();
    });
  });

  describe('icon interactions', () => {
    it('should emit preIconClicked when pre icon is clicked', async () => {
      const user = userEvent.setup();
      const preIconClickedSpy = vitest.fn();
      component.preIconClicked.subscribe(preIconClickedSpy);
      fixture.componentRef.setInput('preIcon', 'gear');
      fixture.detectChanges();

      const preIconButton = fixture.debugElement.query(By.css('button:first-of-type'));
      await user.click(preIconButton.nativeElement);

      expect(preIconClickedSpy).toHaveBeenCalled();
    });

    it('should emit postIconClicked when post icon is clicked', async () => {
      const user = userEvent.setup();
      const postIconClickedSpy = vitest.fn();
      component.postIconClicked.subscribe(postIconClickedSpy);
      fixture.componentRef.setInput('postIcon', 'arrow-right');
      fixture.detectChanges();

      const postIconButton = fixture.debugElement.query(By.css('button:last-of-type'));
      await user.click(postIconButton.nativeElement);

      expect(postIconClickedSpy).toHaveBeenCalled();
    });

    it('should not emit icon clicks when disabled', async () => {
      const user = userEvent.setup();
      const preIconClickedSpy = vitest.fn();
      const postIconClickedSpy = vitest.fn();
      component.preIconClicked.subscribe(preIconClickedSpy);
      component.postIconClicked.subscribe(postIconClickedSpy);
      fixture.componentRef.setInput('preIcon', 'gear');
      fixture.componentRef.setInput('postIcon', 'arrow-right');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const preIconButton = fixture.debugElement.query(By.css('button:first-of-type'));
      const postIconButton = fixture.debugElement.query(By.css('button:last-of-type'));

      await user.click(preIconButton.nativeElement);
      await user.click(postIconButton.nativeElement);

      expect(preIconClickedSpy).not.toHaveBeenCalled();
      expect(postIconClickedSpy).not.toHaveBeenCalled();
    });
  });

  describe('inline items', () => {
    it('should render inline items', () => {
      const inlineItems: InlineItem[] = [
        { id: '1', label: 'React', removable: true },
        { id: '2', label: 'Angular', removable: false },
      ];
      fixture.componentRef.setInput('inlineItems', inlineItems);
      fixture.detectChanges();

      const tags = fixture.debugElement.queryAll(By.css('org-tag'));
      expect(tags).toHaveLength(2);
    });

    it('should emit inlineItemRemoved when removable tag is removed', async () => {
      const inlineItemRemovedSpy = vitest.fn();
      component.inlineItemRemoved.subscribe(inlineItemRemovedSpy);
      const inlineItems: InlineItem[] = [{ id: '1', label: 'React', removable: true }];
      fixture.componentRef.setInput('inlineItems', inlineItems);
      fixture.detectChanges();

      const tag = fixture.debugElement.query(By.css('org-tag'));
      tag.triggerEventHandler('removed', inlineItems[0]);

      expect(inlineItemRemovedSpy).toHaveBeenCalledWith(inlineItems[0]);
    });
  });

  describe('focus behavior', () => {
    it('should emit focused event when textarea gains focus', async () => {
      const user = userEvent.setup();
      const focusedSpy = vitest.fn();
      component.focused.subscribe(focusedSpy);
      fixture.detectChanges();

      const textarea = fixture.debugElement.query(By.css('textarea'));
      await user.click(textarea.nativeElement);

      expect(focusedSpy).toHaveBeenCalled();
    });

    it('should emit blurred event when textarea loses focus', async () => {
      const user = userEvent.setup();
      const blurredSpy = vitest.fn();
      component.blurred.subscribe(blurredSpy);
      fixture.detectChanges();

      const textarea = fixture.debugElement.query(By.css('textarea'));
      await user.click(textarea.nativeElement);
      await user.tab();

      expect(blurredSpy).toHaveBeenCalled();
    });

    it('should select all text on focus when selectAllOnFocus is true', async () => {
      const user = userEvent.setup();
      fixture.componentRef.setInput('selectAllOnFocus', true);
      fixture.componentRef.setInput('value', 'Test value');
      fixture.detectChanges();

      const textarea = fixture.debugElement.query(By.css('textarea'));
      await user.click(textarea.nativeElement);

      expect(textarea.nativeElement.selectionStart).toBe(0);
      expect(textarea.nativeElement.selectionEnd).toBe('Test value'.length);
    });
  });

  describe('validation message', () => {
    it('should display validation message when provided', () => {
      fixture.componentRef.setInput('validationMessage', 'This field is required');
      fixture.detectChanges();

      const validationMessage = fixture.debugElement.query(By.css('[role="alert"]'));
      expect(validationMessage.nativeElement.textContent.trim()).toBe('This field is required');
    });

    it('should have correct aria attributes when validation message is present', () => {
      fixture.componentRef.setInput('validationMessage', 'Error message');
      fixture.detectChanges();

      const textarea = fixture.debugElement.query(By.css('textarea'));
      expect(textarea.nativeElement.getAttribute('aria-invalid')).toBe('true');
      expect(textarea.nativeElement.getAttribute('aria-describedby')).toBe('validation-message');
    });
  });

  describe('public methods', () => {
    it('should focus textarea when focusTextarea is called', () => {
      fixture.detectChanges();
      const textarea = fixture.debugElement.query(By.css('textarea'));
      const focusSpy = vitest.spyOn(textarea.nativeElement, 'focus');

      component.focusTextarea();

      expect(focusSpy).toHaveBeenCalled();
    });
  });

  describe('lifecycle', () => {
    it('should auto focus when autoFocus is true', () => {
      fixture.componentRef.setInput('autoFocus', true);
      const textarea = fixture.debugElement.query(By.css('textarea'));
      const focusSpy = vitest.spyOn(textarea.nativeElement, 'focus');

      component.ngAfterViewInit();

      expect(focusSpy).toHaveBeenCalled();
    });
  });
});

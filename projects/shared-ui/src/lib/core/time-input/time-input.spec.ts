import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TimeInput } from './time-input';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <org-time-input
      [variant]="variant"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [readonly]="readonly"
      [defaultValue]="defaultValue"
      [name]="name"
      (valueChange)="onValueChange($event)"
      (focused)="onFocused()"
      (blurred)="onBlurred()"
    />
  `,
})
class TestHostComponent {
  public variant = 'bordered';
  public placeholder = 'Enter time';
  public disabled = false;
  public readonly = false;
  public defaultValue = '';
  public name = 'test-time-input';
  public onValueChange = vi.fn();
  public onFocused = vi.fn();
  public onBlurred = vi.fn();
}

describe('TimeInput', () => {
  let component: TimeInput;
  let fixture: ComponentFixture<TimeInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeInput],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeInput);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('name', 'test-time-input');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initialization', () => {
    it('should initialize with default state', () => {
      expect(component._state().hours).toBe('12');
      expect(component._state().minutes).toBe('00');
      expect(component._state().ampm).toBe('am');
      expect(component._state().activeSegment).toBe('hours');
    });

    it('should format value correctly', () => {
      expect(component.formattedValue()).toBe('12:00 am');
    });
  });

  describe('value parsing', () => {
    it('should parse valid time string', () => {
      component.writeValue('03:45 pm');
      fixture.detectChanges();

      expect(component._state().hours).toBe('03');
      expect(component._state().minutes).toBe('45');
      expect(component._state().ampm).toBe('pm');
    });

    it('should handle single digit hours', () => {
      component.writeValue('9:30 am');
      fixture.detectChanges();

      expect(component._state().hours).toBe('09');
      expect(component._state().minutes).toBe('30');
      expect(component._state().ampm).toBe('am');
    });

    it('should clamp invalid hours', () => {
      component.writeValue('15:30 pm');
      fixture.detectChanges();

      expect(component._state().hours).toBe('12');
    });

    it('should clamp invalid minutes', () => {
      component.writeValue('03:75 pm');
      fixture.detectChanges();

      expect(component._state().minutes).toBe('00');
    });
  });

  describe('segment navigation', () => {
    it('should move to next segment on right arrow', () => {
      component._state.update((s) => ({ ...s, activeSegment: 'hours' }));

      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      component.onKeyDown(event);

      expect(component._state().activeSegment).toBe('minutes');
    });

    it('should move to previous segment on left arrow', () => {
      component._state.update((s) => ({ ...s, activeSegment: 'minutes' }));

      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      component.onKeyDown(event);

      expect(component._state().activeSegment).toBe('hours');
    });

    it('should loop from ampm to hours on right arrow', () => {
      component._state.update((s) => ({ ...s, activeSegment: 'ampm' }));

      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      component.onKeyDown(event);

      expect(component._state().activeSegment).toBe('hours');
    });

    it('should loop from hours to ampm on left arrow', () => {
      component._state.update((s) => ({ ...s, activeSegment: 'hours' }));

      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      component.onKeyDown(event);

      expect(component._state().activeSegment).toBe('ampm');
    });
  });

  describe('increment/decrement', () => {
    it('should increment hours with up arrow', () => {
      component._state.update((s) => ({ ...s, hours: '05', activeSegment: 'hours' }));

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.onKeyDown(event);

      expect(component._state().hours).toBe('06');
    });

    it('should loop hours from 12 to 01', () => {
      component._state.update((s) => ({ ...s, hours: '12', activeSegment: 'hours' }));

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.onKeyDown(event);

      expect(component._state().hours).toBe('01');
    });

    it('should decrement hours with down arrow', () => {
      component._state.update((s) => ({ ...s, hours: '05', activeSegment: 'hours' }));

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeyDown(event);

      expect(component._state().hours).toBe('04');
    });

    it('should loop hours from 01 to 12', () => {
      component._state.update((s) => ({ ...s, hours: '01', activeSegment: 'hours' }));

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeyDown(event);

      expect(component._state().hours).toBe('12');
    });

    it('should increment minutes with up arrow', () => {
      component._state.update((s) => ({ ...s, minutes: '30', activeSegment: 'minutes' }));

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.onKeyDown(event);

      expect(component._state().minutes).toBe('31');
    });

    it('should loop minutes from 59 to 00', () => {
      component._state.update((s) => ({ ...s, minutes: '59', activeSegment: 'minutes' }));

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.onKeyDown(event);

      expect(component._state().minutes).toBe('00');
    });

    it('should toggle ampm with up arrow', () => {
      component._state.update((s) => ({ ...s, ampm: 'am', activeSegment: 'ampm' }));

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.onKeyDown(event);

      expect(component._state().ampm).toBe('pm');
    });
  });

  describe('number input for hours', () => {
    it('should wait for second digit when first digit is 0', () => {
      component._state.update((s) => ({ ...s, activeSegment: 'hours', firstDigitEntered: false }));

      const event = new KeyboardEvent('keydown', { key: '0' });
      component.onKeyDown(event);

      expect(component._state().hours).toBe('00');
      expect(component._state().firstDigitEntered).toBe(true);
      expect(component._state().activeSegment).toBe('hours');
    });

    it('should wait for second digit when first digit is 1', () => {
      component._state.update((s) => ({ ...s, activeSegment: 'hours', firstDigitEntered: false }));

      const event = new KeyboardEvent('keydown', { key: '1' });
      component.onKeyDown(event);

      expect(component._state().hours).toBe('01');
      expect(component._state().firstDigitEntered).toBe(true);
      expect(component._state().activeSegment).toBe('hours');
    });

    it('should auto-advance when first digit is 2-9', () => {
      component._state.update((s) => ({ ...s, activeSegment: 'hours', firstDigitEntered: false }));

      const event = new KeyboardEvent('keydown', { key: '5' });
      component.onKeyDown(event);

      expect(component._state().hours).toBe('05');
      expect(component._state().firstDigitEntered).toBe(false);
      expect(component._state().activeSegment).toBe('minutes');
    });

    it('should handle second digit and clamp to 12', () => {
      component._state.update((s) => ({ ...s, hours: '01', activeSegment: 'hours', firstDigitEntered: true }));

      const event = new KeyboardEvent('keydown', { key: '5' });
      component.onKeyDown(event);

      expect(component._state().hours).toBe('12');
      expect(component._state().activeSegment).toBe('minutes');
    });
  });

  describe('number input for minutes', () => {
    it('should wait for second digit when first digit is 0-5', () => {
      component._state.update((s) => ({ ...s, activeSegment: 'minutes', firstDigitEntered: false }));

      const event = new KeyboardEvent('keydown', { key: '3' });
      component.onKeyDown(event);

      expect(component._state().minutes).toBe('03');
      expect(component._state().firstDigitEntered).toBe(true);
      expect(component._state().activeSegment).toBe('minutes');
    });

    it('should auto-advance when first digit is 6-9', () => {
      component._state.update((s) => ({ ...s, activeSegment: 'minutes', firstDigitEntered: false }));

      const event = new KeyboardEvent('keydown', { key: '7' });
      component.onKeyDown(event);

      expect(component._state().minutes).toBe('07');
      expect(component._state().firstDigitEntered).toBe(false);
      expect(component._state().activeSegment).toBe('ampm');
    });

    it('should handle second digit correctly', () => {
      component._state.update((s) => ({ ...s, minutes: '03', activeSegment: 'minutes', firstDigitEntered: true }));

      const event = new KeyboardEvent('keydown', { key: '5' });
      component.onKeyDown(event);

      expect(component._state().minutes).toBe('35');
      expect(component._state().activeSegment).toBe('ampm');
    });
  });

  describe('ampm input', () => {
    it('should set to am when a key is pressed', () => {
      component._state.update((s) => ({ ...s, activeSegment: 'ampm', ampm: 'pm' }));

      const event = new KeyboardEvent('keydown', { key: 'a' });
      component.onKeyDown(event);

      expect(component._state().ampm).toBe('am');
    });

    it('should set to pm when p key is pressed', () => {
      component._state.update((s) => ({ ...s, activeSegment: 'ampm', ampm: 'am' }));

      const event = new KeyboardEvent('keydown', { key: 'p' });
      component.onKeyDown(event);

      expect(component._state().ampm).toBe('pm');
    });
  });

  describe('disabled and readonly states', () => {
    it('should not handle keyboard events when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const initialHours = component._state().hours;
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.onKeyDown(event);

      expect(component._state().hours).toBe(initialHours);
    });

    it('should not handle keyboard events when readonly', () => {
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();

      const initialHours = component._state().hours;
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.onKeyDown(event);

      expect(component._state().hours).toBe(initialHours);
    });
  });
});

describe('TimeInput with TestHost', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let timeInput: TimeInput;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, TimeInput],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();

    const timeInputDebugElement = fixture.debugElement.query(By.directive(TimeInput));
    timeInput = timeInputDebugElement.componentInstance;
  });

  it('should emit valueChange event', () => {
    timeInput._state.update((s) => ({ ...s, hours: '03', minutes: '45', ampm: 'pm' }));
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    timeInput.onKeyDown(event);
    fixture.detectChanges();

    expect(hostComponent.onValueChange).toHaveBeenCalled();
  });

  it('should emit focused event', () => {
    timeInput.onFocus();

    expect(hostComponent.onFocused).toHaveBeenCalled();
  });

  it('should emit blurred event', () => {
    timeInput.onBlur();

    expect(hostComponent.onBlurred).toHaveBeenCalled();
  });

  it('should apply default value', () => {
    hostComponent.defaultValue = '05:30 pm';
    fixture.detectChanges();

    // need to trigger ngAfterViewInit manually in test
    timeInput.ngAfterViewInit();

    expect(timeInput._state().hours).toBe('05');
    expect(timeInput._state().minutes).toBe('30');
    expect(timeInput._state().ampm).toBe('pm');
  });
});

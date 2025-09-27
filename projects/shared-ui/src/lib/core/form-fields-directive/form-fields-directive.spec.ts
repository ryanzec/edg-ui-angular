import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, beforeEach, it, expect } from 'vitest';

import { FormFieldsDirective } from './form-fields-directive';

@Component({
  template: `<div orgFormFields data-testid="2-container"></div>`,
  imports: [FormFieldsDirective],
})
class TestComponent {}

describe('FormFieldsDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;
  let domElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    debugElement = fixture.debugElement.query(By.directive(FormFieldsDirective));
    domElement = debugElement.nativeElement;
  });

  it('should create the directive', () => {
    expect(debugElement).toBeTruthy();
    expect(debugElement.injector.get(FormFieldsDirective)).toBeTruthy();
  });

  it('should add css classes on initialization', () => {
    // Initially classes should not be present
    expect(domElement.classList.contains('flex')).toBe(false);
    expect(domElement.classList.contains('flex-col')).toBe(false);
    expect(domElement.classList.contains('gap-2')).toBe(false);

    // Trigger ngOnInit
    fixture.detectChanges();

    // Classes should now be present
    expect(domElement.classList.contains('flex')).toBe(true);
    expect(domElement.classList.contains('flex-col')).toBe(true);
    expect(domElement.classList.contains('gap-2')).toBe(true);
  });

  it('should apply directive to the correct element', () => {
    fixture.detectChanges();

    const elementWithDirective = fixture.debugElement.query(By.css('[data-testid="2-container"]'));
    expect(elementWithDirective.nativeElement).toBe(domElement);
  });
});

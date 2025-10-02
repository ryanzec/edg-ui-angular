import { ComponentColorDirective, type ComponentColor, componentColors } from './component-color-directive';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';

@Component({
  template: '<div [orgColor]="color()"></div>',
  imports: [ComponentColorDirective],
})
class TestHostComponent {
  color = signal<ComponentColor | null>(null);
}

describe('ComponentColorDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let domElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, ComponentColorDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    domElement = fixture.nativeElement.querySelector('div');
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should not add any color class when orgColor is null', () => {
    component.color.set(null);
    fixture.detectChanges();

    componentColors
      .map((color) => `org-${color}`)
      .forEach((className) => {
        expect(domElement.classList.contains(className)).toBe(false);
      });
  });

  describe('Color application', () => {
    componentColors.forEach((color) => {
      it(`should add org-${color} class when orgColor is set to ${color}`, () => {
        component.color.set(color as ComponentColor);
        fixture.detectChanges();

        expect(domElement.classList.contains(`org-${color}`)).toBe(true);
      });
    });
  });

  it('should clear all color classes before applying new color', () => {
    component.color.set('brand');
    fixture.detectChanges();

    // Should only have org-brand class, no other color classes
    expect(domElement.classList.contains('org-brand')).toBe(true);
    componentColors
      .filter((color) => color !== 'brand')
      .forEach((color) => {
        expect(domElement.classList.contains(`org-${color}`)).toBe(false);
      });
  });

  it('should remove old color class and add new color class when color changes', () => {
    component.color.set('brand');
    fixture.detectChanges();

    expect(domElement.classList.contains('org-brand')).toBe(true);

    component.color.set('secondary');
    fixture.detectChanges();

    expect(domElement.classList.contains('org-brand')).toBe(false);
    expect(domElement.classList.contains('org-secondary')).toBe(true);
  });

  it('should remove all color classes when color is set to null', () => {
    component.color.set('brand');
    fixture.detectChanges();

    expect(domElement.classList.contains('org-brand')).toBe(true);

    component.color.set(null);
    fixture.detectChanges();

    componentColors.forEach((color) => {
      expect(domElement.classList.contains(`org-${color}`)).toBe(false);
    });
  });

  it('should handle multiple color changes correctly', () => {
    const testSequence: (ComponentColor | null)[] = ['primary', 'secondary', null, 'danger', 'success'];

    testSequence.forEach((color) => {
      component.color.set(color as ComponentColor);
      fixture.detectChanges();
    });

    // Verify final state - should have 'org-success' class and no others
    expect(domElement.classList.contains('org-success')).toBe(true);
    componentColors
      .filter((color) => color !== 'success')
      .forEach((color) => {
        expect(domElement.classList.contains(`org-${color}`)).toBe(false);
      });
  });

  it('should clear classes on initialization', () => {
    fixture.detectChanges();

    componentColors
      .map((color) => `org-${color}`)
      .forEach((className) => {
        expect(domElement.classList.contains(className)).toBe(false);
      });
  });

  it('should handle rapid color changes', () => {
    const colors: ComponentColor[] = ['primary', 'secondary', 'danger', 'success'];

    colors.forEach((color) => {
      component.color.set(color as ComponentColor);
      fixture.detectChanges();
    });

    // Should end up with only the last color class
    expect(domElement.classList.contains('org-success')).toBe(true);
    ['primary', 'secondary', 'danger'].forEach((color) => {
      expect(domElement.classList.contains(`org-${color}`)).toBe(false);
    });
  });

  it('should not change DOM when setting the same color multiple times', () => {
    component.color.set('primary');
    fixture.detectChanges();

    expect(domElement.classList.contains('org-primary')).toBe(true);

    // Get initial class list
    const initialClasses = Array.from(domElement.classList);

    component.color.set('primary');
    fixture.detectChanges();

    // Classes should remain the same
    const finalClasses = Array.from(domElement.classList);
    expect(finalClasses).toEqual(initialClasses);
    expect(domElement.classList.contains('org-primary')).toBe(true);
  });
});

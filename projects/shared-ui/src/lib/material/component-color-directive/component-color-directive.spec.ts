import { ComponentColorDirective, type ComponentColor } from './component-color-directive';
import { Component, Renderer2, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi, afterEach, MockInstance } from 'vitest';
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
  let divElement: HTMLElement;
  let renderer: Renderer2;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, ComponentColorDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    divElement = fixture.nativeElement.querySelector('div');
    renderer = fixture.componentRef.injector.get(Renderer2);

    vi.spyOn(renderer, 'addClass');
    vi.spyOn(renderer, 'removeClass');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should not add any color class when orgColor is null', () => {
    component.color.set(null);
    fixture.detectChanges();

    expect(renderer.addClass).not.toHaveBeenCalled();
    expect(renderer.removeClass).toHaveBeenCalled();
  });

  describe('Color application', () => {
    const colors = [
      'primary',
      'secondary',
      'neutral',
      'success',
      'info',
      'caution',
      'warning',
      'danger',
    ];

    colors.forEach((color) => {
      it(`should add org-${color} class when orgColor is set to ${color}`, () => {
        component.color.set(color as ComponentColor);
        fixture.detectChanges();

        expect(renderer.addClass).toHaveBeenCalledWith(divElement, `org-${color}`);
      });
    });
  });

  it('should clear all color classes before applying new color', () => {
    const colors = [
      'primary',
      'secondary',
      'neutral',
      'success',
      'info',
      'caution',
      'warning',
      'danger',
    ];

    component.color.set('primary');
    fixture.detectChanges();

    colors.forEach((color) => {
      expect(renderer.removeClass).toHaveBeenCalledWith(divElement, `org-${color}`);
    });

    expect(renderer.addClass).toHaveBeenCalledWith(divElement, 'org-primary');
  });

  it('should remove old color class and add new color class when color changes', () => {
    component.color.set('primary');
    fixture.detectChanges();

    vi.clearAllMocks();

    component.color.set('secondary');
    fixture.detectChanges();

    // Should clear all classes including old 'org-primary'
    expect(renderer.removeClass).toHaveBeenCalledWith(divElement, 'org-primary');
    expect(renderer.removeClass).toHaveBeenCalledWith(divElement, 'org-secondary');

    expect(renderer.addClass).toHaveBeenCalledWith(divElement, 'org-secondary');
  });

  it('should remove all color classes when color is set to null', () => {
    const colors = [
      'primary',
      'secondary',
      'neutral',
      'success',
      'info',
      'caution',
      'warning',
      'danger',
    ];

    component.color.set('primary');
    fixture.detectChanges();

    vi.clearAllMocks();

    component.color.set(null);
    fixture.detectChanges();

    colors.forEach((color) => {
      expect(renderer.removeClass).toHaveBeenCalledWith(divElement, `org-${color}`);
    });

    expect(renderer.addClass).not.toHaveBeenCalled();
  });

  it('should handle multiple color changes correctly', () => {
    const testSequence = ['primary', 'secondary', null, 'danger', 'success'];

    testSequence.forEach((color) => {
      component.color.set(color as ComponentColor);
      fixture.detectChanges();
    });

    // Verify final state - should have 'org-success' class
    expect(renderer.addClass).toHaveBeenLastCalledWith(divElement, 'org-success');
  });

  it.only('should clear classes on initialization', () => {
    fixture.detectChanges();

    expect(renderer.removeClass).toHaveBeenCalled();
  });

  it('should handle rapid color changes', () => {
    const colors = ['primary', 'secondary', 'danger', 'success'];

    colors.forEach((color) => {
      component.color.set(color as ComponentColor);
      fixture.detectChanges();
    });

    expect(renderer.addClass).toHaveBeenCalledWith(divElement, 'org-primary');
    expect(renderer.addClass).toHaveBeenCalledWith(divElement, 'org-secondary');
    expect(renderer.addClass).toHaveBeenCalledWith(divElement, 'org-danger');
    expect(renderer.addClass).toHaveBeenLastCalledWith(divElement, 'org-success');
  });

  it('effect should not trigger multiple times when setting the same color multiple times', () => {
    const addClassMock = renderer.addClass as unknown as MockInstance;

    component.color.set('primary');
    fixture.detectChanges();

    const addClassCallCount = addClassMock.mock.calls.length;

    component.color.set('primary');
    fixture.detectChanges();

    expect(addClassMock.mock.calls.length).toBe(addClassCallCount);
    expect(renderer.addClass).toHaveBeenCalledWith(divElement, 'org-primary');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, it, expect, vi } from 'vitest';

import { Button } from './button';

@Component({
  template: `
    <org-button
      [color]="color"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
      [preIcon]="preIcon"
      [postIcon]="postIcon"
      [type]="type"
      (clicked)="onClicked()"
    >
      {{ buttonText }}
    </org-button>
  `,
})
class TestHostComponent {
  public color: any = 'primary';
  public size: any = 'base';
  public disabled = false;
  public loading = false;
  public preIcon: string | null = null;
  public postIcon: string | null = null;
  public type: any = 'button';
  public buttonText = 'Test Button';
  public clickCount = 0;

  public onClicked(): void {
    this.clickCount++;
  }
}

describe('Button', () => {
  let component: Button;
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let focusMonitorSpy: { monitor: any; stopMonitoring: any };

  beforeEach(async () => {
    // Create a mock FocusMonitor using vitest
    focusMonitorSpy = {
      monitor: vi.fn().mockReturnValue({
        subscribe: vi.fn().mockReturnValue({ unsubscribe: vi.fn() }),
      }),
      stopMonitoring: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [Button, TestHostComponent],
      providers: [{ provide: FocusMonitor, useValue: focusMonitorSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(Button)).componentInstance;
    // No need to cast with jasmine.SpyObj
    // focusMonitorSpy is already the mock object

    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render button element', () => {
      const buttonElement = fixture.debugElement.query(By.css('button'));
      expect(buttonElement).toBeTruthy();
    });

    it('should display button text content', () => {
      const buttonElement = fixture.debugElement.query(By.css('button'));
      expect(buttonElement.nativeElement.textContent.trim()).toBe('Test Button');
    });
  });

  describe('Input Properties', () => {
    it('should have default size as base', () => {
      expect(component.size()).toBe('base');
    });

    it('should have default type as button', () => {
      expect(component.type()).toBe('button');
    });

    it('should not be disabled by default', () => {
      expect(component.disabled()).toBe(false);
    });

    it('should not be loading by default', () => {
      expect(component.loading()).toBe(false);
    });

    it('should update size when input changes', () => {
      hostComponent.size = 'large';
      fixture.detectChanges();
      expect(component.size()).toBe('large');
    });
  });

  describe('Button States', () => {
    it('should be disabled when disabled input is true', () => {
      hostComponent.disabled = true;
      fixture.detectChanges();
      expect(component.isDisabled()).toBe(true);
    });

    it('should be disabled when loading is true', () => {
      hostComponent.loading = true;
      fixture.detectChanges();
      expect(component.isDisabled()).toBe(true);
    });

    it('should show loading spinner when loading', () => {
      hostComponent.loading = true;
      fixture.detectChanges();

      const spinner = fixture.debugElement.query(By.css('org-loading-spinner'));
      expect(spinner).toBeTruthy();
    });

    it('should not show content when loading', () => {
      hostComponent.loading = true;
      fixture.detectChanges();

      const buttonElement = fixture.debugElement.query(By.css('button'));
      expect(buttonElement.nativeElement.textContent.trim()).not.toContain('Test Button');
    });
  });

  describe('Icon Support', () => {
    it('should show pre icon when preIcon is provided', () => {
      hostComponent.preIcon = 'plus';
      fixture.detectChanges();

      const preIcon = fixture.debugElement.query(By.css('org-icon'));
      expect(preIcon).toBeTruthy();
    });

    it('should show post icon when postIcon is provided', () => {
      hostComponent.postIcon = 'arrow-right';
      fixture.detectChanges();

      const icons = fixture.debugElement.queryAll(By.css('org-icon'));
      expect(icons.length).toBe(1);
    });

    it('should detect icon-only button', () => {
      hostComponent.preIcon = 'plus';
      hostComponent.buttonText = '';
      fixture.detectChanges();

      expect(component.isIconOnly()).toBe(true);
    });

    it('should show only one icon for icon-only button', () => {
      hostComponent.preIcon = 'plus';
      hostComponent.postIcon = 'arrow-right';
      hostComponent.buttonText = '';
      fixture.detectChanges();

      const icons = fixture.debugElement.queryAll(By.css('org-icon'));
      expect(icons.length).toBe(1);
    });
  });

  describe('Click Handling', () => {
    it('should emit clicked event when button is clicked', () => {
      const buttonElement = fixture.debugElement.query(By.css('button'));
      buttonElement.nativeElement.click();

      expect(hostComponent.clickCount).toBe(1);
    });

    it('should not emit clicked event when disabled', () => {
      hostComponent.disabled = true;
      fixture.detectChanges();

      const buttonElement = fixture.debugElement.query(By.css('button'));
      buttonElement.nativeElement.click();

      expect(hostComponent.clickCount).toBe(0);
    });

    it('should not emit clicked event when loading', () => {
      hostComponent.loading = true;
      fixture.detectChanges();

      const buttonElement = fixture.debugElement.query(By.css('button'));
      buttonElement.nativeElement.click();

      expect(hostComponent.clickCount).toBe(0);
    });
  });

  describe('CSS Classes', () => {
    it('should apply primary color class to host', () => {
      hostComponent.color = 'primary';
      fixture.detectChanges();

      const hostElement = fixture.debugElement.nativeElement;
      expect(hostElement.classList).toContain('org-primary');
    });

    it('should apply danger color class to host', () => {
      hostComponent.color = 'danger';
      fixture.detectChanges();

      const hostElement = fixture.debugElement.nativeElement;
      expect(hostElement.classList).toContain('org-danger');
    });

    it('should apply small size classes', () => {
      hostComponent.size = 'sm';
      fixture.detectChanges();

      const buttonElement = fixture.debugElement.query(By.css('button'));
      expect(buttonElement.nativeElement.classList).toContain('px-2');
      expect(buttonElement.nativeElement.classList).toContain('py-1');
      expect(buttonElement.nativeElement.classList).toContain('text-xs');
    });

    it('should apply large size classes', () => {
      hostComponent.size = 'large';
      fixture.detectChanges();

      const buttonElement = fixture.debugElement.query(By.css('button'));
      expect(buttonElement.nativeElement.classList).toContain('px-4');
      expect(buttonElement.nativeElement.classList).toContain('py-1');
      expect(buttonElement.nativeElement.classList).toContain('text-xl');
    });

    it('should apply disabled styles when disabled', () => {
      hostComponent.disabled = true;
      fixture.detectChanges();

      const buttonElement = fixture.debugElement.query(By.css('button'));
      expect(buttonElement.nativeElement.classList).toContain('opacity-50');
      expect(buttonElement.nativeElement.classList).toContain('cursor-not-allowed');
    });
  });

  describe('Mouse Interactions', () => {
    it('should handle mouse down event', () => {
      const buttonElement = fixture.debugElement.query(By.css('button'));
      buttonElement.nativeElement.dispatchEvent(new MouseEvent('mousedown'));

      expect(component._stateForTesting.isPressed).toBe(true);
    });

    it('should handle mouse up event', () => {
      // First press down
      const buttonElement = fixture.debugElement.query(By.css('button'));
      buttonElement.nativeElement.dispatchEvent(new MouseEvent('mousedown'));
      expect(component._stateForTesting.isPressed).toBe(true);

      // Then release
      buttonElement.nativeElement.dispatchEvent(new MouseEvent('mouseup'));
      expect(component._stateForTesting.isPressed).toBe(false);
    });

    it('should handle mouse leave event', () => {
      // First press down
      const buttonElement = fixture.debugElement.query(By.css('button'));
      buttonElement.nativeElement.dispatchEvent(new MouseEvent('mousedown'));
      expect(component._stateForTesting.isPressed).toBe(true);

      // Then leave
      buttonElement.nativeElement.dispatchEvent(new MouseEvent('mouseleave'));
      expect(component._stateForTesting.isPressed).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should monitor focus on initialization', () => {
      expect(focusMonitorSpy.monitor).toHaveBeenCalled();
    });

    it('should stop monitoring focus on destroy', () => {
      component.ngOnDestroy();
      expect(focusMonitorSpy.stopMonitoring).toHaveBeenCalled();
    });

    it('should set correct button type attribute', () => {
      hostComponent.type = 'submit';
      fixture.detectChanges();

      const buttonElement = fixture.debugElement.query(By.css('button'));
      expect(buttonElement.nativeElement.type).toBe('submit');
    });

    it('should set disabled attribute when disabled', () => {
      hostComponent.disabled = true;
      fixture.detectChanges();

      const buttonElement = fixture.debugElement.query(By.css('button'));
      expect(buttonElement.nativeElement.disabled).toBe(true);
    });
  });
});

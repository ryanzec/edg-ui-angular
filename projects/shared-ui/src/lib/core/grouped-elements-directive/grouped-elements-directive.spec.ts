import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupedElementsDirective } from './grouped-elements-directive';
import { describe, it, expect, beforeEach } from 'vitest';

@Component({
  template: ` <div [orgGroupedElements]="enabled" data-testid="test-element">Test Content</div> `,
  imports: [GroupedElementsDirective],
})
class TestComponent {
  public enabled: boolean | null = true;
}

describe('GroupedElementsDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('[data-testid="test-element"]');
  });

  it('should create an instance', () => {
    const directive = new GroupedElementsDirective();
    expect(directive).toBeTruthy();
  });

  it('should add CSS classes when enabled is true', () => {
    component.enabled = true;
    fixture.detectChanges();

    expect(element.classList.contains('flex')).toBe(true);
    expect(element.classList.contains('flex-col')).toBe(true);
    expect(element.classList.contains('gap-2')).toBe(true);
  });

  it('should not add CSS classes when enabled is false', () => {
    component.enabled = false;
    fixture.detectChanges();

    expect(element.classList.contains('flex')).toBe(false);
    expect(element.classList.contains('flex-col')).toBe(false);
    expect(element.classList.contains('gap-2')).toBe(false);
  });

  it('should not add CSS classes when enabled is null', () => {
    component.enabled = null;
    fixture.detectChanges();

    expect(element.classList.contains('flex')).toBe(false);
    expect(element.classList.contains('flex-col')).toBe(false);
    expect(element.classList.contains('gap-2')).toBe(false);
  });

  it('should add CSS classes by default when no value is provided', () => {
    // Test with default behavior (no explicit value)
    fixture.nativeElement.innerHTML = `
      <div orgGroupedElements data-testid="default-element">
        Default Content
      </div>
    `;
    fixture.detectChanges();

    const defaultElement = fixture.nativeElement.querySelector('[data-testid="default-element"]');
    expect(defaultElement.classList.contains('flex')).toBe(true);
    expect(defaultElement.classList.contains('flex-col')).toBe(true);
    expect(defaultElement.classList.contains('gap-2')).toBe(true);
  });
});

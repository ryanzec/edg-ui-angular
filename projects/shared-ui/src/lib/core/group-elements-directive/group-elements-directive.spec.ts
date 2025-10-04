import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupElementsDirective } from './group-elements-directive';
import { describe, it, expect, beforeEach } from 'vitest';

@Component({
  template: `
    <div [orgGroupElements]="enabled" [flexDirection]="flexDirection" data-testid="test-element">Test Content</div>
  `,
  imports: [GroupElementsDirective],
})
class TestComponent {
  public enabled: boolean | null = true;
  public flexDirection: 'row' | 'col' = 'row';
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
    const directive = new GroupElementsDirective();
    expect(directive).toBeTruthy();
  });

  it('should add CSS classes when enabled is true (default row direction)', () => {
    component.enabled = true;
    fixture.detectChanges();

    expect(element.classList.contains('flex')).toBe(true);
    expect(element.classList.contains('flex-col')).toBe(false);
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

  it('should add CSS classes by default when no value is provided (default row direction)', () => {
    // Test with default behavior (no explicit value)
    fixture.nativeElement.innerHTML = `
      <div orgGroupElements data-testid="default-element">
        Default Content
      </div>
    `;
    fixture.detectChanges();

    const defaultElement = fixture.nativeElement.querySelector('[data-testid="default-element"]');
    expect(defaultElement.classList.contains('flex')).toBe(true);
    expect(defaultElement.classList.contains('flex-col')).toBe(false);
    expect(defaultElement.classList.contains('gap-2')).toBe(true);
  });

  it('should conditionally apply flex-col based on flexDirection input', () => {
    component.enabled = true;
    component.flexDirection = 'col';
    fixture.detectChanges();

    expect(element.classList.contains('flex')).toBe(true);
    expect(element.classList.contains('flex-col')).toBe(true);
    expect(element.classList.contains('gap-2')).toBe(true);
  });

  it('should not apply flex-col when flexDirection is row', () => {
    component.enabled = true;
    component.flexDirection = 'row';
    fixture.detectChanges();

    expect(element.classList.contains('flex')).toBe(true);
    expect(element.classList.contains('flex-col')).toBe(false);
    expect(element.classList.contains('gap-2')).toBe(true);
  });

  it('should not apply flex-col when directive is disabled even if flexDirection is col', () => {
    component.enabled = false;
    component.flexDirection = 'col';
    fixture.detectChanges();

    expect(element.classList.contains('flex')).toBe(false);
    expect(element.classList.contains('flex-col')).toBe(false);
    expect(element.classList.contains('gap-2')).toBe(false);
  });

  it('should default to row direction when flexDirection is not specified', () => {
    // Test with default flexDirection behavior
    fixture.nativeElement.innerHTML = `
      <div orgGroupElements data-testid="default-flex-element">
        Default Flex Content
      </div>
    `;
    fixture.detectChanges();

    const defaultElement = fixture.nativeElement.querySelector('[data-testid="default-flex-element"]');
    expect(defaultElement.classList.contains('flex')).toBe(true);
    expect(defaultElement.classList.contains('flex-col')).toBe(false);
    expect(defaultElement.classList.contains('gap-2')).toBe(true);
  });
});

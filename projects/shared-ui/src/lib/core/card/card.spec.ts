import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, it, expect } from 'vitest';

import { Card } from './card';

@Component({
  template: `
    <org-card [color]="color">
      <div>Test Content</div>
    </org-card>
  `,
})
class TestHostComponent {
  public color: any = null;
}

describe('Card', () => {
  let component: Card;
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(Card)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render content', () => {
    const cardElement = fixture.debugElement.query(By.css('.org-card'));
    expect(cardElement.nativeElement.textContent.trim()).toBe('Test Content');
  });

  describe('Color Classes', () => {
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

    it('should not apply any color class when color is null', () => {
      hostComponent.color = null;
      fixture.detectChanges();

      const hostElement = fixture.debugElement.nativeElement;
      expect(hostElement.classList).not.toContain('org-primary');
      expect(hostElement.classList).not.toContain('org-secondary');
      expect(hostElement.classList).not.toContain('org-danger');
    });
  });

  describe('Card Structure', () => {
    it('should have base card classes', () => {
      const cardElement = fixture.debugElement.query(By.css('.org-card'));
      expect(cardElement.nativeElement.classList).toContain('org-card');
      expect(cardElement.nativeElement.classList).toContain('border');
      expect(cardElement.nativeElement.classList).toContain('rounded-md');
    });
  });
});

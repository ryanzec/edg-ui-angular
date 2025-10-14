import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, it, expect } from 'vitest';

import { Tag } from './tag';

@Component({
  template: ` <org-tag [color]="color" [variant]="variant" [removable]="removable"> Test Tag </org-tag> `,
})
class TestHostComponent {
  public color: any = 'primary';
  public variant: any = 'weak';
  public removable = false;
}

describe('Tag', () => {
  let component: Tag;
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tag, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(Tag)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render content', () => {
    const tagElement = fixture.debugElement.query(By.css('span'));
    expect(tagElement.nativeElement.textContent.trim()).toBe('Test Tag');
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

  describe('Variant Classes', () => {
    it('should apply weak variant class to tag element', () => {
      hostComponent.variant = 'weak';
      fixture.detectChanges();

      const tagElement = fixture.debugElement.query(By.css('span'));
      expect(tagElement.nativeElement.classList).toContain('weak');
    });

    it('should apply strong variant class to tag element', () => {
      hostComponent.variant = 'strong';
      fixture.detectChanges();

      const tagElement = fixture.debugElement.query(By.css('span'));
      expect(tagElement.nativeElement.classList).toContain('strong');
    });
  });

  describe('Tag Structure', () => {
    it('should have base tag classes', () => {
      const tagElement = fixture.debugElement.query(By.css('span'));
      expect(tagElement.nativeElement.classList).toContain('inline-flex');
      expect(tagElement.nativeElement.classList).toContain('items-center');
      expect(tagElement.nativeElement.classList).toContain('rounded-md');
      expect(tagElement.nativeElement.classList).toContain('border');
    });
  });

  describe('Removable functionality', () => {
    it('should show remove icon when removable is true', () => {
      hostComponent.removable = true;
      fixture.detectChanges();

      const removeButton = fixture.debugElement.query(By.css('button'));
      expect(removeButton).toBeTruthy();
      expect(removeButton.nativeElement.getAttribute('aria-label')).toBe('Remove tag');
    });

    it('should not show remove icon when removable is false', () => {
      hostComponent.removable = false;
      fixture.detectChanges();

      const removeButton = fixture.debugElement.query(By.css('button'));
      expect(removeButton).toBeFalsy();
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarStack, AVATAR_STACK_SIZE_DEFAULT } from './avatar-stack';
import { describe, beforeEach, it, expect } from 'vitest';

describe('AvatarStack', () => {
  let component: AvatarStack;
  let fixture: ComponentFixture<AvatarStack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarStack],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarStack);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('inputs', () => {
    it('should have default size of base', () => {
      expect(component.size()).toBe(AVATAR_STACK_SIZE_DEFAULT);
    });

    it('should accept size input', () => {
      fixture.componentRef.setInput('size', 'lg');
      expect(component.size()).toBe('lg');
    });

    it('should accept null size', () => {
      fixture.componentRef.setInput('size', null);
      expect(component.size()).toBe(null);
    });

    it('should accept class input', () => {
      fixture.componentRef.setInput('class', 'custom-class');
      expect(component.class()).toBe('custom-class');
    });
  });

  describe('host attributes', () => {
    it('should have dataid attribute', () => {
      const element = fixture.nativeElement as HTMLElement;
      expect(element.getAttribute('dataid')).toBe('avatar-stack');
    });
  });
});

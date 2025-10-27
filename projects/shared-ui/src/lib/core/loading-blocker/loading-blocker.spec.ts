import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingBlocker } from './loading-blocker';
import { describe, it, expect, beforeEach } from 'vitest';

describe('LoadingBlocker', () => {
  let component: LoadingBlocker;
  let fixture: ComponentFixture<LoadingBlocker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingBlocker],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingBlocker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect } from 'vitest';

import { OverlayMenu } from './overlay-menu';

describe('OverlayMenu', () => {
  let component: OverlayMenu;
  let fixture: ComponentFixture<OverlayMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(OverlayMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

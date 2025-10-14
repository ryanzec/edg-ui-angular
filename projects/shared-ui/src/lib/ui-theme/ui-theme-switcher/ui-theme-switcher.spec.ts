import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, it, expect } from 'vitest';

import { UiThemeSwitcher } from './ui-theme-switcher';

describe('UiThemeSwitcher', () => {
  let component: UiThemeSwitcher;
  let fixture: ComponentFixture<UiThemeSwitcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiThemeSwitcher],
    }).compileComponents();

    fixture = TestBed.createComponent(UiThemeSwitcher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

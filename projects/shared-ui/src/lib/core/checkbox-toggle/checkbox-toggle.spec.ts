import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxToggle } from './checkbox-toggle';

describe('CheckboxToggle', () => {
  let component: CheckboxToggle;
  let fixture: ComponentFixture<CheckboxToggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxToggle],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxToggle);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('name', 'test');
    fixture.componentRef.setInput('value', 'test-value');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

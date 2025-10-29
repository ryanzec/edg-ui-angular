import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerInput } from './date-picker-input';

describe('DatePickerInput', () => {
  let component: DatePickerInput;
  let fixture: ComponentFixture<DatePickerInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerInput],
    }).compileComponents();

    fixture = TestBed.createComponent(DatePickerInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

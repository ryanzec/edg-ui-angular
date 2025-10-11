import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateTime } from 'luxon';
import { DateDisplay } from './date-display';

describe('DateDisplay', () => {
  let component: DateDisplay;
  let fixture: ComponentFixture<DateDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(DateDisplay);
    component = fixture.componentInstance;
    // set required input
    fixture.componentRef.setInput('date', DateTime.now());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // tests will be added here
});

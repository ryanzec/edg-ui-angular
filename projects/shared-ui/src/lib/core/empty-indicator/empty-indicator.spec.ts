import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyIndicator } from './empty-indicator';

describe('EmptyIndicator', () => {
  let component: EmptyIndicator;
  let fixture: ComponentFixture<EmptyIndicator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyIndicator],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyIndicator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // additional tests will be added here
});

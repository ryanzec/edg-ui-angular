import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInputs } from './basic-inputs';

describe('BasicInputs', () => {
  let component: BasicInputs;
  let fixture: ComponentFixture<BasicInputs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicInputs],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicInputs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

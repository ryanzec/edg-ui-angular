import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Virtualized } from './virtualized';

describe('Virtualized', () => {
  let component: Virtualized;
  let fixture: ComponentFixture<Virtualized>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Virtualized],
    }).compileComponents();

    fixture = TestBed.createComponent(Virtualized);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

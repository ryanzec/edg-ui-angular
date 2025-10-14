import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab } from './tab';
import { Tabs } from './tabs';

describe('Tab', () => {
  let component: Tab;
  let fixture: ComponentFixture<Tab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tab, Tabs],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // tests to be implemented
});

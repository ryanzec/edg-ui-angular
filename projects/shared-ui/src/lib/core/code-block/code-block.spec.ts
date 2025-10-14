import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeBlock } from './code-block';

describe('CodeBlock', () => {
  let component: ComponentFixture<CodeBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeBlock],
    }).compileComponents();

    component = TestBed.createComponent(CodeBlock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { describe, beforeEach, it, expect } from 'vitest';

import { TodoList } from './todo-list';
import { TodoApiService } from '../todo-api/todo-api';

describe('TodoListComponent', () => {
  let component: TodoList;

  let fixture: ComponentFixture<TodoList>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoList],
      providers: [provideHttpClient(), provideHttpClientTesting(), TodoApiService],
    });

    fixture = TestBed.createComponent(TodoList);
    component = fixture.componentInstance;

    // Set required input before detecting changes
    fixture.componentRef.setInput('todos', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

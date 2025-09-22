import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { beforeEach, describe, it, expect, afterEach, vi } from 'vitest';

import { TodoApiService } from './todo-api';

describe('TodoApiService', () => {
  let service: TodoApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    vi.useFakeTimers();

    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), TodoApiService],
    });

    service = TestBed.inject(TodoApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    vi.useRealTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch todos from the API', () => {
    const mockTodos = [
      { id: 1, title: 'Test Todo 1', completed: false },
      { id: 2, title: 'Test Todo 2', completed: true },
    ];

    service.getTodos().subscribe((todos) => {
      expect(todos).toEqual(mockTodos);
    });

    // Fast-forward time to trigger the delayed HTTP request
    vi.advanceTimersByTime(3000);

    const mockedRequest = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos');
    expect(mockedRequest.request.method).toBe('GET');
    mockedRequest.flush(mockTodos);
  });
});

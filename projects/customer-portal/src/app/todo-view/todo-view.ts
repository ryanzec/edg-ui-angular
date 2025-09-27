import { Component, inject, Signal, signal } from '@angular/core';
import { TodoList, TodoApiService } from '@organization/shared-ui';
import { Observable } from 'rxjs';
import { Todo } from '@organization/shared-types';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'cp-todo-view',
  imports: [TodoList],
  templateUrl: './todo-view.html',
  styleUrl: './todo-view.css',
})
export class TodoView {
  private readonly todoApiService = inject(TodoApiService);

  private todos$: Observable<Todo[]>;

  protected todosSignal: Signal<Todo[] | undefined>;

  protected count = signal(1);

  constructor() {
    this.todos$ = this.todoApiService.getTodos();
    this.todosSignal = toSignal(this.todos$, { initialValue: undefined });

    setInterval(() => {
      this.count.update((count) => count + 1);
    }, 1000);
  }
}

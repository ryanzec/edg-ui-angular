import { Component, input, InputSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '@organization/shared-types';

@Component({
  selector: 'org-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoList {
  public todos: InputSignal<Todo[] | undefined> = input.required();
}

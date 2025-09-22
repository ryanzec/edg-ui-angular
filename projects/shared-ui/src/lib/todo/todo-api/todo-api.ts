import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { rxjsUtils } from '@organization/shared-utils';
import { Todo } from '@organization/shared-types';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  private http = inject(HttpClient);

  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl).pipe(rxjsUtils.withDelay(3000));
  }
}

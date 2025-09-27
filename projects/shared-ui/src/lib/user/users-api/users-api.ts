import { inject, Injectable } from '@angular/core';
import { CreateUser, UpdateUser, User } from '@organization/shared-types';
import { BASE_API_URL, LogManager } from '@organization/shared-ui';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersApi {
  private readonly http = inject(HttpClient);
  private readonly logManager = inject(LogManager);
  private readonly baseUrl = inject(BASE_API_URL);

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`).pipe(catchError(this.handleError));
  }

  public getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`).pipe(catchError(this.handleError));
  }

  public createUser(user: CreateUser): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user).pipe(catchError(this.handleError));
  }

  public updateUser(user: UpdateUser): Observable<User> {
    const { id, ...restOfUser } = user;
    return this.http.patch<User>(`${this.baseUrl}/users/${id}`, restOfUser).pipe(catchError(this.handleError));
  }

  public deleteUser(id: User['id']): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: unknown): Observable<never> {
    this.logManager.error({
      type: 'users-api-error',
      message: error instanceof Error ? error.message : 'Unknown error',
      error,
    });

    return throwError(() => new Error('Request failed. Please try again later.'));
  }
}

import { inject, Injectable } from '@angular/core';
import {
  CreateUser,
  CreateUserResponse,
  DeleteUserResponse,
  GetUserResponse,
  GetUsersResponse,
  UpdateUser,
  UpdateUserResponse,
  User,
} from '@organization/shared-types';
import { LogManager } from '../../core/log-manager/log-manager';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { USERS_API_URL } from '../../core/injectable-tokens';
@Injectable({
  providedIn: 'root',
})
export class UsersApi {
  private readonly _http = inject(HttpClient);
  private readonly _logManager = inject(LogManager);
  private readonly _baseUrl = inject(USERS_API_URL);

  public getUsers(): Observable<GetUsersResponse> {
    return this._http.get<GetUsersResponse>(`${this._baseUrl}`).pipe(catchError(this.handleError));
  }

  public getUser(id: string): Observable<GetUserResponse> {
    return this._http.get<GetUserResponse>(`${this._baseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  public createUser(user: CreateUser): Observable<CreateUserResponse> {
    return this._http.post<CreateUserResponse>(`${this._baseUrl}`, user).pipe(catchError(this.handleError));
  }

  public updateUser(user: UpdateUser): Observable<UpdateUserResponse> {
    const { id, ...restOfUser } = user;

    return this._http
      .patch<UpdateUserResponse>(`${this._baseUrl}/${id}`, restOfUser)
      .pipe(catchError(this.handleError));
  }

  public deleteUser(id: User['id']): Observable<DeleteUserResponse> {
    return this._http.delete<DeleteUserResponse>(`${this._baseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError = (error: unknown): Observable<never> => {
    this._logManager.error({
      type: 'users-api-error',
      message: error instanceof Error ? error.message : 'Unknown error',
      error,
    });

    return throwError(() => new Error('Request failed. Please try again later.'));
  };
}

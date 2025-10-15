import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AuthenticationAuthenticateRequest,
  AuthenticationAuthenticateResponse,
  AuthenticationCheckResponse,
} from '@organization/shared-types';
import { AUTHENTICATION_API_URL } from '../../core/injectable-tokens';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationApi {
  private readonly _baseUrl = inject(AUTHENTICATION_API_URL);

  private http = inject(HttpClient);

  public authenticate(request: AuthenticationAuthenticateRequest): Observable<AuthenticationAuthenticateResponse> {
    return this.http.post<AuthenticationAuthenticateResponse>(`${this._baseUrl}/authenticate`, request);
  }

  public check() {
    return this.http.get<AuthenticationCheckResponse>(`${this._baseUrl}/check`);
  }
}

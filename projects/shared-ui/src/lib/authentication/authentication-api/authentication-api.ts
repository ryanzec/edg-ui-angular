import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationAuthenticateRequest, AuthenticationAuthenticateResponse } from '@organization/shared-types';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationApi {
  private readonly baseUrl = 'https://localhost:3000';

  private http = inject(HttpClient);

  authenticate(request: AuthenticationAuthenticateRequest): Observable<AuthenticationAuthenticateResponse> {
    return this.http.post<AuthenticationAuthenticateResponse>(`${this.baseUrl}/authentication/authenticate`, request);
  }
}

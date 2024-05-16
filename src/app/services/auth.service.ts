import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '@models/login/response.model';
import { LoginPayload } from '@models/login/payload.model';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
    this.validateTokenAndRedirect();
  }

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.getBaseUrl()}/session/`, payload)
      .pipe(
        tap(response => {
          this.validateTokenAndRedirect();
          localStorage.setItem('auth_token', response.token);
        })
      );
  }
  
  logout(): void {
    localStorage.removeItem('auth_token');
    if(this.isTokenValid() || this.isLoggedIn()){
      console.error('Error logout');
      return;
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getAuthToken();
  }

  getToken(): any {
    return this.decodeToken();
  }

  getAuthToken(): any {
    return localStorage.getItem('auth_token') ?? null;
  }

  private decodeToken(): any {
    return this.isLoggedIn() ? jwtDecode(this.getAuthToken()) : null;
  }

  getBaseUrl(): string{
    return 'http://localhost:3333';
  }

  private isTokenValid(): boolean {
    const token = this.getAuthToken();
    const decodedToken = this.decodeToken();
    return decodedToken && decodedToken.exp > Date.now() / 1000;
  }

  private validateTokenAndRedirect(): void {
    if (!this.isTokenValid()) {
      this.logout();
    }
  }
  
}


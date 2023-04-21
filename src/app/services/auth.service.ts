import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { LoginPayload } from '../models/login-payload.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:3333/session/', payload)
      .pipe(
        tap(response => {
          localStorage.setItem('auth_token', response.token);
        })
      );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }
  
  logout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }
  
}

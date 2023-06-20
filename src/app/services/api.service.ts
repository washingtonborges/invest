import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  token:string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.getAuthToken();
  }

  get(endpoint: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(`${this.authService.getBaseUrl()}/${endpoint}`, { headers });
  }

  post(endpoint: string, body: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.authService.getBaseUrl()}/${endpoint}`, body, { headers });
  }
}

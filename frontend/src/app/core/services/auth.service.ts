import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginCredentials } from '../../shared/models/login-credentials.model';
import { User } from '../../shared/models/user.model';
import { environment } from '../../../environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post(`${this.API}/login`, credentials);
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.API}/register`, user);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/auth']); 
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}

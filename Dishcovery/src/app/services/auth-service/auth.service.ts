import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) {}

  register(userData: { username: string; email: string; password: string }): Observable<any> {
    console.log('Sende Registrierung an Backend:', userData);
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
}

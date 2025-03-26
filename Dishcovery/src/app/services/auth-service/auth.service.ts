import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../app.config';
import { BehaviorSubject,tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

  isLoggedIn$ = this.loggedIn.asObservable(); // Observable für den Login-Status

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable(); // User-Observable für andere Komponenten
  
  constructor(private http: HttpClient) {}

  register(userData: { username: string; email: string; password: string }): Observable<any> {
    console.log('Sende Registrierung an Backend:', userData);
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(identifier: string, password: string): Observable<any> {
    return this.http.post<{ token: string, username: string }>(
      `${this.apiUrl}/login`, 
      { identifier, password }
    ).pipe(
      tap(response => {
        if (response && response.token) { // Nur wenn ein Token zurückkommt
          localStorage.setItem('token', response.token);
          this.loggedIn.next(true);
          console.log(localStorage.getItem('token'));
        }
      })
    );
  }
  
  
  logout() {
    localStorage.removeItem('token'); // Token löschen
    localStorage.removeItem('user'); // User löschen
    this.loggedIn.next(false); // Status auf "ausgeloggt" setzen
  }


  loadUser(userId: string) {  
    if (userId) {
      this.http.get(`${environment.apiUrl}/user/${userId}`).subscribe(user => {
        this.userSubject.next(user); // Benutzer-Observable mit neuen Daten updaten
        console.log('📥 Neue Daten:', user);
        localStorage.setItem('user', JSON.stringify(user)); // Optional: User-Daten im LocalStorage spe
      });
    }
  }
  
 



}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../app.config';
import { Recipe } from '../recipe-services/recipe.type';

export interface FavoriteEntry {
  id: number;
  savedAt: string;
  recipe: Recipe;
}

export interface WatchEntry {
  id: number;
  savedAt: string;
  recipe: Recipe;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl; // 💡 Stelle sicher, dass die API-URL korrekt ist

  constructor(private http: HttpClient) {}

  // GET: Alle Benutzer abrufen
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user`);
  }

  // GET: Einzelnen Benutzer abrufen
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${id}`);
  }

  // POST: Benutzer erstellen
  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user`, user);
  }

  // PUT: Benutzer aktualisieren
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/user/${id}`, user);
  }

  // DELETE: Benutzer löschen
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/user/${id}`);
  }

  toggleFavorite(recipeId: number, userId: number) {
    return this.http.post<{ message: string }>(`${this.apiUrl}/user/${userId}/favlist`, {
      recipeId,
      userId,
    });
  }

  toggleWatchlist(recipeId: number, userId: number) {
    return this.http.post<{ message: string }>(`${this.apiUrl}/user/${userId}/watchlist`, {
      recipeId,
      userId,
    });
  }

  getWatchlist(userId: number): Observable<WatchEntry[]> {
    return this.http.get<WatchEntry[]>(`${this.apiUrl}/user/${userId}/watchlist`);
  }

  getFavorites(userId: number): Observable<FavoriteEntry[]> {
    return this.http.get<FavoriteEntry[]>(`${this.apiUrl}/user/${userId}/favlist`);
  }
}

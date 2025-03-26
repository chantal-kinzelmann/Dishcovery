import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Recipe, Tag } from './recipe.type';
import { Observable } from 'rxjs';
import { environment } from '../../app.config';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private readonly http:HttpClient) { }
  private apiUrl = environment.apiUrl;

  // API-Anfrage: Alle Rezepte abrufen
  getRecipes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recipe`);
  }

  // GET: Alle Rezepte abrufen
  getAllRecipes(): Observable<any[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipe`).pipe(
      tap(data => console.log('API Response:', data)) // Add this line
    );
  }

  //GET: Rezepte von User abrufen
  getRecipesByUser(userId: number): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipe/by-user/${userId}`);
  }
  
  

  // GET: Einzelnes Rezept abrufen
  getRecipeById(id: number): Observable<any> {
    return this.http.get<Recipe>(`${this.apiUrl}/recipe/${id}`);
  }

  // POST: Neues Rezept erstellen
  createRecipe(recipe: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/recipe`, recipe);
  }

  // PUT: Rezept aktualisieren
  updateRecipe(id: number, recipe: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/recipe/${id}`, recipe);
  }

  // DELETE: Rezept löschen
  deleteRecipe(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/recipe/${id}`);
  }

  getRecipesByTag(tagName: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipe/tag/${tagName}`).pipe(tap(recipes => console.log('Received recipes with tag ${tagName}:', recipes)));
  }
}






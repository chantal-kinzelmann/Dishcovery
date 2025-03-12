import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Recipe } from './recipe.type';
import { Observable } from 'rxjs';
import { environment } from '../app.config'; // Falls du `environment` in `app.config.ts` hast


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private readonly http:HttpClient) { }
  private apiUrl = environment.apiUrl;

  recieveProducts() {
    const result$ = this.http.get<{ recipes: Recipe[] }>(
      "http://dummylink.com/recipes"
    );
    return result$.pipe(
      map( (body: {recipes: Recipe[]}) => {   // typisiert den product: Product[] und macht ihn sozusagen "verarbeitbar" und nur das Array wird zurückgegeben 
        return body.recipes;
      })
    );
  }

  // API-Anfrage: Alle Rezepte abrufen
  getRecipes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recipe`);
  }


  // GET: Alle Rezepte abrufen
  getAllRecipes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recipe`);
  }

  // GET: Einzelnes Rezept abrufen
  getRecipeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/recipe/${id}`);
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
}








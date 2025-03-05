import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Recipe } from './recipe.type';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private readonly http:HttpClient) { }

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
}

import { Component } from '@angular/core';
import { Recipe } from '../services/recipe-services/recipe.type';
import { Observable, tap } from 'rxjs';
import { RecipeService } from '../services/recipe-services/recipe.service';
import { SmallRecipeCardComponent } from '../small-recipe-card/small-recipe-card.component';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-recipes-page',
  imports: [SmallRecipeCardComponent, CommonModule],
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.scss'
})
export class RecipesPageComponent {
  recipes$: Observable<Recipe[]>;

  constructor(private readonly recipeService: RecipeService) {
    // this.recipes$ = this.recipeService.getRecipes();
    this.recipes$ = this.recipeService.getAllRecipes().pipe(
      tap(recipes => console.log('Received recipes:', recipes))
    );
  }
}

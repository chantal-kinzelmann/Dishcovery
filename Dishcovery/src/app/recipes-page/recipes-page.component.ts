import { Component } from '@angular/core';
import { Recipe, Tag } from '../services/recipe-services/recipe.type';
import { map, Observable, tap } from 'rxjs';
import { RecipeService } from '../services/recipe-services/recipe.service';
import { SmallRecipeCardComponent } from '../small-recipe-card/small-recipe-card.component';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-recipes-page',
  imports: [SmallRecipeCardComponent, CommonModule, MatChipsModule],
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.scss'
})
export class RecipesPageComponent {
  recipes$: Observable<Recipe[]>;
  allTags$?: Observable<string[]>;
  recipesByTag$?: Observable<{ [tag: string]: Recipe[] }>;

  constructor(private readonly recipeService: RecipeService) {
    this.recipes$ = this.recipeService.getAllRecipes().pipe(
      tap(recipes => console.log('Received recipes:', recipes))
    );
  }

  ngOnInit() {
    // Create an observable that groups recipes by their tags
    this.recipesByTag$ = this.recipes$.pipe(
      tap(recipes => {
        console.log('All Recipes:', recipes);
        console.log('Number of Recipes:', recipes.length);
      }),
      map(recipes => {
        // Reduce recipes into an object where keys are tag names and values are arrays of recipes
        const tagMap = recipes.reduce((acc, recipe) => {
          console.log('Current Recipe:', recipe);
          // Flatten tags and ensure unique tag names
          const recipeTags = [...new Set(recipe.tags.map(tag => tag.name))];
          
          // For each tag, add the recipe to that tag's array
          recipeTags.forEach(tagName => {
            if (!acc[tagName]) {
              acc[tagName] = [];
            }
            acc[tagName].push(recipe);
          });
          
          return acc;
        }, {} as { [tag: string]: Recipe[] });
  
        console.log('Recipes by Tag:', tagMap);
        return tagMap;
      })
    );
  
    // Extract unique tag names
    this.allTags$ = this.recipes$.pipe(
      tap(recipes => {
        console.log('Tags:', recipes.flatMap(recipe => recipe.tags.map(tag => tag.name)));
      }),
      map(recipes => {
        // Flatten and get unique tag names
        const allTagNames = recipes.flatMap(recipe => 
          recipe.tags.map(tag => tag.name)
        );
        return [...new Set(allTagNames)];
      })
    );
  }
}

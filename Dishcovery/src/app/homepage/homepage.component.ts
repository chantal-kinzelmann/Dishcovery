import { Component } from '@angular/core';
import { SmallRecipeCardComponent } from '../small-recipe-card/small-recipe-card.component';
import { RecipeService } from '../services/recipe-services/recipe.service';
import { Recipe } from '../services/recipe-services/recipe.type';
import { delay, finalize, map, Observable, startWith, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-homepage',
  imports: [SmallRecipeCardComponent, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  recipes$: Observable<Recipe[]>;
  allTags$?: Observable<string[]>;
  recipesByTag$?: Observable<{ [tag: string]: Recipe[] }>;

  loading = true;

  constructor(private readonly recipeService: RecipeService) {
    this.recipes$ = this.recipeService.getAllRecipes().pipe(
      delay(500),
      startWith([]),
      finalize(() => {
        this.loading = false;
      }),
    );
  }

  ngOnInit() {
    // Create an observable that groups recipes by their tags
    this.recipesByTag$ = this.recipes$.pipe(
      map((recipes) => {
        // Reduce recipes into an object where keys are tag names and values are arrays of recipes
        const tagMap = recipes.reduce(
          (acc, recipe) => {
            // Flatten tags and ensure unique tag names
            const recipeTags = [...new Set(recipe.tags.map((tag) => tag.name))];
            // For each tag, add the recipe to that tag's array
            recipeTags.forEach((tagName) => {
              if (!acc[tagName]) {
                acc[tagName] = [];
              }
              acc[tagName].push(recipe);
            });

            return acc;
          },
          {} as { [tag: string]: Recipe[] },
        );

        return tagMap;
      }),
    );

    // Extract unique tag names
    this.allTags$ = this.recipes$.pipe(
      tap((recipes) => {
        console.log(
          'Tags:',
          recipes.flatMap((recipe) => recipe.tags.map((tag) => tag.name)),
        );
      }),
      map((recipes) => {
        // Flatten and get unique tag names
        const allTagNames = recipes.flatMap((recipe) => recipe.tags.map((tag) => tag.name));
        return [...new Set(allTagNames)];
      }),
    );
  }
}

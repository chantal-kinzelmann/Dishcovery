import { Component, OnInit } from '@angular/core';
import { Recipe } from '../services/recipe-services/recipe.type';
import { Observable, BehaviorSubject, combineLatest, map, startWith, finalize, delay } from 'rxjs';
import { RecipeService } from '../services/recipe-services/recipe.service';
import { SmallRecipeCardComponent } from '../small-recipe-card/small-recipe-card.component';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipes-page',
  imports: [
    SmallRecipeCardComponent,
    CommonModule,
    MatChipsModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.scss',
})
export class RecipesPageComponent implements OnInit {
  // Original recipes observable
  private recipes$: Observable<Recipe[]>;

  loading = true;

  
  // Subjects for different filter types so that we can update them / it emits new values when the filter changes

  private selectedTagsSubject = new BehaviorSubject<string[]>([]);
  private selectedDifficultiesSubject = new BehaviorSubject<string[]>([]);
  private minRatingSubject = new BehaviorSubject<number>(0);
  private selectedIngredientsSubject = new BehaviorSubject<string[]>([]);
  private cookingTimeSubject = new BehaviorSubject<number[]>([]);

  
  // Observables for filters to get data from 

  selectedTags$ = this.selectedTagsSubject.asObservable();
  selectedDifficulties$ = this.selectedDifficultiesSubject.asObservable();
  minRating$ = this.minRatingSubject.asObservable();
  selectedIngredients$ = this.selectedIngredientsSubject.asObservable();
  cookingTime$ = this.cookingTimeSubject.asObservable();

  // Observable for all tags and ingredients
  allTags$?: Observable<string[]>;
  allIngredients$?: Observable<string[]>;

  // Difficulty options
  difficultyOptions = ['easy', 'medium', 'hard'];
  ratingOptions = [1, 2, 3, 4, 5];

  // Observable for filtered recipes
  filteredRecipes$?: Observable<Recipe[]>;

  constructor(
    private readonly recipeService: RecipeService
  ) {
    // Get all recipes with delay so skeleton loader is shown

    this.recipes$ = this.recipeService.getAllRecipes().pipe(
      delay(500),
      startWith([]),
      finalize(() => {
        this.loading = false;
      }),
    );
  }

  ngOnInit() {

    // Extract all unique tag names from recipe obersevable

    this.allTags$ = this.recipes$.pipe(
      map((recipes) => {
        const allTagNames = recipes.flatMap((recipe) => recipe.tags.map((tag) => tag.name));
        return [...new Set(allTagNames)];
      }),
    );

    // Extract unique ingredient names
    this.allIngredients$ = this.recipes$.pipe(
      map((recipes) => {
        const allIngredientNames = recipes.flatMap((recipe) =>
          recipe.ingredients.map((ingredient) => ingredient.name),
        );
        return [...new Set(allIngredientNames)];
      }),
    );

    // Create filtered recipes observable with multiple filter conditions
    this.filteredRecipes$ = combineLatest([

    this.recipes$, 
    this.selectedTagsSubject,
    this.selectedDifficultiesSubject,
    this.minRatingSubject,
    this.selectedIngredientsSubject,
    this.cookingTimeSubject
    ]).pipe(
      map(([recipes, selectedTags, selectedDifficulties, minRating, selectedIngredients, cookingTimes]) => {
        return recipes.filter(recipe => {
          // Tag filter that checks if all selected tags are included in the recipe tags
          const tagMatch = selectedTags.length === 0 || 
            selectedTags.every(tag => 
              recipe.tags.some(recipeTag => recipeTag.name === tag)
            );

          // Difficulty filter that checks if the recipe difficulty is included in the selected difficulties
          const difficultyMatch = selectedDifficulties.length === 0 || 
            selectedDifficulties.includes(recipe.difficulty);

          // Rating filter that checks if the average rating is greater than the selected minimum rating
          const ratingMatch = recipe.ratings.length === 0 ? 
            true : 
            recipe.avgRating >= minRating;


          // Ingredient filter that checks if all selected ingredients are included in the recipe ingredients
          const ingredientMatch = selectedIngredients.length === 0 || 
            selectedIngredients.every(ingredient => 
              recipe.ingredients.some(recipeIngredient => recipeIngredient.name === ingredient)
            );

          // Cooking time filter that checks if the total cooking time is within the selected time limits by calculating the total cook time
          const cookingTimeMatch = cookingTimes.length === 0 || 
            cookingTimes.some(timeLimit => {
              const totalCookTime = recipe.prepTime + recipe.cookTime;
              switch(timeLimit) {
                case 30: return totalCookTime <= 30;
                case 60: return totalCookTime > 30 && totalCookTime <= 60;
                case 120: return totalCookTime > 60;
                default: return true;
              }
            });

          // Return true if all filters match else the recipe is filtered out
          return tagMatch && difficultyMatch && ratingMatch && ingredientMatch && cookingTimeMatch;
        });
      })

    );
  }

  // Method to toggle tag selection
  toggleTag(tag: string) {
    const currentTags = this.selectedTagsSubject.value;
    const updatedTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];

    this.selectedTagsSubject.next(updatedTags);
  }

  // Checkbox change handlers so that we can update the filter values
  onDifficultyChange(event: any) {
    const currentDifficulties = this.selectedDifficultiesSubject.value;
    const difficulty = event.source.value;
    const updatedDifficulties = event.checked
      ? [...currentDifficulties, difficulty]
      : currentDifficulties.filter((d) => d !== difficulty);

    this.selectedDifficultiesSubject.next(updatedDifficulties);
  }

  onRatingChange(event: any) {
    const rating = event.source.value;
    this.minRatingSubject.next(event.checked ? rating : 0);
  }

  onIngredientChange(event: any) {
    const currentIngredients = this.selectedIngredientsSubject.value;
    const ingredient = event.source.value;
    const updatedIngredients = event.checked
      ? [...currentIngredients, ingredient]
      : currentIngredients.filter((i) => i !== ingredient);

    this.selectedIngredientsSubject.next(updatedIngredients);
  }

  onCookingTimeChange(event: any) {
    const currentCookingTimes = this.cookingTimeSubject.value;
    const cookingTime = event.source.value;
    const updatedCookingTimes = event.checked
      ? [...currentCookingTimes, cookingTime]
      : currentCookingTimes.filter((t) => t !== cookingTime);

    this.cookingTimeSubject.next(updatedCookingTimes);
  }

  // Method to clear all filters
  clearAllFilters() {
    this.selectedTagsSubject.next([]);
    this.selectedDifficultiesSubject.next([]);
    this.minRatingSubject.next(0);
    this.selectedIngredientsSubject.next([]);
    this.cookingTimeSubject.next([]);
  }

  // Method to clear tags sicne they are material chips
  clearTags() {
    this.selectedTagsSubject.next([]);
  }
}

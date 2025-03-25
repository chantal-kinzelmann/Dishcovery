import { Component, OnInit } from '@angular/core';
import { Recipe, Tag } from '../services/recipe-services/recipe.type';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';
import { RecipeService } from '../services/recipe-services/recipe.service';
import { SmallRecipeCardComponent } from '../small-recipe-card/small-recipe-card.component';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipes-page',
  imports: [
    SmallRecipeCardComponent, 
    CommonModule, 
    MatChipsModule, 
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.scss'
})
export class RecipesPageComponent implements OnInit {
  // Original recipes observable
  private recipes$: Observable<Recipe[]>;
  
  // Filter form group
  filterForm: FormGroup;
  
  // Subjects for different filter types
  private selectedTagsSubject = new BehaviorSubject<string[]>([]);
  private selectedDifficultiesSubject = new BehaviorSubject<string[]>([]);
  private minRatingSubject = new BehaviorSubject<number>(0);
  private selectedIngredientsSubject = new BehaviorSubject<string[]>([]);
  
  // Observables for filters
  selectedTags$ = this.selectedTagsSubject.asObservable();
  selectedDifficulties$ = this.selectedDifficultiesSubject.asObservable();
  minRating$ = this.minRatingSubject.asObservable();
  selectedIngredients$ = this.selectedIngredientsSubject.asObservable();
  
  // Observable for all tags and ingredients
  allTags$?: Observable<string[]>;
  allIngredients$?: Observable<string[]>;
  
  // Difficulty options
  difficultyOptions = ['easy', 'medium', 'hard'];
  ratingOptions = [1, 2, 3, 4, 5];
  
  // Observable for filtered recipes
  filteredRecipes$?: Observable<Recipe[]>;

  constructor(
    private readonly recipeService: RecipeService,
    private fb: FormBuilder
  ) {
    this.recipes$ = this.recipeService.getAllRecipes();
    
    // Initialize filter form
    this.filterForm = this.fb.group({
      difficulties: [[]],
      minRating: [0],
      ingredients: [[]]
    });
  }

  ngOnInit() {
    // Extract unique tag names
    this.allTags$ = this.recipes$.pipe(
      map(recipes => {
        const allTagNames = recipes.flatMap(recipe => 
          recipe.tags.map(tag => tag.name)
        );
        return [...new Set(allTagNames)];
      })
    );

    // Extract unique ingredient names
    this.allIngredients$ = this.recipes$.pipe(
      map(recipes => {
        const allIngredientNames = recipes.flatMap(recipe => 
          recipe.ingredients.map(ingredient => ingredient.name)
        );
        return [...new Set(allIngredientNames)];
      })
    );

    // Listen to form changes and update subjects
    this.filterForm.get('difficulties')?.valueChanges.subscribe(
      difficulties => this.selectedDifficultiesSubject.next(difficulties)
    );

    this.filterForm.get('minRating')?.valueChanges.subscribe(
      rating => this.minRatingSubject.next(rating)
    );

    this.filterForm.get('ingredients')?.valueChanges.subscribe(
      ingredients => this.selectedIngredientsSubject.next(ingredients)
    );

    // Create filtered recipes observable with multiple filter conditions
    this.filteredRecipes$ = combineLatest([
      this.recipes$, 
      this.selectedTagsSubject,
      this.selectedDifficultiesSubject,
      this.minRatingSubject,
      this.selectedIngredientsSubject
    ]).pipe(
      map(([recipes, selectedTags, selectedDifficulties, minRating, selectedIngredients]) => {
        return recipes.filter(recipe => {
          // Tag filter
          const tagMatch = selectedTags.length === 0 || 
            selectedTags.every(tag => 
              recipe.tags.some(recipeTag => recipeTag.name === tag)
            );

          // Difficulty filter
          const difficultyMatch = selectedDifficulties.length === 0 || 
            selectedDifficulties.includes(recipe.difficulty);

          // Rating filter
          const ratingMatch = recipe.ratings.length === 0 ? 
            true : 
            this.calculateAverageRating(recipe.ratings) >= minRating;

          // Ingredient filter
          const ingredientMatch = selectedIngredients.length === 0 || 
            selectedIngredients.every(ingredient => 
              recipe.ingredients.some(recipeIngredient => recipeIngredient.name === ingredient)
            );

          return tagMatch && difficultyMatch && ratingMatch && ingredientMatch;
        });
      })
    );
  }

  // Method to calculate average rating
  private calculateAverageRating(ratings: any[]): number {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return sum / ratings.length;
  }

  // Method to toggle tag selection
  toggleTag(tag: string) {
    const currentTags = this.selectedTagsSubject.value;
    const updatedTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    this.selectedTagsSubject.next(updatedTags);
  }

  // Method to clear all filters
  clearAllFilters() {
    this.selectedTagsSubject.next([]);
    this.filterForm.reset({
      difficulties: [],
      minRating: 0,
      ingredients: []
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { Recipe, Tag } from '../services/recipe-services/recipe.type';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';
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
export class RecipesPageComponent implements OnInit {
  // Original recipes observable
  private recipes$: Observable<Recipe[]>;
  
  // Subject to track selected tags
  private selectedTagsSubject = new BehaviorSubject<string[]>([]);
  
  // Observable for selected tags
  selectedTags$ = this.selectedTagsSubject.asObservable();
  
  // Observable for all tags
  allTags$?: Observable<string[]>;
  
  // Observable for filtered recipes
  filteredRecipes$?: Observable<Recipe[]>;

  constructor(private readonly recipeService: RecipeService) {
    this.recipes$ = this.recipeService.getAllRecipes();
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

    // Create filtered recipes observable
    this.filteredRecipes$ = combineLatest([
      this.recipes$, 
      this.selectedTags$
    ]).pipe(
      map(([recipes, selectedTags]) => {
        // If no tags are selected, return all recipes
        if (selectedTags.length === 0) {
          return recipes;
        }
        
        // Filter recipes that have ALL selected tags
        return recipes.filter(recipe => 
          selectedTags.every(tag => 
            recipe.tags.some(recipeTag => recipeTag.name === tag)
          )
        );
      })
    );
  }

  // Method to toggle tag selection
  toggleTag(tag: string) {
    const currentTags = this.selectedTagsSubject.value;
    const updatedTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)  // Remove tag if already selected
      : [...currentTags, tag];  // Add tag if not selected
    
    this.selectedTagsSubject.next(updatedTags);
  }

  // Method to clear all selected tags
  clearTags() {
    this.selectedTagsSubject.next([]);
  }
}
import { Component } from '@angular/core';
import { Recipe, Tag } from '../services/recipe-services/recipe.type';
import { Observable, tap } from 'rxjs';
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
  allTags: Tag[] = []; 
  selectedTag: string | null = null;

  constructor(private readonly recipeService: RecipeService) {
    this.recipes$ = this.recipeService.getAllRecipes().pipe(
      tap(recipes => console.log('Received recipes:', recipes))
    );
  }

  ngOnInit() {
    this.recipeService.getAllTags().subscribe(tags => {
      this.allTags = tags;
    });
  }

  filterByTag(tagName: string) {
    this.selectedTag = tagName;
    this.recipes$ = this.recipeService.getRecipesByTag(tagName);
  }

  clearFilter() {
    this.selectedTag = null;
    this.recipes$ = this.recipeService.getAllRecipes();
  }
}

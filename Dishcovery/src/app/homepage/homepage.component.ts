import { Component } from '@angular/core';
import { SmallRecipeCardComponent } from '../small-recipe-card/small-recipe-card.component';
import { RecipeService } from '../services/recipe-services/recipe.service';
import { Recipe, Tag } from '../services/recipe-services/recipe.type';
import { Observable, tap } from 'rxjs';
@Component({
  selector: 'app-homepage',
  imports: [SmallRecipeCardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

    recipes$: Observable<Recipe[]>;

    constructor(private readonly recipeService: RecipeService) {
        this.recipes$ = this.recipeService.getAllRecipes().pipe(
            tap(recipes => console.log('Received recipes:', recipes))
        );
    }
}

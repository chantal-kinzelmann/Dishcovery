import { Component } from '@angular/core';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';

@Component({
  selector: 'app-new-recipe',
  imports: [RecipeDetailComponent],
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.scss'
})
export class NewRecipeComponent {

}

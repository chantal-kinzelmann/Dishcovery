import { Component } from '@angular/core';
import { RecipeOverviewComponent } from "./recipe-overview/recipe-overview.component";

@Component({
  selector: 'app-view-recipe',
  imports: [RecipeOverviewComponent],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.scss'
})
export class ViewRecipeComponent {

}

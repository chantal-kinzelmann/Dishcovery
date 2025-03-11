import { Component } from '@angular/core';

import { SmallRecipeCardComponent } from '../../small-recipe-card/small-recipe-card.component';

@Component({
  selector: 'app-my-recipes',
  imports: [SmallRecipeCardComponent],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.scss'
})
export class MyRecipesComponent {

}

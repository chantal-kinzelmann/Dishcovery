import { Component } from '@angular/core';
import { SmallRecipeCardComponent } from '../../small-recipe-card/small-recipe-card.component';

@Component({
  selector: 'app-my-favorites',
  imports: [ SmallRecipeCardComponent],
  templateUrl: './my-favorites.component.html',
  styleUrl: './my-favorites.component.scss'
})
export class MyFavoritesComponent {

}

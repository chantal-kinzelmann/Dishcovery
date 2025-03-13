import { Component } from '@angular/core';
import { SmallRecipeCardComponent } from '../../small-recipe-card/small-recipe-card.component';

@Component({
  selector: 'app-my-watch-list',
  imports: [SmallRecipeCardComponent],
  templateUrl: './my-watch-list.component.html',
  styleUrl: './my-watch-list.component.scss'
})
export class MyWatchListComponent {

}

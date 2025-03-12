import { Component } from '@angular/core';
import { SmallRecipeCardComponent } from '../small-recipe-card/small-recipe-card.component';
@Component({
  selector: 'app-homepage',
  imports: [SmallRecipeCardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}

import { Component } from '@angular/core';
import { HomepageNavBarComponent } from './homepage-nav-bar/homepage-nav-bar.component';
import { SmallRecipeCardComponent } from '../small-recipe-card/small-recipe-card.component';
@Component({
  selector: 'app-homepage',
  imports: [HomepageNavBarComponent,SmallRecipeCardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}

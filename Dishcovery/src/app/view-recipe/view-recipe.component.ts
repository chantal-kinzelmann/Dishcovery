import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-view-recipe',
  imports: [CommonModule],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.scss'
})
export class ViewRecipeComponent {
  public portions: number = 1;
  public currentRating: number = 2;
  constructor() { }

  updateIngredients():void{
    
  }

  public increment() {
    this.portions++;
    this.updateIngredients();
    return this.portions;
  }

  public decrement() {
    if(this.portions > 1){
      this.portions--;
      this.updateIngredients();
    }
    return this.portions;
  }

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-recipe',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.scss'
})
export class ViewRecipeComponent {
  public portions: number = 1;
  public currentRating: number = 2;
  userRating:number = 0;
  newComment:string="";

  setRating(star:number){
    this.userRating=star;
  }

  onSubmit(form: NgForm){
    const commentText = form.value.commentText;
    const rating = form.value.rating;
    console.log(form);
    console.log(commentText);
    console.log(rating);
    form.reset();
    this.userRating=0;
  }

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

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Recipe } from '../services/recipe-services/recipe.type';
import { Subscription } from 'rxjs';
import { RecipeService } from '../services/recipe-services/recipe.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';


@Component({
  selector: 'app-view-recipe',
  imports: [CommonModule, FormsModule, RouterModule, MatChipsModule],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.scss'
})
export class ViewRecipeComponent {
  userRating:number = 0;
  newComment:string="";
  public servings: number = 1;
  public ingredientMuliplier: number = 1;

  public recipe: Recipe | undefined;
  private recipeSubscription!: Subscription;
  private fragmentSubscription!: Subscription;

  public loading: boolean = true;

  constructor(private readonly recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(){
    const recipeID = Number(this.route.snapshot.params['id']); //Bekommen der Rezept ID aus den Params der URL
    this.recipeSubscription = this.recipeService.getRecipeById(recipeID) 
      .subscribe((recipe: Recipe | null) => {

        if (recipe){
          this.recipe = recipe;
          this.servings = recipe.servings;
          this.updateIngredients();
        }
        this.loading = false;
      });

      this.scrollToFragment();
    }

  ngOnDestroy(){
    if (this.recipeSubscription){
      this.recipeSubscription.unsubscribe();
    }
    if (this.fragmentSubscription) {
      this.fragmentSubscription.unsubscribe();
    }
  }
  

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
    this.ingredientMuliplier = 1/(this.recipe!.servings/this.servings)  
  }

  public increment() {
    this.servings++;
    this.updateIngredients();
  }

  public decrement() {
    if(this.servings > 1){
      this.servings--;
      this.updateIngredients();
    }
  }


  private scrollToFragment(): void {
    if (this.fragmentSubscription) {
      this.fragmentSubscription.unsubscribe();
    }

    this.fragmentSubscription = this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // Navigation und Scrollen zum Fragment auslösen
  navigateToComments(): void {
    if(this.recipe){
      this.router.navigate(['/view-recipe', this.recipe!.id], { fragment: 'comments' }).then(() => {
        // Scrollen zum Fragment nach der Navigation
        this.scrollToFragment();
      });
    }
  }

}

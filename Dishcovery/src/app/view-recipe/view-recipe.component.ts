import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Recipe } from '../services/recipe-services/recipe.type';
import { Subscription, take } from 'rxjs';
import { RecipeService } from '../services/recipe-services/recipe.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';


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
  public showRatingSuccessModal: boolean = false; // True, wenn ein erfolgreiches Rating erstellt wurde

  public recipe: Recipe | null | undefined;
  private fragmentSubscription!: Subscription;

  public loading: boolean = true;

  constructor(private readonly recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(){
    const recipeID = Number(this.route.snapshot.params['id']); //Bekommen der Rezept ID aus den Params der URL
    this.recipeService.getRecipeById(recipeID) 
      .pipe(take(1)).subscribe((recipe: Recipe | null) => {

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
    if (this.fragmentSubscription) {
      this.fragmentSubscription.unsubscribe();
    }
  }
  

  setRating(star:number){
    this.userRating=star;
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


  // Nutzer-ID aus LocalStorage holen
  getUserId() {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        return user.id;
      } catch (error) {
        console.error("⚠ Fehler beim Parsen des Benutzers:", error);
      }
    }

    return null;
  }

  reload(){
    window.location.reload();
  }


  onSubmit(ratingForm: NgForm){

    const userId = this.getUserId();
    //Falls User nicht angemeldet ist wird er zum login gebracht
    if(!userId){
      this.router.navigate(['/login']);
    }

    if (ratingForm.valid) {
    
      const ratingData = {
      rating: ratingForm.value.rating,
      comment: ratingForm.value.commentText
      };


      if (userId && ratingForm.valid) {
        this.recipeService.addRating(parseInt(this.recipe!.id), parseInt(userId), ratingData).subscribe({ //Falls Zeit, ID im type.ts zu number machen und hier dann auch ändern
          next: () => {
            console.log('Rating submitted successfully')
            this.showRatingSuccessModal = true;
          },
          error: (error) => console.error('Error submitting rating', error),
        });
      }

      this.userRating=0;
      ratingForm.resetForm();
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

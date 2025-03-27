import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Recipe } from '../services/recipe-services/recipe.type';
import { Subscription, take } from 'rxjs';
import { RecipeService } from '../services/recipe-services/recipe.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { UserService } from '../services/user-services/user.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-recipe',
  imports: [CommonModule, FormsModule, RouterModule, MatChipsModule, MatSnackBarModule],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.scss',
})
export class ViewRecipeComponent {
  userRating: number = 0;
  newComment: string = '';
  public servings: number = 1;
  public ingredientMuliplier: number = 1;
  public showRatingSuccessModal: boolean = false; // True, wenn ein erfolgreiches Rating erstellt wurde

  public recipe: Recipe | null | undefined;
  private fragmentSubscription!: Subscription;
  public loading: boolean = true;
  public userId: string = '';

  isFavorited: boolean = false;
  isWatched: boolean = false;

  constructor(
    private readonly recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    const recipeID = Number(this.route.snapshot.params['id']);
    this.getUser(); // 👈 userId holen

    this.recipeService.getRecipeById(recipeID) 
    .pipe(take(1)).subscribe((recipe: Recipe | null) => {
        if (recipe) {
          this.recipe = recipe;
          this.servings = recipe.servings;
          this.updateIngredients();

          // Watchlist prüfen
          this.userService.getWatchlist(Number(this.userId)).subscribe((watchlist) => {
            this.isWatched = watchlist.some((entry) => entry.recipe.id === recipe.id);
          });

          // Favoriten prüfen
          this.userService.getFavorites(Number(this.userId)).subscribe((favorites) => {
            this.isFavorited = favorites.some((entry) => entry.recipe.id === recipe.id);
          });
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

  setRating(star: number) {
    this.userRating = star;
  }

  updateIngredients():void{
    this.ingredientMuliplier = 1/(this.recipe!.servings/this.servings)  
  }

  public increment() {
    this.servings++;
    this.updateIngredients();
  }

  public decrement() {
    if (this.servings > 1) {
      this.servings--;
      this.updateIngredients();
    }
  }

  reload(){
    window.location.reload();
  }

  onSubmit(ratingForm: NgForm){

    this.getUser();

    //Falls User nicht angemeldet ist wird er zum login gebracht
    if(!this.userId){
      this.router.navigate(['/login']);
    }

    if (ratingForm.valid) {
    
      const ratingData = {
      rating: ratingForm.value.rating,
      comment: ratingForm.value.commentText
      };

      if (this.userId && ratingForm.valid) {
        this.recipeService.addRating(parseInt(this.recipe!.id), parseInt(this.userId), ratingData).subscribe({
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

    this.fragmentSubscription = this.route.fragment.subscribe((fragment) => {
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
    if (this.recipe) {
      this.router.navigate(['/view-recipe', this.recipe!.id], { fragment: 'comments' }).then(() => {
        // Scrollen zum Fragment nach der Navigation
        this.scrollToFragment();
      });
    }
  }

  toggleFavorite() {
    if (!this.recipe?.id) return;
    this.getUser();

    //Falls User nicht angemeldet ist wird er zum login gebracht
    if(!this.userId){
      this.router.navigate(['/login']);
    }

    this.userService.toggleFavorite(Number(this.recipe.id), Number(this.userId)).subscribe({
      next: (res) => {
        this.refreshUserLists(); // 💡 Zustand aktualisieren
      },
      error: (err) => console.error('Fehler beim Favoritisieren:', err),
    });
  }

  toggleWatchlist() {
    if (!this.recipe?.id) return;
    this.getUser();

    //Falls User nicht angemeldet ist wird er zum login gebracht
    if(!this.userId){
      this.router.navigate(['/login']);
    }

    this.userService.toggleWatchlist(Number(this.recipe.id), Number(this.userId)).subscribe({
      next: (res) => {
        this.refreshUserLists(); // 💡 Zustand aktualisieren
      },
      error: (err) => console.error('Fehler beim Merken:', err),
    });
  }

  showDeleteConfirmModal = false;

  deleteRecipe() {
    this.showDeleteConfirmModal = true;
  }

  confirmDelete() {
    if (!this.recipe?.id) return;

    this.recipeService.deleteRecipe(Number(this.recipe.id)).subscribe({
      next: () => {
        this.showSuccsess('Rezept wurde gelöscht');

        setTimeout(() => {
          this.router.navigate(['/recipes-page']);
        }, 1000);
      },
      error: (err) => console.error('Fehler beim Löschen:', err),
    });

    this.showDeleteConfirmModal = false;
  }

  cancelDelete() {
    this.showDeleteConfirmModal = false;
  }

  getUser() {
    const userString: string | null = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.userId = user?.id;
    }
  }

  refreshUserLists() {
    if (!this.recipe) return;

    this.userService.getFavorites(Number(this.userId)).subscribe((favs) => {
      this.isFavorited = favs.some((entry) => entry.recipe.id === this.recipe?.id);
    });

    this.userService.getWatchlist(Number(this.userId)).subscribe((watchlist) => {
      this.isWatched = watchlist.some((entry) => entry.recipe.id === this.recipe?.id);
    });
  }

  showSuccsess(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}

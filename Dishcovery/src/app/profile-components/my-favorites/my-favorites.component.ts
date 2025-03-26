import { Component } from '@angular/core';
import { SmallRecipeCardComponent } from '../../small-recipe-card/small-recipe-card.component';
import { Observable, tap } from 'rxjs';
import { Recipe } from '../../services/recipe-services/recipe.type';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { RecipeService } from '../../services/recipe-services/recipe.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-services/user.service';


@Component({
  selector: 'app-my-favorites',
  imports: [ SmallRecipeCardComponent, CommonModule],
  templateUrl: './my-favorites.component.html',
  styleUrl: './my-favorites.component.scss'
})


export class MyFavoritesComponent {
  recipes!: Observable<Recipe[]>;
  loading = true;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  goToRecipe() {
    this.router.navigate(['/recipes-page']);
  }

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const userId = user?.id;

      this.userService.getFavorites(userId).subscribe(favEntries => {
        const favoriteRecipes = favEntries.map(entry => entry.recipe); // 💡 Rezepte extrahieren

        // Simuliere 1,5 Sekunden Ladezeit
        setTimeout(() => {
          this.recipes = of(favoriteRecipes);
          this.loading = false;
        }, 1500);
      });

    } else {
      this.recipes = of([]);
      this.loading = false;
    }



  }

  
}

import { Component } from '@angular/core';
import { SmallRecipeCardComponent } from '../../small-recipe-card/small-recipe-card.component';
import { Observable } from 'rxjs';
import { Recipe } from '../../services/recipe-services/recipe.type';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { RecipeService } from '../../services/recipe-services/recipe.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-services/user.service';

@Component({
  selector: 'app-my-watch-list',
  imports: [SmallRecipeCardComponent, CommonModule],
  templateUrl: './my-watch-list.component.html',
  styleUrl: './my-watch-list.component.scss',
})
export class MyWatchListComponent {
  recipes!: Observable<Recipe[]>;
  loading = true;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  goToRecipe() {
    this.router.navigate(['/recipes-page']);
  }

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const userId = user?.id;

      this.userService.getWatchlist(userId).subscribe((watchEntries) => {
        const watchRecipes = watchEntries.map((entry) => entry.recipe); // 💡 Rezepte extrahieren

        // Simuliere 1 Sekunden Ladezeit
        setTimeout(() => {
          this.recipes = of(watchRecipes);
          this.loading = false;
        }, 1000);
      });
    } else {
      this.recipes = of([]);
      this.loading = false;
    }
  }
}

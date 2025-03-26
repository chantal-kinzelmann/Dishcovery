import { Component } from '@angular/core';
import { SmallRecipeCardComponent } from '../../small-recipe-card/small-recipe-card.component';
import { Observable } from 'rxjs';
import { Recipe } from '../../services/recipe-services/recipe.type';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { RecipeService } from '../../services/recipe-services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-watch-list',
  imports: [SmallRecipeCardComponent,CommonModule],
  templateUrl: './my-watch-list.component.html',
  styleUrl: './my-watch-list.component.scss'
})
export class MyWatchListComponent {
 recipes!: Observable<Recipe[]>;
  loading= true;
  constructor(private recipeService: RecipeService, private router:Router) {}
  
  goToRecipe(){
    this.router.navigate(['/recipe-page']);
 }

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const userId = user?.id;

      this.recipeService.getRecipesByUser(userId).subscribe(recipes => {
          //Simuliere 2 Sekunden Ladezeit 
      setTimeout(() => {
        this.recipes = of(recipes); 
        this.loading = false;
      }, 1500);
       
      });
      
    } else {
      this.recipes = of([]);
      this.loading = false;
  }

}
}

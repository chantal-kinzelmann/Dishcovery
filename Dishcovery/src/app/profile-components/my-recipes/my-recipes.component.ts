import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe-services/recipe.service';
import { SmallRecipeCardComponent } from '../../small-recipe-card/small-recipe-card.component';
import { Observable, tap } from 'rxjs';
import { Recipe } from '../../services/recipe-services/recipe.type';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';


@Component({
  selector: 'app-my-recipes',
  imports: [SmallRecipeCardComponent,CommonModule],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.scss'
})
export class MyRecipesComponent {

  recipes!: Observable<Recipe[]>;
  loading= true;
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const userId = user?.id;

      this.recipeService.getRecipesByUser(userId).subscribe(recipes => {
          //Simuliere 2 Sekunden Ladezeit 
          console.log(recipes)
      setTimeout(() => {
        this.recipes = of(recipes); 
        this.loading = false;
      }, 1500);
       
      });
      
    } else {
      this.recipes = of([]);
      this.loading = false;
  }

}}



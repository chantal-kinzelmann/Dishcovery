import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe-services/recipe.service';
import { Recipe } from '../../services/recipe-services/recipe.type';
import { SmallRecipeCardComponent } from '../../small-recipe-card/small-recipe-card.component';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  imports: [SmallRecipeCardComponent]
})
export class SearchResultsComponent implements OnInit {
  query: string = '';
  results: Recipe[] = [];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      if (this.query) {
        this.recipeService.searchRecipes(this.query).subscribe(recipes => {
          this.results = recipes;
        });
      }
    });
  }
}

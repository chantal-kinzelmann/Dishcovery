import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'; 
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Recipe } from '../services/recipe-services/recipe.type';

@Component({
  selector: 'app-small-recipe-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './small-recipe-card.component.html',
  styleUrl: './small-recipe-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmallRecipeCardComponent {
  @Input({ alias: 'recipe', required: true }) recipe!: Recipe;
  currentRating = 4;
}

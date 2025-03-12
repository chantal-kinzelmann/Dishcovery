import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmallRecipeCardComponent } from '../small-recipe-card/small-recipe-card.component';

@Component({
  selector: 'app-was-koche-ich-heute',
  standalone: true,
  imports: [CommonModule, SmallRecipeCardComponent], // CommonModule für ngStyle
  templateUrl: './was-koche-ich-heute.component.html',
  styleUrl: './was-koche-ich-heute.component.scss'
})
export class WasKocheIchHeuteComponent {
  allColors: string[] = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A1', '#A133FF', '#33FFF5', '#FF8C33', '#8C33FF'];

  colors: string[] = [];

  constructor() {
    this.shuffleColors();
  }

  shuffleColors() {
    this.colors = Array.from({ length: 9 }, () => this.getRandomColor());
  }

  getRandomColor(): string {
    return this.allColors[Math.floor(Math.random() * this.allColors.length)];
  }
}
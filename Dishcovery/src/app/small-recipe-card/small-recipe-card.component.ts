import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'; 
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-small-recipe-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './small-recipe-card.component.html',
  styleUrl: './small-recipe-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmallRecipeCardComponent {
  rating: number = 4;
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'; 
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-small-recipe-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './small-recipe-card.component.html',
  styleUrl: './small-recipe-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmallRecipeCardComponent {

}

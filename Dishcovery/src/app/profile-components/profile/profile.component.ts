import { Component } from '@angular/core';
import { ProfileNavigationComponent } from '../profile-navigation/profile-navigation.component';
import { CommonModule } from '@angular/common';
import { MyFavoritesComponent } from "../my-favorites/my-favorites.component";
import { MyRecipesComponent } from "../my-recipes/my-recipes.component";
import {MyWatchListComponent } from '../my-watch-list/my-watch-list.component';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileNavigationComponent, CommonModule, MyFavoritesComponent, MyRecipesComponent, MyWatchListComponent,RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  activeCategory = 'rezepte';

changeCategory(category: string) {
  this.activeCategory = category;
}
}



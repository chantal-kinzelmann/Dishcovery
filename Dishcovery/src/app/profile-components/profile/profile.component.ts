import { Component, OnInit } from '@angular/core';
import { ProfileNavigationComponent } from '../profile-navigation/profile-navigation.component';
import { CommonModule } from '@angular/common';
import { MyFavoritesComponent } from '../my-favorites/my-favorites.component';
import { MyRecipesComponent } from '../my-recipes/my-recipes.component';
import { MyWatchListComponent } from '../my-watch-list/my-watch-list.component';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ProfileNavigationComponent,
    CommonModule,
    MyFavoritesComponent,
    MyRecipesComponent,
    MyWatchListComponent,
    RouterModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const userString = localStorage.getItem('user');
    this.user = userString ? JSON.parse(userString) : null;
  }

  activeCategory = 'rezepte';

  changeCategory(category: string) {
    this.activeCategory = category;
  }
}

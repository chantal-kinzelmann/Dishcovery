import { Component } from '@angular/core';
import { ProfileNavigationComponent } from '../profile-navigation/profile-navigation.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileNavigationComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  activeCategory = 'rezepte';

changeCategory(category: string) {
  this.activeCategory = category;
}
}



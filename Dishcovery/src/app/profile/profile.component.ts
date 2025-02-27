import { Component } from '@angular/core';
import { ProfileNavigationComponent } from '../profile-navigation/profile-navigation.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileNavigationComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  activeCategory = 'rezepte';

changeCategory(category: string) {
  this.activeCategory = category;
}
}



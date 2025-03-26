import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile-navigation',
  templateUrl: './profile-navigation.component.html',
  styleUrls: ['./profile-navigation.component.scss'],
})
export class ProfileNavigationComponent {
  activeCategory = 'rezepte'; // Standardwert

  @Output() selectedCategory = new EventEmitter<string>();

  setCategory(category: string) {
    this.activeCategory = category;
    this.selectedCategory.emit(category);
  }
}

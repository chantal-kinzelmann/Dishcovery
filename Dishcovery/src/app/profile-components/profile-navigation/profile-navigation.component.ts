import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile-navigation',
  imports: [],
  templateUrl: './profile-navigation.component.html',
  styleUrl: './profile-navigation.component.scss'
})
export class ProfileNavigationComponent {
  @Output() selectedCategory = new EventEmitter<string>();
  activeTab = 'rezepte';

  setCategory(category: string) {
    this.activeTab = category;
    this.selectedCategory.emit(category);
  }
}

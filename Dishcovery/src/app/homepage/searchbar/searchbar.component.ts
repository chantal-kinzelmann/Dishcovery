import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  imports: [FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
})
export class SearchBarComponent {
  searchQuery = '';

  constructor(private router: Router) {}

  onSearch() {
    const trimmed = this.searchQuery.trim();
    if (trimmed) {
      this.router.navigate(['/search'], { queryParams: { q: trimmed } });
    }
  }
}

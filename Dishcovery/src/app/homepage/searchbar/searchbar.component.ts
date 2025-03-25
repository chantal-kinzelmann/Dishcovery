import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
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

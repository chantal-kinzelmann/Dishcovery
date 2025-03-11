import { Component, Renderer2 } from '@angular/core';
import { LoginButtonComponent } from '../homepage/login-button/login-button.component';
import { SearchbarComponent } from '../homepage/searchbar/searchbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [LoginButtonComponent, SearchbarComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isDarkMode = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // Prüfe, ob Darkmode gespeichert ist
    const darkModeSetting = localStorage.getItem('darkMode');
    this.isDarkMode = darkModeSetting === 'enabled';

    this.updateDarkMode();
}

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode ? 'enabled' : 'disabled');
    this.updateDarkMode();
  }

  updateDarkMode() {
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }
}




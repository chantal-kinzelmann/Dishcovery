import { Component, Renderer2 } from '@angular/core';
import { LoginButtonComponent } from '../homepage/login-button/login-button.component';
import { SearchbarComponent } from '../homepage/searchbar/searchbar.component';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { NgIf, CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [LoginButtonComponent, SearchbarComponent, RouterLink, RouterModule, NgIf, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isDarkMode = false;
  isUserLoggedIn = false; // Speichert den Login-Status

  constructor(private renderer: Renderer2, private authService: AuthService, private router:Router, private cdRef:ChangeDetectorRef) {}

  ngOnInit() {
    // Prüfe, ob Darkmode gespeichert ist
    const darkModeSetting = localStorage.getItem('darkMode');
    this.isDarkMode = darkModeSetting === 'enabled';
    this.authService.isLoggedIn$.subscribe(status => {
      console.log('Login Status geändert:', status); // Debugging
      this.isUserLoggedIn = status;
    });

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

  isLoggedIn() {
    return this.isUserLoggedIn;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);  // Leitet den User nach Logout um
    this.cdRef.detectChanges();  // Erzwingt ein UI-Update
  }
}






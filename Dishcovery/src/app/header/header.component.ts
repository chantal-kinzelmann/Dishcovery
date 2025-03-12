import { Component } from '@angular/core';
import { LoginButtonComponent } from '../homepage/login-button/login-button.component';
import { SearchbarComponent } from '../homepage/searchbar/searchbar.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [LoginButtonComponent, SearchbarComponent, RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}

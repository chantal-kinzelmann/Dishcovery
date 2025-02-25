import { Component } from '@angular/core';
import { LoginButtonComponent } from '../login-button/login-button.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-header',
  imports: [LoginButtonComponent, SearchbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}

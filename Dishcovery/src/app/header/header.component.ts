import { Component } from '@angular/core';
import { LoginButtonComponent } from '../login-button/login-button.component';

@Component({
  selector: 'app-header',
  imports: [LoginButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}

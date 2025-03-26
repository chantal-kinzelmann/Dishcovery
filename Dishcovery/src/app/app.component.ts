import { Component} from '@angular/core';
import { FooterComponent } from "./footer/footer.component";
import {  RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomepageNavBarComponent } from "./homepage/homepage-nav-bar/homepage-nav-bar.component";

@Component({
  selector: 'app-root',
  imports: [FooterComponent,  HomepageNavBarComponent, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Dishcovery';

}     
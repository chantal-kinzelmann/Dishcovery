import { Component } from '@angular/core';

import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from "./footer/footer.component";
import { ProfileComponent } from './profile-components/profile/profile.component';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

import { HomepageNavBarComponent } from "./homepage/homepage-nav-bar/homepage-nav-bar.component";

@Component({
  selector: 'app-root',
  imports: [FooterComponent, ProfileComponent, HomepageComponent, HomepageNavBarComponent,RouterOutlet,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Dishcovery';
}

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true, // Falls du Standalone verwendest
  imports: [RouterLink, RouterLinkActive], // WICHTIG: RouterLink hier importieren!
  templateUrl: './homepage-nav-bar.component.html',
  styleUrl: './homepage-nav-bar.component.scss'
})

export class HomepageNavBarComponent {}


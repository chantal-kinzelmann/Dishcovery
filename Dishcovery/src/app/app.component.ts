import { Component } from '@angular/core';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from "./footer/footer.component";
import { ProfileComponent } from './profile-components/profile/profile.component';

@Component({
  selector: 'app-root',
  imports: [ FooterComponent, ProfileComponent, HomepageComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Dishcovery';
}

import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfilComponent } from './profil/profil.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent }, // Startseite
  { path: 'profil', component: ProfilComponent }
];

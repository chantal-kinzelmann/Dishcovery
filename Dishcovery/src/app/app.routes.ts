import { HomepageComponent } from './homepage/homepage.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { ProfileComponent } from './profile-components/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RecipesPageComponent } from './recipes-page/recipes-page.component';
import { EditProfileComponent } from './profile-components/edit-profile/edit-profile.component';
import { AboutusComponent } from './aboutus/aboutus.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent }, // Startseite
  { path: 'profile', component: ProfileComponent }, //Profil
  { path: 'new-recipe', component: NewRecipeComponent} ,//Neues Rezept
  { path: 'login', component: LoginComponent}, //Login
  { path: 'view-recipe/:id', component: ViewRecipeComponent}, 
  { path: 'register', component: RegisterComponent}, //Registrieren
  { path: 'home', component: HomepageComponent }, // Startseite
  { path: 'password-reset', component: PasswordResetComponent }, // Passwort zurücksetzten
  { path: 'recipes-page', component: RecipesPageComponent }, // Rezepte page 
  { path: 'edit-profile', component: EditProfileComponent }, // Profil bearbeiten
  {path: 'aboutus', component: AboutusComponent} //About us
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled', // Aktiviert das Scrollen zu Fragmenten
      scrollPositionRestoration: 'enabled' // Stellt die Scroll-Position nach dem Navigieren wieder her
    })
  ],
    exports: [RouterModule]
   })
   export class AppRoutingModule { }

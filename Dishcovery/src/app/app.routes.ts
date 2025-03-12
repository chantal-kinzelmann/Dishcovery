import { HomepageComponent } from './homepage/homepage.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { ProfileComponent } from './profile-components/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent }, // Startseite
  { path: 'profile', component: ProfileComponent }, //Profil
  { path: 'new-recipe', component: NewRecipeComponent} ,//Neues Rezept
  { path: 'login', component: LoginComponent}, //Login
  { path: 'register', component: RegisterComponent}, //Registrieren
  { path: 'home', component: HomepageComponent }, // Startseite
  { path: 'password-reset', component: PasswordResetComponent }, // Passwort zurücksetzten
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
   })
   export class AppRoutingModule { }

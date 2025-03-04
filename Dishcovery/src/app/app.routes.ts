import { HomepageComponent } from './homepage/homepage.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { ProfileComponent } from './profile-components/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent }, // Startseite
  { path: 'profile', component: ProfileComponent }, //Profil
  {path: 'new-recipe', component: NewRecipeComponent} ,//Neues Rezept
  {path: 'login', component: LoginComponent} //Login

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
   })
   export class AppRoutingModule { }

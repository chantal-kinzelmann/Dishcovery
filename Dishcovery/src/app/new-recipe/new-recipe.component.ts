import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../app.config';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-recipe',
  imports: [FormsModule,CommonModule,MatChipsModule],
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.scss'
})

export class NewRecipeComponent {
 

  recipe: {
    userId: string | null;
    title: string;
    description: string;
    difficulty: string;
    prepTime: number;
    cookTime: number;
    ingredients: { name: string; amount: number; unit: string }[]; 
    tags: string[]; 
    text: string;
    imgUrl?: string; 
    servings: number;
  } = {
    userId: null,
    title: '',
    description: '',
    difficulty: 'easy',
    prepTime: 0,
    cookTime: 0,
    ingredients: [
      { name: '', amount: 0, unit: 'g' } 
    ],
    tags: [],
    text: '',
    imgUrl: '',
    servings: 1
  };

  newTag = '';
  private apiUrl = `${environment.apiUrl}/recipe`;
  showSuccessModal = false;
  recipeIdNav: number | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  // Bild hochladen
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.recipe.imgUrl = reader.result as string; // Speichert Base64
      };
      reader.readAsDataURL(file);
    }
  }

  // Zutaten verwalten
  addIngredient() {
    this.recipe.ingredients.push({ name: '', amount: 0, unit: 'g' });
  }
  
  removeIngredient(index: number) {
    this.recipe.ingredients.splice(index, 1);
  }

  // Tags verwalten
  addTag() {
    if (this.newTag.trim()) {
      this.recipe.tags.push(this.newTag.trim());
      this.newTag = '';
    }
  }

  validateNumberInput(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) { // 48–57 sind '0' bis '9'
      event.preventDefault();
    }
  }

  createRecipe(form: any) {
    if (form.valid) {
      this.recipe.userId = this.getUserId(); // Nutzer-ID holen
      
      console.log("📤 Sende Rezept:", this.recipe);
  
      this.http.post<{ id: number }>(this.apiUrl, this.recipe).subscribe({
        next: (response) => {
          console.log("✅ Rezept gespeichert!", response);
          this.recipeIdNav = response.id;
          this.showSuccessModal = true; // 👉 Modal anzeigen
        },
        error: (error) => {
          console.error("⚠ Fehler beim Speichern:", error);
        },
      });
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']);
    this.showSuccessModal =false;
  }

  goToRecipe(){
     //TODO, recipeId ist unter recipeIdNav
     this.router.navigate(['/recipe-page']);
    this.showSuccessModal =false;
  }
  
  

  // Nutzer-ID aus LocalStorage holen
  getUserId() {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        return user.id;
      } catch (error) {
        console.error("⚠ Fehler beim Parsen des Benutzers:", error);
      }
    }
    return null;
  }
}

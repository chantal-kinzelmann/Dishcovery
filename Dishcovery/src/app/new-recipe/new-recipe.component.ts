import { Component } from '@angular/core';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../app.config';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-recipe',
  imports: [RecipeDetailComponent,FormsModule,CommonModule],
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
    ingredients: { name: string; amount: number; unit: string }[]; // 🟢 Array von Zutaten
    tags: string[]; // 🟢 Array von Tags
    text: string;
    imgUrl?: string; // 🟢 Bild-URL
  } = {
    userId: null,
    title: '',
    description: '',
    difficulty: 'easy',
    prepTime: 0,
    cookTime: 0,
    ingredients: [
      { name: '', amount: 0, unit: 'g' } // 🔥 Startet mit einer Zutat
    ],
    tags: [],
    text: '',
    imgUrl: ''
  };

  newTag = '';
  private apiUrl = `${environment.apiUrl}/recipe`;

  constructor(private http: HttpClient) {}

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

  // Rezept speichern
  createRecipe(form: any) {
    if (form.valid) {
      this.recipe.userId = this.getUserId(); // Nutzer-ID aus LocalStorage holen
      console.log("📤 Sende Rezept:", this.recipe);

      this.http.post(this.apiUrl, this.recipe).subscribe(
        response => console.log("✅ Rezept gespeichert!", response),
        error => console.error("⚠ Fehler beim Speichern:", error)
      );
    }
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

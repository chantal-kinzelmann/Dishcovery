import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../app.config';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  imports: [ReactiveFormsModule, FormsModule, MatSnackBarModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  username = '';
  profileText = '';
  email = '';
  oldPassword = '';
  newPassword = '';
  repeatPassword = '';
  profileImageBase64: string = ''; // Hier speichern wir das Bild als Base64-String

  private apiUrl = environment.apiUrl + '/user';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackbar: MatSnackBar,
  ) {}

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.profileImageBase64 = reader.result as string; // Base64 speichern
      };

      reader.readAsDataURL(file); // Datei als Base64 einlesen
    }
  }

  showSuccsess(message: string) {
    this.snackbar.open(message, 'OK', {
      duration: 5000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  showError(message: string) {
    this.snackbar.open(message, 'OK', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  // Nutzer-ID aus LocalStorage holen
  getUserId() {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        return user.id;
      } catch (error) {
        console.error('⚠ Fehler beim Parsen des Benutzers:', error);
      }
    }
    return null;
  }

  async updateProfile() {
    // JSON-Objekt statt FormData erstellen
    const userData = {
      profileImage: this.profileImageBase64, // Base64 direkt übergeben
      username: this.username,
      profileText: this.profileText,
      email: this.email,
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      repeatPassword: this.repeatPassword,
    };

    let userId = this.getUserId();

    this.http.put(`${this.apiUrl}/${userId}/update-profile`, userData).subscribe(
      (response) => {
        this.authService.loadUser(userId); // User-Daten neu laden
        this.showSuccsess('Profil erfolgreich aktualisiert!');
      },
      (error) => {
        this.showError('Fehler beim Aktualisieren des Profils!');
      },
    );
  }
}

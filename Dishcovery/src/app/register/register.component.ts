import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule,NgIf } from '@angular/common';
import {MatSnackBarModule, MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormsModule, RouterLink, CommonModule, NgIf, MatSnackBarModule]
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  passwordRepeat = '';
  errorMessage = '';

  constructor(private authService: AuthService, private snackBar:MatSnackBar) {}

  register() {
    console.log('Registrierung gestartet...');
  
    if (this.password !== this.passwordRepeat) {
      this.errorMessage = 'Passwörter stimmen nicht überein!';
      return;
    }
  
    this.authService.register({
      username: this.username,
      email: this.email,
      password: this.password,
    }).subscribe({
      next: (response) => {
        console.log('Registrierung erfolgreich!', response);
        this.showSuccsess('Registrierung erfolgreich!');
      },
      error: (err) => {
        console.error('Registrierung fehlgeschlagen:', err);
       this.showError('Registrierung fehlgeschlagen')
        // Fehler aus Backend anzeigen
        this.errorMessage = err.error?.message || 'Ein unbekannter Fehler ist aufgetreten!';
      }
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
   
  showSuccsess(message: string) {
    this.snackBar.open(message, 'OK', {
     
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}

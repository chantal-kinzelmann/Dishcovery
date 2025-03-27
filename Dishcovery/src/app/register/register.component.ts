import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormsModule, RouterLink, CommonModule, NgIf, MatSnackBarModule],
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  username = '';
  email = '';
  password = '';
  passwordRepeat = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {}

  register() {
    if (this.password !== this.passwordRepeat) {
      this.errorMessage = 'Passwörter stimmen nicht überein!';
      return;
    }

    this.authService
      .register({
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (response) => {
          this.showSuccsess('Registrierung erfolgreich!');

          setTimeout(() => {
            this.username = '';
            this.email = '';
            this.password = '';
            this.passwordRepeat = '';
          }, 1);
          this.registerForm.reset();
        },
        error: (err) => {
          console.error('Registrierung fehlgeschlagen:', err);
          this.showError('Registrierung fehlgeschlagen');
          // Fehler aus Backend anzeigen
          this.errorMessage = err.error?.message || 'Ein unbekannter Fehler ist aufgetreten!';
        },
      });
  }

  showError(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  showSuccsess(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}

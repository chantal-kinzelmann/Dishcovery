import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule,NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth-service/auth.service';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [RouterLink,CommonModule,NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {}

  login() {
    console.log('Login gestartet...');

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login erfolgreich!', response);
        this.snackBar.open('Login erfolgreich!', 'OK', { panelClass: ['success-snackbar'], duration: 3000 });
        this.router.navigate(['/profile']); // Weiterleitung nach dem Login
      },
      error: (err) => {
        console.error('Login fehlgeschlagen:', err);
        this.snackBar.open('Login fehlgeschlagen: Falsche Anmeldedaten!', 'OK', { panelClass: ['error-snackbar'], duration: 3000 });
      }
    });
  }
}

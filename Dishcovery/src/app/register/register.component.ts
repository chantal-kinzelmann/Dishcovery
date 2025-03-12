import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule,NgIf } from '@angular/common';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormsModule, RouterLink, CommonModule, NgIf]
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  passwordRepeat = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  register() {
    if (this.password !== this.passwordRepeat) {
      this.errorMessage = 'Passwörter stimmen nicht überein!';
      return;
    }

    this.authService.register({
      username: this.username,
      email: this.email,
      password: this.password,
    }).subscribe({
      next: () => alert('Registrierung erfolgreich!'),
      error: (err) => this.errorMessage = err.error.message
    });
  }
}

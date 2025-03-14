import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {
  email: string = '';

  constructor(private http: HttpClient) {}

  resetPassword() {
    if (!this.email) {
      alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    this.http.post<{ message: string }>('http://localhost:3000/reset-password', { email: this.email })
      .subscribe({
        next: (response) => {
          alert(response.message);
        },
        error: (error) => {
          console.error("Fehler beim Senden der E-Mail:", error);
          alert("Fehler beim Senden der E-Mail.");
        }
      });
  }
}
import { bootstrapApplication } from '@angular/platform-browser';
import { PasswordResetComponent } from './app/password-reset/password-reset.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(PasswordResetComponent, {
  providers: [provideHttpClient()]
}).catch(err => console.error(err));
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import  {RezeptkarteComponent} from './app/rezeptkarte/rezeptkarte.component';

//bootstrapApplication(AppComponent, appConfig)
  bootstrapApplication(RezeptkarteComponent, appConfig)
  .catch((err) => console.error(err));

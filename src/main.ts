import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';



export class AppModule{}
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

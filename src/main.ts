import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // Verifique se o caminho está correto
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
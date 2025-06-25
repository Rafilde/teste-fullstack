import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), providePrimeNG({}), provideHttpClient(), provideHttpClient(withInterceptors([authInterceptor])) ]
};

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './services/auth-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideAnimations(),
     provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
};

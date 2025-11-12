import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { headerInterceptor } from './core/interceptors/header.interceptor';
import { errorsInterceptor } from './core/interceptors/errors.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { provideServiceWorker } from '@angular/service-worker';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions(),   withInMemoryScrolling({
        scrollPositionRestoration: 'top', // 👈 Always scroll to top on navigation
      })),
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor, errorsInterceptor, loadingInterceptor])),
    provideAnimations(),
   provideToastr({
     positionClass: 'toast-bottom-right',
      timeOut: 3000,
      preventDuplicates: true,
    }), 
    
    importProvidersFrom(NgxSpinnerModule),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};

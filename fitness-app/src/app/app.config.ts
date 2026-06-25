
import { BASE_URL } from '@org/auth'


import {
  ApplicationConfig,
  APP_INITIALIZER,
  provideBrowserGlobalErrorListeners,
  inject,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { Theme } from './core/services/theme/theme';
import { languageInterceptor } from './core/interceptors/language-interceptor';
import { headerInterceptor } from './core/interceptors/header-interceptor';

function initializeTheme(): void {
  const theme = inject(Theme);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch(),  withInterceptors([languageInterceptor,headerInterceptor])),
    provideRouter(appRoutes,withInMemoryScrolling({
        scrollPositionRestoration: 'top'
      })),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    {
      provide: BASE_URL,
      useValue: 'https://fitness.elevateegy.com',
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => initializeTheme,
      multi: true,
    },
  ],
};

import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { tokenInterceptorFn } from './interceptors/token.interceptor.fn';
import { ToastComponent } from './products/toast/toast.component';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
              provideRouter(routes), 
              importProvidersFrom(ToastComponent),
              provideHttpClient(withInterceptors([tokenInterceptorFn]))
            ]
};

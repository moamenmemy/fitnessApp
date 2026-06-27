import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading/loading';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  const loadingService = inject(LoadingService);
  loadingService.show();

  return next(req).pipe(
    finalize(() => loadingService.hide())
  );
};
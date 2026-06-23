import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Language } from '../services/language/language';


// Debug: ensure file is loaded
console.log('language-interceptor loaded');

export const languageInterceptor: HttpInterceptorFn = (req, next) => {
  const langService = inject(Language);

  const lang = langService.lang();

  const clonedReq = req.clone({
    setHeaders: {
      'Accept-Language': lang,
    },
  });

  return next(clonedReq);
};

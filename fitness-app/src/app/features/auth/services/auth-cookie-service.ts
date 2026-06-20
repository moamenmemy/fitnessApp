import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthCookieService {
  private cookieService = inject(CookieService);

 setToken(token: string): void {
 
  this.cookieService.set('token', token, 365, '/', '', true, 'Strict');
}


getToken(): string {
    return this.cookieService.get('token');
  }

  deleteToken(): void {
    this.cookieService.delete('token', '/');
  }
}

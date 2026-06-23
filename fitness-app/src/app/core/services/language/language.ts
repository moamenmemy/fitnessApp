import {
  computed,
  Injectable,
  signal,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Language {
  private platformId = inject(PLATFORM_ID);

  private _lang = signal<'en' | 'ar'>('en');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang =
        (localStorage.getItem('lang') as 'en' | 'ar') || 'en';

      this._lang.set(savedLang);
    }
  }

  lang = computed(() => this._lang());

  setLanguage(lang: 'en' | 'ar') {
    this._lang.set(lang);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang);
    }
  }

  toggleLanguage() {
    const newLang = this._lang() === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  }
}
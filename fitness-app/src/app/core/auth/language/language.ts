import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Language {
  
  private _lang = signal<'en' | 'ar'>(
    (localStorage.getItem('lang') as 'en' | 'ar') || 'en'
  );

  lang = computed(() => this._lang());

  setLanguage(lang: 'en' | 'ar') {
    this._lang.set(lang);
    localStorage.setItem('lang', lang);
  }

  toggleLanguage() {
    const newLang = this._lang() === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  }
  
}

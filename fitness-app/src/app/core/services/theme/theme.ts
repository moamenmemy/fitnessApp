import { isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Theme {
   private platformId = inject(PLATFORM_ID);

  theme = signal<'light' | 'dark'>('light');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
      this.theme.set(saved);
      this.applyTheme(saved);
    }

    effect(() => {
      const mode = this.theme();

      if (!isPlatformBrowser(this.platformId)) return;

      localStorage.setItem('theme', mode);
      this.applyTheme(mode); // 👈 مهم جدًا
    });
  }

  private applyTheme(mode: 'light' | 'dark') {
    const html = document.documentElement;

    if (mode === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }

  toggleTheme() {
    this.theme.update(t => (t === 'light' ? 'dark' : 'light'));
  }
}

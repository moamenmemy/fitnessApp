import { isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Theme {
  private platformId = inject(PLATFORM_ID);

  theme = signal<'light' | 'dark'>('light');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('theme');
      const mode = saved === 'dark' ? 'dark' : 'light';

      this.theme.set(mode);
      this.applyTheme(mode);
    }

    effect(() => {
      const mode = this.theme();

      if (!isPlatformBrowser(this.platformId)) return;

      localStorage.setItem('theme', mode);
      this.applyTheme(mode);
    });
  }

  private applyTheme(mode: 'light' | 'dark') {
    const html = document.documentElement;

    html.classList.toggle('dark', mode === 'dark');
  }

  setTheme(mode: 'light' | 'dark') {
    this.theme.set(mode);
  }

  toggleTheme() {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }
}

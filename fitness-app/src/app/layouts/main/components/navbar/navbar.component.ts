import { Component, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { ButtonUiComponent } from '../../../../shared/components/button-ui/buttonUi.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Theme } from '../../../../core/services/theme/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun,faMoon } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar',
  imports: [
    DrawerModule,
    ButtonModule,
    ButtonUiComponent,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
 private platformId = inject(PLATFORM_ID);
  _theme = inject(Theme);
  
  sidebarVisible = false;
  isScrolled = false;
  fasun = faSun;
  famoon = faMoon;

  @HostListener('window:scroll', [])
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.scrollY > 50;
    }
  }

  navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'About', path: '/about' },
    { name: 'Classes', path: '/classes' },
    { name: 'Healthy', path: '/healthy' },
  ];
}

import { Component, computed, HostListener, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Theme } from '../../../../core/services/theme/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun,faMoon, faUser } from '@fortawesome/free-solid-svg-icons';
import { ButtonUiComponent } from 'fitness-app/src/app/Shareds/button-ui/buttonUi.component';
import { AuthService } from '@org/auth';
@Component({
  standalone: true,
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
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private _authService = inject(AuthService);
  _theme = inject(Theme);
  isBrowser = false;
  logged = computed(() => this._authService.isLoggedIn());
  sidebarVisible = false;
  isScrolled = false;
  fasun = faSun;
  famoon = faMoon;
  User=faUser
constructor(){
     this.isBrowser = isPlatformBrowser(this.platformId);
}
  ngOnInit() {

  }
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

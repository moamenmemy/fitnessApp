import { Component, HostListener } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { ButtonUiComponent } from '../../../../Shared/components/button-ui/buttonUi.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  sidebarVisible = false;
  isScrolled = false;

  @HostListener('window:scroll', [])
  onScroll() {
    this.isScrolled = window.scrollY > 50;
  }
  navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'About', path: '/about' },
    { name: 'Classes', path: '/classes' },
    { name: 'Healthy', path: '/healthy' },
  ];
}

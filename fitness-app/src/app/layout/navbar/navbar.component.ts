import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  imports: [DrawerModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  sidebarVisible = false;

  navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'About', path: '/about' },
    { name: 'Classes', path: '/classes' },
    { name: 'Healthy', path: '/healthy' }
  ];
}

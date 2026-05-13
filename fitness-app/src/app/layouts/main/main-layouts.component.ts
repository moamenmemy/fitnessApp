import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-main-layouts',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './main-layouts.component.html',
  styleUrl: './main-layouts.component.css',
})
export class MainLayoutsComponent {}

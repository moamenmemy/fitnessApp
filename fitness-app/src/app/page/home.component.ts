import { Component } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section.component';
import { AboutSectionComponent } from "./components/about-section.component";

@Component({
  selector: 'app-home',
  imports: [HeroSectionComponent, AboutSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}

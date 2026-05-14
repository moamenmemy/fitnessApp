import { Component } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section.component';
import { AboutSectionComponent } from "./components/about-section.component";

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [HeroSectionComponent, AboutSectionComponent],
  templateUrl: './home.component.html',
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {}

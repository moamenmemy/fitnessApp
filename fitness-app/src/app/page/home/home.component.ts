import { Component } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section.component';
import { AboutSectionComponent } from './components/about-section.component';
import { WhyUsComponent } from './components/whyUs/whyUs.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [HeroSectionComponent, AboutSectionComponent, WhyUsComponent],
  templateUrl: './home.component.html',
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {}

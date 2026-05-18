import { Component } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section.component';
import { AboutSectionComponent } from './components/about-section.component';
import { WhyUsComponent } from './components/whyUs/whyUs.component';

@Component({
  selector: 'app-home',
  imports: [HeroSectionComponent, AboutSectionComponent, WhyUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}

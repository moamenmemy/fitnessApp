import { Component } from '@angular/core';

import { ButtonUiComponent } from 'fitness-app/src/app/Shareds/button-ui/buttonUi.component';
import { ServicesBarComponent } from 'fitness-app/src/app/Shareds/services-bar/servicesBar.component';

@Component({
  selector: 'app-hero-section',
  imports: [ ServicesBarComponent,ButtonUiComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent {}

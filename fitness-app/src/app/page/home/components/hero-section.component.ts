import { Component } from '@angular/core';
import { ButtonUiComponent } from '../../../shared/components/button-ui/buttonUi.component';
import { ServicesBarComponent } from '../../../shared/components/services-bar/servicesBar.component';

@Component({
  selector: 'app-hero-section',
  imports: [ButtonUiComponent, ServicesBarComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent {}

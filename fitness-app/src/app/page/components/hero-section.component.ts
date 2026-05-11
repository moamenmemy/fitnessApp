import { Component } from '@angular/core';
import { ButtonUiComponent } from '../../shared/components/button-ui/buttonUi.component';


@Component({
  selector: 'app-hero-section',
  imports: [ButtonUiComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent {}

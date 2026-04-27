import { Component } from '@angular/core';
import { ButtonUiComponent } from "../../shared/components/button-ui/buttonUi.component";
import { SecrionTitleComponent } from "../../shared/components/secrion-title.component";

@Component({
  selector: 'app-hero-section',
  imports: [ButtonUiComponent],
  templateUrl:'./hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent {}
